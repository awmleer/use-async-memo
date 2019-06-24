const gulp = require('gulp')
const clean = require('gulp-clean')

function cleanLib() {
  return gulp.src('lib', {read: false, allowEmpty: true})
    .pipe(clean())
}

function copyFiles() {
  return gulp
    .src(['package.json', 'README.md', 'LICENSE'])
    .pipe(gulp.dest('lib/'))
}

exports.prebuild = gulp.series(cleanLib, copyFiles)
