import {editPopup} from "./utils.js";

export default class UserInfo {
  constructor({ person, occupation }) {
    this._person = document.querySelector(person);
    this._occupation = document.querySelector(occupation);
  }

  getUserInfo = () => {
    const userData = { name: this._person.textContent, job: this._occupation.textContent };
    return userData
  }

  setUserInfo = () => {
    this._person.textContent = editPopup.inputList[0].value;
    this._occupation.textContent = editPopup.inputList[1].value;
  }
}

// this._person = editPopup.inputList[0].value;
// this._occupation = editPopup.inputList[1].value;