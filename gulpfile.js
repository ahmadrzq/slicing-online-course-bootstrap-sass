// List dependencies
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const terser = require('gulp-terser');

// Create Functions

// SCSS
function compileScss() {
    return src('dev/scss/**/*.scss')
        .pipe(sass())
        .pipe(prefix('last 2 versions'))
        .pipe(minify())
        .pipe(dest('dist/css'))
}

// JS
function jsmin() {
    return src('dev/script/*.js')
        .pipe(terser())
        .pipe(dest('dist/script'))
}

// Create Watchtask
function watchtask() {
    watch(['dev/scss/**/*.scss'], compileScss);
    watch('dev/script/*.js', jsmin);
}

// Default gulp
exports.default = series(
    compileScss,
    jsmin,
    watchtask
);