const { system, filesystem } = require('gluegun');

const cwd = filesystem.path(__dirname, '..');

const cli = async cmd =>
  system.run('node ' + filesystem.path(cwd, 'bin', 'next-stitch') + ` ${cmd}`, {
    cwd: filesystem.path(cwd, 'example')
  });

test('prepare pages', async () => {
  const output = await cli('prepare pages');
  expect(output).toContain('pages bundle created');

  expect(
    filesystem.find('./example/dist', { matching: '**/*' })
  ).toMatchSnapshot();

  filesystem.remove('./example/dist');
});
