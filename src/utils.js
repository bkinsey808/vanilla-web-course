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
  const templatePath = `web-components/${templateName}/${templateName}.html`;
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
