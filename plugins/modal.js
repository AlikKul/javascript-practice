function _createModal(options) {
    const modal = document.createElement('div');
    modal.classList.add('zmodal');
    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal-overlay">
            <div class="modal-window">
                <div class="modal-header">
                    <span class="modal-title">Modal title</span>
                    <span class="modal-close">&times;</span>
                </div>
                <div class="modal-body">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, omnis.</p>
                </div>
                <div class="modal-footer">
                    <button>OK</button>
                    <button>close</button>
                </div>
            </div>
        </div>
    `);
    document.body.appendChild(modal);
    return modal;
}

$.modal = function() {
    const $modal = _createModal();
    let isClosing = false;

    return {
        open() {
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
        destroy() {}
    };
};