import { getLessonNumber, lessons, getLessonPath } from "../../lesson/utils.js";
import { shadowAppendTemplate } from "../utils.js";

const TAG = "lesson-button";

/**
 * @class LessonButton
 * @classdesc lesson button
 * @extends HTMLElement
 */
class LessonButton extends HTMLElement {
  /**
   * @constructor
   */
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const type = this.getAttribute("type") ?? "next";

    shadowAppendTemplate(shadowRoot, TAG).then(() => {
      // coerce to never be null
      this.button = /** @type {HTMLButtonElement} */ (
        shadowRoot.querySelector("button")
      );

      const lessonNumber = getLessonNumber();
      const newLessonNumber =
        type === "next" ? lessonNumber + 1 : lessonNumber - 1;

      if (
        type === "next" ? lessonNumber > lessons.length - 1 : lessonNumber < 2
      ) {
        this.button.innerHTML = "Back to Home";
        this.button?.addEventListener("click", () => {
          const origin = new URL(window.location.href).origin;
          window.location.href = `${origin.endsWith(
            "github.io" ? "vanilla-web-course" : ""
          )}/`;
        });
        return;
      }

      if (!lessonNumber || newLessonNumber < 1) {
        this.button.style.display = "none";
        return;
      }

      const { title } = lessons[newLessonNumber - 1];
      this.button.innerHTML = `${
        type === "next" ? "Continue" : "Back"
      } to Lesson ${newLessonNumber}: ${title}`;

      this.button?.addEventListener("click", () => {
        window.location.href = getLessonPath(newLessonNumber);
      });
    });
  }
}

customElements.define(TAG, LessonButton);
