import './index.css';
import { closest } from '../../utils';

class Slideshow{
    constructor({ switchDuration } = {}) {
        this.switchDuration = switchDuration || 6500;
        this.currentIndex = 0;
        this.isSlideshowMode = true;
        this.isAnimating = false;
        this.tasksQueu = [];
        
        this.stop = this.stop.bind(this);
        this.start = this.start.bind(this);
        this.performAnimation = this.performAnimation.bind(this);
        this.performSlide = this.performSlide.bind(this);
        this.setNextSlide = this.setNextSlide.bind(this);

        this.initComponents();
        this.initSlideshow();
    }

    initSlides() {
        this.container = document.querySelector('.quickSlideshow');
        this.slides = this.container.querySelectorAll('.quickSlideshow__item');
        // console.log(this.slides)
        Array.from(this.slides).forEach((slide, index) => slide.setAttribute('data-slide', index));
    }

    initDescriptions() {
        this.descrList = document.querySelector('.main-slider__descr-list');
        this.descriptions = this.descrList.querySelectorAll('.main-slider__descr-list-item');
        Array.from(this.descriptions).forEach((descr, index) => descr.setAttribute('data-descr', index));
    }

    initDots() {
        this.dotsWrap = document.querySelector('.quickSlideshow__dots');
        this.dots = this.dotsWrap.querySelectorAll('.quickSlideshow__dot');
        Array.from(this.dots).forEach((dot, index) => dot.setAttribute('data-dot', index))
        this.dotsWrap.classList.remove('quickSlideshow__dots_notInit');
    }

    initComponents() {
        this.initSlides();
        this.initDescriptions();
        this.initDots(); 
    }

    initSlideshow() {
        if (this.slides < 2) return;
        this.setListeners();
        this.nextTick();
        this.playSlideshow();
    }

    setNextSlide() {
        this.nextSlide = this.container.querySelector(`[data-slide='${this.currentIndex}']`);
        this.nextSlide.classList.add('next');
    }

    setNextDescription() {
        const curDescription = this.container.querySelector(`[data-descr='${this.currentIndex}']`);
        this.nextDescr = curDescription;
        if (!curDescription.classList.contains('notInit')) {
            this.nextDescr.classList.add('next');
        }
    }

    setNextDot() {
        this.nextDot = this.dotsWrap.children[this.currentIndex];
        this.nextDot.classList.add('quickSlideshow__dot_active');
    }

    performAnimation() {
        this.isAnimating = true;
        this.prevSlide.classList.add('fade-out');
        this.prevDescr.classList.add('fade-out');
    }

    nextTick(){
        this.setNextSlide();
        this.setNextDescription();
        this.setNextDot();
    }

    playSlideshow(){
        this.slideShow = window.setInterval(() => {
            this.performSlide();
        }, this.switchDuration);
    }

    performSlide() {
        if (this.prevSlide) {
            this.prevSlide.classList.remove('prev');
            this.prevSlide.classList.remove('fade-out');
        }

        if (this.prevDescr) {
            this.prevDescr.classList.remove('prev');
            this.prevDescr.classList.remove('fade-out');    
        }
        
        if (this.prevDot) {
            this.prevDot.classList.remove('quickSlideshow__dot_active');
        }
        
        if (this.nextSlide) {
            this.nextSlide.classList.remove('next');
            this.prevSlide = this.nextSlide;
            this.prevSlide.classList.add('prev');
        }

        if (this.nextDot) {
            this.nextDot.classList.remove('quickSlideshow__dot_active')
            this.prevDot = this.nextDot;
        }

        if (this.nextDescr) {
            this.nextDescr.classList.remove('next');
            if (this.nextDescr.classList.contains('notInit')) {
                this.nextDescr.classList.remove('notInit');
            }
            this.prevDescr = this.nextDescr;
            this.prevDescr.classList.add('prev');    
        } 
        
        if (this.isSlideshowMode) {
            this.currentIndex++;
        };

        if (this.currentIndex >= this.slides.length) { 
            this.currentIndex = 0; 
        }

        this.nextTick();        
        
        this.performAnimation();
    }

    stop() {
        // console.log("STOP")
        clearInterval(this.slideShow);
        this.isSlideshowMode = false;
        this.slides[this.currentIndex].classList.add('next');
        this.descriptions[this.currentIndex].classList.add('notInit');

        if (this.prevSlide) {
            this.prevSlide.classList.remove('prev');
            this.prevSlide.classList.remove('fade-out');
        }

        if (this.prevDescr) {
            this.prevDescr.classList.remove('prev');
            this.prevDescr.classList.remove('fade-out');
            this.nextDescr.classList.remove('next');
        }

        this.prevSlide = null;
        this.prevDescr = null;
    }

    start() {
        // console.log("START")
        this.isSlideshowMode = true;

        this.setNextSlide();
        this.playSlideshow();
    }

    setListeners() {
        this.container.addEventListener('mouseenter', () => {
            if (this.isAnimating) {
                this.tasksQueu.push(this.stop);
            } else {
                this.stop();
            }
        });

        this.container.addEventListener('mouseleave', () => {
            clearInterval(this.slideShow);
            this.tasksQueu = []; 
            this.start();
        });

        if (this.dots) {
            this.dotsWrap.addEventListener('click', (e) => {
                if (!this.isAnimating) {
                    const { target } = e;
                    const btn = closest(target, el => el.classList.contains('quickSlideshow__dot'));
                    if (btn && !btn.classList.contains('quickSlideshow__dot_active')) {
                        const curIndex = parseInt(btn.dataset.dot);
                        this.currentIndex = curIndex;
                        this.performSlide();
                    }
                }
            });
        }
        

        Array.from(this.slides).forEach(sl => sl.addEventListener('transitionend', e => {

            if (e.propertyName === 'opacity' && this.isAnimating === true) {
                this.isAnimating = false;
                
                if (this.isSlideshowMode) {

                    this.tasksQueu.forEach(task => task());
                }
            }
        }))
    }
}

export default Slideshow;