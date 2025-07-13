import envPaths from 'env-paths';
import { existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';

import { JSONFilePreset } from 'lowdb/node';

const paths = envPaths('mangaplus-dl');

const defaultData = { notifiers: [], languages: ['Spanish', 'French', 'Indonesian', 'Portugese', 'Russian', 'Thai', 'English'] };

if (!existsSync(paths.config)) {
  mkdirSync(paths.config, { recursive: true });
}

const configPath = path.resolve(paths.config, 'config.json');
const config = await JSONFilePreset(configPath, defaultData);

export default config;
