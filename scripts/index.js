import { Card } from './Card.js';
import {
  nameInput,
  jobInput,
  formElementEdit,
  formElementImage,
  openPopup,
  closePopup,
  popupOnlyImageImg,
  popupOnlyImageTitle,
  popupOnlyImage,
  openPopupEdit,
  nameNew,
  jobNew,
  openPopupImage,
  popupEdit,
  popupImage,
  profileEditValidator,
  imageAddValidator
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
const buttonEdit = container.querySelector('.profile__button');
const buttonAdd = container.querySelector('.profile__add-button');
const elements = container.querySelector('.elements');
const popupAll = container.querySelectorAll('.popup');
const placeElement = container.querySelector('.popup__text_type_place');
const urlElement = container.querySelector('.popup__text_type_url');

profileEditValidator.enableValidation();
imageAddValidator.enableValidation();

const handlePopupImage = (name, link) => {
  popupOnlyImageImg.src = link;
  popupOnlyImageImg.alt = name;
  popupOnlyImageTitle.textContent = name;
  openPopup(popupOnlyImage)
}

const renderCard = (data) => {
  const card = new Card(data, '.elements__template', handlePopupImage);
  const cardElement = card.generateCard();

  elements.prepend(cardElement);
}

initialCards.forEach((item) => {
  renderCard(item)
});

popupAll.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close-btn') || evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  })
})

function submitFormHandler (evt) {
  evt.preventDefault();
  nameNew.textContent = nameInput.value;
  jobNew.textContent = jobInput.value;
  closePopup(popupEdit)
}

function addItem(evt) {
  evt.preventDefault();
  const cardData = { name: placeElement.value, link: urlElement.value};
  renderCard(cardData)
  closePopup(popupImage)
  formElementImage.reset();
}

buttonEdit.addEventListener('click', openPopupEdit);
formElementEdit.addEventListener('submit', submitFormHandler);
buttonAdd.addEventListener('click', openPopupImage);
formElementImage.addEventListener('submit', addItem);