import { Card } from './Card.js';
import {
  profileEditValidator,
  imageAddValidator,
  userInfo,
  editPopup,
  initialCards,
  buttonEdit,
  buttonAdd,
  elements,
  imagePopup, formElementImage
} from './utils.js';
import '../pages/index.css';
import Section from "./Section.js";
import PopupWithImage from './PopupWithImage.js';

profileEditValidator.enableValidation();
imageAddValidator.enableValidation();
editPopup.setEventListeners();
imagePopup.setEventListeners();

export const handlePopupImage = (name, link) => {
  const popupOpenWithOnlyImage = new PopupWithImage(name, link, '.popup-image')
  popupOpenWithOnlyImage.open();
  popupOpenWithOnlyImage.setEventListeners()
}

const renderClassCard = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.elements__template', handlePopupImage);
    const cardElement = card.generateCard();
    renderClassCard.addItem(cardElement);
  }
}, elements);

function openPopupEdit() {
  editPopup.open();
  profileEditValidator.resetValidation();
  const userData = userInfo.getUserInfo();
  editPopup.inputList[0].value = userData.name;
  editPopup.inputList[1].value = userData.job;
  profileEditValidator.checkButtonValidity();
}

function openPopupImage() {
  imagePopup.open();
  imageAddValidator.resetValidation()
  formElementImage.reset()
}

renderClassCard.renderItems();

export const formRenderer = new Section({
  items: []
}, elements);


buttonEdit.addEventListener('click', openPopupEdit);
buttonAdd.addEventListener('click', openPopupImage);