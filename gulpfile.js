
'use strict';

var gulp = require('gulp'),
    sass = require("gulp-sass"),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-cssmin'),
    jslint = require('gulp-jslint'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync'),
    plumber = require('gulp-plumber'),
    size = require('gulp-size'),
    notify = require('gulp-notify'),
    uglify = require('gulp-uglify')
    ;


gulp.task('styles', function () {
    return gulp.src('scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer(
            ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1',
                'ios 6', 'android 4']
        ))
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(size())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream())
        .pipe(notify({
            message: '[styles, complete]'
        }));
});

gulp.task('styles-min', function () {
    return gulp.src('scss/**/*.scss')
    	.pipe(autoprefixer(
            ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1',
                'ios 6', 'android 4']
        ))
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(size())
        .pipe(gulp.dest('css'))
        .pipe(notify({message: '[styles-min, OK]'}));
});

gulp.task('scripts', function () {
    return gulp.src('js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(jshint())
        .pipe(jshint.reporter("default"))
        .pipe(sourcemaps.write())
        .pipe(size())
        .pipe(gulp.dest('js'))
        .pipe(browserSync.stream())
        .pipe(notify({
            message: '[scripts, complete]'
        }))
});


gulp.task('scripts-min', function () {
    return gulp.src('js/**/*.js')
        .pipe(uglify({
            mangle: true,
            compress: true,
            preserveComments: false
        })).on('error', sass.logError)
        .pipe(gulp.dest('js'))
        .pipe(size())
        .pipe(notify({
            message: '[scripts-min, OK]'
        }))
});


gulp.task('browser-sync', function () {
    browserSync.init({
        proxy: "http://modusversus.loc"
    });
});

gulp.task("ugl", [
    'styles-min', 'scripts-min'
]);

gulp.task('dev', function () {
    // Watch .scss files
    gulp.watch('scss/**/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('js/**/*.js').on('change', browserSync.reload);

    // Watch custom theme files
    gulp.watch("**/*.html").on('change', browserSync.reload);

});

gulp.task('default', function () {
    gulp.start("browser-sync", "dev");
});