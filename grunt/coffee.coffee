module.exports = ( grunt, options ) ->
  app:
    options:
      sourceMap: true
    expand: false
    cwd: 'coffee'
    src: '**/*.coffee'
    dest: 'dist'
    ext: '.js'
    extDot: 'last'
