import { mountFotoPopupInDocument, createContainer, getImgPaths, getImages } from "./utils";
import { popupLayout } from "../../../components/public/modal-screenshots/popupLayput";
import { onTransitionEndHandler } from "../../utils";

export class FotoPopup{
    constructor({node=undefined, counter=false, controls=false, layout=undefined, caption=false} = {}){
        this.node = node;
        this.counter = counter;
        this.controls = controls;
        this.caption = caption;
        this.layout = layout;
    }

    setImgPathsToState(){
        this.imgPaths = getImgPaths(this.node);
    }

    prepareImagesForInteractions(){
        const images = getImages(this.node);
        if(images){
            images.forEach((img, i) => img.setAttribute('data-index', i));
        }
    }

    handleImageClick = (event) => {
        const target = event.target;
        event.preventDefault();
        if(target.nodeName === 'IMG') {
            const index = target.dataset['index'];
            this.popup.style.display = 'flex';
            this.imgelement.src = this.imgPaths[index];
            setTimeout(() => {
                this.popup.classList.add('active');
            },150)
        };
    }

    handleCloseBtnClick = () => {
        this.popup.classList.remove('active');
    }

    handleClickOutsidePopup = (event) => {
        if( this.popup.querySelector('.modal-screenshots').contains(event.target)) return;
        else this.handleCloseBtnClick();
    }

    handleOnEscDown = (e) => {
        if (e.key !== "Escape") return;
        this.handleCloseBtnClick();
    } 

    addListeners(){
        const btnClose = this.popup.querySelector('.modal-screenshots__close-btn');
        btnClose.addEventListener('click', this.handleCloseBtnClick);
        this.node.addEventListener('click', this.handleImageClick);
        this.popup.addEventListener('click', this.handleClickOutsidePopup);
        this.popup.addEventListener('transitionend', onTransitionEndHandler.bind(this, 
            'opacity',
            () => this.popup.style.display = 'none'   
        ))
        window.addEventListener("keydown", this.handleOnEscDown, false);
    }

    init(){
        if(this.node === undefined) throw new Error('Node must be assign');
        if(this.layout === undefined) throw new Error('Layout must be assign');
        
        this.setImgPathsToState();
        this.prepareImagesForInteractions();
        this.popup = mountFotoPopupInDocument(createContainer(), popupLayout())
        this.imgelement = this.popup.querySelector('img');
        this.addListeners();

        return this;
    }
}