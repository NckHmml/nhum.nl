const gulp = require("gulp");
const concat = require("gulp-concat");
const tslint = require("gulp-tslint");
const sassLint = require("gulp-sass-lint");
const uglify = require("gulp-uglify");
const webpack = require("webpack");
const styleguidist = require("react-styleguidist");

const config = require("./config.js");

gulp.task("assets:dev", ["freqlist"], () => {
  return gulp
    .src(config.settings.assets.files)
    .pipe(concat(`${config.settings.assets.name}.js`))
    .pipe(gulp.dest(config.settings.distribution));
});

gulp.task("assets", ["freqlist"], () => {
  return gulp
    .src(config.settings.assets.files_build)
    .pipe(concat(`${config.settings.assets.name}.js`))
    .pipe(uglify())
    .pipe(gulp.dest(config.settings.distribution));
});

gulp.task("freqlist", () => {
  return gulp
    .src(config.settings.assets.freqlist)
    .pipe(gulp.dest(config.settings.distribution));
});

gulp.task("html", () => {
  return gulp
    .src("index.html")
    .pipe(gulp.dest(config.settings.distribution));
});

gulp.task("tslint", () => {
  return gulp
    .src("src/**/*.+(ts|tsx)")
    .pipe(tslint())
    .pipe(tslint.report({
      summarizeFailureOutput: true
    }));
});

gulp.task("sass-lint", () => {
  return gulp
    .src("style/**/*.s+(a|c)ss")
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

gulp.task("styleguidist", ["build"], () => {
  gulp.watch("src/**/*.+(ts|tsx)", ["tslint"]);
  gulp.watch("style/**/*.s+(a|c)ss", ["sass-lint"]);
  
  styleguidist(config.styleguidist).server((err, config) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log('Listening at http://' + config.serverHost + ':' + config.serverPort);
    }
  });
});

gulp.task("watch", ["sass-lint", "tslint", "assets:dev", "html"], () => {
  gulp.watch("src/**/*.+(ts|tsx)", ["tslint"]);
  gulp.watch("style/**/*.s+(a|c)ss", ["sass-lint"]);

  return webpack(config.webpack_watch, (error, stats) => {
    if (error) {
      console.error(error);
    }
  });
});

gulp.task("build", ["sass-lint", "tslint", "assets", "html"], (callback) => {
  return webpack(config.webpack_build, (error, stats) => {
    if (error) {
      console.error(error);
    }
    callback();
  });
});