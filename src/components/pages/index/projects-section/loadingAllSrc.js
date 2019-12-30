import anim from "../../../../js/jsAnimations/showcaseImgScrollAnim";
import { styler } from "popmotion";

const handleMouseDown = (animPlayback, showcaseBrowser) => {
    if (!showcaseBrowser.classList.contains('showcase-browser_imgAnim')) return;
    animPlayback.stop()
    showcaseBrowser.classList.remove('showcase-browser_imgAnim');
};

const loadingAllSrc = (sources, el, isWebP) => {
    let promises = [];
    sources.forEach(s => {
        const promise = new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                resolve(img.src);
                s.tagName === "IMG" ? s.src = img.src : s.srcset = img.src;
            }
            if (s.tagName === "IMG") {
                img.src = s.getAttribute('data-img-src');
            } else {
                switch (isWebP) {
                    case true:
                        img.src = s.getAttribute('data-srcset-webp');
                        break;
                    default:
                        img.src = s.getAttribute('data-srcset');
                }
            }
        });
        promises.push(promise);
    });

    Promise.all(promises)
        .then(res => {
            const showcaseBrowser = el;
            const showcaseBrowserWindow = showcaseBrowser.querySelector('.showcase-browser__window');
            setTimeout(() => {
                showcaseBrowser.classList.add('showcase-browser_imgsIsLoaded');
                showcaseBrowser.classList.add('showcase-browser_imgsIsLoaded');
                if (window.innerWidth < 768) return;
                const img = showcaseBrowser.querySelector('.showcase-browser__img');
                const imgHeight = img.clientHeight;
                const stylImg = styler(img);
                showcaseBrowser.classList.add('showcase-browser_imgAnim')
                const imgScroll = anim({
                    duration: 3800,
                    delayMs: 10,
                    h: -(imgHeight - showcaseBrowserWindow.clientHeight)
                });
                const animPlayback = imgScroll.start({
                    update: v => stylImg.set(v),
                    complete: () => 
                        showcaseBrowser.classList.remove('showcase-browser_imgAnim')
                });
                showcaseBrowserWindow.addEventListener('mousedown', () => handleMouseDown(animPlayback, showcaseBrowser));
            }, 100);
        })
        .catch(err => {
            throw new Error(err)
        });
};

export default loadingAllSrc;