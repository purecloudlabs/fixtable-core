module.exports =
  default: [
    'dist'
  ]

  dist: [
    'clean'
    'buildCSS'
    'buildJS'
  ]

  buildCSS: [
    'sass'
    'autoprefixer'
    'cssmin'
  ]

  buildJS: [
    'coffee'
    'uglify'
  ]
