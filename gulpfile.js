var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create(); 

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