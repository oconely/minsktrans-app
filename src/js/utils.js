export function debounce(func, delay){
    let inDebounce;
    return function(){
        const context = this;
        const args = arguments;
        clearTimeout(inDebounce);
        inDebounce = setTimeout(() => func.apply(context, args), delay)
    }
}

export const log = (arg) => console.log(arg);

// limiting the rate at which we execute the function
export function throttle(func, limit, that){
    let lastFunc;
    let lastRan; // last invocation of func timestamp
    return function() {
        const context = that || this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    }
}

export function getWidthScrollBar(){
    return window.innerWidth - document.documentElement.clientWidth;
}

export function fixHTMLElement(){
    document.documentElement.classList.add('fixed');
    const header = document.getElementsByTagName('header')[0];
    const wScrollbar = getWidthScrollBar();
    if(getComputedStyle(header).position === 'fixed'){
        header.style.right = wScrollbar + 'px';
    }
    document.documentElement.style.marginRight = wScrollbar + 'px';
    document.documentElement.style.overflow = "hidden";
}

export function unfixHTMLElement(){
    if(!document.documentElement.classList.contains('fixed')) return;
    document.documentElement.classList.remove('fixed');
    const header = document.getElementsByTagName('header')[0];
    if(getComputedStyle(header).position === 'fixed'){
        header.style.paddingRight = 'initial';
    }
    document.documentElement.style.overflow = "initial";
    document.documentElement.style.marginRight = 'initial';
}

export function onTransitionEndHandler(...rest){
    const [ propName, callback=null, targetElementClass, event ] = rest;
    const { propertyName, target: {classList} } = event;
    if(
        propName === propertyName
        && classList.contains(targetElementClass) 
        && callback
        && !classList.contains('active') ) {
            callback();
    } 
    //if(propertyName !== propName || classList.contains('active')) return;
    //if(callback) callback();
}

//element=null, element2=null, callback=null, timeout=0
export function onEscDown(...rest){
    if(!document.documentElement.classList.contains('fixed')) return;
    const [element=null, element2=null, callback=null, timeout=null, e] = rest;
    
    if(!element) return;
    if (e.key !== "Escape") return;
    if(!!element) element.classList.remove('active');
    if(!!element2) element2.classList.remove('active');
    if(!!callback) callback();
    if(!!timeout) return;
    setTimeout(() => {
        unfixHTMLElement();
    }, timeout);
}

export function getVisibleSlidesCount(breakPoints){
    if(!breakPoints) return 1;
    let count = 1;

    for(let bp of Object.keys(breakPoints)){
        if(window.innerWidth >= +bp) {
            count = breakPoints[bp]
        }
    }
    return count;
}

export function getSlideWidth(visibleSlidesCount){
    let width;
    width = 100 / visibleSlidesCount;
    return width;
}

export function closest(el, fn) {
    return el && ( fn(el) ? el : closest(el.parentNode, fn) );
}

export function canUseWebP() {
    var elem = document.createElement('canvas');
    if (!!(elem.getContext && elem.getContext('2d'))) {
        return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
    }
    return false;
}