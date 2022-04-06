export default class UserInfo {
  constructor({ person, occupation, avatar }) {
    this._person = document.querySelector(person);
    this._occupation = document.querySelector(occupation);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo = () => {
    const userData = { name: this._person.textContent, job: this._occupation.textContent };
    return userData
  }

  setUserInfo = (title, job, avatar) => {
    this._person.textContent = title;
    this._occupation.textContent = job;
    this._avatar.src = avatar;
  }
}