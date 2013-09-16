module.exports = function fps(cb) {
  var frame = 0
    , sample = 0
  return function trackFps() {
    var now = Date.now()
      , delta = now-sample
    frame++
    if (delta > 1000) {
      cb((frame/(delta/1000)).toFixed(2))
      sample = now
      frame = 0
    }
  }
}