const path = require('path');
const findup = require('find-up');

const rollup = async (type, system) => {
  const rollup = findup.sync(path.join('node_modules', '.bin', 'rollup'), {
    cwd: __dirname
  });

  const configuration = require.resolve(`../config/${type}/rollup.config.js`);

  if (!rollup) {
    throw new Error('failed to find rollup');
  }

  return system.run(`${rollup} -c ${configuration}`, {
    cwd: process.cwd()
  });
};

module.exports = {
  name: 'prepare',
  alias: ['p'],
  run: async toolbox => {
    const allowedTypes = ['pages', 'components'];
    const { parameters, print, prompt, system, filesystem } = toolbox;

    let [type] = parameters.array;

    if (!allowedTypes.includes(type)) {
      const { selectedType } = await prompt.ask([
        {
          type: 'select',
          name: 'selectedType',
          message: 'prepare what?',
          choices: allowedTypes
        }
      ]);

      type = selectedType;
    }

    try {
      await filesystem.remove(path.join(process.cwd(), 'dist'));
      await rollup(type, system);
      print.success(`[success] ${type} bundle created`);
    } catch (err) {
      print.error(`[error] failed to create ${type} bundle`);
      print.debug(err, 'rollup failed');
    }
  }
};
