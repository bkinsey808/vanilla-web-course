import { insertHtml } from "../utils.js";

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

    insertHtml("todo-item/todo-item.html").then(() => {
      const template = document.getElementById("todo-item");
      shadow.append(
        /** @type {HTMLTemplateElement} */ (template)?.content?.cloneNode(true)
      );
    });
  }
}

customElements.get("todo-item") || customElements.define("todo-item", TodoItem);
