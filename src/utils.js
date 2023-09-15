/**
 * Fetches an html file and inserts it into the document body.
 * @param {string} file - The file to fetch.
 * @return {Promise<void>}
 */
export const insertHtml = async (file) => {
  const resp = await fetch(file);
  const html = await resp.text();
  document.body.insertAdjacentHTML("beforeend", html);
};

/**
 * cache of the templates so we don't have to fetch them every time
 * @type {Record<string, Promise<HTMLTemplateElement | null>>}
 */
const webComponentTemplatePromises = {};

/**
 * cache the templates so we don't have to fetch them every instance of the component
 * @param {string} templateName
 */
const getWebComponentTemplate = async (templateName) => {
  const origin = new URL(window.location.href).origin;
  const templatePath = `${origin}/web-components/${templateName}/${templateName}.html`;
  await insertHtml(templatePath);
  const el = Promise.resolve(
    /** @type {HTMLTemplateElement | null} */ (
      document.getElementById(templateName)
    )
  );
  webComponentTemplatePromises[templateName] = el;
  return el;
};

/**
 * Appends a template to a shadow root
 * @param {ShadowRoot} shadowRoot
 * @param {string} templateName
 */
export const shadowAppendTemplate = async (shadowRoot, templateName) => {
  if (!webComponentTemplatePromises[templateName]) {
    webComponentTemplatePromises[templateName] =
      getWebComponentTemplate(templateName);
  }
  const template = await webComponentTemplatePromises[templateName];
  const clonedNode = template?.content?.cloneNode(true);
  if (clonedNode) {
    shadowRoot.append(clonedNode);
  }
};

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
