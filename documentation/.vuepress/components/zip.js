/*
  A minimal ZIP writer.

  Only what a download button needs: several files into one archive, stored
  rather than compressed. The samples are small text files plus a few .ogg
  clips, and .ogg is already compressed — deflate would add a dependency and
  save close to nothing.

  Store-only means the compressed and uncompressed sizes are the same, so the
  headers below repeat one number rather than tracking two.
*/

/*
  CRC-32, which every entry needs twice — once in its local header and once in
  the central directory. The table is built on first use and kept, because
  building it per file would repeat 256 * 8 rounds for nothing.
*/
let crcTable = null;

function getCrcTable() {
  if (crcTable) return crcTable;
  crcTable = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let bit = 0; bit < 8; bit++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    crcTable[i] = c >>> 0;
  }
  return crcTable;
}

function crc32(bytes) {
  const table = getCrcTable();
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ bytes[i]) & 0xff];
  }
  return (crc ^ 0xffffffff) >>> 0;
}

/*
  Build a zip from `[{ name, bytes }]` and return it as a Blob.

  The layout is the one every unzip tool expects: each file as a local header
  followed by its bytes, then a central directory repeating those headers, then
  a record saying where that directory starts and how many entries it holds.
*/
export function zip(files) {
  const encoder = new TextEncoder();
  const entries = files.map(file => {
    const name = encoder.encode(file.name);
    return { name, bytes: file.bytes, crc: crc32(file.bytes) };
  });

  const LOCAL_HEADER = 30;
  const CENTRAL_HEADER = 46;
  const END_RECORD = 22;

  const localSize = entries.reduce(
    (n, e) => n + LOCAL_HEADER + e.name.length + e.bytes.length,
    0
  );
  const centralSize = entries.reduce((n, e) => n + CENTRAL_HEADER + e.name.length, 0);

  const out = new Uint8Array(localSize + centralSize + END_RECORD);
  const view = new DataView(out.buffer);
  let at = 0;

  // Every multi-byte field in a zip is little-endian.
  const u16 = value => { view.setUint16(at, value, true); at += 2; };
  const u32 = value => { view.setUint32(at, value, true); at += 4; };
  const raw = bytes => { out.set(bytes, at); at += bytes.length; };

  /*
    Bit 11 says the file name is UTF-8. Without it a name with non-ASCII
    characters is read in whatever code page the tool defaults to.
  */
  const FLAGS = 0x0800;
  const STORED = 0;
  // Zip stores MS-DOS timestamps, which cannot express "unknown". 1980-01-01
  // is the earliest it can hold, and reads as a placeholder rather than as a
  // date the archive is claiming.
  const DOS_TIME = 0;
  const DOS_DATE = 0x0021;

  for (const entry of entries) {
    entry.offset = at;
    u32(0x04034b50); // local file header
    u16(20); // version needed
    u16(FLAGS);
    u16(STORED);
    u16(DOS_TIME);
    u16(DOS_DATE);
    u32(entry.crc);
    u32(entry.bytes.length); // compressed size
    u32(entry.bytes.length); // uncompressed size
    u16(entry.name.length);
    u16(0); // extra field length
    raw(entry.name);
    raw(entry.bytes);
  }

  const centralStart = at;

  for (const entry of entries) {
    u32(0x02014b50); // central directory header
    u16(20); // version made by
    u16(20); // version needed
    u16(FLAGS);
    u16(STORED);
    u16(DOS_TIME);
    u16(DOS_DATE);
    u32(entry.crc);
    u32(entry.bytes.length);
    u32(entry.bytes.length);
    u16(entry.name.length);
    u16(0); // extra field length
    u16(0); // comment length
    u16(0); // disk number
    u16(0); // internal attributes
    u32(0); // external attributes
    u32(entry.offset);
    raw(entry.name);
  }

  u32(0x06054b50); // end of central directory
  u16(0); // this disk
  u16(0); // disk the directory starts on
  u16(entries.length);
  u16(entries.length);
  u32(at - centralStart);
  u32(centralStart);
  u16(0); // comment length

  return new Blob([out], { type: 'application/zip' });
}
