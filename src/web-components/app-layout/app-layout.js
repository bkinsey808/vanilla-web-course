import { shadowAppendTemplate } from "../utils.js";

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
    shadowAppendTemplate(shadowRoot, TAG).then(() => {
      this.main = shadowRoot.querySelector("main");
    });
  }
}

customElements.define(TAG, AppLayout);
