module.exports = ( grunt, options ) ->
  default:
    options:
      style: 'expanded'
    files:
      'css/fixie.css': 'scss/fixie.scss'
