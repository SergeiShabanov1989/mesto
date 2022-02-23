const configObject = {
  formSelector: '.popup__form',
  InputSelector: '.popup__text',
  buttonSelector: '.popup__button',
  inputErrorClass: 'popup__text_type_error',
  disableErrorClass: 'popup__button_disabled'
};

const showInputError = (formElement, inputElement, errorMessage, { inputErrorClass }) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, { inputErrorClass }) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, rest) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, rest);
  } else {
    hideInputError(formElement, inputElement, rest);
  }
};

const setEventListeners = (formElement, { InputSelector, buttonSelector, ...rest}) => {
  const inputs = Array.from(formElement.querySelectorAll(InputSelector));
  const button = formElement.querySelector(buttonSelector);

  formElement.addEventListener('submit', () => disableButton(button, rest));

  checkButtonValidity(formElement, button, rest);

  inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, rest);
      checkButtonValidity(formElement, button, rest);
    });
  });
};

const disableButton = (button, { disableErrorClass }) => {
  button.setAttribute('disabled', '');
  button.classList.add(disableErrorClass);
};

const checkButtonValidity = (formElement, button, { disableErrorClass }) => {
  if (formElement.checkValidity()) {
    button.removeAttribute('disabled');
    button.classList.remove( disableErrorClass);
  } else {
    disableButton(button, { disableErrorClass });
  }
};

const enableValidation = ( {formSelector, ...rest} ) => {
  const form = Array.from(document.querySelectorAll(formSelector));

  form.forEach((formElement) => {
    formElement.addEventListener('submit', evt => evt.preventDefault());
    setEventListeners(formElement, rest);
  });
};

enableValidation(configObject);