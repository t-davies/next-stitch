const { build } = require('gluegun');

async function run(argv) {
  const cli = build()
    .brand('next-stitch')
    .src(__dirname)
    .plugins('./node_modules', { matching: 'next-stitch-*', hidden: true })
    .help()
    .version()
    .create();
  // enable the following method if you'd like to skip loading one of these core extensions
  // this can improve performance if they're not necessary for your project:
  // .exclude(['meta', 'strings', 'print', 'filesystem', 'semver', 'system', 'prompt', 'http', 'template', 'patching', 'package-manager'])

  const toolbox = await cli.run(argv);
  return toolbox;
}

module.exports = { run };
