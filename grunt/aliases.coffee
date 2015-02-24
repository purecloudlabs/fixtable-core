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
    'clean'
    'buildCSS'
    'buildJS'
  ]

  dist: [
    'clean'
    'distCSS'
    'distJS'
  ]





  buildCSS: [
    'copy:css'
    'autoprefixer'
  ]

  buildJS: [
    'coffee'
  ]





  distCSS: [
    'buildCSS'
    'cssmin'
  ]

  distJSS: [
    'buildJS'
    'uglify'
  ]
