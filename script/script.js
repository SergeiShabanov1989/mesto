let container = document.querySelector('.page');
let editButton = container.querySelector('.profile__button');
let popup = container.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-btn')
let saveButton = popup.querySelector('.popup__button');
let formElement = container.querySelector('.popup__form');
let nameInput = popup.querySelector('.popup__text_type_name');
let jobInput = popup.querySelector('.popup__text_type_occupation');
let nameNew = container.querySelector('.profile__input-name');
let jobNew= container.querySelector('.profile__input-occupation');

function popupOpen() {
  popup.classList.add('popup_opened')
  nameInput.value = nameNew.textContent;
  jobInput.value = jobNew.textContent;
};

function popupClose() {
  popup.classList.remove('popup_opened')
};

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameNew.textContent = nameInput.value;
  jobNew.textContent = jobInput.value;
  popupClose();
}

editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler);