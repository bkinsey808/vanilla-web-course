import { shadowAppendTemplate } from "../../utils.js";

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
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowAppendTemplate(shadowRoot, "todo-item");
  }
}

customElements.get("todo-item") || customElements.define("todo-item", TodoItem);
