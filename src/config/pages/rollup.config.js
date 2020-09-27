import path from 'path';
import findup from 'find-up';
import multipleInputs from 'rollup-plugin-multi-input';
import externalPeerDependencies from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';

const typescriptPath = path.join(process.cwd(), 'node_modules', 'typescript');

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
    resolve(),
    commonjs(),
    typescript({
      declarationDir: 'dist',
      tsconfig: findup.sync('tsconfig.json'),
      typescript: require(typescriptPath),
      tsconfigOverride: {
        compilerOptions: {
          jsx: 'react'
        }
      }
    })
  ]
};
