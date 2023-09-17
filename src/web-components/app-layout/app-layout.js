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
      // remove class hide from app-layout
      this.classList.remove("hide");
    });
  }

  /**
   * list of observed attributes
   */
  static get observedAttributes() {
    return ["aria-label"];
  }

  /**
   * called when observed attribute is changed
   * @param {string} name
   * @param {string} oldValue
   * @param {string} newValue
   */
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "aria-label":
        // this.main?.setAttribute("aria-label", newValue);
        break;
    }
  }
}

customElements.define(TAG, AppLayout);
