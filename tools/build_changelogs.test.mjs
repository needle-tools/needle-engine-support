import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generatePage } from './build_changelogs.mjs';

test('published USD changelog links back to the viewer repository', () => {
    const target = 'https://github.com/needle-tools/usd-viewer/blob/main/CHANGELOG.md';
    const page = generatePage({ npm: '@needle-tools/usd', title: 'Needle USD', viewerChangelogUrl: target }, '1.2.1',
        '# Changelog\n\nViewer changes: [viewer changelog](../CHANGELOG.md).');
    assert.ok(page.includes(`[viewer changelog](${target})`));
    assert.ok(!page.includes('](../CHANGELOG.md)'));
});

test('unconfigured changelogs retain existing destinations', () => {
    const page = generatePage({ npm: 'example', title: 'Example' }, '1.0.0',
        '[source](https://example.com/CHANGELOG.md)\n[section](#fixed)');
    assert.ok(page.includes('[source](https://example.com/CHANGELOG.md)'));
    assert.ok(page.includes('[section](#fixed)'));
});