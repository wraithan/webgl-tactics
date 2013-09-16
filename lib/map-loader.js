var tile = require('./tile')

module.exports = loader

function loader(scene, map) {
  var width = map.dimensions[0]
    , depth = map.dimensions[1]
    , height = map.dimensions[2]
    , idx = 0
  for (var z = 0; z < height; ++z) {
    for (var y = 0; y < depth; ++y) {
      for (var x = 0; x < width; ++x, ++idx) {
        var type = map.tiles[idx]
        if (type) {
          var new_tile = tile(type)
          new_tile.position = xyz_to_world(x, y, z)
          scene.add(new_tile)
        }
      }
    }
  }
  function xyz_to_world(x, y, z) {
    return {
      x: (x-(width / 2))*30
    , y: z*15
    , z: (y-(depth / 2))*30
    }
  }
}
