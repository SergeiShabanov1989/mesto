let container = document.querySelector('.page');
let editButton = container.querySelector('.profile__button');
let popup = container.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-btn')
let saveButton = popup.querySelector('.popup__button');

function popupOpen() {
  popup.classList.add('popup_opened')
};

function popupClose() {
  popup.classList.remove('popup_opened')
};

editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
saveButton.addEventListener('click', popupClose);

let formElement = container.querySelector('.popup__container');
let nameInput = popup.querySelector('.popup__text_name');
let jobInput = popup.querySelector('.popup__text_occupation');
let nameNew = container.querySelector('.profile__input-name');
let JobNew= container.querySelector('.profile__input-occupation');

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameNew.textContent = nameInput.value;
  JobNew.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);