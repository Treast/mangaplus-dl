import path from 'node:path';

import { JSONFilePreset } from 'lowdb/node';

const defaultData = { notifiers: [], languages: ['Spanish', 'French', 'Indonesian', 'Portugese', 'Russian', 'Thai', 'English'] };
const configPath = path.resolve(process.cwd(), 'config.json');
const config = await JSONFilePreset(configPath, defaultData);

export default config;
