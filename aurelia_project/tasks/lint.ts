import * as gulp from 'gulp';
import * as eslint from 'gulp-eslint';
import * as project from '../aurelia.json';

export default function lint() {
  return gulp.src(project.transpiler.source)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}
