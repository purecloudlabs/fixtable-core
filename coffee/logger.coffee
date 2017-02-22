class Logger

  constructor: (debugMode = false, prefix = []) ->
    @debugMode = debugMode
    @prefix = if prefix instanceof Array then prefix else [prefix]

  log: ->
    if @debugMode
      console.log.apply console, Array::concat.apply @prefix, arguments

module.exports = Logger
