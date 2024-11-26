export default class Popup {
  #popupElement;

  constructor({ selector }) {
    this.#popupElement = document.querySelector(selector);
  }

  // public method to access #popupElement
  get popupElement() {
    return this.#popupElement;
  }

  toggleModal(action = "remove") {
    this.#popupElement.classList[action]("popup_visible");

    if (action === "add") {
      document.addEventListener("keydown", this.#handleEscapeClose);
    } else {
      document.removeEventListener("keydown", this.#handleEscapeClose);
    }
  }

  #handleEscapeClose = (evt) => {
    if (evt.key === "Escape") {
      const openPopup = this.#popupElement
        ? "True"
        : "False";

      if (openPopup) {
        this.toggleModal();
      }
    }
  };

  setEventListeners() {
    const closeButton = this.#popupElement.querySelector(".popup__close");
    closeButton.addEventListener("click", () => {
      this.toggleModal();
    });

  this.#popupElement.addEventListener("click", (evt) => {
        if (evt.target === this.#popupElement) this.toggleModal();
      });
  }
}
