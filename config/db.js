import path from 'node:path';

import { JSONFilePreset } from 'lowdb/node';

import paths from './paths.js';

const defaultData = { mangas: [], downloads: [] };
const dbPath = path.resolve(paths.config, 'db.json');
const database = await JSONFilePreset(dbPath, defaultData);

export default database;
