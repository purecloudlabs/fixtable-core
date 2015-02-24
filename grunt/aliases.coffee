module.exports =
  default: [
    'server'
  ]

  server: [
    'build'
    'apiServer'
    'applicationServer'
  ]

  build: [
    'clean'
    'coffee'
    'sass'
    'autoprefixer'
  ]

  applicationServer: [
    'connect:development'
    'notify:server_started'
    'watch'
    'notify:server_stopped'
  ]

  apiServer: [
    'shell:mongo'
    'shell:api'
  ]

  production: [
    'build'
    'apiServer'
    'connect:production'
  ]
