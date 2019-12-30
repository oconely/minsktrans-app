const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const svgSprite = require('gulp-svg-sprite');

const defaultConfig = {
    mode: {
        symbol: true
    }
};


class CreateSvgSprite {

    constructor({injectTo, svgSpriteConfig, onInject} = {}) {
        this.config = svgSpriteConfig || defaultConfig;
        this.injectTo = injectTo;
        this.onInject = onInject;
    }

    apply(compiler) {
        compiler.hooks.done.tapAsync('CreateSvgSprite', (compilation, callback) => {

            gulp.src(path.resolve(`./images/svg/*.svg`))
                .pipe(svgSprite(this.config))
                .pipe(gulp.dest(path.resolve(`./images/svg/sprite/`)))
                .on('finish', () => {
                    this.injectTo.forEach(p => this.onInject(p))
                })
            callback();
        });
    }
}
  
module.exports = CreateSvgSprite;