export default class Section {
    //What is being added
    #items;

    // Create and add a single item to the page
    #renderer;

    // Where the item(s) are being added
    #container;

    constructor({items, renderer, containerSelector}) {
        this.#items = items;
        this.#renderer = renderer;
        this.#container = document.querySelector(containerSelector);
    }

    addItem(element) {
        this.#container.append(element);
    }
    
    renderItems() {
        this.#items.forEach(item => {
            // call the #renderer function, 
            // pass it the item as an argument
          this.#renderer(item);  
        });
    }    
}