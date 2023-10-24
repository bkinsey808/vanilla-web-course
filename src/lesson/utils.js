/**
 * @typedef {Object} Lesson
 *   @property {string} key
 *   @property {string} title
 *
 * @typedef {Object} Chapter
 *   @property {string} key
 *   @property {string} title
 *   @property {Lesson[]} lessons
 *   @property {number} minChapterLessonIndex
 *   @property {number} maxChapterLessonIndex
 *
 * @typedef {Chapter[]} ChaptersWithLessons
 */

/**
 * gets the chapters with lessons
 * @return {Promise<ChaptersWithLessons>}
 */
export const getLessonData = async () => {
  const response = await fetch(`${window.origin}/lesson/chapters.json`);
  const chapters = /** @type {Chapter[]} */ (await response.json());

  const lessons = await Promise.all(
    chapters.map(async ({ key }, chapterIndex) => {
      const lessonResponse = await fetch(
        `${window.origin}/lesson/${String(chapterIndex + 1).padStart(
          3,
          "0"
        )}-${key}/lessons.json`
      );
      return await lessonResponse.json();
    })
  );

  let minChapterLessonIndex = 0;

  return chapters.map(({ key, title }, chapterIndex) => {
    const chapterWithLessons = {
      key,
      title,
      lessons: lessons[chapterIndex],
      minChapterLessonIndex,
      maxChapterLessonIndex:
        minChapterLessonIndex + lessons[chapterIndex].length - 1,
    };
    minChapterLessonIndex += lessons[chapterIndex].length;

    return chapterWithLessons;
  });
};

export const lessonData = (async () => await getLessonData())();

/**
 * gets the lesson index from the path
 * @param {ChaptersWithLessons} chapters
 * @param {string=} str
 * @return {undefined | {
 *   lessonIndex: number,
 *   chapterIndex: number,
 *   chapterNumber: number,
 *   chapter: Chapter,
 *   lessonNumber: number,
 *   lesson: Lesson
 * }}
 */
export const getLessonDataForPath = (chapters, str) => {
  try {
    const { pathname } = new URL(str ?? window.location.href);
    const path = pathname.split("/").filter(Boolean);
    const chapterNumber = parseInt(path[1]);
    const lessonNumber = parseInt(path[2]);

    // return undefined if path0 or path1 are not numbers
    if (isNaN(chapterNumber) || isNaN(lessonNumber)) {
      return undefined;
    }

    const lessonIndexOfChapter = lessonNumber - 1;
    const chapterIndex = chapterNumber - 1;
    const chapter = chapters[chapterIndex];

    const chapterLessonIndex = chapters[chapterIndex].minChapterLessonIndex;
    const lessonIndex = chapterLessonIndex + lessonIndexOfChapter;
    const lesson = chapters[chapterIndex].lessons[lessonIndexOfChapter];

    return {
      lessonIndex,
      chapterIndex,
      chapterNumber,
      chapter,
      lessonNumber,
      lesson,
    };
  } catch (e) {
    return undefined;
  }
};

/**
 * gets the path to a lesson from the lesson index
 * @param {ChaptersWithLessons} chapters
 * @param {number | undefined} lessonIndex
 * @return {string}
 */
export const getPathFromLessonIndex = (chapters, lessonIndex) => {
  if (lessonIndex === undefined || lessonIndex < 0) {
    return "/";
  }

  const chapterIndex = chapters.findIndex(
    ({ maxChapterLessonIndex }) => lessonIndex <= maxChapterLessonIndex
  );

  const newChapterIndex =
    chapterIndex === -1 ? chapters.length - 1 : chapterIndex;
  const chapter = chapters[newChapterIndex];

  const lessonIndexOfChapter = lessonIndex - chapter?.minChapterLessonIndex;

  const newLessonIndexOfChapter = Math.max(
    Math.min(lessonIndexOfChapter, chapter.lessons.length - 1),
    0
  );

  return `${window.origin}/lesson/${String(newChapterIndex + 1).padStart(
    3,
    "0"
  )}-${chapter.key}/${String(newLessonIndexOfChapter + 1).padStart(3, "0")}-${
    chapter.lessons[newLessonIndexOfChapter].key
  }.html`;
};
