var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var path = require('path');
var foreach = require('gulp-foreach');
var jade = require('gulp-jade');

var DEST = 'dist/';

gulp.task('build', ['clean', 'js', 'css']);

gulp.task('js', function () {
    return gulp.src('src/js/script.js')
        // This will output the non-minified version
        .pipe(gulp.dest(DEST))
        // This will minify and rename to foo.min.js
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest(DEST));
});

gulp.task('css', function () {
    return gulp.src('src/css/*/*.less')
        .pipe(less())
        .pipe(rename(function (file) {
            file.dirname = "";
            file.extname = ".css";
        }))
        .pipe(gulp.dest(DEST))

        //Make a demo file for each theme
        .pipe(rename(function (file) {
            var themeName = file.basename;
            var stylesheet = "../dist/" + themeName + file.extname;

            gulp.src('src/html/demo.jade')
                .pipe(jade({
                    locals: {
                        treeTheme: stylesheet
                    },
                    pretty: true
                }))
                .pipe(rename(function (htmlFile) {
                    htmlFile.dirname = "";
                    htmlFile.extname = ".html";
                    htmlFile.basename += "-" + themeName;
                }))
                .pipe(gulp.dest("demo"));
        }));
});

var del = require('del');
gulp.task('clean', function (cb) {
    del(['dist/*', 'demo/*'], cb);
});