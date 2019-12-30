import jump from 'jump.js';
import { closest } from '../js/utils';

function handleClickByLink(e) {
    let target = e.target;
    
    const link = closest(target, el => el.tagName && el.classList.contains('link_jumpTo'));
    if (link) {
        e.preventDefault();
        const id = link.getAttribute('href');
        setTimeout(() => {
            jump(id, {
                offset: -35,
                duration: 500,
            });
        }, 100);
        return;
    } 
}

document.addEventListener('click', handleClickByLink);
