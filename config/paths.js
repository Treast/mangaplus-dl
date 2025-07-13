import envPaths from 'env-paths';
import { existsSync, mkdirSync } from 'node:fs';

const paths = envPaths('mangaplus-dl');

if (!existsSync(paths.config)) {
  mkdirSync(paths.config, { recursive: true });
}

if (!existsSync(paths.data)) {
  mkdirSync(paths.data, { recursive: true });
}

export default paths;
