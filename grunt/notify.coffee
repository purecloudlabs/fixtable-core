module.exports = ( grunt, options ) ->
  server_started:
    options:
      message: 'server started'

  server_stopped:
    options:
      message: 'server stopped'

  coffee:
    options:
      message: 'coffeescript compiled'

  sass:
    options:
      message: 'sass compiled'
