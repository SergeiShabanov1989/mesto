import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popup, handleSubmit) {
    super(popup);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector('.popup__form');
  }

  getIdElement(submitHandler) {
    this._handleSubmit = submitHandler;
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this.getIdElement());
    })
  };
}