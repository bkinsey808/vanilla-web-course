import { getLessonNumber, lessons, shadowAppendTemplate } from "../../utils.js";

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
    shadowAppendTemplate(shadowRoot, TAG);
    const lessonNumber = getLessonNumber();
    console.log({ lessonNumber });
    const { title } = lessons[lessonNumber - 1];

    // set the title of the page
    document.title = `Lesson ${lessonNumber}: ${title}`;
  }
}

customElements.define(TAG, LessonPageLayout);
