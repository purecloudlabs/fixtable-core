module.exports = module.exports = ( gulp, options, $ ) ->
  gulp.task 'buildCSS', ->
    gulp.src './css/*.css'
    .pipe $.autoprefixer()
    .pipe gulp.dest options.directories.output
