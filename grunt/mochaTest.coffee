module.exports = ( grunt, options ) ->
  test:
    options:
      reporter: 'spec'
      require: 'coffee-script/register'
    src: ['test/**/*.coffee']
  coverage:
    options:
      reporter: 'html-cov'
      quiet: true
      require: 'coffee-script/register'
      captureFile: 'test/coverage.html'
    src: ['test/**/*.coffee']
