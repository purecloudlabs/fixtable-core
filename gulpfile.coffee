# Build options
options =
  directories:
    coffee: './coffee'
    css: './css'
    output: './dist'





# Load dependencies
gulp = require 'gulp'
$ = require('gulp-load-plugins')()





# Load tasks
require( './gulp/buildCSS' )( gulp, options, $ )
require( './gulp/buildJS' )( gulp, options, $ )
require( './gulp/distJS' )( gulp, options, $ )
require( './gulp/distCSS' )( gulp, options, $ )





# Run tasks
gulp.task 'dev', ['buildJS', 'buildCSS']

gulp.task 'dist', ['distJS', 'distCSS']

gulp.task 'default', ['dist']
