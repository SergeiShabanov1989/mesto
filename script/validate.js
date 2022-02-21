const ERRORS = {
    fieldMismatch: 'Вы пропустили это поле.'
};

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add('popup__text_type_error');
    errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove('popup__text_type_error');
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const setCustomError = (formElement, inputElement, {customErrorClass}) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    if (inputElement.value === '') {
        inputElement.classList.add(customErrorClass);
        errorElement.textContent = ERRORS.fieldMismatch;
    }
};

const setEventListeners = (formElement, { InputSelector, buttonSelector, ...rest}) => {
    const inputs = Array.from(formElement.querySelectorAll(InputSelector));
    const button = formElement.querySelector(buttonSelector);

    formElement.addEventListener('submit', () => disableButton(button, rest));

    checkButtonValidity(formElement, button, rest);

    inputs.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement);
            setCustomError(formElement, inputElement, rest);
            checkButtonValidity(formElement, button, rest);
        });
    });
};

const disableButton = (button, { disableErrorClass }) => {
    button.setAttribute('disabled', '');
    button.classList.add(disableErrorClass);
}
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

enableValidation({
    formSelector: '.popup__form',
    InputSelector: '.popup__text',
    buttonSelector: '.popup__button',
    customErrorClass: 'popup__text_type_error',
    disableErrorClass: 'popup__button_disabled'
});