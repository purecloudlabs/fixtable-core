module.exports = module.exports = ( gulp, options, $ ) ->
  gulp.task 'distCSS', ['buildCSS'], ->
    gulp.src options.directories.output + '/fixtable.css'
    .pipe $.rename suffix: '.min'
    .pipe $.cssCondense safe: true
    .pipe gulp.dest options.directories.output
