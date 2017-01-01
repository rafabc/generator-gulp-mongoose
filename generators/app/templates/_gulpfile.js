var WEB_PORT = 3003;
var APP_DIR = 'app';


var del = require('del');
var gulp = require('gulp');
var jade = require('gulp-jade');
var open = require('gulp-open');
var browserSync = require('browser-sync').create();
var karmaServer = require ('karma').Server;
var paths = {
  images: 'assets/img/**/*',
  styles: 'assets/css/**/*',
  js: APP_DIR + '/*.js'
};


gulp.task('default', ['server']);

gulp.task('server', ['jade', 'images', 'styles', 'js' ], function() {
    browserSync.init({
        server: {
          baseDir: "dist"
        },
        defaultFile: "index.html",
        browserSync: true,
        port: WEB_PORT,
        open: "local"
    });
    gulp.src('dist/index.html')
        .pipe(open({app: 'chrome', uri: 'localhost:' + WEB_PORT}));
    gulp.watch(APP_DIR + "/**/*", ['jade-watch', 'js-watch']);
    gulp.watch("assets/**/*", ['jade-watch', 'styles-watch', 'images-watch']);
    gulp.watch("dist/**/*").on('change', browserSync.reload);
});


var jadeFn = function() {
  return gulp.src(APP_DIR + "/*.jade")
    .pipe(jade())
    .pipe(gulp.dest("dist/"))
    .pipe(browserSync.stream());
};

var stylesFn = function() {
  return gulp.src(paths.styles)
    .pipe(gulp.dest("dist/styles"))
    .pipe(browserSync.stream());
};

var imagesFn = function() {
   return gulp.src(paths.images)    
    .pipe(gulp.dest("dist/images"));
};


var jsFn = function() {
  return gulp.src(paths.js)
    .pipe(gulp.dest("dist/"))
    .pipe(browserSync.stream());
};

// Compile sass into CSS & auto-inject into browsers
gulp.task('jade', ['clean'], jadeFn);
gulp.task('jade-watch', jadeFn);

gulp.task('styles', ['clean'], stylesFn);
gulp.task('styles-watch', stylesFn);

gulp.task('images', ['clean'], imagesFn);
gulp.task('images-watch', imagesFn);

gulp.task('js', ['clean'], jsFn);
gulp.task('js-watch', jsFn);



gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(['dist']);
});


/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  new karmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  }, done).start();
});