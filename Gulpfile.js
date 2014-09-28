var gulp = require('gulp');
var connect = require('gulp-connect');
var historyApiFallback = require('connect-history-api-fallback');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var path = require('path');
var jshint = require('gulp-jshint'), stylish = require('jshint-stylish');
var inject = require('gulp-inject');
var wiredep = require('wiredep').stream;


// Search folders styles and javascript files we created to inject the index.html
gulp.task('inject', function() {
	var sources = gulp.src(['./app/js/**/*.js','./app/css/**/*.css']);
	return gulp.src('index.html', {cwd: './app'})
	.pipe(inject(sources, {
		read: false,
		ignorePath: '/app'
	}))
	.pipe(gulp.dest('./app'));
});


// Inject the libraries installed via Bower
gulp.task('wiredep', function () {
	gulp.src('./app/index.html')
	.pipe(wiredep({
		directory: './app/lib'
	}))
	.pipe(gulp.dest('./app'));
});


// Web development server
gulp.task('server', function() {
	connect.server({
		root: './app',
		hostname: '0.0.0.0',
		port: 8080,
		livereload: true,
		middleware: function(connect, opt) {
			return [ historyApiFallback ];
		}
	});
})


// Find errors in JS and prints them
gulp.task('jshint', function() { 
	return gulp.src('./app/js/*.js')
	.pipe(jshint('.jshintrc')) .pipe(jshint.reporter('jshint-stylish'))
	.pipe(jshint.reporter('fail')); 
});



// Less CSS files to preprocess and recharge changes
gulp.task('less', function () {
  gulp.src('./app/less/bootstrap.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(autoprefixer({
        browsers: ['> 1%', 'last 2 versions', 'Firefox <= 20', 'ie 8', 'ios 7'],
        cascade: false
    }))
    .pipe(gulp.dest('./app/css'))
    .pipe(connect.reload());
});


// Reload the browser when there are changes in the HTML
gulp.task('html', function() {
	gulp.src('./app/**/*.html')
	.pipe(connect.reload());
});

// Watch changes produced in the code and launch tasks related
gulp.task('watch', function() {
	gulp.watch(['./app/**/*.html'], ['html']);
	gulp.watch(['./app/less/*.less'], ['less']);
	gulp.watch(['./app/js/*.js'], ['jshint']);
	gulp.watch(['./app/less/**/*.less'], ['less', 'inject']);
	gulp.watch(['./app/js/**/*.js', './Gulpfile.js'], ['jshint', 'inject']);
	gulp.watch(['./bower.json'], ['wiredep']);
});

gulp.task('default', ['server', 'inject', 'wiredep', 'watch']);