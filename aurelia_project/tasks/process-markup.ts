import {CLIOptions, build} from 'aurelia-cli';
import * as gulp from 'gulp';
import * as project from '../aurelia.json';
import * as htmlmin from 'gulp-htmlmin';
import * as gulpIf from 'gulp-if';
import * as plumber from 'gulp-plumber';

export default function processMarkup() {
  return gulp.src(project.markupProcessor.source, {sourcemaps: true, since: gulp.lastRun(processMarkup)})
    .pipe(gulpIf(CLIOptions.hasFlag('watch'), plumber()))
    .pipe(htmlmin({
        // collapseInlineTagWhitespace: true,
        // collapseBooleanAttributes: true,
        // removeAttributeQuotes: true,
        // removeScriptTypeAttributes: true,
        // removeStyleLinkTypeAttributes: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        ignoreCustomFragments: [/\${.*?}/g] // ignore interpolation expressions
    }))
    .pipe(build.bundle());
}

export function pluginMarkup(dest) {
  return function processPluginMarkup() {
    return gulp.src(project.plugin.source.html)
      .pipe(gulpIf(CLIOptions.hasFlag('watch'), plumber()))
      .pipe(htmlmin({
          // collapseInlineTagWhitespace: true,
          // collapseBooleanAttributes: true,
          // removeAttributeQuotes: true,
          // removeScriptTypeAttributes: true,
          // removeStyleLinkTypeAttributes: true,
          removeComments: true,
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true,
          ignoreCustomFragments: [/\${.*?}/g] // ignore interpolation expressions
      }))
      .pipe(gulp.dest(dest));
  };
}
