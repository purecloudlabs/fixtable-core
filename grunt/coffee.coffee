module.exports = ( grunt, options ) ->
  options:
    sourceMap: true
    extDot: 'last'
    bare: true

  fixtable:
    files:
      'dist/fixtable.js': ['coffee/fixtable.coffee']
