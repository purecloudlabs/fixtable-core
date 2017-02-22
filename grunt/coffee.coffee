module.exports = (grunt, options) ->
  fixtable:
    expand: true
    flatten: false
    cwd: 'coffee/'
    src: ['**/*.coffee']
    dest: 'temp'
    ext: '.js'
