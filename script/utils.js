import { FormValidator } from "./FormValidator.js";

export const popupOnlyImage = document.querySelector('.popup-image');
export const popupOnlyImageImg = document.querySelector('.popup-image__img');
export const popupOnlyImageTitle = document.querySelector('.popup-image__title');
export const nameInput = document.querySelector('.popup__text_type_name');
export const jobInput = document.querySelector('.popup__text_type_occupation');
export const formElementEdit = document.querySelector('.popup__form_type_edit');
export const formElementImage = document.querySelector('.popup__form_type_image');

const configObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  buttonSelector: '.popup__button',
  inputErrorClass: 'popup__text_type_error',
  disableErrorClass: 'popup__button_disabled'
};

export const editProfileValidator = new FormValidator(configObject, formElementEdit);
export const addImageValidator = new FormValidator(configObject, formElementImage);

//функция открытия всех попапов
export function openPopup(el) {
  el.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
}

export function closePopupOnEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened')
    closePopup(popupOpened)
    editProfileValidator.hideInputError(nameInput);
    editProfileValidator.hideInputError(jobInput);
  }
}

//функция закрытия всех попапов
export function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePopupOnEsc);
}