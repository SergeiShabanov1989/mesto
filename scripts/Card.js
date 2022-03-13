export class Card {
  constructor(card, cardSelector, handlePopupImage) {
    this._name = card.name;
    this._link = card.link;
    this._cardSelector = cardSelector;
    this._handlePopupImage = handlePopupImage;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__element')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {

    this._element = this._getTemplate();
    this._cardElement = this._element.querySelector('.elements__image');

    this._element.querySelector('.elements__text').textContent = this._name;
    this._element.querySelector('.elements__image').alt = this._name;
    this._cardElement.src= this._link;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._heartButton = this._element.querySelector('.elements__heart');

    this._cardElement.addEventListener('click', () => {
      this._handlePopupImage(this._name, this._link);
    });

    this._element.querySelector('.elements__trash').addEventListener('click', () => {
      this._deleteElement();
    });

    this._heartButton.addEventListener('click', () => {
      this._likeButton();
    });
  }

  _deleteElement = () => {
    this._element.remove();
    this._element = null
  }

  _likeButton = () => {
    this._heartButton.classList.toggle('elements__heart_active');
  }
}