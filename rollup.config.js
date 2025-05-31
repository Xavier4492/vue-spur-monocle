import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import vue from 'rollup-plugin-vue'
import terser from '@rollup/plugin-terser'

const basePlugins = [
  resolve(),
  typescript({
    tsconfig: './tsconfig.json',
    tsconfigOverride: { compilerOptions: { declaration: false } },
    clean: true,
  }),
  commonjs(),
  vue({ compileTemplate: true }),
  terser(),
]

const modulesBuild = {
  input: ['src/composables/useMonocle.ts', 'src/injectionKey.ts'],
  external: ['vue'],
  plugins: basePlugins,
  output: [
    {
      dir: 'dist',
      format: 'es',
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: 'src',
      entryFileNames: '[name].js',
    },
    {
      dir: 'dist',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: 'src',
      entryFileNames: '[name].cjs.js',
    },
  ],
}

const entryBuild = {
  input: 'src/index.ts',
  external: ['vue', 'spur-monocle-manager'], 
  plugins: basePlugins,
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'es',
      sourcemap: true,
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
  ],
}

export default [modulesBuild, entryBuild]
