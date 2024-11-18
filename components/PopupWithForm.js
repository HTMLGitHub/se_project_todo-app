import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  #handleFormSubmit;
  #formSelector;
  #inputList;
  #values;

  constructor({ selector, handleFormSubmit }) {
    super({ selector });
    this.#handleFormSubmit = handleFormSubmit;
    this.#formSelector = this.popupElement.querySelector(".popup__form");
    this.#inputList = this.#formSelector.querySelectorAll(".popup__input");
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

  setEventListeners() {
    super.setEventListeners();
    this.#formSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this.#getInputValues();

      this.#handleFormSubmit(inputValues);
    });
  }
}
