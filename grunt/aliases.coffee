module.exports =
  default: [
    'dist'
  ]





  test: [
    'mochaTest:test'
  ]

  docs: [
    'groc'
    'mochaTest:coverage'
  ]





  dev: [
    'clean:dist'
    'buildCSS'
    'buildJS'
  ]

  dist: [
    'clean:dist'
    'distCSS'
    'distJS'
  ]





  buildCSS: [
    'copy:css'
    'autoprefixer'
  ]

  buildJS: [
    'coffee'
    'webpack'
    'clean:temp'
  ]





  distCSS: [
    'buildCSS'
    'cssmin'
  ]

  distJS: [
    'buildJS'
    'uglify'
  ]
