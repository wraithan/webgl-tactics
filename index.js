var THREE = require('three')
  , tile = require('./lib/tile')
  , fps = require('./lib/fps')
  , generator = require('./lib/map-generator')
  , loader = require('./lib/map-loader')

window.onload = function() {
  var WIDTH = 400
    , HEIGHT = 300
    , container = document.getElementById('container')
    , renderer = new THREE.WebGLRenderer()
    , camera = new THREE.OrthographicCamera(WIDTH/-2, WIDTH/2,
                                            HEIGHT/2, HEIGHT/-2)
    , scene = new THREE.Scene()
    , fpsElement = document.getElementById('fps')
    , trackFps = fps(function(FPS) {
      fpsElement.textContent = 'FPS: ' + FPS
    })

  scene.add(camera)

  camera.position.x = 0
  camera.position.y = 165
  camera.position.z = 330

  renderer.setSize(WIDTH, HEIGHT)

  container.appendChild(renderer.domElement)

  var map = generator(10, 9, 5)
  loader(scene, map)

  var pointLight = new THREE.PointLight(0xFFFFFF, 0.5)

  pointLight.position.x = 200
  pointLight.position.y = 100
  pointLight.position.z = 200

  scene.add(pointLight)

  var ambientLight = new THREE.AmbientLight(0x505050)

  scene.add(ambientLight)

  var theta = 0.01
  setInterval(function() {
    var x = camera.position.x
      , z = camera.position.z

    camera.position.x = x * Math.cos(theta) + z * Math.sin(theta)
    camera.position.z = z * Math.cos(theta) - x * Math.sin(theta)
    camera.lookAt({x: 0, y: 0, z: 0})
  }, 1000/60)

  ;(function animloop(time) {
    window.requestAnimationFrame(animloop)
    renderer.render(scene, camera)
    trackFps(time)
  })()
}