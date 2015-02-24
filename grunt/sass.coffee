module.exports = ( grunt, options ) ->
  dev:
    options:
      style: 'expanded'
    files:
      'css/app.css': 'scss/global.scss'
