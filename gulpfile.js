var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var htmlReplace = require('gulp-html-replace');
var pkg = require('./package.json');

var filename = pkg.name + '-' + pkg.version;

gulp.task('sass', function () {
    gulp.src('dist/css/*')
        .pipe(clean());

    gulp.src('src/sass/*.scss')
        .pipe(sass())
        .pipe(concat(filename + '.min.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('default', ['sass'], function () {
    gulp.watch('src/sass/**/*.scss', ['sass']);
});

gulp.task('publish', ['sass'], function () {
    gulp.src('dist/js/*')
        .pipe(clean());
    gulp.src('dist/assets/img/*')
        .pipe(clean());
    gulp.src('dist/fonts/bootstrap/*')
        .pipe(clean());

    gulp.src('src/**/*.tpl.html')
        .pipe(gulp.dest('dist/'));
    gulp.src('src/assets/**/*')
        .pipe(gulp.dest('dist/assets/'));

    gulp.src('vendor/bootstrap-sass/assets/fonts/**/*')
        .pipe(gulp.dest('dist/fonts/'));

    gulp.src([
        'vendor/angular/angular.js',
        'vendor/angular-ui-router/release/angular-ui-router.js',
        'vendor/angular-local-storage/dist/angular-local-storage.js',
        'vendor/angular-animate/angular-animate.js',
        'vendor/angular-sanitize/angular-sanitize.js',
        'src/common/**/*.js',
        'src/app/**/*.js',
        'src/*.js'
    ]).pipe(concat(filename + '.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'));


    gulp.src('src/*.html')
        .pipe(htmlReplace({
            css: 'css/' + filename + '.min.css?' + new Date().getTime(),
            js: 'js/' + filename + '.min.js?' + new Date().getTime()
        })).pipe(gulp.dest('dist/'));
});