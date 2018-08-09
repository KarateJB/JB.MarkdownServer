// Include gulp
const gulp = require('gulp');
// Include plugins
// const argv = require('yargs').argv;
// const concat = require('gulp-concat');
const rename = require('gulp-rename');
// const util = require('gulp-util');
const watch = require('gulp-watch');
const extender = require('gulp-html-extend')
const markdown = require('gulp-markdown');
const marked = require('marked');

// Set options
// `highlight` example uses `highlight.js`
marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code) {
        return require('highlight.js').highlightAuto(code).value;
    },
    pedantic: false,
    gfm: true,
    tables: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
});

var mdFilePath = "./wwwroot/markdown/";

//Convert MD to HTML
gulp.task('md', function () {
    return gulp.src(mdFilePath + '**/*.md')
        .pipe(markdown(marked))
        .pipe(gulp.dest(mdFilePath+ "dist"));
        // .pipe(rename({
        //     extname: ".html"
        // }))
        // .pipe(gulp.dest(function (file) {
        //     return file.base;
        // }));
})

//
gulp.task('extend', ['md'], function () {
    return gulp.src(mdFilePath + '**/*.html')
        .pipe(extender({
            annotations: true,
            verbose: false
        }))
        .pipe(gulp.dest(function (file) {
            return file.base;
        }));
});




gulp.task('watch', function () {
    // gulp.watch(mdFilePath + '**/*.md', ['extend']); //Not support new/delete files
    return watch(mdFilePath + '**/*.md', function(){
        gulp.start("extend");
    });
});

//Default tasks
gulp.task('default', ["watch"]);