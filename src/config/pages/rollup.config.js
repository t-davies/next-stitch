import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import externalPeerDependencies from 'rollup-plugin-peer-deps-external';
import multipleInputs from 'rollup-plugin-multi-input';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: [`./src/pages/**/*.{js,ts,tsx,jsx}`],
  output: [
    {
      dir: 'dist',
      entryFileNames: '[name].cjs',
      format: 'cjs',
      exports: 'auto',
      sourcemap: true
    },
    {
      dir: 'dist',
      entryFileNames: '[name].mjs',
      format: 'esm',
      sourcemap: true
    }
  ],
  plugins: [
    multipleInputs(),
    externalPeerDependencies(),
    babel({
      extensions: ['.js', '.ts', '.tsx', '.jsx'],
      presets: ['next/babel'],
      babelHelpers: 'runtime',
      include: ['src/**/*'],
      exclude: ['node_modules/**']
    }),
    resolve(),
    commonjs()
  ]
};
