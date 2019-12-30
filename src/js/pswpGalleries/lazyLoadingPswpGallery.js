import { closest } from '../utils';

const galleries = Array.from(document.querySelectorAll('.pswp-gallery'));

// state
let isInitGallery = false;
// async init gallery
galleries.forEach(gallery => {
    gallery.addEventListener('click', (e) => {
        if (!isInitGallery) {
            const currentToast = ToastNotify.addToast('Загружаем галлерею, пожалуйста, подождите...', 4000, 'toast_success');
            const gallery = import(/* webpackChunkName: 'gallery' */ './initPswpGalleries')
            
            gallery.then(({default: handleClick}) => {
                ToastNotify.removeToast(currentToast, () => {
                    ToastNotify.addToast('Галлерея загружена.', 4000, 'toast_success');
                });
                isInitGallery = true;
                handleClick(e);
                document.removeEventListener('click', handleClickByLink);
                
            })
            .catch(err => ToastNotify.addToast('Не удалось загрузить галлерею. Проверьте соединение', 4000, 'toast_error'));
        }
    })
});

function handleClickByLink(e) {
    if (closest(e.target, el => el.tagName && ( el.classList.contains('pswp__list-item-link') ))) {
        e.preventDefault();
    }
}

document.addEventListener('click', handleClickByLink);
