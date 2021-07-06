import * as gulp from 'gulp';
import * as gulpIf from 'gulp-if';
import * as plumber from 'gulp-plumber';
import * as rename from 'gulp-rename';
import * as ts from 'gulp-typescript';
import * as project from '../aurelia.json';
import * as fs from 'fs';
import { Transform } from 'stream';
import { CLIOptions, build, Configuration } from 'aurelia-cli';
import * as gulpSourcemaps from 'gulp-sourcemaps';

function configureEnvironment() {
  let env = CLIOptions.getEnvironment();

  return gulp.src(`aurelia_project/environments/${env}.ts`, { since: gulp.lastRun(configureEnvironment) })
    .pipe(rename('environment.ts'))
    .pipe(new Transform({
      objectMode: true,
      transform: function (file, _, cb) {
        // https://github.com/aurelia/cli/issues/1031
        fs.unlink(`${project.paths.root}/${file.relative}`, function () { cb(null, file); });
      }
    }))
    .pipe(gulp.dest(project.paths.root));
}

function buildTypeScript() {
  const typescriptCompiler = ts.createProject('tsconfig.json', {
    typescript: require('typescript'),
    noEmitOnError: true
  });

  return gulp.src(project.transpiler.dtsSource)
    .pipe(gulp.src(project.transpiler.source, {
      sourcemaps: true,
      since: gulp.lastRun(buildTypeScript)
    }))
    .pipe(gulpIf(CLIOptions.hasFlag('watch'), plumber()))
    .pipe(typescriptCompiler())
    .pipe(build.bundle());
}

export default gulp.series(
  configureEnvironment,
  buildTypeScript
);

export function buildPluginJavaScript(dest, format) {
  // when format is missing, default is ESM as we turned off "modules": false in .babelrc.js
  return function processPluginJavaScript() {
    const typescriptCompiler = ts.createProject('tsconfig.json', {
      typescript: require('typescript'),
      module: format
    });

    return gulp.src(project.transpiler.dtsSource)
      .pipe(gulp.src(project.plugin.source.js))
      .pipe(gulpIf(CLIOptions.hasFlag('watch'), plumber()))
      .pipe(gulpSourcemaps.init())
      .pipe(typescriptCompiler())
      .pipe(gulpSourcemaps.write('.', { includeContent: false, sourceRoot: '../../src/' }))
      .pipe(gulp.dest(dest));
  };
}
