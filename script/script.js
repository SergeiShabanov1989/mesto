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
const elementsTemplate = container.querySelector('.elements__template').content;
const elementPlace = container.querySelector('.popup__text_type_place');
const elementUrl = container.querySelector('.popup__text_type_url');
const formElementImage = container.querySelector('.popup__form_type_image');
const popupOnlyImage = container.querySelector('.popup-image');
const popupOnlyImageImg = container.querySelector('.popup-image__img');
const popupOnlyImageTitle = container.querySelector('.popup-image__title');
const popupAll = container.querySelectorAll('.popup');

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
  listenerEscape(popupEdit)
}

//функция открытия всех попапов
function openPopup(el) {
  el.classList.add('popup_opened');
}

//функция закрытия всех попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', listenerEscape)
}

function closePopupButton() {
  popupAll.forEach((popup) => {
      popup.addEventListener('click', (evt) => {
          if (evt.target.classList.contains('popup__close-btn') || evt.target.closest('.popup__button') || evt.target === evt.currentTarget) {
          closePopup(popup)
          }
      })
  })
}

function listenerEscape (popup) {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closePopup(popup)
    }
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
  listenerEscape(popupImage)
}

function addItem(evt) {
  evt.preventDefault();
  const cardData = { name: elementPlace.value, link: elementUrl.value};
  elements.prepend(createCard(cardData));
  formElementImage.reset();
  closePopupButton()
}

function addListeners(el) {
  el.querySelector('.elements__trash').addEventListener('click', deleteElement);
  el.querySelector('.elements__heart').addEventListener('click', renderHeartActive);
  el.querySelector('.elements__image').addEventListener('click', renderPopupImage);
}

function renderPopupImage (evt) {
  popupOnlyImageImg.src = evt.target.closest('.elements__image').src;
  popupOnlyImageImg.alt = evt.target.closest('.elements__image').alt;
  popupOnlyImageTitle.textContent = evt.target.closest('.elements__element').querySelector('.elements__text').textContent;
  openPopup(popupOnlyImage)
  listenerEscape(popupOnlyImage)
}

function renderHeartActive (evt) {
  evt.target.classList.toggle('elements__heart_active');
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
