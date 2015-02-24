module.exports = ( grunt, options ) ->
  coffee:
    files: [
      'coffee/**/*.coffee'
    ]
    tasks: [
      'buildJS'
    ]

  sass:
    files: [
      'scss/**/*.scss'
    ]
    tasks: [
      'buildCSS'
    ]
