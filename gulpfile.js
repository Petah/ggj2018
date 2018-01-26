const gulp = require('gulp');
const expectFile = require('gulp-expect-file');
const sass = require('gulp-sass');

gulp.task('watch', ['default'], () => {
    gulp.watch('src/**', ['default']);
});

gulp.task('default', () => {

});
