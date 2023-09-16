import { shadowAppendTemplate } from "../utils.js";

const TAG = "app-header";

/**
 * @class AppHeader
 * @classdesc Page layout for the entire app.
 * @extends HTMLElement
 */
class AppHeader extends HTMLElement {
  /**
   * @constructor
   */
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowAppendTemplate(shadowRoot, TAG);
  }
}

customElements.define(TAG, AppHeader);
