import { getLessonNumber, lessons } from "../../lesson/utils.js";
import { shadowAppendTemplate } from "../utils.js";

const TAG = "lesson-heading";

/**
 * @class LessonHeading
 * @classdesc Page layout for the entire app.
 * @extends HTMLElement
 */
class LessonHeading extends HTMLElement {
  /**
   * @constructor
   */
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowAppendTemplate(shadowRoot, TAG).then(() => {
      const lessonNumber = getLessonNumber();
      const lesson = lessons[lessonNumber - 1];
      const h2El = shadowRoot.querySelector("h2");

      if (lesson && h2El) {
        h2El.textContent = `Lesson ${lessonNumber}: ${lesson.title}`;
      }
    });
  }
}

customElements.define(TAG, LessonHeading);
