import { FormValidator } from "./FormValidator.js";

export const popupOnlyImage = document.querySelector('.popup-image');
export const popupOnlyImageImg = document.querySelector('.popup-image__img');
export const popupOnlyImageTitle = document.querySelector('.popup-image__title');
export const nameInput = document.querySelector('.popup__text_type_name');
export const jobInput = document.querySelector('.popup__text_type_occupation');
export const formElementEdit = document.querySelector('.popup__form_type_edit');
export const formElementImage = document.querySelector('.popup__form_type_image');
export const popupEdit = document.querySelector('.popup_type_edit');
export const popupImage = document.querySelector('.popup_type_image')
export const nameNew = document.querySelector('.profile__input-name');
export const jobNew = document.querySelector('.profile__input-occupation');

const configObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  buttonSelector: '.popup__button',
  inputErrorClass: 'popup__text_type_error',
  disableErrorClass: 'popup__button_disabled'
};

export const profileEditValidator = new FormValidator(configObject, formElementEdit);
export const imageAddValidator = new FormValidator(configObject, formElementImage);

//функция открытия всех попапов
export function openPopup(el) {
  el.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
}

export function closePopupOnEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened')
    closePopup(popupOpened)
  }
}

//функция закрытия всех попапов
export function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePopupOnEsc);
}

export function openPopupEdit() {
  openPopup(popupEdit)
  profileEditValidator.resetValidation()
  nameInput.value = nameNew.textContent;
  jobInput.value = jobNew.textContent;
  profileEditValidator.checkButtonValidity();
}

export function openPopupImage() {
  openPopup(popupImage)
  imageAddValidator.resetValidation()
}