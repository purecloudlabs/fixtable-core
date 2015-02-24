module.exports = ( grunt, options ) ->
  app:
    options:
      bare: true
      sourceMap: true
    expand: true
    cwd: 'coffee'
    src: '**/*.coffee'
    dest: 'js'
    ext: '.js'
    extDot: 'last'
