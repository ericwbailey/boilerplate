// Task dependencies
var gulp        = require('gulp'),
    paths       = require('./paths.js'),
    autoprefix  = require('gulp-autoprefixer'),
    browsersync = require('browser-sync'),
    plumber     = require('gulp-plumber'),
    sass        = require('gulp-sass'),
    reportError = require('./report-error.js'),
    size        = require('gulp-filesize'),
    sourcemaps  = require('gulp-sourcemaps');


// [1] Compile Sass
// [2] Autoprefix properties
// [3] Add soucemaps
// [4] Refresh changes in the browser
gulp.task('buildStyles', function () {
    return gulp.src(paths.styles.src)
        .pipe(plumber({ errorHandler: reportError }))
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compact',
            errLogToConsole: true
        })) // [1]
        .pipe(autoprefix({
            browsers: ['last 2 versions']
        })) // [2]
        .pipe(size())
        .pipe(sourcemaps.write()) // [3]
        .pipe(gulp.dest(paths.styles.build))
        .pipe(browsersync.stream({ match: '**/*.css' })); // [4]
});


gulp.task('testStyles', function () {
    return gulp.src(paths.styles.src)
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefix({
            browsers: ['last 2 versions']
        }))
        .pipe(size())
        .pipe(gulp.dest(paths.styles.test));
});
