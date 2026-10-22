const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

test('BekMotion Project Structure Invariants', () => {
  const root = path.join(__dirname, '..');
  assert.ok(fs.existsSync(path.join(root, 'package.json')), 'package.json must exist');
  assert.ok(fs.existsSync(path.join(root, 'remotion.config.ts')), 'remotion.config.ts must exist');
  assert.ok(fs.existsSync(path.join(root, 'src', 'Root.tsx')), 'src/Root.tsx must exist');
  assert.ok(fs.existsSync(path.join(root, 'src', 'compositions', 'CinematicExplainer.tsx')), 'CinematicExplainer must exist');
  assert.ok(fs.existsSync(path.join(root, 'src', 'compositions', 'ReelsStory.tsx')), 'ReelsStory must exist');
  assert.ok(fs.existsSync(path.join(root, 'src', 'compositions', 'VectorLivingStage.tsx')), 'VectorLivingStage must exist');
  assert.ok(fs.existsSync(path.join(root, 'scripts', 'vo_sync.py')), 'scripts/vo_sync.py must exist');
});

test('Remotion Root Registers 3 Compositions', () => {
  const rootTsx = fs.readFileSync(path.join(__dirname, '..', 'src', 'Root.tsx'), 'utf-8');
  assert.ok(rootTsx.includes('id="BekMotion16x9"'), 'BekMotion16x9 must be registered');
  assert.ok(rootTsx.includes('id="BekMotion9x16"'), 'BekMotion9x16 must be registered');
  assert.ok(rootTsx.includes('id="BekVectorShowcase"'), 'BekVectorShowcase must be registered');
});
