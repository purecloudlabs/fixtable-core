module.exports = ( grunt, options ) ->
  options:
    sourceMap: true
    extDot: 'last'

  dev:
    options:
      sourceMap: true

  vanilla:
    files:
      'dist/fixie.js': ['coffee/fixie.coffee']
