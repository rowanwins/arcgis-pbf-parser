import {terser} from 'rollup-plugin-terser'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

const output = (input, file, format, plugins) => ({
  input,
  output: {
    name: file,
    file,
    format
  },
  plugins
})

export default [
  output('./src/main.js', './dist/arcgis-pbf.cjs', 'cjs', [
    commonjs()
  ]),
  output('./src/main.js', './dist/arcgis-pbf.min.js', 'umd', [
    commonjs(),
    resolve(),
    terser()
  ]),
  output('./src/main.js', './dist/arcgis-pbf.mjs', 'esm', [
    commonjs()
  ])
]
