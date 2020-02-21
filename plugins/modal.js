function _createModalFooter(buttons = []) {
    if (buttons.length === 0) {
        return document.createElement('div');
    }
    const wrap = document.createElement('div');
    wrap.classList.add('modal-footer');
    buttons.forEach(btn => {
        const button = document.createElement('button');
        button.textContent = btn.text;
        button.classList.add('btn');
        button.classList.add(`btn-${btn.type}`);
        button.addEventListener('click', btn.handler);
        wrap.appendChild(button);
    });

    return wrap;
}

function _createModal(options) {
    const modal = document.createElement('div');
    modal.classList.add('zmodal');
    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal-overlay" data-close="true">
            <div class="modal-window" style="width: ${options.width}">
                <div class="modal-header">
                    <span class="modal-title">${options.title || ''}</span>
                    ${options.closable ? `<span class="modal-close" data-close="true">&times;</span>` : ''}
                </div>
                <div class="modal-body" data-content="true">
                    <p>${options.content || ''}</p>
                </div>
            </div>
        </div>
    `);
    const footer = _createModalFooter(options.footerButtons);
    modal.querySelector('[data-content]').parentNode.insertBefore(footer, modal.querySelector('[data-content]').nextSibling);
    document.body.appendChild(modal);
    return modal;
}

$.modal = function(options) {
    const $modal = _createModal(options);
    let isClosing = false;
    let destroyed = false;
    const modal = {
        open() {
            if (destroyed) {
                return console.log('Modal window is destroyed. Create new befor opening.');
            }
            if (!isClosing) {
                $modal.classList.add('open');
            }
        },
        close() {
            isClosing = true;
            $modal.classList.remove('open');
            $modal.classList.add('hide');
            setTimeout(() => {
                isClosing = false;
                $modal.classList.remove('hide');
            }, 200);
        },
        setContent(html) {
            $modal.querySelector('[data-content]').innerHTML = html;
        }
    };

    const listener = event => {
        if (event.target.dataset.close) {
            modal.close();
        }
    };

    $modal.addEventListener('click', listener);

    return Object.assign(modal, {  // Object.assign - раширяет существующий объект
        destroy() {
            $modal.parentNode.removeChild($modal);
            $modal.removeEventListener('click', listener);
            destroyed = true;
        }
    });
};