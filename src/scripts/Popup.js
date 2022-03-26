export default class Popup {
  constructor(popup) {
    this._popup = document.querySelector(popup);
  }

  open() {
    this._popup.classList.add('popup_opened');
    this._handleEscClose();
  }

  close() {
    this._popup.classList.remove('popup_opened')
  }

  _handleEscClose = () => {
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        this.close()
      }
    })
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup__close-btn') || evt.target === evt.currentTarget) {
        this.close();
      }
    })
  }
}