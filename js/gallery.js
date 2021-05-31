import wholeGallery from './gallery-items.js';

const refs = {
  galleryList: document.querySelector('ul.js-gallery'),
  modalWindow: document.querySelector('.lightbox'),
  modalOverlay: document.querySelector('.lightbox__overlay'),
  modalContent: document.querySelector('.lightbox__content'),
  modalImage: document.querySelector('img.lightbox__image'),
  modalCloseBtn: document.querySelector('.lightbox__button')
};

function createGallery() {
  const createImageList = (arr) =>
    arr
      .map(({ preview, original, description }) => {
        return `
        <li class='gallery__item'>
          <a class='gallery__link' href=${original}>
            <img class='gallery__img' src ='${preview}' data-source = '${original}' alt=${description}>
          </a>
        </li>`
      })
      .join('');
  refs.galleryList.insertAdjacentHTML('afterbegin', createImageList(wholeGallery));
}
createGallery(wholeGallery);

refs.galleryList.addEventListener('click', modalOpen);

function modalOpen(event) {
  if (event.target === refs.galleryList) {
    return;
  }
  event.preventDefault();
  refs.modalWindow.classList.add('is-open');
  refs.modalImage.src = event.target.dataset.source;
  refs.modalImage.alt = event.target.alt;
}

refs.modalCloseBtn.addEventListener('click', modalClose);
refs.modalWindow.addEventListener('click', modalClose);
window.addEventListener('keydown', onEscPress);

function modalClose() {
  refs.modalWindow.classList.remove('is-open');
  refs.modalImage.src = '';
  refs.modalImage.alt = '';
};

function onEscPress(evt) {
  if (evt.key === 'Escape') {
    modalClose();
  }   
};


