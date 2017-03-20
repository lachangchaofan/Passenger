var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    source      = require('vinyl-source-stream'),
    del         = require('del'),
    exorcist    = require('exorcist'),
    buffer      = require('vinyl-buffer'),
    uglify      = require('gulp-uglify'),
    htmlmin     = require('gulp-htmlmin'),
    pngquant    = require('imagemin-pngquant'),
    cleanCSS    = require('gulp-clean-css'),
    sourcemaps  = require('gulp-sourcemaps'),
    watchify    = require('watchify'),
    imagemin    = require('gulp-imagemin'),
    browserify  = require('browserify'),
    gulpif      = require('gulp-if'),
    browserSync = require('browser-sync').create();

var config = {
  //DEV 不压缩图片 节省时间
  env : 'DEV',
  src : './',
  dist : '../src/main/resources/static'
}
//清理dist 和 tmp 文件夹 为构建新的发布文件做清理工作
gulp.task('clean', () => {
  var deleteArrs = [config.dist + '/{index.html,index.js,css,js,resources}'];
  return del(deleteArrs,{force:true});
});
//压缩html
gulp.task('testHtmlmin',()=>{
  var options = {
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeEmptyAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    minifyJS: true,
    minifyCSS: true
  };
  gulp.src('index.html')
    .pipe(htmlmin(options))
    .pipe(gulp.dest(config.dist));
});
//压缩css
gulp.task('minify-css',() =>{
  return gulp.src('css/**',{base:'./'})
    .pipe(sourcemaps.init())
    .pipe(gulpif(config.env != 'DEBUG',cleanCSS()))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dist))
    .pipe(browserSync.stream());
});

//压缩图片
gulp.task('minify-image',() => {
  return gulp.src('resources/**/*.{png,jpg,gif,ico}',{base:'./'})
    .pipe(gulpif(config.env == 'PRO',imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    })))
    .pipe(gulp.dest(config.dist))
    .pipe(browserSync.stream());
});

/**
 * Gulp task alias
 */
//browserfiy相关配置
var browserfiyConfig = {
  entries:['index.js'],
  debug:true
};

//使用watchify 加速 browserify 的编译速度
var b = watchify(browserify(Object.assign({}, watchify.args, browserfiyConfig)));
b = b.transform('require-globify');
gulp.task('browserify-watch', task_browserify_watch);
b.on('update', task_browserify_watch); // 当任何依赖发生改变的时候，运行打包工具
b.on('log', gutil.log); // 输出编译日志到终端

//使用 browserify 处理 js文件
function task_browserify_watch(){
  return deal_browserify(b);
}

gulp.task('browserify', function () {
  return deal_browserify(browserify(browserfiyConfig).transform('require-globify'));
});

function deal_browserify(b) {
  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(gulpif(config.env != 'DEBUG',uglify()))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dist))
    .pipe(browserSync.stream())
}

/**
 * First bundle, then serve from the ./app directory
 */
gulp.task('default', ['browserify-watch','minify-css','minify-image','testHtmlmin'], function () {
  browserSync.init({
    server: config.dist
  });
  gulp.watch(['css/**'],['minify-css']);
  gulp.watch(['resources/**'],['minify-image']);
  gulp.watch(['index.html']).on('change', browserSync.reload);
});
gulp.task('build',['browserify','minify-css','minify-image','testHtmlmin']);

