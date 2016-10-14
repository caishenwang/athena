/**
 * @author zhujian@thinkerx.com
 */
'use strict';

var projectName = 'athena';

var htmlminConfig = {
    collapseWhitespace: true
};

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var templateCache = require('gulp-angular-templatecache');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var flatten = require('gulp-flatten');
var htmlmin = require('gulp-htmlmin');
var cleanCss = require('gulp-clean-css');
var sass = require('gulp-sass');
var del = require('del');
var browserSync = require('browser-sync').create();

var paths = {
    src: 'src',
    components: 'src/components', 
    demo: 'demo',
    dist: 'dist',
    js: [
        'src/js/' + projectName + '.js',
        'src/components/**/*.js'
    ],
    css: [
        'src/scss/' + projectName + '.scss',
        'src/components/**/*.scss'
    ],
    html: [
        'src/components/**/*.html'
    ]
};

gulp.task('watch', ['build'], function() {
    gulp.watch(paths.js, ['build:js']);
    gulp.watch(paths.css, ['build:css']);
    gulp.watch(paths.html, ['build:html', 'build:htmlcache']);
});

gulp.task('lint', function() {
    return gulp.src(paths.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// js task
gulp.task('build:js', ['lint'], function() {
    return gulp.src(paths.js)
        .pipe(concat(projectName + '.js'))
        .pipe(gulp.dest(paths.dist + '/js/'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.dist + '/js/'));
});

// css task
gulp.task('build:css', function() {
    return gulp.src([
            'src/scss/' + projectName + '.scss'
        ])
        .pipe(concat(projectName + '.css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.dist + '/css'))
        .pipe(cleanCss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.dist + '/css'));
});

// views task
gulp.task('build:html', function() {
    return gulp.src(paths.html)
        .pipe(flatten())
        .pipe(htmlmin(htmlminConfig))
        .pipe(gulp.dest(paths.dist + '/views'));
});

// views task
gulp.task('build:htmlcache', function() {
    return gulp.src(paths.html)
        .pipe(flatten())
        .pipe(htmlmin(htmlminConfig))
        .pipe(templateCache('templates.js', {
            module: projectName + '.templates'
        }))
        .pipe(gulp.dest(paths.dist + '/js'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.dist + '/js/'));
});

gulp.task('build', [
    'build:js',
    'build:css',
    // 'build:html'
    'build:htmlcache'
]);

gulp.task('debug', ['watch'], function () {
    browserSync.init({
        startPath: '/',
        server: {
            baseDir: paths.demo,
            routes: {
                '/dist': 'dist',
                '/views': 'dist/views'
            }
        }
        // files: [
        //     paths.dist + 'js/*.js',
        //     paths.dist + 'css/*.css',
        //     paths.dist + 'views/*.html'
        // ]
        // browser: 'google chrome',
    });

    gulp.watch([
        paths.dist + '/**/*',
        paths.demo + '/**/*'
    ]).on('change', browserSync.reload);
});

gulp.task('clean', function () {
    return del(paths.dist);
});

gulp.task('default', ['clean'], function() {
    gulp.start('build');
});
