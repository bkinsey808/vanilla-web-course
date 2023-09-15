import {
  shadowAppendTemplate,
  getLessonNumber,
  lessons,
  getLessonPath,
} from "../../utils.js";

const TAG = "jump-to-lesson";

/**
 * @class JumpToLesson
 * @classdesc lesson button
 * @extends HTMLElement
 */
class JumpToLesson extends HTMLElement {
  /**
   * @constructor
   */
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });

    shadowAppendTemplate(shadowRoot, TAG).then(() => {
      // coerce to never be null
      this.select = /** @type {HTMLSelectElement} */ (
        shadowRoot.querySelector("select")
      );

      const lessonNumber = getLessonNumber();

      // loop thru lessons:

      lessons.forEach((lesson, index) => {
        const option = document.createElement("option");
        option.value = String(index + 1);
        option.textContent = `Lesson ${index + 1}: ${lesson.title}`;
        option.selected = index + 1 === lessonNumber;
        this.select.appendChild(option);
      });

      this.select.addEventListener("change", () => {
        const newLessonNumber = Number(this.select.value);
        window.location.href = getLessonPath(newLessonNumber);
      });
    });
  }
}

customElements.define(TAG, JumpToLesson);
