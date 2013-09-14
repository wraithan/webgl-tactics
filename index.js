var THREE = require('three')

window.onload = function() {
  var WIDTH = 400
    , HEIGHT = 300
    , container = document.getElementById('container')
    , fpsElement = document.getElementById('fps')
    , renderer = new THREE.WebGLRenderer()
    , camera = new THREE.OrthographicCamera(WIDTH/-2, WIDTH/2,
                                            HEIGHT/2, HEIGHT/-2)
    , scene = new THREE.Scene()

  scene.add(camera)

  camera.position.x = 0
  camera.position.y = 45
  camera.position.z = 100

  renderer.setSize(WIDTH, HEIGHT)

  container.appendChild(renderer.domElement)

  var cubeMaterial = new THREE.MeshLambertMaterial({
      color: 0x00FFFF
    , ambient: 0x00FFFF
    })
    , cube = new THREE.Mesh(new THREE.CubeGeometry(60, 30, 60),
                              cubeMaterial)

  scene.add(cube)

  var pointLight = new THREE.PointLight(0xFFFFFF, 1)

  pointLight.position.x = 60
  pointLight.position.y = 60
  pointLight.position.z = 60

  scene.add(pointLight)

  var ambientLight = new THREE.AmbientLight(0x505050)

  scene.add(ambientLight)

  var theta = 0.1
  setInterval(function() {
    var x = camera.position.x
      , z = camera.position.z

    camera.position.x = x * Math.cos(theta) + z * Math.sin(theta)
    camera.position.z = z * Math.cos(theta) - x * Math.sin(theta)
    camera.lookAt(cube.position)
  }, 1000/60)

  var frame = 0
    , sample = 0
  function trackFps(time) {
    var delta = time-sample
    frame++
    if (delta > 1000) {
      fpsElement.textContent = 'FPS: ' + (frame/(delta/1000)).toFixed(2)
      sample = time
      frame = 0
    }
  }

  ;(function animloop(time) {
    window.requestAnimationFrame(animloop)
    renderer.render(scene, camera)
    trackFps(time)
  })()
}