var gulp = require('gulp');

var ts = require('gulp-typescript');
var merge = require('merge2');
const mocha = require('gulp-mocha');

gulp.task('op:clean', function () {
});

gulp.task('ts:compile', function () {
    var tsResult = gulp.src(['ts/**/*.ts', 'typings/**/*.ts'])
            .pipe(ts({
                declaration: true,
                noExternalResolve: true
            }));

    return merge([
		tsResult.js.pipe(gulp.dest('dist'))
    ]);
});

gulp.task('build', ['op:clean', 'ts:compile'], function() {
    gulp.watch(['ts/**/*.ts'], ['op:clean', 'ts:compile']);
});
 
gulp.task('default', () => 
    gulp.src('./test/*.js')
        .pipe(mocha())
        .once('error', () => {
            process.exit(1);
        })
        .once('end', () => {
            process.exit();
        })
);