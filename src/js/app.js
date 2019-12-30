import Promise from 'es6-promise';

const newBrowser = 'Promise' in window;

if (!newBrowser) {
    window.Promise = Promise;
}
    
if (!window.IntersectionObserver) {
    import(/* webpackChunkName: "polyfills" */ './polyfills').then(res => {
        setTimeout(() => {
            return import(/* webpackChunkName: "index-page"*/ './index');
        })
    });
} else {
    import(/* webpackChunkName: "index-page"*/ './index');
}





