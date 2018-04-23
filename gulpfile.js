var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create(); 
var useref = require('gulp-useref');

var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');

var cssnano = require('gulp-cssnano');

// Optimize images
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

// To help delete files
var del = require('del');

// To enable the build task sequence
var runSequence = require('run-sequence');

// Set up default paths
var projectFolder = 'app',
    distFolder = 'dist';
var paths = {
  src: projectFolder,
  srcHTML: projectFolder + '/*.html',
  srcSCSS: projectFolder + '/scss/**/*.scss',
  srcJS: projectFolder + '/js/**/*.js',
  srcImages: projectFolder + '/images',
  srcFonts: projectFolder + '/fonts',
  distSrc: distFolder, // these files should go to deployment
  distImages: distFolder + '/images',
  distFonts: distFolder + '/fonts'
}

// compile sass
gulp.task('sass', function(){
  return gulp.src(paths.srcSCSS) // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest(paths.src + '/css'))
    .pipe(browserSync.reload({
        stream: true
    }));
});

// autoupdate browser
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: paths.src // for development
      //baseDir: paths.distSrc // for deployment
    },
  })
});

// combine browsersync and sass compilation
gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch(paths.srcSCSS, ['sass']); 
  // Other watchers

  // Reloads the browser whenever HTML or JS files change
  gulp.watch(paths.srcHTML, browserSync.reload); 
  gulp.watch(paths.srcJS, browserSync.reload); 
});

// To enhance 'watch' task even further. 'Default' naming means we only need to type 'gulp' to trigger this task
gulp.task('default', function (callback) {
  runSequence(['sass','browserSync', 'watch'],
    callback
  )
});

// minify js & css
gulp.task('useref', function(){
  return gulp.src(paths.srcHTML)
    .pipe(useref())
    // Minifies only if it's a JS file
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest(paths.distSrc))
});

// copy, optimize, cache images
gulp.task('images', function(){
  return gulp.src(paths.srcImages + '/**/*.+(png|jpg|gif|svg)')
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest(paths.distImages))
});

// copy fonts
gulp.task('fonts', function() {
  return gulp.src(paths.srcFonts + '/**/*')
  .pipe(gulp.dest(paths.distFonts))
});

// To clean up the distribution folder
gulp.task('clean:dist', function() {
  return del.sync(distFolder);
});

// Clear cache
gulp.task('cache:clear', function (callback) {
  return cache.clearAll(callback)
});

// Compile and build the project, preparing for deployment
gulp.task('build', function (callback) {
  runSequence('clean:dist', 
    ['sass', 'useref', 'images', 'fonts'],
    callback
  )
});

