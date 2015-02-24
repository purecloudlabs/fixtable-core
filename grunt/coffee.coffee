module.exports = ( grunt, options ) ->
  dev:
    options:
      sourceMap: true
    expand: false
    cwd: 'coffee'
    src: '**/*.coffee'
    dest: 'dist'
    ext: '.js'
    extDot: 'last'
