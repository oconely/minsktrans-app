let jump;
const htmlElement = document.documentElement;
const toTopBtn = document.querySelector('.to-top-button');
function handleClick(){
    if (!jump) return;
    jump(document.body,{
        duration: 2000
    });
}
function handleScrol() {
    const scrollFromTop = window.scrollY || window.pageYOffset;
    if (scrollFromTop > 80) {
        import(/* webpackChunkName: 'jumpLib' */ 'jump.js')
            .then(({default: jumpLib}) => jump = jumpLib)
            .catch(err => ToastNotify.addToast('Не удалось загрузить модуль прокрутки страницы наверх. Проверьте соединение.', 4000, 'toast_error')) 
        htmlElement.classList.add('toTop');
    } else {
        htmlElement.classList.remove('toTop');
    }
}
handleScrol();
toTopBtn.addEventListener('click', handleClick);
window.addEventListener('scroll', handleScrol, {passive: true});


