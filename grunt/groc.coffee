module.exports = ( grunt, options ) ->
  javascript: [
    'coffee/**/*.coffee'
    'README.md'
  ]
  options:
    'out': 'doc/'
