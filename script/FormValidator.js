export class FormValidator {
  constructor(settings, form) {
    this._form = form;
    this._settings = settings;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
  }

  hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.hideInputError(inputElement);
    }
  }

  _disableButton() {
    this._button.setAttribute('disabled', '');
    this._button.classList.add(this._settings.disableErrorClass);
  }

  _checkButtonValidity() {
    if (this._form.checkValidity()) {
      this._button.removeAttribute('disabled');
      this._button.classList.remove(this._settings.disableErrorClass);
    } else {
      this._disableButton();
    }
  };

  _setEventListeners() {
    const { inputSelector, buttonSelector } = this._settings;
    this._inputs = Array.from(this._form.querySelectorAll(inputSelector));
    this._button = this._form.querySelector(buttonSelector);

    this._form.addEventListener('submit', () => this._disableButton());

    this._checkButtonValidity();

    this._inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._checkButtonValidity();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener('submit', evt => evt.preventDefault());
    this._setEventListeners();
  }
}