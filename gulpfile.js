var gulp = require( 'gulp' );
var rename = require( 'gulp-rename' );
var sass = require( 'gulp-sass' );
var uglify = require( 'gulp-uglify' );
var autoprefixer = require ( 'gulp-autoprefixer' );
var sourcemaps = require ( 'gulp-sourcemaps' );
var browserSync = require( 'browser-sync' ).create();
var reload = browserSync.reload;

var htmlWatch = '**/*.html';

var styleSrc = './scss/main.scss';
var styleDist = './css/';
var styleWatch = './scss/**/*.scss';


gulp.task('browser-sync', function(){
	browserSync.init({
		server: {
			baseDir: "./",
			open: false,
			injectChanges: true
		}
	});
})

gulp.task('styles', function(){
	gulp.src( styleSrc )
	.pipe( sourcemaps.init() )
	.pipe( sass({
		errorLogToConsole:true,
		outputStyle: 'compressed'
	}) )
	.on( 'error', console.error.bind( console ) )
	.pipe( autoprefixer({
		browsers: ['last 4 versions'],
    cascade: false
		}) )
	.pipe( rename( { suffix: '.min' } ) )
	.pipe( sourcemaps.write( './' ))
	.pipe( gulp.dest( styleDist ) )
	.pipe( browserSync.stream() );
})

gulp.task( 'default', [ 'styles'] );

gulp.task( 'watch', [ 'default', 'browser-sync' ], function(){
	gulp.watch( styleWatch, ['styles'] );
	gulp.watch( htmlWatch, reload );
} )