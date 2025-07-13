#!/usr/bin/env node
import { program } from 'commander';

import { download } from './cli/download.js';
import { search } from './cli/search.js';

program
  .command('search')
  .description('Find a manga by name and add it to your download list')
  .action(async () => {
    await search();
  });

program
  .command('download')
  .description('Download the latest chapters for all mangas in your list')
  .action(async () => {
    await download();
  });

program.parse();
