import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popup, submitCallback) {
    super(popup);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector('.popup__form');
    this.inputList = this._form.querySelectorAll('.popup__text');
  }

  _getInputValues() {
    this._inputsValues = {};
    this.inputList.forEach((input) => {
      this._inputsValues[input.name] = input.value;
    })

    return this._inputsValues
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
      console.log(this.inputList[0].value)
    })
  };

  close() {
    super.close();
  }
}
