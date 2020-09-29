import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import externalPeerDependencies from 'rollup-plugin-peer-deps-external';
import multipleInputs from 'rollup-plugin-multi-input';
import resolve from '@rollup/plugin-node-resolve';
import styles from 'rollup-plugin-styles';

const extensions = ['.js', '.ts', '.tsx', '.jsx'];

export default {
  input: [`./src/pages/**/*.{js,ts,tsx,jsx}`],
  output: [
    {
      dir: 'dist',
      entryFileNames: '[name].cjs',
      format: 'cjs',
      exports: 'auto',
      sourcemap: true,
      assetFileNames: '[name]-[hash][extname]'
    },
    {
      dir: 'dist',
      entryFileNames: '[name].mjs',
      format: 'esm',
      sourcemap: true,
      assetFileNames: '[name]-[hash][extname]'
    }
  ],
  plugins: [
    multipleInputs(),
    externalPeerDependencies(),
    resolve({ extensions }),
    babel({
      extensions,
      presets: ['next/babel'],
      babelHelpers: 'runtime',
      include: ['src/**/*'],
      exclude: ['node_modules/**']
    }),
    styles({
      mode: ['extract', 'bundle.css'],
      autoModules: id => id.includes('.module.')
    }),
    commonjs()
  ]
};
