const createLazyImages = config => {
    const { 
        selector,  
        intersectionConfig = {
            rootMargin: '0px 0px 50px 0px',
            treshold: 0
        },
        imgDidLoad
    } = config;

    if (!imgDidLoad || !selector) {
        throw new Error('Error has been occured in LazyImages plugin: imgDidLoad function must be defined in configuration object');
    }
    
    const images = Array.from(document.querySelectorAll(selector));
    
    const preloadImage = img => {
        imgDidLoad(img);
    }

    let observer = new IntersectionObserver((entries, self) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                preloadImage(entry.target);
                // stop watching and load the image
                self.unobserve(entry.target);
            }
        });
    }, intersectionConfig);

    images.forEach(image => observer.observe(image));

    return { observer };
}

export default createLazyImages;
