const { system, filesystem } = require('gluegun');

const cwd = filesystem.path(__dirname, '..');

const cli = app => async cmd =>
  system.run('node ' + filesystem.path(cwd, 'bin', 'next-stitch') + ` ${cmd}`, {
    cwd: filesystem.path(cwd, app)
  });

test('prepare pages', async () => {
  const output = await cli('example')('prepare pages');
  expect(output).toContain('pages bundle created');

  expect(
    filesystem.find('./example/dist', { matching: '**/*' })
  ).toMatchSnapshot();

  filesystem.remove('./example/dist');
});

test('stitch', async () => {
  const output = await cli('example-shell')('stitch');
  expect(output).toContain('stitched "@next-stitch/next-stitch-test-package"');

  expect(
    filesystem.find('./example-shell/src/pages', { matching: '**/*' })
  ).toMatchSnapshot();

  expect(
    filesystem.read('./example-shell/src/pages/about.ts')
  ).toMatchSnapshot();

  filesystem.remove('./example-shell/pages/nested');
  filesystem.remove('./example-shell/pages/about.ts');
});
