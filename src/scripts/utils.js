export const popupOnlyImageImg = document.querySelector('.popup-image__img');
export const popupOnlyImageTitle = document.querySelector('.popup-image__title');
export const formElementEdit = document.querySelector('.popup__form_type_edit');
export const formElementImage = document.querySelector('.popup__form_type_image');
export const buttonEdit = document.querySelector('.profile__button');
export const buttonAdd = document.querySelector('.profile__add-button');
export const elements = document.querySelector('.elements');
export const userName = document.querySelector('.popup__text_type_name');
export const userJob = document.querySelector('.popup__text_type_occupation');

export const configObject = {
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