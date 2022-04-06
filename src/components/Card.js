import {userId} from '../pages/index.js'

export class Card {
  constructor(card, cardSelector, handlePopupImage, handleDeleteClick, handleLikeClick) {
    this._name = card.name;
    this._link = card.link;
    this._likes = card.likes;
    this._id = card._id;
    this._userId = userId;
    this._ownerId = card.owner._id;

    this._cardSelector = cardSelector;
    this._handlePopupImage = handlePopupImage;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
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
    this._cardElement.alt = this._name;
    this._cardElement.src= this._link;

    this._setEventListeners();
    this.likeCounter(this._likes);

    if (this._ownerId !== this._userId) {
      this._element.querySelector('.elements__trash').style.display = 'none';
    }

    return this._element;
  }

  _setEventListeners() {
    this._heartButton = this._element.querySelector('.elements__heart');

    this._cardElement.addEventListener('click', () => {
      this._handlePopupImage(this._name, this._link);
    });

    this._element.querySelector('.elements__trash').addEventListener('click', () => {
      this._handleDeleteClick(this._id);
    });

    this._heartButton.addEventListener('click', () => {
      this._handleLikeClick(this._id);
    });
  }

  deleteElement = () => {
    this._element.remove();
    this._element = null
  }

  isLike() {
    const userHasLike = this._likes.find(user => user._id === this._userId)
    return userHasLike
  }

  likeCounter(newLikes) {
    this._likes = newLikes
    const likeCount = this._element.querySelector('.elements__heart-count');
    likeCount.textContent = this._likes.length;

    if (this.isLike()) {
      this._likeButton()
    } else {
      this._hideLikeButton()
    }
  }

  _likeButton = () => {
    this._heartButton.classList.add('elements__heart_active');
  }

  _hideLikeButton = () => {
    this._heartButton.classList.remove('elements__heart_active');
  }
}