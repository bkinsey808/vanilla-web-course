import { getLessonNumber, lessons } from "../../lesson/utils.js";
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

    const lessonNumber = getLessonNumber();
    console.log({ lessonNumber });
    const { title } = lessons[lessonNumber - 1];
    const fullTitle = `Lesson ${lessonNumber}: ${title}`;

    shadowAppendTemplate(shadowRoot, TAG).then(() => {
      // set the title of the page
      document.title = fullTitle;
    });
  }
}

customElements.define(TAG, LessonPageLayout);
