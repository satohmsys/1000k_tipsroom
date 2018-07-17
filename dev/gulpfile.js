var gulp = require( 'gulp' );

//////////////////////////////////////////////////////
var browserSync = require( 'browser-sync' );
var autoprefixer = require( 'gulp-autoprefixer' );
var sass = require( 'gulp-ruby-sass' );
// var uglify = require('gulp-uglify');
var plumber = require( 'gulp-plumber' );
var notify = require( 'gulp-notify' );
var imagemin = require( 'gulp-imagemin' );
var imagemin_png = require( 'imagemin-pngquant' );
var ejs = require( 'gulp-ejs' ); //EJS
var rename = require( 'gulp-rename' );
// var prettify = require( 'gulp-prettify' );
var csscomb = require( 'gulp-csscomb' );
var cssmin = require('gulp-cssnano');
//////////////////////////////////////////////////////

var dir = {
  top: '../dist',
  below: '/',
  index: 'index.html',
  ejsEdit: ''
},
  sassDir = {
    css: 'css',
    sass: 'scss',
    dir: ''
  },
  ejsDir = {
    template: '_ejs/'+ dir.ejsEdit +'*' + '.ejs',//[ ejs ] 更新対象ejsのファイル
    rename: 'index.html'// [ ejs ] .ejs→htmlリネーム
  }


/**
* browser sync setting
*/
gulp.task('browserSync' , function(){
  browserSync({
    notify : true ,
    server: dir.top
    // files: ["./**/*.ejs"], //ウォッチ対象のファイル
    // proxy: 'localhost'
  });
});
gulp.task('browserSyncReload' , function(){
  browserSync.reload();
})



/**
* sass compile setting
* 
* scss/ディレクトリのscssをコンパイルする
* 
* @see gulp-ruby-sass sass
* @see gulp-autoprefixer
* @see gulp-plumber
* @return .scssファイル
*/
gulp.task('sass' , function(){

  return sass( dir.top + `/**/${sassDir.sass}/*.scss` , {
    compass : false,
    style : 'nested'
  })
  .pipe(autoprefixer({
    browsers: ['last 4 versions', '> 2%', 'ie > 10', 'iOS >= 9', 'Android >= 6']
  }))
  .pipe(csscomb()) 
  .pipe(plumber({
    errorHandler : notify.onError('<%= error.message %>') //gulp notify エラーメッセージ
  }))
  .pipe(rename(function(path){
    path.dirname = path.dirname.replace( sassDir.sass, sassDir.css); // scss→cssに 
    console.log('COMPILE→ ', path);
  })) 
  .pipe(gulp.dest( dir.top ))
  .pipe( cssmin() )
  .pipe( rename( function( path ){
    path.dirname = path.dirname.replace( sassDir.sass, sassDir.css );
    path.basename += '.min'; 
  }))
  .pipe(gulp.dest( dir.top ));

});
gulp.task('sassCompileReload' , ['sass'] , function(){
  browserSync.reload();
});



/**
* 画像圧縮
* pngquant
* @link https://www.npmjs.com/package/imagemin-pngquant
* @link http://blog.tsumikiinc.com/article/20150226_gulp-imagemin.html
* @link http://cly7796.net/wp/javascript/try-to-install-various-useful-plugins-gulpjs/
*/

gulp.task( 'imagemin', function(){
  gulp.src( dir.top + '/**/st/**/img/*.png' )
  .pipe( imagemin( {
    progressive: true,
    use: [ imagemin_png( {
      quality: '30-50',
      speed: 1
    } ) ]
  } ) )
  .pipe( imagemin())
  .pipe( gulp.dest( dir.top + '/min/img/') );
} );


/**
* ejs
* HTMLを生成するテンプレートエンジン「EJS」
* 
* @link http://qiita.com/yuichiroharai/items/63b0769bc8ebe0220018
* @see fs JSONファイルの読み込み 
* @param $readJson str 変数を設定したjson 
* @param ejs.template str テンプレートファイル 
*/
gulp.task("ejs", function(){
     gulp.src(
      ejsDir.template
    )
    .pipe(ejs(/*{}, {ext: '.html'}*/))
    .pipe( rename({
      extname: '.html'      
    }) )
    .pipe(plumber())
    .pipe(gulp.dest(dir.top + dir.below + dir.ejsEdit));
});
gulp.task('ejsWatch', ['browserSync'], function(){
  gulp.watch('_ejs/**/*.ejs', ['ejs','browserSyncReload']);
})



/**
* html整形
* .ejsでテンプレートを読み込んだ場合に乱れた構造を一括整形
*/
gulp.task('prettify', function() {
  gulp.src( dir.top + dir.below + '**/*.html')
    .pipe( prettify({
      indent_size: 3
    }) )
    .pipe(gulp.dest( dir.top + dir.below ))
});



/**
* default tasks
*/
gulp.task('default' ,['browserSync'], function(){
  gulp.watch('_ejs/**/*.ejs', ['ejs', 'browserSyncReload']);
  gulp.watch( [dir.top + `/**/${sassDir.sass}/*.scss`, dir.top +`/**/_scss/*.scss`, dir.top +`/**/sass/*.scss`], ['sassCompileReload']);
  gulp.watch( [dir.top + '/**/*.html',dir.top + '/**/*.php' ] , ['browserSyncReload']);
});