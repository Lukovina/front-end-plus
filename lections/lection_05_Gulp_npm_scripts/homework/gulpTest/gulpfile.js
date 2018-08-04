let gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    browserSync = require('browser-sync')

gulp.task('sass', ()=>  
    gulp.src('app/sass/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.reload({stream: true}))
)

gulp.task('browserSync', ()=>
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    })
)

gulp.task('watch', ['sass', 'browserSync'], ()=>
    gulp.watch('app/sass/*.sass', ['sass']),
    gulp.watch('./app/*.html', browserSync.reload) 
)