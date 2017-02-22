module.exports = ( grunt, options ) ->
  coffee:
    files: [
      'coffee/**/*.coffee'
    ]
    tasks: [
      'distJS'
    ]

  css:
    files: [
      'css/**/*.css'
    ]
    tasks: [
      'distCSS'
    ]
