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
const popup = container.querySelector('.popup');
const popupEdit = container.querySelector('.popup_type_edit')
const popupImage = container.querySelector('.popup_type_image')
const formElementEdit = popup.querySelector('.popup__form_type_edit');
const nameInput = popup.querySelector('.popup__text_type_name');
const jobInput = popup.querySelector('.popup__text_type_occupation');
const renderTitle = popup.querySelector('.popup__title');
const nameNew = container.querySelector('.profile__input-name');
const jobNew = container.querySelector('.profile__input-occupation');
const addButton = container.querySelector('.profile__add-button');
const elements = container.querySelector('.elements');
const elementsTemplate = container.querySelector('.elements__template').content;
const elementPlace = container.querySelector('.popup__text_type_place');
const elementUrl = container.querySelector('.popup__text_type_url');
const formElementImage = container.querySelector('.popup__form_type_image');
const popupOnlyImage = container.querySelector('.popup-image');
const popupOnlyImageImg = container.querySelector('.popup-image__img');
const popupOnlyImageTitle = container.querySelector('.popup-image__title');
const popupAll = container.querySelectorAll('.popup');
const popupCLoseButton = container.querySelectorAll('.popup__close-btn');

function render() {
  initialCards.forEach(function (card) {
    elements.prepend(createCard(card))
  });
}

//функция создание карточек
function createCard(card) {
  const newElement = elementsTemplate.cloneNode(true);
  newElement.querySelector('.elements__text').textContent = card.name;
  newElement.querySelector('.elements__image').alt = card.name;
  newElement.querySelector('.elements__image').src = card.link;
  addListeners(newElement);
  return newElement;
}

function openPopupEdit() {
  openPopup(popupEdit)
  nameInput.value = nameNew.textContent;
  jobInput.value = jobNew.textContent;
}

//функция открытия всех попапов
function openPopup(el) {
  el.classList.add('popup_opened');
}

//функция закрытия всех попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened')
}

function closePopupButton() {
  popupAll.forEach((popup) => {
      popup.addEventListener('click', (evt) => {          
          if (evt.target.classList.contains('popup__close-btn') || evt.target.closest('.popup__button')) {
          closePopup(popup)
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

function resetForm() {
  elementPlace.value = '';
  elementUrl.value = '';
  closePopupButton()
}


function addItem(evt) {
  evt.preventDefault();
  const obj = { name: elementPlace.value, link: elementUrl.value};
  elements.prepend(createCard(obj));
  resetForm();
}

function addListeners(el) {
  el.querySelector('.elements__trash').addEventListener('click', deleteElement);
  el.querySelector('.elements__heart').addEventListener('click', renderHeartActive);
  el.querySelector('.elements__image').addEventListener('click', renderPopupImage);
}

function renderPopupImage (evt) {
  if (evt.target.closest('.elements__element')) {
    popupOnlyImageImg.src = evt.target.closest('.elements__image').src;
    popupOnlyImageImg.alt = evt.target.closest('.elements__image').alt;
    popupOnlyImageTitle.innerText = evt.target.closest('.elements__element').querySelector('.elements__text').textContent;
    openPopup(popupOnlyImage)
  }
}

function renderHeartActive (evt) {
  if (!evt.target.classList.contains('elements__heart_active')) {
    evt.target.classList.add('elements__heart_active');
  } else {
    evt.target.classList.remove('elements__heart_active');
  }
}

function deleteElement(event) {
  event.target.closest('.elements__element').remove();
}

render()
closePopupButton()

editButton.addEventListener('click', openPopupEdit);
formElementEdit.addEventListener('submit', submitFormHandler);
addButton.addEventListener('click', openPopupImage);
formElementImage.addEventListener('submit', addItem);