import envPaths from 'env-paths';
import { existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';

import { JSONFilePreset } from 'lowdb/node';

const paths = envPaths('mangaplus-dl');

if (!existsSync(paths.config)) {
  mkdirSync(paths.config, { recursive: true });
}

const defaultData = { mangas: [], downloads: [] };
const dbPath = path.resolve(paths.config, 'db.json');
const database = await JSONFilePreset(dbPath, defaultData);

export default database;
