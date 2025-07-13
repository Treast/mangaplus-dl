import { createWriteStream, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';

import { intro, spinner } from '@clack/prompts';
import archiver from 'archiver';

import Api from '../api/api.js';
import config from '../config/config.js';
import database from '../config/db.js';
import { notify } from '../utils/notifier.js';

export const download = async () => {
  intro('📥 Downloading latest manga chapters...');

  const mangas = database.data.mangas;

  for (const manga of mangas) {
    await downloadManga(manga);
  }
};

export const downloadManga = async (manga) => {
  const s = spinner();
  s.start(`Checking for new chapters of "${manga.name}"...`);

  const downloadedChapterIds = database.data.downloads.map((chapter) => chapter.id);
  const mangaChapters = await Api.getChapters(manga);

  const chapters = mangaChapters.filter((chapter) => !downloadedChapterIds.includes(chapter.id));

  if (chapters.length > 0) {
    for (const chapter of chapters) {
      await downloadChapter(chapter)
        .then(async () => {
          database.data.downloads.push({
            id: chapter.id,
            downloaded_at: Date.now(),
          });

          await database.write();

          await notifyChapter(chapter);
        })
        .catch((err) => {});
    }

    s.stop(`Finished downloading new chapters for "${manga.name}".`);
  } else {
    s.stop(`No new chapters found for "${manga.name}".`);
  }
};

export const downloadChapter = async (chapter) => {
  const pages = await Api.getPages(chapter);
  const folder = path.resolve(process.cwd(), 'mangas', chapter.manga.name);
  const chapterPath = path.resolve(folder, `${chapter.manga.name} - Chapter ${chapter.name}.cbz`);

  if (!existsSync(folder)) {
    mkdirSync(folder, { recursive: true });
  }

  const output = createWriteStream(chapterPath);
  const archive = archiver('zip', { zlib: { level: 9 } });

  archive.pipe(output);

  for (const [idx, page] of pages.entries()) {
    const buffer = await Api.getPage(page);
    const filename = (idx + 1).toString().padStart(4, '0') + '.jpg';
    archive.append(Buffer.from(buffer), { name: filename });
  }

  await archive.finalize();
};

export const notifyChapter = async (chapter) => {
  const message = `📚 New chapter available!\n\n${chapter.manga.name} — Chapter ${chapter.name}\n\nRead on MangaPlus : https://mangaplus.shueisha.co.jp/titles/${chapter.manga.id}`;

  for (const notifier of config.data.notifiers) {
    await notify(notifier, message);
  }
};
