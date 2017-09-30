const gulp = require('gulp');

const electron = require('electron-connect').server.create();

gulp.task('kill', () => electron.killProcess());

gulp.task('restart', () => electron.restart());

gulp.task('reload-page', () => electron.reload());

gulp.task('start:devwatch', () => {
  electron.start();
  gulp.watch(['./src/app/**/**/*.js'], ['kill', 'restart']);
  gulp.watch(['./src/app/index.html'], ['reload-page']);
});
