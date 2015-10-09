var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('serve', function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("*.html").on("change", browserSync.reload);
    gulp.watch("js/*.js").on("change", browserSync.reload);
});