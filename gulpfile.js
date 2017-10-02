const gulp = require('gulp');
const webpack = require('webpack');
const gutil = require('gulp-util');
const electronWebpackConfig = require('./webpack.config.electron');
const rendererWebpackConfig = require('./webpack.config');

const electron = require('electron-connect').server.create();

gulp.task('kill', () => electron.killProcess());

gulp.task('restart', () => electron.restart());

gulp.task('reload-page', () => electron.reload());

gulp.task('start:devwatch', () => {
  electron.start();
  gulp.watch(['./src/app/**/**/*.js'], ['kill', 'restart']);
  gulp.watch(['./src/app/index.html'], ['reload-page']);
});

gulp.task('build:renderer', () => {
  webpack(rendererWebpackConfig, (error, stats) => {
    if (error) throw new gutil.PluginError('webpack:renderer', error);
    gutil.log('[webpack:renderer]', stats.toString({ colors: true }));
  });
});

gulp.task('build:app', () => {
  webpack(electronWebpackConfig, (error, stats) => {
    if (error) throw new gutil.PluginError('webpack:app', error);
    gutil.log('[webpack:app]', stats.toString({ colors: true }));
  });
});

gulp.task('build', ['build:renderer', 'build:app']);
