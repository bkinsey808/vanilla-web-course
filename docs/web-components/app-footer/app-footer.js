import { shadowAppendTemplate } from "../utils.js";

const TAG = "app-footer";

/**
 * @class AppFooter
 * @classdesc Page layout for the entire app.
 * @extends HTMLElement
 */
class AppFooter extends HTMLElement {
  /**
   * @constructor
   */
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowAppendTemplate(shadowRoot, TAG);
  }
}

customElements.define(TAG, AppFooter);
