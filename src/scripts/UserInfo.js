export default class UserInfo {
  constructor({ person, occupation }) {
    this._person = document.querySelector(person);
    this._occupation = document.querySelector(occupation);
  }

  getUserInfo = () => {
    const userData = { name: this._person.textContent, job: this._occupation.textContent };
    return userData
  }

  setUserInfo = (data) => {
    this._person.textContent = data.popup__name;
    this._occupation.textContent = data.popup__occupation;
  }
}