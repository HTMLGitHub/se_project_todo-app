export default class Todo {
  #data;
  #templateElement;
  #todoElement;
  #handleChecked;
  #handleDeleted;
  #obj;

  constructor(data, selector, handleChecked, handleDeleted) {
    this.#data = data;
    this.#templateElement = document.querySelector(selector);
    this.#handleChecked = handleChecked;
    this.#handleDeleted = handleDeleted;
  }

  #setEventListeners() {
    if (this.#obj instanceof HTMLElement) {
      if (this.#obj.tagName === "BUTTON") {
        this.#obj.addEventListener("click", () => {
          const wasCompleted = this.#data.completed;
          this.#todoElement.remove();
          this.#handleDeleted(wasCompleted);
        });
      } else if (this.#obj.tagName === "INPUT" && this.#obj.type === "checkbox") {
        this.#obj.addEventListener("change", () => {
          this.#data.completed = !this.#data.completed;
          this.#handleChecked(this.#data.completed);
        });
      } else {
        console.log(`${this.#obj} is not a button nor a checkbox`);
      }
    } else {
      console.log(`${this.#obj} not a valid HTML element`);
    }
  }

  #generateCheckboxElement() {
    const todoCheckboxEl = this.#todoElement.querySelector(".todo__completed");
    const todoLabel = this.#todoElement.querySelector(".todo__label");

    todoCheckboxEl.checked = this.#data.completed;

    // Apply id and for attributes.
    // The id will initially be undefined for new todos.
    todoCheckboxEl.id = `todo-${this.#data.id}`;
    todoLabel.setAttribute("for", `todo-${this.#data.id}`);

    this.#obj = todoCheckboxEl;
    this.#setEventListeners();
  }

  getView() {
    this.#todoElement = this.#templateElement.content
      .querySelector(".todo")
      .cloneNode(true);
    const todoNameEl = this.#todoElement.querySelector(".todo__name");
    const todoDate = this.#todoElement.querySelector(".todo__date");
    const todoDeleteBtn = this.#todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this.#data.name;

    // If a due date has been set, parsing this it with `new Date` will return a
    // number. If so, we display a string version of the due date in the todo.
    const dueDate = new Date(this.#data.date);
    if (!isNaN(dueDate)) {
      todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }

    this.#generateCheckboxElement();

    this.#obj = todoDeleteBtn;
    this.#setEventListeners();

    return this.#todoElement;
  }
}
