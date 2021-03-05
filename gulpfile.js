const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')
const prefix = require('gulp-autoprefixer')
const plumber = require('gulp-plumber')
const reload = browserSync.reload
const php = require('gulp-connect-php');

gulp.task('browser-sync', function () {
  php.server({}, function (){
    browserSync.init({
      proxy: '127.0.0.1:8000'
    });
  });
  
  gulp.watch('./*.html').on('change', reload)
  gulp.watch('./*.php').on('change', reload)
  gulp.watch('./includes/**/*.php').on('change', reload)
  gulp.watch('./js/*.js').on('change', reload)
  gulp.watch('./scss/**/*.scss', ['css'])
})

gulp.task('css', () => {
  return gulp.src('./scss/main.scss')
  .pipe(plumber([{errorHandler: false}]))
  .pipe(sass())
  .pipe(prefix())
  .pipe(gulp.dest('./css/'))
  .pipe(browserSync.stream())
})

gulp.task('default', ['browser-sync', 'css'])