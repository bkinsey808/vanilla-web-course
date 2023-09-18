import { getLessonNumber, lessons, getLessonPath } from "../../lesson/utils.js";
import { shadowAppendTemplate } from "../utils.js";

const TAG = "lesson-paginator";

/**
 * @class LessonPaginator
 * @classdesc lesson button
 * @extends HTMLElement
 */
class LessonPaginator extends HTMLElement {
  /**
   * @constructor
   */
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });

    shadowAppendTemplate(shadowRoot, TAG).then(() => {
      this.input = /** @type {HTMLInputElement} */ (
        shadowRoot.querySelector("input")
      );
      // coerce to never be null
      this.datalist = /** @type {HTMLDataListElement} */ (
        shadowRoot.querySelector("datalist")
      );

      // loop thru lessons:
      lessons.forEach((lesson, index) => {
        const option = document.createElement("option");
        option.value = `${String(index + 1).padStart(3, "0")}: ${lesson.title}`;
        this.datalist.appendChild(option);
      });

      const lessonNumber = getLessonNumber();

      this.input.placeholder =
        lessonNumber === undefined ? "Home" : String(lessonNumber);

      this.input.addEventListener("change", () => {
        const newLessonNumber = getLessonNumber(this.input.value);

        // optimistic update
        this.input.value = String(newLessonNumber);

        window.location.href =
          newLessonNumber === undefined ? "/" : getLessonPath(newLessonNumber);
      });

      const homeLesson =
        lessonNumber !== undefined && lessonNumber > 0 ? lessons[0] : undefined;
      const homeButton = /** @type {HTMLButtonElement} */ (
        shadowRoot.getElementById("home")
      );
      const homeAnchor = /** @type {HTMLAnchorElement} */ (
        shadowRoot.querySelector("#home a")
      );

      if (homeLesson) {
        homeButton.title = `Home`;
        homeAnchor.href = "/";
      } else {
        homeButton.disabled = true;
      }

      const prevLesson =
        lessonNumber !== undefined && lessonNumber > 0
          ? lessons[lessonNumber - 1]
          : undefined;

      const prevButton = /** @type {HTMLButtonElement} */ (
        shadowRoot.getElementById("prev")
      );
      const prevAnchor = /** @type {HTMLAnchorElement} */ (
        shadowRoot.querySelector("#prev a")
      );

      if (prevLesson) {
        const prevLessonNumber =
          lessonNumber === undefined ? 0 : lessonNumber - 1;

        prevButton.title = `Lesson ${prevLessonNumber}: ${prevLesson.title}`;
        prevAnchor.href = getLessonPath(prevLessonNumber);
      } else {
        prevButton.disabled = true;
      }

      const nextButton = /** @type {HTMLButtonElement} */ (
        shadowRoot.getElementById("next")
      );
      const nextAnchor = /** @type {HTMLAnchorElement} */ (
        shadowRoot.querySelector("#next a")
      );

      const nextLesson =
        lessonNumber === undefined
          ? lessons[0]
          : lessonNumber < lessons.length
          ? lessons[lessonNumber - 1]
          : undefined;

      if (nextLesson) {
        const nextLessonNumber =
          lessonNumber === undefined ? 1 : lessonNumber + 1;
        nextButton.title = `Lesson ${nextLessonNumber}: ${nextLesson.title}`;
        nextAnchor.href = getLessonPath(nextLessonNumber);
      } else {
        nextButton.disabled = true;
      }

      const lastLesson =
        lessonNumber === undefined || lessonNumber < lessons.length
          ? lessons[lessons.length - 1]
          : undefined;

      const lastButton = /** @type {HTMLButtonElement} */ (
        shadowRoot.getElementById("last")
      );
      const lastAnchor = /** @type {HTMLAnchorElement} */ (
        shadowRoot.querySelector("#last a")
      );

      if (lastLesson) {
        const lastLessonNumber = lessons.length;
        lastButton.title = `Lesson ${lastLessonNumber}: ${lastLesson.title}`;
        lastAnchor.href = getLessonPath(lastLessonNumber);
      } else {
        lastButton.disabled = true;
      }
    });
  }
}

customElements.define(TAG, LessonPaginator);
