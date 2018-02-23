const gulp = require('gulp');
const chalk = require('chalk');
const webpack = require('webpack');
const sass = require('gulp-sass');
const rename = require('gulp-rename');

gulp.task('apply-prod-environment', function() {
  process.env.NODE_ENV = 'production';
});

gulp.task('webpack', function (callback) {
  webpack(require('./webpack.config'), function () {
    callback();
  })
});

gulp.task('build-prod', ['apply-prod-environment'], function(){
  gulp.start('webpack');
  gulp.start('styles');
});

gulp.task('build-dev', function(){
  gulp.start('webpack');
  gulp.start('styles');
});

function styleBuilder( folder, outName ){
  return gulp.src('./app/sass/' + folder + '/App.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename(outName))
    .pipe(gulp.dest('./public/stylesheets'));
}

gulp.task('styles-desktop', function(){
  return styleBuilder('desktop', 'main.css');
});

gulp.task('styles-mobile', function(){
  return styleBuilder('mobile', 'mobile.css');
});

gulp.task('styles', function(){
  gulp.start('styles-desktop');
  gulp.start('styles-mobile');
});

gulp.task('watch-styles', ['styles'], function(){
  gulp.watch('app/sass/**', ['styles'] );
})


gulp.task('watch', ['build-dev'], function(){
  gulp.watch('app/**', ['build-dev']);
});

gulp.task('default', function(){
  console.log('For build use:\n');
  console.log('gulp build-dev');
  console.log('gulp build-prod');
})
