export function createContainer(){
    const container = document.createElement('div');
    container.classList.add('foto-popup-container');
    return container;
}

export function mountFotoPopupInDocument(container, layout){
    container.innerHTML = layout;
    document.body.appendChild(container);
    return container;
}

export function getImages(node){
    return node.querySelectorAll('img');
}

export function getImgPaths(node){
    const images = getImages(node);
    const imagesPaths = Array.prototype.map.call(images, function(img, idx){
        return img.src
    });
    return imagesPaths;
}