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
    key: "hack-this-course",
    title: "Hack This Course",
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
    key: "anatomy-url",
    title: "Anatomy of a URL",
  },
  {
    key: "internal-links",
    title: "Internal Links",
  },
  {
    key: "external-links",
    title: "External Links",
  },
  {
    key: "basic-semantic-elements",
    title: "Basic Semantic Elements",
  },
  {
    key: "heading-elements",
    title: "HTML Heading Elements",
  },
];

/**
 * gets the lesson number from the path
 * @param {string=} str
 * @return {number | undefined}
 */
export const getLessonNumber = (str) => {
  const { pathname } = new URL(window.location.href);
  const digits = (str ?? pathname).match(/\d+/)?.[0];
  if (!digits) {
    return undefined;
  }
  return parseInt(digits ?? "", 10);
};

/**
 * gets the path to a lesson from the lesson number
 * @param {number=} lessonNumber
 * @return {string}
 */
export const getLessonPath = (lessonNumber) =>
  lessonNumber === undefined || lessonNumber < 1
    ? "/"
    : `/lesson/${String(lessonNumber).padStart(3, "0")}-${
        lessons[lessonNumber - 1].key
      }.html`;
