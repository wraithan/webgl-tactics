var THREE = require('three')
  , tile_lookup = require('./tile-types')

module.exports = tile

function tile(type) {
  var geo = new THREE.CubeGeometry(30, 15, 30)
    , mat = new THREE.MeshLambertMaterial({
        color: tile_lookup[type]
      , ambient: tile_lookup[type]
      })
  return new THREE.Mesh(geo, mat)
}

