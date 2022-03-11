import { Card } from './Card.js';
import  { FormValidator } from './FormValidator.js'

const initialCards = [
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

const container = document.querySelector('.page');
const editButton = container.querySelector('.profile__button');
const popupEdit = container.querySelector('.popup_type_edit')
const popupImage = container.querySelector('.popup_type_image')
const formElementEdit = container.querySelector('.popup__form_type_edit');
const nameInput = container.querySelector('.popup__text_type_name');
const jobInput = container.querySelector('.popup__text_type_occupation');
const nameNew = container.querySelector('.profile__input-name');
const jobNew = container.querySelector('.profile__input-occupation');
const addButton = container.querySelector('.profile__add-button');
const elements = container.querySelector('.elements');
const elementPlace = container.querySelector('.popup__text_type_place');
const elementUrl = container.querySelector('.popup__text_type_url');
const formElementImage = container.querySelector('.popup__form_type_image');
export const popupOnlyImage = container.querySelector('.popup-image');
export const popupOnlyImageImg = container.querySelector('.popup-image__img');
export const popupOnlyImageTitle = container.querySelector('.popup-image__title');
const popupAll = container.querySelectorAll('.popup');

const configObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  buttonSelector: '.popup__button',
  inputErrorClass: 'popup__text_type_error',
  disableErrorClass: 'popup__button_disabled'
};

const editProfileValidator = new FormValidator(configObject, formElementEdit);
const addImageValidator = new FormValidator(configObject, formElementImage);

editProfileValidator.enableValidation();
addImageValidator.enableValidation();

initialCards.forEach((item) => {
  const card = new Card(item, '.elements__template');
  const cardElement = card.generateCard();

  elements.prepend(cardElement);
});

function openPopupEdit() {
  openPopup(popupEdit)
  nameInput.value = nameNew.textContent;
  jobInput.value = jobNew.textContent;
  editProfileValidator.enableValidation();
}

//функция открытия всех попапов
export function openPopup(el) {
  el.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
}

function closePopupOnEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened')
    closePopup(popupOpened)
    editProfileValidator.hideInputError(nameInput);
    editProfileValidator.hideInputError(jobInput);
  }
}

//функция закрытия всех попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePopupOnEsc);
}

function closePopupButton() {
  popupAll.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup__close-btn') || evt.target.closest('.popup__button') || evt.target === evt.currentTarget) {
        closePopup(popup);
        editProfileValidator.hideInputError(nameInput);
        editProfileValidator.hideInputError(jobInput);
      }
    })
  })
}

function submitFormHandler (evt) {
  evt.preventDefault();
  nameNew.textContent = nameInput.value;
  jobNew.textContent = jobInput.value;
  closePopupButton()
}

function openPopupImage() {
  openPopup(popupImage)
}

function addItem(evt) {
  evt.preventDefault();
  const cardData = { name: elementPlace.value, link: elementUrl.value};
  const card = new Card(cardData, '.elements__template');
  const cardElement = card.generateCard();

  formElementImage.reset();
  elements.prepend(cardElement);
  closePopupButton()
}

closePopupButton()

editButton.addEventListener('click', openPopupEdit);
formElementEdit.addEventListener('submit', submitFormHandler);
addButton.addEventListener('click', openPopupImage);
formElementImage.addEventListener('submit', addItem);