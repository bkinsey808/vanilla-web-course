import {
  getLessonDataForPath,
  getPathFromLessonIndex,
  lessonData,
} from "../../lesson/utils.js";
import { intToRoman } from "../../utils.js";
import { shadowAppendTemplate } from "../utils.js";

/**
 * @typedef {import("../../lesson/utils.js").Chapter} Chapter
 */

const TAG = "chapter-selector";

/**
 * @class ChapterSelector
 * @classdesc autocomplete input for selecting a chapter
 * @extends HTMLElement
 */
class ChapterSelector extends HTMLElement {
  /**
   * @constructor
   */
  constructor() {
    super();
    this.$shadowRoot = this.attachShadow({ mode: "open" });
    Promise.all([shadowAppendTemplate(this.$shadowRoot, TAG), lessonData])
      .then(([_, chapters]) => this.render(chapters))
      .catch((e) => console.error(e));
  }

  /**
   * @method render
   * @description render the component
   * @param {Chapter[]} chapters
   * @return {void}
   */
  render(chapters) {
    const { chapterNumber } = getLessonDataForPath(chapters) ?? {};

    const $chapterInput = /** @type {HTMLInputElement} */ (
      this.$shadowRoot.querySelector('input[list="chapter-datalist"]')
    );

    const $chapterDatalist = /** @type {HTMLDataListElement} */ (
      this.$shadowRoot.getElementById("chapter-datalist")
    );

    const $outlineChapterOption = document.createElement("option");
    const outlineValue = "Outline";
    $outlineChapterOption.value = outlineValue;

    if (chapterNumber === undefined) {
      $chapterInput.placeholder = outlineValue;
    }

    $chapterDatalist.appendChild($outlineChapterOption);

    chapters.forEach(({ title: chapterTitle }, chapterIndex) => {
      const $chapterOption = document.createElement("option");
      const value = `${intToRoman(chapterIndex + 1) ?? ""}: ${chapterTitle}`;
      $chapterOption.value = value;
      $chapterDatalist.appendChild($chapterOption);

      if (chapterIndex + 1 === chapterNumber) {
        $chapterInput.placeholder = value;
      }
    });

    $chapterInput.addEventListener("change", (e) => {
      const $selectedOption = /** @type { HTMLOptionElement | null} */ (
        $chapterDatalist.querySelector(`option[value="${$chapterInput.value}"]`)
      );
      const index = $selectedOption
        ? [...$chapterDatalist.options].indexOf($selectedOption)
        : undefined;

      if (index === undefined || index === 0) {
        window.location.href = "/";
        return;
      }

      const newChapterIndex = index - 1;

      $chapterInput.placeholder = $chapterInput.value;
      $chapterInput.value = "";

      if (newChapterIndex !== undefined) {
        window.location.href = getPathFromLessonIndex(
          chapters,
          chapters[newChapterIndex].minChapterLessonIndex
        );
      }
    });
  }
}

customElements.define(TAG, ChapterSelector);
