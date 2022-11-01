import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import csso from 'gulp-csso';
import squoosh from 'gulp-libsquoosh';
import svgstore from 'gulp-svgstore';
import svgo from 'gulp-svgmin';
import rename from 'gulp-rename';

export const sprite = () => {
    return gulp.src('source/images/icons/*.svg')
        .pipe(svgo())
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename('sprite.svg'))
        .pipe(gulp.dest('build/images'))
}

export const styles = () => {
    return gulp.src('source/less/style.less', {sourcemaps: true})
        .pipe(plumber())
        .pipe(less())
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(csso())
        .pipe(gulp.dest('build/css', {sourcemaps: '.'}))
        .pipe(browser.stream());
}

export const html = () => {
    return gulp.src('source/*.html')
        .pipe(gulp.dest('build'))
}

export const images = () => {
    return gulp.src('source/images/**')
        .pipe(squoosh())
        .pipe(gulp.dest('build/images'))
}

export const js = () => {
    return gulp.src('source/js/**')
        .pipe(gulp.dest('build/js'))
}

export const fonts = () => {
    return gulp.src('source/fonts/**')
        .pipe(gulp.dest('build/fonts'))
}

export default gulp.series(
    styles, html, js, images, sprite, fonts
);