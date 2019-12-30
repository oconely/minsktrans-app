export default class ServicesCarouselModel {
    constructor({carouselSelector, ...rest}) {
        this.isDotsActive = false;
        this.offset = 0;
        this.slidesAmount = document.querySelector(`${carouselSelector} .touch-carousel__list`).children.length;
        this.slidesInView = 1;
        this.lastWinWidth = window.innerWidth;

        // 
        this.isArrowsActive = true;

        Object.assign(this, rest);
    }

    setSlidesInView(num) {
        this.slidesInView = num;

        this.onSlidesInViewChanged(this.model);
    }

    incrementOffset() {
        const prevOffset = this.offset;
        this.offset++;

        this.onOffsetChanged(prevOffset, this.offset, false, this.slidesInView);
    }

    decrementOffset() {
        const prevOffset = this.offset;
        this.offset--;

        this.onOffsetChanged(prevOffset, this.offset, false, this.slidesInView);
    }

    setOffset(num, isNoTransition) {
        const prevOffset = this.offset;
        this.offset = num;
        this.onOffsetChanged(prevOffset, this.offset, isNoTransition, this.slidesInView);
    }

    toggleArrows(bool) {
        this.isArrowsActive = bool;
        this.onIsArrowsActiveChanged(this);
    }

    toggleDots(bool) {
        this.isDotsActive = bool;

        this.onStateDotsChanged(this.isDotsActive);
    }

    bindToggleArrows(callback) {
        this.onIsArrowsActiveChanged = callback;
    }

    bindOffsetChanged(callback) {
        this.onOffsetChanged = callback;
    }

    bindStateDotsChanged(callback) {
        this.onStateDotsChanged = callback;
    }

    bindSlidesInViewChanged(callback) {
        this.onSlidesInViewChanged = callback;
    }


}