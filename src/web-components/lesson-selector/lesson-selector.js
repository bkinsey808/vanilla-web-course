import {
  getLessonDataForPath,
  getPathFromLessonIndex,
  lessonData,
} from "../../lesson/utils.js";
import { intToRoman } from "../../utils.js";
import { getClonedTemplateNode } from "../utils.js";

/**
 * @typedef {import("../../lesson/utils.js").Chapter} Chapter
 */

const TAG = "lesson-selector";

/**
 * @class LessonSelector
 * @classdesc autocomplete input for selecting a lesson
 */
class LessonSelector extends HTMLElement {
  /**
   * @constructor
   */
  constructor() {
    super();

    /**  @type {ShadowRoot} */
    this.$shadowRoot = this.attachShadow({ mode: "open" });

    Promise.all([getClonedTemplateNode(TAG), lessonData])
      .then(([clonedTemplateNode, chapters]) => {
        if (clonedTemplateNode) {
          this.$shadowRoot.appendChild(clonedTemplateNode);
        }
        this.render(chapters);
      })
      .catch((e) => console.error(e));
  }

  /**
   * @method render
   * @description render the component
   * @param {Chapter[]} chapters
   * @return {void}
   */
  render(chapters) {
    const { chapterNumber, lessonNumber } =
      getLessonDataForPath(chapters) ?? {};

    const $lessonInput = /** @type {HTMLInputElement} */ (
      this.$shadowRoot.getElementById("lesson-input")
    );

    const $lessonDatalist = /** @type {HTMLDataListElement} */ (
      this.$shadowRoot.getElementById("lesson-datalist")
    );

    const homeValue = "Home";

    if (lessonNumber === undefined) {
      $lessonInput.placeholder = homeValue;
      $lessonInput.setAttribute("list", "lesson-datalist");
    } else {
      $lessonInput.setAttribute("list", `chapter-${chapterNumber}-lessons`);
    }

    chapters.forEach(({ title: chapterTitle, lessons }, chapterIndex) => {
      const chapterValue = `${
        intToRoman(chapterIndex + 1) ?? ""
      }: ${chapterTitle}`;

      const $chapterLessonsDatalist = document.createElement("datalist");
      $chapterLessonsDatalist.id = `chapter-${chapterIndex + 1}-lessons`;
      this.$shadowRoot.appendChild($chapterLessonsDatalist);

      lessons.forEach(({ title: lessonTitle }, lessonWithChapterIndex) => {
        const $lessonOption = document.createElement("option");
        const lessonValue = `${lessonWithChapterIndex + 1}: ${lessonTitle}`;
        const value = `${chapterValue} - ${lessonValue}`;
        $lessonOption.value = value;
        $lessonDatalist.appendChild($lessonOption);

        if (
          chapterIndex + 1 === chapterNumber &&
          lessonWithChapterIndex + 1 === lessonNumber
        ) {
          $lessonInput.placeholder = lessonValue;
        }

        const $chapterLessonOption = document.createElement("option");
        $chapterLessonOption.value = lessonValue;
        $chapterLessonsDatalist.appendChild($chapterLessonOption);
      });
    });

    $lessonInput.addEventListener(
      "change",
      this.getInputEventListener({
        lessonNumber,
        chapterNumber,
        chapters,
        $lessonDatalist,
        $lessonInput,
      })
    );
  }

  /**
   * @typedef {Object} InputEventListenerOptions
   *   @property {number | undefined} lessonNumber
   *   @property {number | undefined} chapterNumber
   *   @property {Chapter[]} chapters
   *   @property {HTMLDataListElement} $lessonDatalist
   *   @property {HTMLInputElement} $lessonInput
   *
   * @param {InputEventListenerOptions} options
   * @return {function(): void}
   */
  getInputEventListener({
    lessonNumber,
    chapterNumber,
    chapters,
    $lessonDatalist,
    $lessonInput,
  }) {
    return () => {
      const $datalist =
        lessonNumber === undefined
          ? $lessonDatalist
          : /** @type {HTMLDataListElement} */ (
              this.$shadowRoot.getElementById(
                `chapter-${chapterNumber}-lessons`
              )
            );

      const $selectedOption = /** @type { HTMLOptionElement | null} */ (
        $datalist.querySelector(`option[value="${$lessonInput.value}"]`)
      );

      const optionIndex = $selectedOption
        ? [...$datalist.options].indexOf($selectedOption)
        : 0;

      const chapterIndex = (chapterNumber ?? 1) - 1;

      const newLessonIndex =
        lessonNumber === undefined
          ? optionIndex
          : optionIndex + chapters[chapterIndex].minChapterLessonIndex;

      $lessonInput.placeholder = $lessonInput.value;
      $lessonInput.value = "";

      window.location.href = getPathFromLessonIndex(chapters, newLessonIndex);
    };
  }
}

customElements.define(TAG, LessonSelector);
