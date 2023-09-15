import { shadowAppendTemplate, getLessonNumber, lessons } from "../../utils.js";

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

      const lessonNumber = getLessonNumber();
      if (lessonNumber > lessons.length - 1) {
        this.button.innerHTML = "Back to Home";
        this.button?.addEventListener("click", () => {
          window.location.href = "/";
        });
        return;
      }

      if (!lessonNumber) {
        this.button.style.display = "none";
        return;
      }

      const { key, title } = lessons[lessonNumber];
      this.button.innerHTML = `Continue to Lesson ${
        lessonNumber + 1
      }: ${title}`;

      this.button?.addEventListener("click", () => {
        window.location.href = `/lesson/${String(lessonNumber + 1).padStart(
          3,
          "0"
        )}-${key}.html`;
      });
    });
  }
}

customElements.define(TAG, NextLessonButton);
