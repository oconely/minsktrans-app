import './style.css';

class Toast {
    constructor({ transitionLength, closeBtn = false }) {
        if (document.querySelector('.toastsContain')) return;
        this.transitionLength = transitionLength || 700;
        this.toastsRoot = document.createElement('div');
        this.closeBtn = closeBtn;
        this.toasts = [];

        this.toastsRoot.classList.add('toastsContain');
        document.body.append(this.toastsRoot);

        this.removeToast = this.removeToast.bind(this);
    }

    addToast(str, time, addClass = 'toast_default') {
        if (!time || time === 'default') {
            time = 2000;
        }

        let toastEl = document.createElement('div');
        toastEl.classList.add('toast');
        toastEl.classList.add(addClass);
        toastEl.style.cssText = `transition: margin-top ${this.transitionLength}ms, transform ${this.transitionLength}ms, opacity ${this.transitionLength}ms;`;
        toastEl.innerText = str;
        
        if (this.closeBtn) {
            let closeBtn = document.createElement('span');
            closeBtn.classList.add('toast__close-btn');
            closeBtn.innerHTML = '&times;';
            toastEl.appendChild(closeBtn);
            closeBtn.addEventListener('click', () => this.removeToast(toastEl));
        }

        this.toastsRoot.prepend(toastEl);

        setTimeout(() => toastEl.classList.add('toast_open'), 20);
        setTimeout(() => {
            if (this.toastsRoot.contains(toastEl)) {
                toastEl.classList.remove('toast_open')
            }
        }, time);
        setTimeout(() => {
            if (this.toastsRoot.contains(toastEl)) {
                this.removeToast(toastEl)
            }
        }, time + this.transitionLength );

        return toastEl;
    }

    removeToast(toast, cb = false) {
        if (this.toastsRoot.contains(toast)) {
            toast.classList.remove('toast_open');
            setTimeout(() => {
                if (this.toastsRoot.contains(toast)) {
                    this.toastsRoot.removeChild(toast);
                }
                if (cb) cb();
            }, this.transitionLength);
        } else {
            if (cb) cb();
        }   
    }
}

export default Toast;