import { Card } from './Card.js';
import {
  nameInput,
  jobInput,
  formElementEdit,
  formElementImage,
  editProfileValidator,
  addImageValidator,
  openPopup,
  closePopup,
  popupOnlyImageImg,
  popupOnlyImageTitle,
  popupOnlyImage
} from './utils.js';

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
const nameNew = container.querySelector('.profile__input-name');
const jobNew = container.querySelector('.profile__input-occupation');
const addButton = container.querySelector('.profile__add-button');
const elements = container.querySelector('.elements');
const popupAll = container.querySelectorAll('.popup');
const elementPlace = container.querySelector('.popup__text_type_place');
const elementUrl = container.querySelector('.popup__text_type_url');

editProfileValidator.enableValidation();
addImageValidator.enableValidation();

const handlePopupImage = (name, link) => {
  popupOnlyImageImg.src = link;
  popupOnlyImageImg.alt = name;
  popupOnlyImageTitle.textContent = name;
  openPopup(popupOnlyImage)
}

initialCards.forEach((item) => {
  const card = new Card(item, '.elements__template', handlePopupImage);
  const cardElement = card.generateCard();

  elements.prepend(cardElement);
});


function openPopupEdit() {
  openPopup(popupEdit)
  nameInput.value = nameNew.textContent;
  jobInput.value = jobNew.textContent;
  editProfileValidator.enableValidation();
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