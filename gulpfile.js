var gulp = require('gulp'), 
    sass = require('gulp-ruby-sass') ,
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

    config = {
        vendorsPath: './src/js/vendor',
        jsPath: './src/js/app',
        jsDest: './webapp/static/js',
         sassPath: './src/sass',
        cssPath: './src/css',
        cssDest: './webapp/static/css',
        bizCssDest: './webapp/business/static/css'
    }

gulp.task('vendors', function() {
    return gulp.src(config.vendorsPath + '/*.js')
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest(config.jsDest + '/vendor/'));
});

gulp.task('js', function() {
    return gulp.src(config.jsPath + '/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest(config.jsDest));
});

gulp.task('compress', function () {
    return gulp.src(config.jsDest + '/app.js')
        .pipe(uglify())
        .pipe(gulp.dest(config.jsDest));
});

gulp.task('sass', function() {
    return sass(config.sassPath + '/styles.scss', {
    		style: 'expanded',
            loadPath: [
                 './src/sass'
             ]
    	})
        .pipe(gulp.dest(config.cssPath));
});

gulp.task('bizsass', function() {
    return sass(config.sassPath + '/business.scss', {
            style: 'expanded',
            loadPath: [
                 './src/sass'
             ]
        })
        .pipe(gulp.dest(config.cssPath));
});

gulp.task('workforcesass', function() {
    return sass(config.sassPath + '/workforce.scss', {
            style: 'expanded',
            loadPath: [
                 './src/sass'
             ]
        })
        .pipe(gulp.dest(config.cssPath));
});

gulp.task('autoprefixer', function () {
    return gulp.src(config.cssPath + '/styles.css')
        .pipe(autoprefixer({
            browsers: [ 'last 3 version', 'safari 7', 'ie 9', 'ie 8', 'ios 7' ],
            cascade: false
        }))
        .pipe(gulp.dest(config.cssDest));
});

gulp.task('bizprefixer', function () {
    return gulp.src(config.cssPath + '/business.css')
        .pipe(autoprefixer({
            browsers: [ 'last 3 version', 'safari 7', 'ie 9', 'ie 8', 'ios 7' ],
            cascade: false
        }))
        .pipe(gulp.dest(config.bizCssDest));
});

gulp.task('workforceprefixer', function () {
    return gulp.src(config.cssPath + '/workforce.css')
        .pipe(autoprefixer({
            browsers: [ 'last 3 version', 'safari 7', 'ie 9', 'ie 8', 'ios 7' ],
            cascade: false
        }))
        .pipe(gulp.dest(config.bizCssDest));
});


// Rerun the tasks when a file changes
 gulp.task('watch', function() {
     gulp.watch(config.sassPath + '/**/*.scss', ['sass', 'bizsass','workforcesass']); 
    gulp.watch(config.cssPath + '/*.css', ['autoprefixer', 'bizprefixer', 'workforceprefixer']);
    gulp.watch(config.vendorsPath + '/*.js', ['vendors']);
    gulp.watch(config.jsPath + '/*.js', ['js']);
    gulp.watch(config.jsDest + '/app.js', ['compress']);
});

  gulp.task('default', ['sass', 'bizsass', 'workforcesass', 'autoprefixer', 'bizprefixer', 'workforceprefixer', 'vendors', 'js']);
