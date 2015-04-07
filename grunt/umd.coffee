module.exports = ( grunt, options ) ->
  fixtable:
    options:
      amdModuleId: 'fixtable'
      objectToExport: 'Fixtable'
      src: 'dist/fixtable.js'
      dest: 'dist/fixtable.js'
