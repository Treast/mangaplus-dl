import path from 'node:path';

import { JSONFilePreset } from 'lowdb/node';

import paths from './paths.js';

const cachePath = path.resolve(paths.cache, 'cache.json');
const cache = await JSONFilePreset(cachePath, {
  mangas: {
    expires_at: null,
    data: [],
  },
});

export const getMangas = () => {
  if (cache.data.mangas.expires_at && cache.data.mangas.expires_at > Date.now()) {
    return cache.data.mangas.data;
  }

  return null;
};

export const setMangas = async (data) => {
  cache.data.mangas.data = data;
  cache.data.mangas.expires_at = Date.now() + 1000 * 60 * 60 * 24; // 24 hours
  await cache.write();
};

export default {
  getMangas,
  setMangas,
};
