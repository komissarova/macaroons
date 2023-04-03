const gulp = require('gulp');
const less = require('gulp-less');
const path = require('path');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const concatCss = require('gulp-concat-css');
const { watch, series } = require('gulp');

 function defaultTask() {
       return gulp.src('./src/styles/*.less')
           .pipe(less({
                 paths: [path.join(__dirname, 'less', 'includes')]
           }))
           .pipe(concatCss('bundle.css'))
           .pipe(cssmin())
           .pipe(rename({suffix: '.min'}))
           .pipe(gulp.dest('./dist/'));
 }

exports.default= function () {
       watch('./src/styles/*.less', series(defaultTask));
}