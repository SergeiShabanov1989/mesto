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

const setCustomError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    if (inputElement.value === '') {
        inputElement.classList.add('popup__text_type_error');
        errorElement.textContent = ERRORS.fieldMismatch;
    }
}

const setEventListeners = (formElement) => {
    const inputs = Array.from(formElement.querySelectorAll('.popup__text'));
    const button = formElement.querySelector('.popup__button');

    checkButtonValidity(formElement, button);
    inputs.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            setCustomError(formElement, inputElement);
            checkButtonValidity(formElement, button);
        });
    });
};

const disableButton = (formElement, button) => {
    button.setAttribute('disabled', '');
    button.classList.add('popup__button_disabled');
}
const checkButtonValidity = (formElement, button) => {
    if (formElement.checkValidity()) {
        button.removeAttribute('disabled');
        button.classList.remove('popup__button_disabled');
    } else {
        disableButton(formElement, button);
    }
}

const enableValidation = ( {formSelector} ) => {
    const form = Array.from(document.querySelectorAll(formSelector));

    form.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) =>{
            evt.preventDefault();
        });
        setEventListeners(formElement);
    });
};

enableValidation({
    formSelector: '.popup__form'
});