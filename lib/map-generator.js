module.exports = generator

function generator(width, depth, max_height) {
  var map = []
  for (var z = 0; z < max_height; ++z) {
    for (var y = 0; y < depth; ++y) {
      for (var x = 0; x < width; ++x) {
        var tile = Math.floor(Math.random()*2)
        if (z === 0) {
          map.push(1)
        } else {
          var under = position(x,y,z-1)
          if (map[under] === 0 || map[under] === 2) {
            map.push(0)
          } else if (map[under] === 1) {
            if (tile === 0) {
              map[under] = 2
              map.push(tile)
            } else if (tile === 1 && z === max_height-1) {
              map.push(2)
            } else {
              map.push(tile)
            }
          }
        }
      }
    }
  }
  return {
    dimensions: [width, depth, max_height]
  , tiles: map
  }
  function position(x, y, z) {
    return ((width * depth) * z) + (y * width) + x
  }
}

if (module.id === '.') {
  var width = 9
    , depth = 9
    , height = 5
    , map = generator(width, depth, height)
    , idx = 0
    , str = ''
  for (var z = 0; z < height; ++z) {
    str += z + '\n'
    for (var y = 0; y < depth; ++y) {
      for (var x = 0; x < width; ++x, ++idx) {
        str += map.tiles[idx]
      }
      str += '\n'
    }
    str += '\n'
  }
  console.log(str)
}

