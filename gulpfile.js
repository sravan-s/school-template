const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();


//Create scss files as per requirement inside first level of scss folder
//Keep partals inside 'partials folder'
gulp.task('compile-scss', () => {
    return gulp
            .src('src/scss/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('build/styles'))
            .pipe(browserSync.stream());
});

//Add presets as per requirement
gulp.task('compile-es6', () => {
    return gulp
            .src('src/scripts/*.js')
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(gulp.dest('build/scripts'))
            .pipe(browserSync.stream());
});

//Browsersync
gulp.task('serve', ['compile-scss', 'compile-es6'], () => {
    browserSync.init({
        server: './'
    });
    gulp.watch('src/scss/**/*.scss', ['compile-scss']);
    gulp.watch('src/scripts/**/*.js', ['compile-es6']);
    gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
