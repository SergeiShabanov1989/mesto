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
const closeButtonEdit = popup.querySelector('.popup__close-btn_type_edit');
const formElementEdit = popup.querySelector('.popup__form_type_edit');
const nameInput = popup.querySelector('.popup__text_type_name');
const jobInput = popup.querySelector('.popup__text_type_occupation');
const renderTitle = popup.querySelector('.popup__title');
const nameNew = container.querySelector('.profile__input-name');
const jobNew = container.querySelector('.profile__input-occupation');
const addButton = container.querySelector('.profile__add-button');
const closeButtonImage = container.querySelector('.popup__close-btn_type_image')
const elements = container.querySelector('.elements');
const elementsTemplate = container.querySelector('.elements__template').content;
const elementPlace = container.querySelector('.popup__text_type_place');
const elementUrl = container.querySelector('.popup__text_type_url');
const formElementImage = container.querySelector('.popup__form_type_image');

function render() {
  initialCards.forEach(renderElement);
}

function renderElement(element) {
  const newElement = elementsTemplate.cloneNode(true);
  newElement.querySelector('.elements__text').textContent = element.name;
  newElement.querySelector('.elements__image').src = element.link;

  newElement.querySelector('.elements__heart').addEventListener('click', renderHeartActive);
  elements.prepend(newElement);
}

function popupEditOpen() {
  popupEdit.classList.add('popup_opened')
  nameInput.value = nameNew.textContent;
  jobInput.value = jobNew.textContent;
}

function popupEditClose() {
  popupEdit.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameNew.textContent = nameInput.value;
  jobNew.textContent = jobInput.value;
  popupEditClose();
}

function popupImageOpen() {
  popupImage.classList.add('popup_opened');
}

function popupImageClose() {
  popupImage.classList.remove('popup_opened');
  elementPlace.value = '';
  elementUrl.value = '';
}

function formSubmitHandler2 (evt) {
  evt.preventDefault();
  const newElement = elementsTemplate.cloneNode(true);
  newElement.querySelector('.elements__text').textContent = elementPlace.value;
  newElement.querySelector('.elements__image').src = elementUrl.value;

  // newElement.querySelector('.elements__heart').addEventListener('click', function (evt) {
  //   evt.target.classList.toggle('elements__heart_active');
  // });
  newElement.querySelector('.elements__heart').addEventListener('click', renderHeartActive);
  elements.prepend(newElement);
  popupImageClose();
}

// function renderHeartActive (evt) {
//   if (evt.target.classList.contains('elements__heart_active')) {
//     evt.target.classList.remove('elements__heart_active');
//   }
//   if (!evt.target.classList.contains('elements__heart_active')) {
//     evt.target.classList.add('elements__heart_active');
//   }
// }

function renderHeartActive (evt) {
  if (!evt.target.classList.contains('elements__heart_active')) {
    evt.target.classList.add('elements__heart_active');
  } else {
    evt.target.classList.remove('elements__heart_active');
  }
}

// function renderHeart (evt) {
//   const item = evt.target.closest('.elements__element').querySelector('.elements__heart');
//   item.classList.add('elements__heart_active');
// }

render()

editButton.addEventListener('click', popupEditOpen);
closeButtonEdit.addEventListener('click', popupEditClose);
formElementEdit.addEventListener('submit', formSubmitHandler);
addButton.addEventListener('click', popupImageOpen);
closeButtonImage.addEventListener('click', popupImageClose);
formElementImage.addEventListener('submit', formSubmitHandler2);
//elementHeart.addEventListener('click', renderHeart);