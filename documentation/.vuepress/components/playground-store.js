// Shared reactive state for linked playground groups.
// Multiple <playground> editors + a <playground-output> can share code via a group key.
// Sections in the source file are marked with // #section name ... // #endsection

import { reactive } from 'vue';

const groups = {};

export function getGroup(key) {
  if (!groups[key]) {
    groups[key] = reactive({
      fullCode: '',
      loaded: false,
      sections: null,       // { name: { startLine, endLine, indent } }
      sectionEdits: {},     // { name: editedCode }
      error: null,
      compiling: false,
      // Internal (not used in templates)
      _iframes: [],
      _iframeReady: [],     // parallel array of booleans
      _compileTimer: null,
      _loadPromise: null,
    });
  }
  return groups[key];
}

export function setGroupCode(group, code) {
  group.fullCode = code;
  group.sections = parseSections(code);
  group.loaded = true;
}

export async function ensureGroupCode(group, file) {
  if (group.loaded || !file) return;
  if (group._loadPromise) return group._loadPromise;

  group._loadPromise = (async () => {
    try {
      const res = await fetch(file);
      if (res.ok) setGroupCode(group, await res.text());
    } catch (e) {
      console.warn('[playground-store] Load failed:', file, e);
    }
  })();

  return group._loadPromise;
}

function parseSections(code) {
  const lines = code.split('\n');
  const sections = {};
  let current = null;
  let start = -1;

  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trim();
    const sm = t.match(/^\/\/\s*#section\s+(\S+)/i);
    const em = t.match(/^\/\/\s*#endsection/i);

    if (sm) {
      current = sm[1];
      start = i;
    } else if (em && current) {
      const slice = lines.slice(start + 1, i);
      const ne = slice.filter(l => l.trim());
      const indent = ne.length ? Math.min(...ne.map(l => l.match(/^\s*/)[0].length)) : 0;
      sections[current] = { startLine: start, endLine: i, indent };
      current = null;
    }
  }
  return sections;
}

export function getSectionCode(group, name) {
  if (group.sectionEdits[name] !== undefined) return group.sectionEdits[name];
  const s = group.sections?.[name];
  if (!s) {
    console.warn('[playground-store] Section not found:', name);
    return '';
  }
  const lines = group.fullCode.split('\n').slice(s.startLine + 1, s.endLine);
  return lines.map(l => l.slice(s.indent)).join('\n');
}

export function updateSection(group, name, code) {
  group.sectionEdits[name] = code;
  scheduleCompile(group);
}

export function getReconstructedCode(group) {
  if (!group.sections || Object.keys(group.sectionEdits).length === 0) {
    return group.fullCode;
  }

  const lines = group.fullCode.split('\n');
  const result = [...lines];

  // Apply edits in reverse line order to preserve indices
  const edits = Object.entries(group.sectionEdits)
    .filter(([n]) => group.sections[n])
    .sort((a, b) => group.sections[b[0]].startLine - group.sections[a[0]].startLine);

  for (const [name, edited] of edits) {
    const { startLine, endLine, indent } = group.sections[name];
    const pad = ' '.repeat(indent);
    const editedLines = edited.split('\n').map(l => l ? pad + l : l);
    result.splice(startLine + 1, endLine - startLine - 1, ...editedLines);
  }

  return result.join('\n');
}

function scheduleCompile(group) {
  if (group._compileTimer) clearTimeout(group._compileTimer);
  group._compileTimer = setTimeout(() => compileGroup(group), 500);
}

export async function compileGroup(group) {
  if (group.compiling) return;
  if (!window.esbuild || !window.__esbuildReady) return;

  group.compiling = true;
  group.error = null;

  try {
    const code = getReconstructedCode(group);
    const result = await window.esbuild.transform(code, {
      loader: 'ts',
      format: 'esm',
      target: 'es2022',
      tsconfigRaw: {
        compilerOptions: {
          experimentalDecorators: true,
          useDefineForClassFields: false,
        }
      }
    });

    // Send to all registered iframes (the iframe queues code if engine isn't ready yet)
    for (let i = 0; i < group._iframes.length; i++) {
      group._iframes[i]?.contentWindow?.postMessage({
        type: 'needle-playground-code',
        code: result.code,
      }, '*');
    }
  } catch (e) {
    const msg = e.errors?.[0]?.text || e.message || 'Compile error';
    const line = e.errors?.[0]?.location?.line;
    group.error = line ? `Line ${line}: ${msg}` : msg;
  } finally {
    group.compiling = false;
  }
}

export function registerIframe(group, iframe) {
  if (!group._iframes.includes(iframe)) {
    group._iframes.push(iframe);
    group._iframeReady.push(false);
  }
}

export function unregisterIframe(group, iframe) {
  const i = group._iframes.indexOf(iframe);
  if (i >= 0) {
    group._iframes.splice(i, 1);
    group._iframeReady.splice(i, 1);
  }
}

export function notifyIframeReady(group, iframe) {
  const i = group._iframes.indexOf(iframe);
  if (i >= 0) group._iframeReady[i] = true;
  scheduleCompile(group);
}
