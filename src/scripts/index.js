import { Card } from './Card.js';
import {
  configObject,
  buttonEdit,
  buttonAdd,
  elements,
  formElementImage,
  formElementEdit,
  userName,
  userJob,
  formElementAvatar,
  buttonEditAvatar
} from './utils.js';
import '../pages/index.css';
import Section from "./Section.js";
import PopupWithImage from './PopupWithImage.js';
import {FormValidator} from "./FormValidator.js";
import UserInfo from "./UserInfo.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithConfirmation from "./ PopupWithConfirmation.js";
import Api from "./Api.js";

export let userId

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: '017c8524-22bd-4ddc-a57d-40a778bf66bd',
    'Content-Type': 'application/json'
  }
});

Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData.name, userData.about, userData.avatar)
    userId = userData._id;

    cards.forEach(data => {
      createCard(data)
    })
})

const popupOpenWithOnlyImage = new PopupWithImage('.popup-image')

const handlePopupImage = (name, link) => {
  popupOpenWithOnlyImage.open({ name, link });
}

function createCard(item) {
  const card = new Card(item,
    '.elements__template',
    handlePopupImage,
    (id) => {
        deletePopup.open();
        deletePopup.getIdElement(() => {
          api.deleteCard(id)
            .finally(() => {
              card.deleteElement()
              deletePopup.close()
            })
        });
      },
    (id) => {
    if (card.isLike()) {
      api.deleteLike(id)
        .then(res => {
          card.likeCounter(res.likes)
        })
    } else {
      api.addLike(id)
        .then(res => {
          card.likeCounter(res.likes)
        })
    }
  });
  const cardElement = card.generateCard();
  cardsContainer.addItem(cardElement);
}

const profileEditValidator = new FormValidator(configObject, formElementEdit);
const imageAddValidator = new FormValidator(configObject, formElementImage);
const avatarEditValidator = new FormValidator(configObject, formElementAvatar);

const userInfo = new UserInfo({
  person: '.profile__input-name',
  occupation: '.profile__input-occupation',
  avatar: '.profile__avatar'});

const editPopup = new PopupWithForm('.popup_type_edit', (submitCallback) => {
  editPopup.setButtonText('Сохранение...')
  api.editProfile(submitCallback.popup__name, submitCallback.popup__occupation)
    .then(res => {
      userInfo.setUserInfo(res.name, res.about, res.avatar);
    })
    .finally(() => {
      editPopup.close()
      editPopup.setButtonText('Сохранить')
    })
});

const imagePopup = new PopupWithForm('.popup_type_image', (formData) => {
  imagePopup.setButtonText('Сохранение...')
  api.addCard(formData.popup__place, formData.popup__url)
    .then(res => {
      createCard(res)
    })
    .finally(() => {
      imagePopup.close()
      imagePopup.setButtonText('Сохранить')
    })
})

const avatarPopup = new PopupWithForm('.popup_type_avatar', (submitCallback) => {
  avatarPopup.setButtonText('Сохранение...')
  api.editAvatar(submitCallback.popup__url)
    .then(res => {
      userInfo.setUserInfo(res.name, res.about, res.avatar);
    })
    .finally(() => {
      avatarPopup.close()
      avatarPopup.setButtonText('Сохранить')
    })
})

const deletePopup = new PopupWithConfirmation('.popup_type_delete');

profileEditValidator.enableValidation();
imageAddValidator.enableValidation();
avatarEditValidator.enableValidation();
editPopup.setEventListeners();
imagePopup.setEventListeners();
popupOpenWithOnlyImage.setEventListeners();
deletePopup.setEventListeners();
avatarPopup.setEventListeners();

const cardsContainer = new Section({
  items: [],
  renderer: (item) => {
    createCard(item)
  }
}, elements);

function openPopupEdit() {
  editPopup.open();
  profileEditValidator.resetValidation();
  const userData = userInfo.getUserInfo();
  userName.value = userData.name;
  userJob.value = userData.job;
  profileEditValidator.checkButtonValidity();
}

function openPopupImage() {
  imagePopup.open();
  formElementImage.reset();
  imageAddValidator.resetValidation();
}

function openPopupAvatar() {
  avatarPopup.open();
  formElementAvatar.reset();
  avatarEditValidator.resetValidation();
}

cardsContainer.renderItems();

buttonEdit.addEventListener('click', openPopupEdit);
buttonAdd.addEventListener('click', openPopupImage);
buttonEditAvatar.addEventListener('click', openPopupAvatar);