const gulp = require('gulp');
const chalk = require('chalk');
const webpack = require('webpack');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const webpackConfig = require('./webpack.config');

gulp.task('apply-prod-environment', () => {
  process.env.NODE_ENV = 'production';
});

gulp.task('apply-dev-environment', () => {
  process.env.NODE_ENV = 'development';
});

gulp.task('webpack', (callback) => {
  webpack(webpackConfig, callback);
});

gulp.task('build-prod', ['apply-prod-environment'], () => {
  gulp.start('webpack');
  gulp.start('styles');
});

gulp.task('build-dev', ['apply-dev-environment'], () => {
  gulp.start('webpack');
  gulp.start('styles');
});

const styleBuilder = (folder, outName) =>
  gulp.src(`./app/sass/${folder}/App.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(rename(outName))
    .pipe(gulp.dest('./public/stylesheets'));

gulp.task('styles-desktop', () => styleBuilder('desktop', 'main.css'));

gulp.task('styles-mobile', () => styleBuilder('mobile', 'mobile.css'));

gulp.task('styles', () => {
  gulp.start('styles-desktop');
  gulp.start('styles-mobile');
});

gulp.task('watch-styles', ['styles'], () => {
  gulp.watch('app/sass/**', ['styles']);
});

gulp.task('default', () => {
  console.log(chalk.yellow('For build use:'));
  console.log(chalk.yellow('gulp build-dev'));
  console.log(chalk.yellow('gulp build-prod'));
});
