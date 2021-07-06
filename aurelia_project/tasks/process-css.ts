import {CLIOptions, build} from 'aurelia-cli';
import * as gulp from 'gulp';
import * as project from '../aurelia.json';
import * as sass from 'gulp-dart-sass';
import * as sassPackageImporter from 'node-sass-package-importer';
import * as postcss from 'gulp-postcss';
import * as autoprefixer from 'autoprefixer';
import * as cssnano from 'cssnano';
import * as postcssUrl from 'postcss-url';

export default function processCSS() {
  return gulp.src(project.cssProcessor.source, {sourcemaps: true})
    .pipe(
      // sassPackageImporter handles @import "~bootstrap"
      // https://github.com/maoberlehner/node-sass-magic-importer/tree/master/packages/node-sass-package-importer
      CLIOptions.hasFlag('watch') ?
        sass.sync({importer: sassPackageImporter()}).on('error', sass.logError) :
        sass.sync({importer: sassPackageImporter()})
    )
    .pipe(postcss([
      autoprefixer(),
      // Inline images and fonts
      postcssUrl({url: 'inline', encodeType: 'base64'}),
      cssnano()
    ]))
    .pipe(build.bundle());
}

export function pluginCSS(dest) {
  return function processPluginCSS() {
    return gulp.src(project.plugin.source.css)
      .pipe(CLIOptions.hasFlag('watch') ? sass.sync().on('error', sass.logError) : sass.sync())
      .pipe(postcss([
        autoprefixer(),
        // Inline images and fonts
        postcssUrl({url: 'inline', encodeType: 'base64'}),
        cssnano()
      ]))
      .pipe(gulp.dest(dest));
  };
}
