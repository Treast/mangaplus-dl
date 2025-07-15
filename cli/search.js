import { cancel, confirm, intro, isCancel, outro, select, spinner, text } from '@clack/prompts';

import Api from '../api/api.js';
import cache from '../config/cache.js';
import database from '../config/db.js';
import { downloadManga } from './download.js';

export const search = async () => {
  intro('🔎 Manga Search');

  const query = await text({
    message: 'Enter the manga name:',
    placeholder: 'One Piece',
  });

  if (isCancel(query)) {
    cancel('Operation cancelled by user.');
    process.exit(0);
  }

  const s = spinner();
  s.start('Searching for matching manga titles');
  const mangas = await searchMangas(query);
  s.stop(`Found ${mangas.length} manga${mangas.length === 1 ? '' : 's'}.`);

  if (mangas.length === 0) {
    outro('No manga found matching your query.');

    return;
  }

  const manga = await select({
    message: 'Select a manga to add to your list:',
    options: mangas.map((manga) => ({
      value: manga,
      label: `${manga.name} - ${manga.lang}`,
    })),
  });

  if (isCancel(manga)) {
    cancel('Operation cancelled by user.');
    process.exit(0);
  }

  if (!manga) {
    outro('No manga selected.');

    return;
  }

  database.data.mangas.push(manga);
  await database.write();

  const runDownload = await confirm({
    message: 'Would you like to download the latest chapters now?',
  });

  if (runDownload) {
    await downloadManga(manga);
  }

  outro('Manga successfully added to your list!');
};

const searchMangas = async (query) => {
  let mangas = cache.getMangas();

  if (!mangas) {
    mangas = await Api.getAll();
    await cache.setMangas(mangas);
  }

  const addedMangas = database.data.mangas;

  return mangas
    .filter((manga) => !addedMangas.some((m) => m.id === manga.id))
    .filter((manga) => manga.name.toLowerCase().includes(query.toLowerCase()));
};
