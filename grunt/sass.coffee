module.exports = ( grunt, options ) ->
  dev:
    options:
      style: 'expanded'
    files:
      'css/fixie.css': 'scss/fixie.scss'
