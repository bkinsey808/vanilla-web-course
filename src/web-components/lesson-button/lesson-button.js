import {
  getLessonDataForPath,
  getPathFromLessonIndex,
  lessonData,
} from "../../lesson/utils.js";
import { intToRoman, titleCase } from "../../utils.js";
import { getClonedTemplateNode } from "../utils.js";

/**
 * @typedef {import("../../lesson/utils.js").Chapter} Chapter
 */

const TAG = "lesson-button";

/** @typedef {'first'|'last'|'prev'|'next'} Type */

/** @type {{[key in Type]: string}} */
const icons = {
  first: "❚◄",
  last: "►❚",
  next: "▶",
  prev: "◀",
};

/**
 *
 * @param {Type} type
 * @param {number | undefined} lessonIndex
 * @param {number} lastLessonIndex
 * @return {number | undefined}
 */
const getNewLessonIndex = (type, lessonIndex, lastLessonIndex) => {
  switch (type) {
    case "first":
      return undefined;
    case "last":
      return lastLessonIndex;
    case "next":
      return lessonIndex === undefined ? 0 : lessonIndex + 1;
    case "prev":
      return lessonIndex === undefined ? undefined : lessonIndex - 1;
  }
};

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
    this.$shadowRoot = this.attachShadow({ mode: "open" });
    this.type = /** @type {Type} */ (this.getAttribute("type") ?? "next");
    this.icon = /** @type {boolean} */ (
      this.getAttribute("icon") === "true" ?? false
    );

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
    this.$button = /** @type {HTMLButtonElement} */ (
      this.$shadowRoot.querySelector("button")
    );

    this.$link = /** @type {HTMLAnchorElement} */ (
      this.$button.querySelector("a")
    );
    const { lessonIndex, chapterIndex = 0 } =
      getLessonDataForPath(chapters) ?? {};

    const nextLessonIsNewChapter =
      lessonIndex === undefined ||
      lessonIndex === chapters[chapterIndex]?.maxChapterLessonIndex;

    const lastLessonIndex = chapters[chapters.length - 1].maxChapterLessonIndex;
    const newLessonIndex = getNewLessonIndex(
      this.type,
      lessonIndex,
      lastLessonIndex
    );

    const newPath = getPathFromLessonIndex(chapters, newLessonIndex ?? 0);
    const {
      lesson: newLesson,
      lessonNumber: newLessonNumber,
      chapter: newChapter,
      chapterIndex: newChapterIndex,
    } = getLessonDataForPath(chapters, newPath) ?? {};

    this.$link.innerHTML = this.icon
      ? icons[this.type]
      : nextLessonIsNewChapter
      ? `${titleCase(this.type)}, Chapter ${
          intToRoman((newChapterIndex ?? 0) + 1) ?? ""
        } - ${newChapter?.title}`
      : `${titleCase(
          this.type
        )}, ${`Lesson ${newLessonNumber}: ${newLesson?.title}`}`;

    this.$link.title = `${this.type} lesson`;

    if (
      (lessonIndex === undefined && ["first", "prev"].includes(this.type)) ||
      (lessonIndex === lastLessonIndex && ["last", "next"].includes(this.type))
    ) {
      this.$button.disabled = true;
      return;
    }

    this.$link.href = newPath;
  }
}

customElements.define(TAG, LessonButton);
