var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var stylus = require('gulp-stylus');
var jade = require('gulp-jade');
var svgmin = require('gulp-svgmin');
var runSequence = require('run-sequence');

//A full build cleans the dist and demo folders, then once that's finished, builds everything else
gulp.task('build', function (cb) {
    runSequence(
        'clean',
        ['js', 'css', 'svg', 'demo'],
        cb
    );
});

//Make a minified and non-minified version of script.js
gulp.task('js', function () {
    return gulp.src('src/js/script.js')
        // This will output the non-minified version
        .pipe(gulp.dest('dist'))
        // This will minify and rename to foo.min.js
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('dist'));
});

//Copy all the SVG files into the relevant theme folder
gulp.task('svg', function () {
    return gulp.src('src/svg/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('dist'));
});

//Compile the stylus sheets and copy them into the relevant theme folder
gulp.task('css', function () {
    return gulp.src('src/css/botany.styl')
    //return gulp.src('src/css/*/*.styl')
        .pipe(stylus({
            //url: { name: 'url', limit: false }
        }))
        .pipe(rename(function (file) {
            file.extname = ".css";
        }))
        .pipe(gulp.dest('dist'));
});

//The demo task makes the html files that go in the demo folder
gulp.task('demo', ['demo-themes', 'demo-other']);

//Compile a demo for each theme using demo.jade as the base
gulp.task('demo-themes', function () {
    gulp.src('src/css/themes/*.json')
        //Make a demo file for each theme
        .pipe(rename(function (file) {
            gulp.src('src/html/demo.jade')
                .pipe(jade({
                    locals: {
                        theme: file.basename
                    },
                    pretty: true
                }))
                .pipe(rename(function (htmlFile) {
                    htmlFile.dirname = "";
                    htmlFile.extname = ".html";
                    htmlFile.basename += "-" + file.basename;
                }))
                .pipe(gulp.dest("demo"));
        }));
});


//Compile the bootstrap demo
gulp.task('demo-other', function () {
    gulp.src('src/html/bootstrap.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(rename(function (htmlFile) {
            htmlFile.extname = ".html";
            htmlFile.basename = "demo-" + htmlFile.basename;
        }))
        .pipe(gulp.dest("demo"));
});

//Clean the dist and demo folders using del
var del = require('del');
gulp.task('clean', function (cb) {
    del(['dist/*', 'demo/*'], cb);
});