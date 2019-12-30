import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';
import '../../../node_modules/photoswipe/dist/default-skin/default-skin.css';
import '../../components/public/photoswipe.css';

import pswpTpl from './pswpTpl';
import { closest } from '../utils';

document.querySelector('.photoSwipe').innerHTML = pswpTpl;

let onThumbnailsClick;

function initPhotoSwipeFromDOM(gallerySelector) {
    
    function parseThumbnailElements(el) {
        let thumbElements = el.children;
        const items = [...thumbElements].map((el,i) => {
            const linkEl = el.firstElementChild;
            const title = linkEl.getAttribute('data-title')
            return  {
                title,
                html: `
                    <video controls poster="${linkEl.getAttribute('data-video-thumb')}" >
                        <source src="${linkEl.getAttribute('href')}" type="video/mp4">
                    </video>
                ` 
            }
        });
        return items;
    }

    onThumbnailsClick = (e) => {

        e.preventDefault();
        let target = e.target;
        // find root element of slide
        if (target.classList.contains('pswp-gallery_case')) {
            const targetGallery = document.getElementById(`${e.target.getAttribute('data-case-gallery-id')}`)

            return openPhotoSwipe( 0, targetGallery, false, false);
        }
        let clickedListItem = closest(target, el => {
            return el.tagName && el.classList.contains('pswp__list-item');
        })

        if (!clickedListItem) return;

        const clickedGallery = clickedListItem.parentNode;
        const indexOfItem = parseInt(clickedListItem.dataset.elIndex, 10);

        if (indexOfItem >= 0) {
            openPhotoSwipe( indexOfItem, clickedGallery, false, false);
        }

        return false;
    }

    function openPhotoSwipe(index, galleryElement, disableAnimation, fromURL) {

        const pswpElement = document.querySelector('.pswp');
        let gallery;
        //let options;
        let items;

        items = parseThumbnailElements(galleryElement);
        // define options (if needed)
        let options = {
            bgOpacity: 0.9,
            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),
           
        };
        
        
        // PhotoSwipe opened from URL
        if (fromURL) {
            if(options.galleryPIDs) {
                // parse real index when custom PIDs are used 
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                // in URL indexes start from 1
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if( isNaN(options.index) ) {
            return;
        }

        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options );
        gallery.init();
    }

    const galleryElements = Array.from(document.querySelectorAll(gallerySelector));

    galleryElements.forEach((el, i) => {
        el.setAttribute('data-pswp-uid', i+1);
        el.addEventListener('click', onThumbnailsClick);
    })
}

initPhotoSwipeFromDOM('.pswp-gallery');


export default onThumbnailsClick;