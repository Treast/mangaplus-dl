import path from 'node:path';

import { JSONFilePreset } from 'lowdb/node';

const defaultData = { mangas: [], downloads: [] };
const dbPath = path.resolve(process.cwd(), 'db.json');
const database = await JSONFilePreset(dbPath, defaultData);

export default database;
