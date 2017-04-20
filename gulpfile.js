const gulp = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify")
const webpack = require("webpack");

const config = require("./config.js");

gulp.task("assets:dev", () => {
  return gulp
    .src(config.settings.assets.files)
    .pipe(concat(`${config.settings.assets.name}.js`))
    .pipe(gulp.dest(config.settings.distribution));
});

gulp.task("assets", () => {
  return gulp
    .src(config.settings.assets.files)
    .pipe(concat(`${config.settings.assets.name}.js`))
    .pipe(uglify())
    .pipe(gulp.dest(config.settings.distribution));
});

gulp.task("html", () => {
  return gulp
    .src("index.html")
    .pipe(gulp.dest(config.settings.distribution));
});

gulp.task("watch", ["assets:dev", "html"], () => {
  return webpack(config.webpack_watch, (error, stats) => {
    if (error) {
      console.error(error);
    }
  });
});

gulp.task("build", ["assets", "html"], () => {
  return webpack(config.webpack_build, (error, stats) => {
    if (error) {
      console.error(error);
    }
  });
});