import { insertHtml } from "../utils.js";
const templatePromise = insertHtml("todo-item/todo-item.html").then(() => {
  return document.getElementById("todo-item");
});

/**
 * @class TodoItem
 * @classdesc A custom element representing a todo item.
 * @extends HTMLElement
 */
class TodoItem extends HTMLElement {
  /**
   * @constructor
   */
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    templatePromise.then((template) => {
      shadow.append(
        /** @type {HTMLTemplateElement} */ (template)?.content?.cloneNode(true)
      );
    });
  }
}

customElements.get("todo-item") || customElements.define("todo-item", TodoItem);
