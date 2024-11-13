export default class FormValidator {
    #settings;
    #formElement;
    #inputList;
    #buttonElement;
    #event;

    constructor(settings, formElement) {
        this.#settings = settings;
        this.#formElement = formElement;
    }

    #toggleInputError(inputElement, action, errorMessage = "") {
        const errorElementId = `#${inputElement.id}-error`;
        const errorElement = this.#formElement.querySelector(errorElementId);
        inputElement.classList[action](this.#settings.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList[action](this.#settings.errorClass);
    }

    #checkInputValidity(inputElement) {
        const action = inputElement.validity.valid ? "remove" : "add";
        const message = inputElement.validity.valid ? "" : inputElement.validationMessage;
        this.#toggleInputError(inputElement, action, message);
    }

    #hasInvalidInput() {
        return this.#inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    #toggleButtonState() {
        const isDisabled = this.#hasInvalidInput();
        this.#buttonElement.classList.toggle(this.#settings.inactiveButtonClass, isDisabled);
        this.#buttonElement.disabled = isDisabled;
    }

    #setEventListeners() {
        this.#inputList = Array.from(
            this.#formElement.querySelectorAll(this.#settings.inputSelector)
          );
          this.#buttonElement = this.#formElement.querySelector(this.#settings.submitButtonSelector);
        
          this.#toggleButtonState();
        
          this.#inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
              this.#checkInputValidity(inputElement);
              this.#toggleButtonState();
            });
          });
    }

    resetValidation() {
        //Clear the input boxes
        this.#inputList.forEach((input) => {
            input.value = "";
        });
        
        // resets the 'submit' button to disabled
        this.#toggleButtonState();
    }

    enableValidation() {
        this.#formElement.addEventListener("submit", (evt) => {
            this.#event = evt;
            evt.preventDefault();
        });

        this.#setEventListeners();
    }    
}