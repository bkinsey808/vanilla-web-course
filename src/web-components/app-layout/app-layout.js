import { shadowAppendTemplate } from "../../utils.js";

const TAG = "app-layout";

/**
 * @class AppLayout
 * @classdesc Page layout for the entire app.
 * @extends HTMLElement
 */
class AppLayout extends HTMLElement {
  /**
   * @constructor
   */
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowAppendTemplate(shadowRoot, TAG);
  }
}

customElements.define(TAG, AppLayout);
