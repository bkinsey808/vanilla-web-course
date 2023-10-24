import {
  getLessonDataForPath,
  getPathFromLessonIndex,
  lessonData,
} from "../../lesson/utils.js";
import { intToRoman } from "../../utils.js";
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
    shadowAppendTemplate(shadowRoot, TAG).then(async () => {
      const $a = shadowRoot.querySelector("a");
      const $h2 = shadowRoot.querySelector("h2");
      const chapters = await lessonData;
      const { chapterNumber, chapterIndex, lessonNumber, lesson } =
        getLessonDataForPath(chapters) ?? {};

      if (!lesson || !$a || !$h2 || chapterIndex == undefined) {
        return;
      }

      $a.href = getPathFromLessonIndex(
        chapters,
        chapters[chapterIndex]?.minChapterLessonIndex
      );
      $a.textContent = `Chapter ${intToRoman(chapterNumber ?? 1)}: ${
        chapters[chapterIndex]?.title
      }`;
      $h2.textContent = `Lesson ${lessonNumber}: ${lesson.title}`;
    });
  }
}

customElements.define(TAG, LessonHeading);
