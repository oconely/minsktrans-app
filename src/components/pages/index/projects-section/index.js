import createLazyImages from "../../../../js/createLazyImages";
import { canUseWebP } from "../../../../js/utils";
import loadingAllSrc from "./loadingAllSrc";


const imgDidLoad = (el) => {
    let sources;
    if ( canUseWebP() ) {
        sources = Array.from(el.querySelectorAll('[data-srcset-webp]'));;
        loadingAllSrc(sources, el, true);
    } else {
        sources = el.querySelectorAll('[data-srcset]');
        loadingAllSrc(sources, el, false)
    }   
}

const config = {
    selector: ".showcase-browser",
    imgDidLoad,
    config: {
        rootMargin: '0px 0px -100px 0px',
        treshold: 0
    }
}

createLazyImages(config);