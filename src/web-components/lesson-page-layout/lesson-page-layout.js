import { getLessonDataForPath, lessonData } from "../../lesson/utils.js";
import { shadowAppendTemplate } from "../utils.js";

const TAG = "lesson-page-layout";

/**
 * @class LessonPageLayout
 * @classdesc Lesson page layout
 * @extends HTMLElement
 */
class LessonPageLayout extends HTMLElement {
  /**
   * @constructor
   */
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });

    shadowAppendTemplate(shadowRoot, TAG).then(async () => {
      const chapters = (await lessonData)?.chapters;

      if (chapters === undefined) {
        return;
      }

      const lessonNumber = getLessonDataForPath(chapters)?.lessonNumber;

      if (lessonNumber === undefined) {
        return;
      }

      const { title } = chapters[lessonNumber - 1];
      const fullTitle = `Lesson ${lessonNumber}: ${title}`;

      // set the title of the page
      document.title = fullTitle;
    });
  }
}

customElements.define(TAG, LessonPageLayout);
