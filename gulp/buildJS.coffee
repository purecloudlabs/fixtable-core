module.exports = module.exports = ( gulp, options, $ ) ->
  gulp.task 'buildJS', ->
    gulp.src './coffee/**/*.coffee'
    .pipe $.sourcemaps.init()
    .pipe $.coffee()
    .pipe $.sourcemaps.write '.'
    .pipe gulp.dest options.directories.output
