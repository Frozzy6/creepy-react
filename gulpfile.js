const gulp = require('gulp');
const chalk = require('chalk');
const sass = require('gulp-sass');
const rename = require('gulp-rename');

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

gulp.task('styles:watch', ['styles'], () => {
  gulp.watch('app/sass/**', ['styles']);
});

gulp.task('default', () => {
  console.log(chalk.yellow('For build use:'));
  console.log(chalk.yellow('gulp styles'));
  console.log(chalk.yellow('gulp watch-styles'));
  console.log(chalk.yellow('gulp styles-desktop'));
  console.log(chalk.yellow('gulp styles-mobile'));
});
