import { getPathFromLessonIndex, lessonData } from "../../lesson/utils.js";
import { shadowAppendTemplate } from "../utils.js";

const TAG = "lesson-outline";

/**
 * @class LessonOutline
 * @classdesc lesson outline
 * @extends HTMLElement
 */
class LessonOutline extends HTMLElement {
  /**
   * @constructor
   */
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });

    shadowAppendTemplate(shadowRoot, TAG).then(async () => {
      // coerce to never be null
      const $chaptersList = /** @type {HTMLOListElement} */ (
        shadowRoot.querySelector("ol.chapters")
      );

      const chapters = await lessonData;

      chapters.forEach(
        async ({ title: chapterTitle, lessons, minChapterLessonIndex }) => {
          const $chapterItem = document.createElement("li");
          const $chapterLink = document.createElement("a");
          $chapterLink.href = getPathFromLessonIndex(
            chapters,
            minChapterLessonIndex
          );

          $chapterLink.textContent = chapterTitle;
          $chapterItem.appendChild($chapterLink);
          const $lessonList = document.createElement("ol");

          lessons.forEach(
            ({ title: lessonTitle }, lessonWithinChapterIndex) => {
              const lessonIndex =
                minChapterLessonIndex + lessonWithinChapterIndex;
              const $listItem = document.createElement("li");
              const $link = document.createElement("a");
              $link.href = getPathFromLessonIndex(chapters, lessonIndex);
              $link.textContent = lessonTitle;
              $listItem.appendChild($link);
              $lessonList.appendChild($listItem);
            }
          );
          $chapterItem.appendChild($lessonList);
          $chaptersList?.appendChild($chapterItem);
        }
      );
    });
  }
}

customElements.define(TAG, LessonOutline);
