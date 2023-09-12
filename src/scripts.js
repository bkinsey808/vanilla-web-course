import "./web-components/app-layout/app-layout.js";
import "./web-components/app-header/app-header.js";
import "./web-components/app-footer/app-footer.js";
import "./web-components/next-lesson-button/next-lesson-button.js";
import "./web-components/stack-box/stack-box.js";

/**
 * parse a filename in the form of lesson2.html and get the integer
 * @param {string | undefined} filename
 * @return {number}
 */
const parseFilename = (filename) => {
  if (!filename) {
    return 1;
  }

  try {
    const lessonNumber = parseInt(
      filename.replace("lesson", "").replace(".html", ""),
      10
    );
    return lessonNumber;
  } catch (e) {
    return 0;
  }
};

export const getCurrentLessonNumber = () => {
  const url = new URL(window.location.href);
  const lastElement = url.pathname.split("/").pop();
  return parseFilename(lastElement);
};
