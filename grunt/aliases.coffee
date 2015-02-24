module.exports =
  default: [
    'dist'
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
