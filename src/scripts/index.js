import { Card } from './Card.js';
import {
  configObject,
  initialCards,
  buttonEdit,
  buttonAdd,
  elements,
  formElementImage,
  formElementEdit
} from './utils.js';
import '../pages/index.css';
import Section from "./Section.js";
import PopupWithImage from './PopupWithImage.js';
import {FormValidator} from "./FormValidator";
import UserInfo from "./UserInfo";
import PopupWithForm from "./PopupWithForm";

const popupOpenWithOnlyImage = new PopupWithImage('.popup-image')

const handlePopupImage = (name, link) => {
  popupOpenWithOnlyImage.open({ name, link });
}

function createCard(item) {
  const card = new Card(item, '.elements__template', handlePopupImage);
  const cardElement = card.generateCard();
  cardsContainer.addItem(cardElement);
}

const profileEditValidator = new FormValidator(configObject, formElementEdit);
const imageAddValidator = new FormValidator(configObject, formElementImage);

const userInfo = new UserInfo({
  person: '.profile__input-name',
  occupation: '.profile__input-occupation'});

const editPopup = new PopupWithForm('.popup_type_edit', (submitCallback) => {
  userInfo.setUserInfo(submitCallback);
  editPopup.close()
});

const imagePopup = new PopupWithForm('.popup_type_image', (formData) => {
  const item = { name: formData.popup__place, link: formData.popup__url };
  createCard(item)
  imagePopup.close()
})

profileEditValidator.enableValidation();
imageAddValidator.enableValidation();
editPopup.setEventListeners();
imagePopup.setEventListeners();
popupOpenWithOnlyImage.setEventListeners();

export const cardsContainer = new Section({
  items: initialCards,
  renderer: (item) => {
    createCard(item)
  }
}, elements);

function openPopupEdit() {
  editPopup.open();
  profileEditValidator.resetValidation();
  const userData = userInfo.getUserInfo();
  const userName = document.querySelector('.popup__text_type_name');
  const userJob = document.querySelector('.popup__text_type_occupation');
  userName.value = userData.name;
  userJob.value = userData.job;
  profileEditValidator.checkButtonValidity();
}

function openPopupImage() {
  imagePopup.open();
  formElementImage.reset()
  imageAddValidator.resetValidation()
}

cardsContainer.renderItems();

buttonEdit.addEventListener('click', openPopupEdit);
buttonAdd.addEventListener('click', openPopupImage);