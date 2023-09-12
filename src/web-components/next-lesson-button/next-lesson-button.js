import { getCurrentLessonNumber } from "../../scripts.js";
import { shadowAppendTemplate } from "../../utils.js";

const TAG = "next-lesson-button";

/**
 * @class NextLessonButton
 * @classdesc Next lesson button
 * @extends HTMLElement
 */
class NextLessonButton extends HTMLElement {
  /**
   * @constructor
   */
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowAppendTemplate(shadowRoot, TAG).then(() => {
      // coerce to never be null
      this.button = /** @type {HTMLButtonElement} */ (
        shadowRoot.querySelector("button")
      );

      const lessonNumber = getCurrentLessonNumber();
      this.button.innerHTML = `Continue to Lesson ${lessonNumber + 1}`;

      this.button?.addEventListener("click", () => {
        // nevigate to the next lesson
        window.location.href = `/lesson${lessonNumber + 1}.html`;
      });
    });
  }
}

customElements.define(TAG, NextLessonButton);
