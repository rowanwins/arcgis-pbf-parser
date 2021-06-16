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
  external: ['pbf'],
  plugins
})

export default [
  output('./src/main.js', './dist/arcgis-pbf.js', 'umd', [
    commonjs(),
    resolve()
  ]),
  output('./src/main.js', './dist/arcgis-pbf.min.js', 'umd', [
    commonjs(),
    resolve(),
    terser()
  ]),
  output('./src/main.js', './dist/arcgis-pbf.esm.js', 'esm', [
    commonjs(),
    resolve()
  ])
]
