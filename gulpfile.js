var gulp         = require('gulp'),
	sass         = require('gulp-sass')
	uglify       = require("gulp-uglify"),
	autoprefixer = require("gulp-autoprefixer"),
	cleancss     = require("gulp-clean-css"),
	browserSync  = require("browser-sync"),
	concat       = require("gulp-concat"),
	imagemin     = require("gulp-imagemin"),
	rename       = require("gulp-rename"),
	notify       = require("gulp-notify"),
	plumber      = require("gulp-plumber"),
	svgSprite    = require("gulp-svg-sprites")


// svg sprites
gulp.task('sprites', function () {
    return gulp.src('source/svg-icons/*.svg')
        .pipe(svgSprite({
        	mode: "symbols",
        	baseSize: 40
        }))
        .pipe(gulp.dest("source/img/icons/"));
});


// compiling sass in css
gulp.task("sass", function(){
	return gulp.src('source/sass/main.sass')
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(sass().on("error",sass.logError))
		.pipe(autoprefixer(["last 15 version", "> 1%", "ie 8", "ie 7"]))
		// .pipe(cleancss())
		.pipe(rename({suffix: ".min"}))
		.pipe(gulp.dest("source/css"))
		.pipe(browserSync.stream());
});

// concat and uglify all js libraries
gulp.task("scripts", function(){
	return gulp.src([
		"node_modules/jquery/dist/jquery.min.js",
		"node_modules/smoothscroll-for-websites/SmoothScroll.js"
		])

	.pipe(concat("libs.min.js"))
	.pipe(uglify())
	.pipe(gulp.dest("source/js"));	
})

// image optimization
gulp.task("img", function(){
	return gulp.src("source/img/**/*")
		.pipe(imagemin({
			interlaced: true,
			progressive: true,
			optimizationLevel: 5,
			svgoPlugins: [{removeViewBox: true}]
		}))
		.pipe(gulp.dest("build/img"));
});

// server
gulp.task('serve', ["sass", "scripts"], function() {

	browserSync.init({
		server: "source"
	});

	gulp.watch("source/sass/main.sass", ['sass']);
	gulp.watch("source/*.html").on('change', browserSync.reload);
	gulp.watch("source/js/*.js").on('change', browserSync.reload);
});

// create a production version of the template
gulp.task("build", [ "img", "sass", "scripts"], function(){
	var buildCss = gulp.src([
			"source/css/main.min.css"
		])
	.pipe(gulp.dest("build/css"));

	var buildFonts = gulp.src("source/fonts/**/*")
		.pipe(gulp.dest("build/fonts"));

	var buildJs = gulp.src("source/js/**/*")
	.pipe(gulp.dest("build/js"));

	var buildHtml = gulp.src("source/*.html")
		.pipe(gulp.dest("build"));	
});

gulp.task('default', ['serve']);



