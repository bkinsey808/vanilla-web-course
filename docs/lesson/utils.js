export const lessons = [
  {
    key: "hello-world",
    title: "Hello World!",
  },
  {
    key: "browser-dev-tools",
    title: "Browser Dev Tools",
  },
  {
    key: "vanilla-tech-stack",
    title: "Vanilla Tech Stack",
  },
  {
    key: "anatomy-html-element",
    title: "Anatomy of an HTML Element",
  },
  {
    key: "anatomy-html-doc",
    title: "Anatomy of an HTML Document",
  },
  {
    key: "internal-links",
    title: "Internal Links",
  },
  {
    key: "anatomy-url",
    title: "Anatomy of a URL",
  },
  {
    key: "external-links",
    title: "External Links",
  },
];

/**
 * gets the lesson number from the path
 * @return {number}
 */
export const getLessonNumber = () => {
  const { pathname } = new URL(window.location.href);
  const digits = pathname.match(/\d+/)?.[0];
  return parseInt(digits ?? "", 10);
};

/**
 * gets the path to a lesson from the lesson number
 * @param {number} lessonNumber
 * @return {string}
 */
export const getLessonPath = (lessonNumber) =>
  `/lesson/${String(lessonNumber).padStart(3, "0")}-${
    lessons[lessonNumber - 1].key
  }.html`;
