import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  #handleFormSubmit;
  #form;
  #inputList;
  #values;

  constructor({ selector, handleFormSubmit }) {
    super({ selector });
    this.#handleFormSubmit = handleFormSubmit;
    this.#form = this.popupElement.querySelector(".popup__form");
    this.#inputList = this.#form.querySelectorAll(".popup__input");
    this.#values = {};
  }

  #getInputValues() {
    this.#inputList.forEach((item) => {
      // Add a key/value pair to the 'values' object for each input

      // Key is input.name : value is input.value

      this.#values[item.name] = item.value;
    });

    return this.#values;
  }

  getForm() {
    return this.#form;
  }

  setEventListeners() {
    super.setEventListeners();
    this.#form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this.#getInputValues();

      this.#handleFormSubmit(inputValues);
    });
  }
}
