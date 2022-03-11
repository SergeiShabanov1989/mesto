import { popupOnlyImage, popupOnlyImageImg, popupOnlyImageTitle, openPopup } from './index.js'

export class Card {
  constructor(card, cardSelector) {
    this._name = card.name;
    this._link = card.link;
    this._cardSelector = cardSelector;
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
    this._setEventListeners();

    this._element.querySelector('.elements__text').textContent = this._name;
    this._element.querySelector('.elements__image').alt = this._name;
    this._element.querySelector('.elements__image').src = this._link;

    return this._element;
  }

  _openPopupImage() {
    popupOnlyImageImg.src = this._link;
    popupOnlyImageImg.alt = this._name;
    popupOnlyImageTitle.textContent = this._name;
    openPopup(popupOnlyImage)
  }

  _setEventListeners() {
    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._openPopupImage();
    });

    this._element.querySelector('.elements__trash').addEventListener('click', () => {
      this._deleteElement();
    });

    this._element.querySelector('.elements__heart').addEventListener('click', () => {
      this._likeButton();
    });
  }

  _deleteElement() {
    this._element.remove();
  }

  _likeButton() {
    this._element.querySelector('.elements__heart').classList.toggle('elements__heart_active');
  }
}