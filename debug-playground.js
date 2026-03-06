const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const errors = [];
  page.on('pageerror', err => errors.push(err.message));

  await page.goto('http://localhost:8080/docs/playground-test.html', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(8000);

  // Check the slot content playground (index 3) and grouped editors
  const results = await page.evaluate(() => {
    const playgrounds = document.querySelectorAll('.playground');
    const out = [];

    // Check slot playground (index 3 - "Custom Code with Slot")
    const slotPg = playgrounds[3];
    if (slotPg) {
      const lines = slotPg.querySelectorAll('.view-line');
      let content = '';
      lines.forEach(l => content += l.textContent + '\n');
      const lineCount = content.trim().split('\n').length;
      out.push({
        name: 'Slot playground (index 3)',
        lineCount: lineCount,
        preview: content.trim().substring(0, 300),
      });
    }

    // Check grouped editors
    const editors = document.querySelectorAll('.playground.editor-only');
    editors.forEach((pg, i) => {
      const lines = pg.querySelectorAll('.view-line');
      let content = '';
      lines.forEach(l => content += l.textContent + '\n');
      const title = (pg.querySelector('.panel-title') || {}).textContent || '';
      out.push({
        name: 'Grouped: ' + title,
        lineCount: content.trim().split('\n').length,
        preview: content.trim().substring(0, 200),
      });
    });

    // Check wrap button exists
    const wrapBtns = document.querySelectorAll('.wrap-btn');
    out.push({ wrapButtonCount: wrapBtns.length });

    // Check output
    const output = document.querySelector('.playground-output');
    if (output) {
      out.push({
        name: 'Output',
        status: (output.querySelector('.status') || {}).textContent || '',
      });
    }

    return out;
  });

  results.forEach(r => console.log(JSON.stringify(r, null, 2)));

  if (errors.length) {
    console.log('\n=== PAGE ERRORS ===');
    errors.forEach(e => console.log(e));
  }

  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
