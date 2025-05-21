
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import vue from 'rollup-plugin-vue';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.ts',
  external: ['vue'],
  plugins: [
    resolve(),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' }),
    vue({ compileTemplate: true }),
    terser()
  ],
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'es',
      sourcemap: true
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },
    // For enabled UMD build add this in package.json and uncomment the output below
    // packageJson.browser: "dist/index.umd.js",
    // packageJson.types: "dist/index.d.ts",
    // packageJson.exports["."].default: "./dist/index.umd.js"
    // {
    //   file: 'dist/index.umd.js',
    //   name: 'VueSpurMonocle',
    //   format: 'umd',
    //   globals: { vue: 'Vue' },
    //   sourcemap: true
    // }
  ]

}