import Popup from "./Popup.js";
import {popupOnlyImageImg, popupOnlyImageTitle} from "./utils.js";

export default class PopupWithImage extends Popup {
  constructor(name, link, popup) {
    super(popup);
    this._imgName = name;
    this._imgLink = link;
  }

  open = () => {
    popupOnlyImageTitle.alt = this._imgName;
    popupOnlyImageTitle.textContent = this._imgName;
    popupOnlyImageImg.src = this._imgLink;
    super.open();
  }
}