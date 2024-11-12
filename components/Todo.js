class Todo {
  #data;
  #templateElement;
  #todoElement;

  constructor(data, selector) {
    this.#data = data;
    this.#templateElement = document.querySelector(selector);
  }

  #setEventListeners(obj) {
    obj.addEventListener("click", () => {
      this.#todoElement.remove();
    });
  }

  getView() {
    this.#todoElement = this.#templateElement.content
      .querySelector(".todo")
      .cloneNode(true);
    const todoNameEl = this.#todoElement.querySelector(".todo__name");
    const todoCheckboxEl = this.#todoElement.querySelector(".todo__completed");
    const todoLabel = this.#todoElement.querySelector(".todo__label");
    const todoDate = this.#todoElement.querySelector(".todo__date");
    const todoDeleteBtn = this.#todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this.#data.name;
    todoCheckboxEl.checked = this.#data.completed;

    // Apply id and for attributes.
    // The id will initially be undefined for new todos.
    todoCheckboxEl.id = `todo-${this.#data.id}`;
    todoLabel.setAttribute("for", `todo-${this.#data.id}`);

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

    this.#setEventListeners(todoDeleteBtn);

    return this.#todoElement;
  }
}

export default Todo;
