import * as fs from 'fs'
import decode from '../src/main'

const polygonBuffer = fs.readFileSync('/Users/rowan/Documents/Code/arcgis-pbf-parser/tests/harness/pbf-no-quantization.pbf')
const crs = {
  'type': 'name',
  'properties': {
    'name': 'urn:ogc:def:crs:EPSG::3857'
  }
}

function writeOutputs () {
  const fc = decode(polygonBuffer)
  fc.crs = crs
  fs.writeFileSync('./test/out-polygons.geojson', JSON.stringify(fc))

  const lineBuffer = fs.readFileSync('/Users/rowan/Documents/Code/arcgis-pbf-parser/tests/harness/pbf-lines-quantization.pbf')
  const fc2 = decode(lineBuffer)
  fc2.crs = crs

  fs.writeFileSync('./test/out-lines.geojson', JSON.stringify(fc2))

  const pointsBuffer = fs.readFileSync('/Users/rowan/Documents/Code/arcgis-pbf-parser/tests/harness/pbf-points.pbf')
  const fc3 = decode(pointsBuffer)
  fc3.crs = crs
  fs.writeFileSync('./test/out-points.geojson', JSON.stringify(fc3))
}

writeOutputs()