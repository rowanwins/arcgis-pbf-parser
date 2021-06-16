# arcgis-pbf-parser
A library for converting an [arcgis-pbf](https://github.com/Esri/arcgis-pbf) into a geojson `FeatureCollection`.

By itself it doesn't do much but you can find a more complex example of it's usage is in my mapbox-gl-arcgis-featureserver library.

## Basic Usage
````
const arcgisPbfDecode = require('arcgis-pbf-parser')
// or in ES6
import arcgisPbfDecode from' arcgis-pbf-parser'

fetch('Some/FeatureServer/0/query?f=pbf&...')
  .then(response => response.arrayBuffer())
  .then(data => {
    const featureCollection = arcgisPbfDecode(new Uint8Array(data)).featureCollection
   })
````

The decode method returns an object containing the featureCollection, and a boolean specifying if there were too many features and so you need to paginate for more features with the same request.
````
{
  featureCollection: {
    ...
  },
  exceededTransferLimit: true/false
}
````

*Note*
I've not bundled the `pbf` dependency in my package, so you may need to `npm install pbf --save` in your project, although many of the common mapping libraries already include it so 🤞 you shouldn't need to.

## Status
This was cobbled together fairly quickly based on the [minimal documentation](https://github.com/Esri/arcgis-pbf/tree/main/proto/FeatureCollection) available.


### Done
- Polgon
  - Inc MultiPolygon
  - Inc Polygon with holes
- LineString
- Point
- Attributes

### To Do
- MultiPoint (a sample service would be helpful)
- MultiLineString (a sample service would be helpful)
- Write proper tests


## Acknowledgements
- I used the proto spec file supplied by [Esri here](https://github.com/Esri/arcgis-pbf/blob/main/proto/FeatureCollection/FeatureCollection.proto)
- I used the mapbox `pbf` [library](https://github.com/mapbox/pbf) to compile the `src/parser/PbfFeatureCollection.js` module for parsing rather than the [one supplied](https://github.com/Esri/arcgis-pbf/blob/main/proto/FeatureCollection/parsers/js/FeatureCollection.js) by Esri 
  - This results in a slimmer & faster package and the `pbf` dependency will be shared/tree-shaken with mapbox-gl.

