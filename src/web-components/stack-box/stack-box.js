import { shadowAppendTemplate } from "../../utils.js";

const TAG = "stack-box";

/**
 * @class StackBox
 * @classdesc Page layout for the entire app.
 * @extends HTMLElement
 */
class StackBox extends HTMLElement {
  /**
   * @constructor
   */
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowAppendTemplate(shadowRoot, TAG);
  }
}

customElements.define(TAG, StackBox);
