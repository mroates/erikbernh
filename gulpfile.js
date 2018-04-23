var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create(); 
var useref = require('gulp-useref');

// Other requires...
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');

var cssnano = require('gulp-cssnano');


var projectFolder = 'app';
var paths = {
  src: projectFolder,
  srcHTML: projectFolder + '/*.html',
  srcSCSS: projectFolder + '/scss/**/*.scss',
  srcJS: projectFolder + '/js/**/*.js'
}


gulp.task('sass', function(){
  return gulp.src(paths.srcSCSS) // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest(paths.src + '/css'))
    .pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch(paths.srcSCSS, ['sass']); 
  // Other watchers

  // Reloads the browser whenever HTML or JS files change
  gulp.watch(paths.srcHTML, browserSync.reload); 
  gulp.watch(paths.srcJS, browserSync.reload); 
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: paths.src
    },
  })
});

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    // Minifies only if it's a JS file
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});