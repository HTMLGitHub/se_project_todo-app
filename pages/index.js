import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig, addTodoButton, addTodoForm } from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Todo from "../components/Todo.js";
import Section from "../components/section.js";
import PopupWithForm from "../components/PopupWithForm.js";

const toDoPopup = new PopupWithForm({
  selector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const id = uuidv4();

    const { name: task, date: dateInput } = inputValues;

    // Create a date object and adjust for timezone
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    // Construct the new todo object
    const newTodo = { id, name: task, date };

    // Add the new todo to the section and render it

    newTodos.addItem(generateTodo(newTodo));

    toDoPopup.toggleModal();
    newTodoValidator.resetValidation();
  },
});

const newTodos = new Section({
  // Pass TODO
  items: [],

  renderer: (item) => {
    const todo = generateTodo(item);
    newTodos.addItem(todo);
  },

  containerSelector: ".todos__list",
});

const oldTodos = new Section({
  // Pass initial TODOs
  items: initialTodos,

  renderer: (item) => {
    const todo = generateTodo(item);
    oldTodos.addItem(todo);
  },

  containerSelector: ".todos__list",
});

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();

  return todoElement;
};

addTodoButton.addEventListener("click", () => {
  toDoPopup.toggleModal("add");
  toDoPopup.setEventListeners();
});

oldTodos.renderItems();

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
