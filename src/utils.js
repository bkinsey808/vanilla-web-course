/**
 * Fetches the footer.htm file and adds it to the end of the document body.
 * @param {string} file - The file to fetch.
 * @return {Promise<void>}
 */
export async function insertHtml(file) {
  const resp = await fetch(file);
  const html = await resp.text();
  document.body.insertAdjacentHTML("beforeend", html);
}
