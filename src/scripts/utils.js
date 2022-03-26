import { FormValidator } from "./FormValidator.js";
import UserInfo from "./UserInfo.js";
import PopupWithForm from "./PopupWithForm.js";
import {Card} from "./Card";
import {handlePopupImage, formRenderer} from './index.js'

export const popupOnlyImageImg = document.querySelector('.popup-image__img');
export const popupOnlyImageTitle = document.querySelector('.popup-image__title');
export const formElementEdit = document.querySelector('.popup__form_type_edit');
export const formElementImage = document.querySelector('.popup__form_type_image');
export const buttonEdit = document.querySelector('.profile__button');
export const buttonAdd = document.querySelector('.profile__add-button');
export const elements = document.querySelector('.elements');

const configObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  buttonSelector: '.popup__button',
  inputErrorClass: 'popup__text_type_error',
  disableErrorClass: 'popup__button_disabled'
};

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const profileEditValidator = new FormValidator(configObject, formElementEdit);
export const imageAddValidator = new FormValidator(configObject, formElementImage);

export const userInfo = new UserInfo({
  person: '.profile__input-name',
  occupation: '.profile__input-occupation'});

export const editPopup = new PopupWithForm('.popup_type_edit', (submitCallback) => {
  userInfo.setUserInfo(submitCallback);
  editPopup.close()
});

export const imagePopup = new PopupWithForm('.popup_type_image', (formData) => {
  const item = { name: formData.popup__place, link: formData.popup__url };
  const card = new Card(item, '.elements__template', handlePopupImage);
  const formElement = card.generateCard();
  formRenderer.addItem(formElement);
  imagePopup.close()
})