module.exports = function fps(cb) {
  var frame = 0
    , sample = 0
  return function trackFps(time) {
    var delta = time-sample
    frame++
    if (delta > 1000) {
      cb((frame/(delta/1000)).toFixed(2))
      sample = time
      frame = 0
    }
  }
}