module.exports = ( grunt, options ) ->
  options:
    spawn: true
    interrupt: true

  coffee:
    files: [
      'coffee/**/*.coffee'
    ]
    tasks: [
      'coffee'
    ]

  sass:
    files: [
      'scss/**/*.scss'
    ]
    tasks: [
      'sass'
      'autoprefixer'
    ]
