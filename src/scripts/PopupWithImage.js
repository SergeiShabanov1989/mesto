import Popup from "./Popup.js";
import {popupOnlyImageImg, popupOnlyImageTitle} from "./utils.js";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
  }

  open = ({ name, link }) => {
    popupOnlyImageTitle.alt = name;
    popupOnlyImageTitle.textContent = name;
    popupOnlyImageImg.src = link;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
  }
}