var gulp = require('gulp')
var load = require('gulp-load-plugins')();
var browser = require('browser-sync').create();

gulp.task('html',function(done){
	gulp.src('./str/*.html')
	.pipe(load.minifyHtml())
	.pipe(gulp.dest('./dist/'))
	done()
})
gulp.task('sass',function(done){
    gulp.src('./str/sass/*.scss')
    .pipe(load.sass())
    .pipe(gulp.dest('./dist/css'))
    done()
})
gulp.task('css',function(done){
    gulp.src('./str/css/**')
    .pipe(gulp.dest('./dist/css'))
    done()
})
gulp.task('img',function(done){
    gulp.src('./str/img/**')
    .pipe(gulp.dest('./dist/img'))
    done()
})
gulp.task('js',function(done){
	gulp.src('./str/js/**')
    .pipe(gulp.dest('./dist/js'))
    done()
})


gulp.task('server',gulp.series(gulp.parallel('html',"img",'sass','css','js'),function(done){
	browser.init({
		server:'./dist/',
		port:81
	})
	gulp.watch('./str/',gulp.series(gulp.parallel('html',"img",'sass','css','js'),function(done){
		browser.reload()
		done()
	}))
	done()
}))