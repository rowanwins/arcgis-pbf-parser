import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { glob } from 'glob'
import {loadJsonFileSync} from 'load-json-file'
import {writeJsonFileSync} from 'write-json-file'
import test from 'tape'

import decode from '../src/main.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

test("arcgis-pbf-parser", (t) => {

  glob
  .sync(path.join(__dirname, "encoded", "*.pbf"))
  .forEach((filepath) => {
    const { name } = path.parse(filepath)
    const pbfBuffer = fs.readFileSync(filepath)
    const result = decode(pbfBuffer)

    const expectedPath = filepath.replace('encoded', 'decoded').replace('.pbf', '.json')

    if (process.env.REGEN) writeJsonFileSync(expectedPath, result)
    
    t.deepEqual(result, loadJsonFileSync(expectedPath), name)
  })

  t.end()

})
