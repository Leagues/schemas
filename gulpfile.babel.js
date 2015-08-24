import gulp from 'gulp';
import mocha from 'gulp-mocha';

gulp.task('test', () => {
  return gulp.src('**/*.test.js', {read: false})
    // gulp-mocha needs filepaths so you can't have any plugins before it
    .pipe(mocha());
});

gulp.task('default', ['test']);
