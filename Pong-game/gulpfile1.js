var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('es6',()=>{
    return gulp.src('js/app.js')
    .pipe(babel({
        presets:['es2015']
    }))
    .pipe(gulp.dest('build'));
});