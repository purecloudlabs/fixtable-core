module.exports = ( grunt, options ) ->
  build:
    entry: './temp/fixtable.js'
    output:
      path: './dist'
      filename: 'fixtable.js'
      library: 'Fixtable'
      libraryTarget: 'umd'
