import ServicesCarouselModel from './Model';
import ServicesCarouselView from './View';
import './styles.css';

import CONFIG from './config';

const {
    dotActive,    
} = CONFIG.cssClasses;

class ServicesCarouselController {
    constructor(model, view, breakpoints, callbacks) {
        this.model = model;
        this.view = view;

        this.breakpoints = breakpoints;
        this.callbacks = callbacks || null;
        this.initCarousel();
    }
    
    onSlidesInViewChanged = () => {
        this.view.displayDots(this.model);
        this.view.displayArrows(this.model);
    }

    initCarousel() {
        // View
        this.view.bindGoNext(this.handleGoNext);
        this.view.bindGoPrev(this.handleGoPrev);
        this.view.bindTouchMove(this.handleTouchMove);
        this.view.bindCarouselResize(this.handleCarouselResize);
        
        // Model
        this.model.bindOffsetChanged(this.onOffsetChanged);
        this.model.bindStateDotsChanged(this.onStateDotsChanged);
        this.model.bindSlidesInViewChanged(this.onSlidesInViewChanged);
        this.model.bindToggleArrows(this.onIsArrowsActiveChanged);
        
        this._setSlidesInView();

        // Initial
        if (this.model.dots) {
            this.view.bindClickDot(this.handleClickDot);
        }
        if (this.callbacks && this.callbacks.onCarouselInit) {
            this.callbacks.onCarouselInit(this.view.carouselContainer, this.view.carousel.children);
        }
    }

    handleCarouselResize = () => {
        if (window.innerWidth !== this.model.lastWinWidth) {
            this.model.lastWinWidth = window.innerWidth;
            this._setSlidesInView();
            this.model.setOffset(0, true);
            
            if (this.callbacks && this.callbacks.onCarouselResize) {
                this.callbacks.onCarouselResize(this.view, this.model, this);
            }
        }
    }
    
    handleStateDotsChanged(bool) {
        this.model.toggleDots(bool);
    }

    onIsArrowsActiveChanged = () => {
        this.view.displayArrows(this.model);
    }

    onStateDotsChanged = () => {
        this.view.displayDots(this.model);
    }

    onOffsetChanged = (prevOffset, nextOffset, isNoTransition, slidesInView) => {
        if (this.model.dots && this.model.slidesInView === 1 && this.model.slidesAmount > 1) {
            this.view.dots.children[prevOffset].classList.remove(dotActive);
            this.view.dots.children[nextOffset].classList.add(dotActive);
            if (this.view.dotActiveClassName) {
                this.view.dots.children[prevOffset].classList.remove(this.view.dotActiveClassName);
                this.view.dots.children[nextOffset].classList.add(this.view.dotActiveClassName);
            }
        }
        if (this.callbacks && this.callbacks.onBeforeTransformSet) {
            //this.callbacks.onBeforeTransformSet(prevOffset, nextOffset, isNoTransition, slidesInView);
            const newTransform = this.callbacks.onBeforeTransformSet(prevOffset, nextOffset, isNoTransition, slidesInView, this.view.carouselContainer, this.model);
            this.view.carousel.style.transform = `translateX(-${newTransform}% )`;
            this.view.carousel.style.transition = isNoTransition ? 'none' : '';
        } else {
            this.view.carousel.style.transform = `translateX(-${nextOffset * (100 / slidesInView)}% )`;
            this.view.carousel.style.transition = isNoTransition ? 'none' : ''; 
        }
        this.view.btnNext.disabled = nextOffset === this.model.slidesAmount - 1 - slidesInView + 1 ? true : false;
        this.view.btnPrev.disabled = nextOffset <= 0 ? true : false;
        if (this.callbacks && this.callbacks.onCarouselShift) {
            this.callbacks.onCarouselShift(prevOffset, nextOffset, this.view.carousel.children, this.view.carousel);
        }
    }

    handleGoPrev = () => {
        this.model.decrementOffset();
    }

    handleGoNext = () => {
        this.model.incrementOffset();
    }
    
    handleTouchMove = ({ type }) => {
        const { offset, slidesAmount, slidesInView } = this.model;
        if (type === 'swipeleft' && (offset !== slidesAmount - 1 - slidesInView + 1) && slidesAmount > slidesInView) {
            this.model.incrementOffset();
        } else if (type === 'swiperight' && this.model.offset > 0 && slidesAmount > slidesInView) {
            this.model.decrementOffset();
        }
    }

    handleClickDot = num => {
        this.model.setOffset(num, false);
    }

    destroy() {
        // TODO
    }

    off() {
        this.view.hammer.off('swipeleft swiperight', this.handleTouchMove);
        this.model.toggleArrows(false)
    }

    on() {
        this.view.hammer.on('swipeleft swiperight', this.handleTouchMove);
        this.model.toggleArrows(true)
    }

    // Private methods
    _setSlidesInView() {
        const w = window.innerWidth;
        const bp = Object.keys(this.breakpoints)
                        .map(str => Number(str))
                        .reduce((cur, next) => cur < w && w > next ? next : cur);
        const num = this.breakpoints[bp];
        this.model.setSlidesInView(num);
    }
}


const initTouchCarousel = ({
    dots, 
    carouselSelector, 
    breakpoints, 
    dotClassNames, 
    dotInnerClassNames, 
    dotActiveClassName,
    arrowsClassNames,
    arrowLeftClassNames,
    arrowRightClassNames, 
    callbacks
}) => {
    new ServicesCarouselController(
        new ServicesCarouselModel({
            dots,
            carouselSelector
        }), 
        new ServicesCarouselView({
            carouselSelector,
            dotClassNames,
            dotInnerClassNames,
            dotActiveClassName,
            arrowsClassNames,
            arrowLeftClassNames,
            arrowRightClassNames
        }), 
        breakpoints,
        callbacks
    );
}

export default initTouchCarousel;