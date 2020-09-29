const glob = require('glob');
const path = require('path');

const getPackageDirectory = packageName =>
  path.join(process.cwd(), 'node_modules', ...packageName.split('/'), 'dist');

const relativeToPackagePath = (fileName, packageName) =>
  fileName.replace('./', `${packageName}/dist/`);

const relativeToAbsolutePath = (fileName, packageName) =>
  path.join(getPackageDirectory(packageName), fileName.replace('./', ''));

const parseModuleExports = module =>
  typeof module === 'object' ? Object.keys(module) : ['default'];

module.exports = {
  name: 'stitch',
  alias: ['s'],
  run: async toolbox => {
    const {
      filesystem,
      config: { loadConfig },
      template: { generate },
      print: { info, warning, error, debug, success }
    } = toolbox;

    const output = path.join(process.cwd(), 'src', 'pages');
    const { packages } = loadConfig('stitch', process.cwd());

    if (!Array.isArray(packages)) {
      error('bad config, missing "packages" array');
      throw new TypeError("missing 'packages' from config");
    }

    for (const packageName of packages) {
      info(`stitching "${packageName}"...`);

      const files = glob.sync('./{pages/**/*.cjs,**/*.css}', {
        cwd: getPackageDirectory(packageName)
      });

      const pages = files.filter(path => path.endsWith('.cjs'));

      const commonFileImports = files
        .filter(path => !path.startsWith('./pages'))
        .map(path => relativeToPackagePath(path, packageName));

      debug({ files, pages, commonFileImports }, 'stitch options');

      for (const page of pages) {
        const withoutExtension = page.replace('.cjs', '');
        const module = require(relativeToAbsolutePath(page, packageName));
        const exports = parseModuleExports(module);

        await generate({
          template: 'page.ts.ejs',
          target: `${withoutExtension}.ts`.replace('./', './src/'),
          props: {
            eol: filesystem.eol,
            exports: exports,
            packageModulePath: relativeToPackagePath(
              withoutExtension,
              packageName
            )
          }
        });
      }

      success(`stitched "${packageName}"`);
      if (commonFileImports.length > 0) {
        warning(`
[!] This package contains CSS, you must manually import the CSS bundle.
${commonFileImports.map(
  importPath => `import "${importPath}";${filesystem.eol}`
)}
        `);
      }
    }
  }
};
