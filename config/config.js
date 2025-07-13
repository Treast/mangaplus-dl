import path from 'node:path';

import { JSONFilePreset } from 'lowdb/node';

import paths from './paths.js';

const defaultData = { notifiers: [], languages: ['Spanish', 'French', 'Indonesian', 'Portugese', 'Russian', 'Thai', 'English'] };
const configPath = path.resolve(paths.data, 'config.json');
const config = await JSONFilePreset(configPath, defaultData);

export default config;
