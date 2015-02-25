module.exports = module.exports = ( gulp, options, $ ) ->
  gulp.task 'distJS', ['buildJS'], ->
    gulp.src options.directories.output + '/fixtable.js'
    .pipe $.rename suffix: '.min'
    .pipe $.uglify()
    .pipe gulp.dest options.directories.output
