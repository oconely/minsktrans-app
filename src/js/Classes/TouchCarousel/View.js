import Hammer from 'hammerjs';
import { debounce, closest, addClassNames, throttle } from '../../utils';
import CONFIG from './config';

const {
    carouselList, 
    dotsInner, 
    dot, 
    dotInner, 
    dotActive, 
    arrowsContainer, 
    arrowNext, 
    arrowPrev
} = CONFIG.cssClasses;

export default class ServicesCarouselView {
    constructor({ carouselSelector, ...rest}) {
        // setup all things needed for view
        this.carouselContainer = document.querySelector(carouselSelector);
        this.carousel = this.carouselContainer.querySelector(`.${carouselList}`);
        this.dots = this.carouselContainer.querySelector(`.${dotsInner}`);
        
        this.arrowsContainer = this.carouselContainer.querySelector(`.${arrowsContainer}`);
        //this.buttons = document.querySelector('.services__content-wrap');
        this.btnNext = this.arrowsContainer.querySelector(`.${arrowNext}`);
        this.btnPrev = this.arrowsContainer.querySelector(`.${arrowPrev}`);
        this.dotClassNames = rest.dotClassNames ? rest.dotClassNames : [];
        this.dotInnerClassNames = rest.dotInnerClassNames ? rest.dotInnerClassNames : [];
        this.dotActiveClassName = rest.dotActiveClassName ? rest.dotActiveClassName : null;
        this.arrowsClassNames = rest.arrowsClassNames ? rest.arrowsClassNames : [];
        this.arrowLeftClassNames = rest.arrowLeftClassNames ? rest.arrowLeftClassNames : [];
        this.arrowRightClassNames = rest.arrowRightClassNames ? rest.arrowRightClassNames : [];
        
        this.hammer = new Hammer(this.carousel);
    }

    displayDots({slidesAmount, isDotsActive, offset, slidesInView, dots}) {
        if (!dots) return;
        while (this.dots.firstChild) {
            this.dots.removeChild(this.dots.firstChild);
        } 

        if (slidesAmount < 2 || slidesInView > 1 || !dots) {
            return;
        } else {
            Array.from({length: slidesAmount}).forEach((el, i) => {
                const dotBtn = this.createElement('button', [dot, ...this.dotClassNames ]);
                dotBtn.dataset.id = i;
                const dotBtnInner = this.createElement('div', [dotInner, ...this.dotInnerClassNames]);
                dotBtnInner.dataset.id = i;
                dotBtn.append(dotBtnInner);
                this.dots.append(dotBtn);
            })
            //dots__item_active
            this.dots.children[offset].classList.add(dotActive);
            // add custom active class for dot 
            if (this.dotActiveClassName) {
                this.dots.children[offset].classList.add(this.dotActiveClassName);
            }
        }
    }

    displayArrows({slidesInView, slidesAmount, isArrowsActive}) {
        this.btnPrev.disabled = true;
        // add custom classes
        this._addClassNames(this.arrowsContainer, this.arrowsClassNames);
        this._addClassNames(this.btnPrev, this.arrowLeftClassNames);
        this._addClassNames(this.btnNext, this.arrowRightClassNames);
        
        if (slidesInView < slidesAmount && isArrowsActive) {
            this.arrowsContainer.style.display = 'block';
            
        } else if (slidesInView === slidesAmount && !isArrowsActive) {
            this.arrowsContainer.style.display = 'none';
        } else {
            this.arrowsContainer.style.display = 'none';
        }
    }

    bindGoPrev(handler) {
        this.btnPrev.addEventListener('click', throttle(event => {
            let target = event.target;
            let arrow = closest(target, el => el.tagName && el.classList.contains(arrowPrev))
            if (arrow) handler();
        }, 500));
    }

    bindGoNext(handler) {
        this.btnNext.addEventListener('click', throttle(event => {
            let target = event.target;
            let arrow = closest(target, el => el.tagName && el.classList.contains(arrowNext))
            if (arrow) handler();
        }, 500));
    }

    bindTouchMove(handler) {
        this.hammer.on("swipeleft swiperight", throttle(ev => {
            handler(ev);
        }, 500))
    }

    bindClickDot(handler) {
        this.dots.addEventListener('click', event => {
            if (event.target.classList.contains(dotInner) || event.target.classList.contains(dot)) {                
                handler(Number(event.target.dataset.id));
            }
        })
    }

    bindCarouselResize(handler) {
        window.addEventListener('resize', debounce(handler, 100));
    }

    // Create an element with an optional CSS class
    createElement(tag, classNames) {
        const element = document.createElement(tag)
        if (classNames) classNames.forEach(className => {
            element.classList.add(className)
        })
        return element
    }

    _addClassNames(el, classNames) {
        for (let cls of classNames) {
            el.classList.add(cls);
        }
    }
}