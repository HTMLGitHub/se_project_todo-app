export default class TodoCounter {
  #element;
  #completed;
  #total;

  /*
        todos should be the array of initial todos
        selector is the selector for the counter text element
    */
  constructor(todos, selector) {
    // select the apporprite element
    this.#element = document.querySelector(selector);

    //number of completed todos
    this.#completed = todos.filter((item) => item.completed).length;

    // the total number of todos
    this.#total = todos.length;

    this.#updateText();
  }

  // Call this when a checkbox is clicked,
  //and when a completed todo is deleted
  updateCompleted = (increment) => {
    /*
        if increment is true, add 1 to 'this.#completed'. Otherwise, subtract 1. 
        In either case, call the method to update the text content
        */
    this.#completed += increment ? 1 : -1;

    console.log(this.#completed);

    this.#updateText();
  };

  // Call this when a to-do is deleted, or when a to-do is created via the form.
  updateTotal = (increment) => {
    // if increment is true, add 1 to this.#total. Otherwise,
    // subtract 1. In either case, call the method to update the
    // text content.

    this.#total += increment ? 1 : -1;

    console.log(this.#total);

    this.#updateText();
  };

  #updateText() {
    // Sets the text content of corresponding text element.
    // Calls this in the constructor, and whenever the counts get updated.
    this.#element.textContent = `Showing ${this.#completed} out of ${
      this.#total
    } completed.`;
  }
}
