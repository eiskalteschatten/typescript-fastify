import { promises as fsPromises } from 'node:fs';
import path from 'node:path';

import logger from './lib/logger';

import tsconfig from '../tsconfig.json';

const { outDir, baseUrl, paths } = tsconfig.compilerOptions;

async function setupSymlinks(): Promise<void> {
  if (process.env.NODE_ENV === 'development') {
    logger.info('Skipping symlinks because NODE_ENV is "development".');
    return;
  }

  logger.info('Setting up symlinks');

  for (let alias in paths) {
    const sources = paths[alias];
    const isDir = alias.slice(-1) === '*';

    alias = alias.replace('*', '');

    const fullAlias = path.resolve('./node_modules', alias);

    for (let source of sources) {
      source = source.replace('*', '');
      let sourcePath = path.resolve(outDir, baseUrl, source);

      if (!isDir) {
        sourcePath += '.js';
      }

      logger.info('- ' + fullAlias + ' -> ' + sourcePath);

      try {
        await fsPromises.unlink(fullAlias);
      }
      catch (error) {
        // May not be set already
        //logger.error(error);
      }
      try {
        await fsPromises.symlink(sourcePath, fullAlias);
      }
      catch (error) {
        logger.error(error);
      }
    }
  }

  logger.info('Symlinks created successfully');
}

async function bootstrap(): Promise<void> {
  await setupSymlinks();
}

bootstrap();
