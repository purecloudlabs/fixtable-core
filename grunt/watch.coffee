module.exports = ( grunt, options ) ->
  options:
    spawn: true
    interrupt: true

  coffee:
    files: [
      'coffee/**/*.coffee'
    ]
    tasks: [
      'newer:coffee'
      'notify:coffee'
    ]

  sass:
    files: [
      'scss/**/*.scss'
    ]
    tasks: [
      'sass'
      'autoprefixer'
      'notify:sass'
    ]
