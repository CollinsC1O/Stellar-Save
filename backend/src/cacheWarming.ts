import { set } from './redis';
import { logger } from './logger';

const warmData = {
  '/api/retirements': [
    { id: 1, amount: 100, entity: 'Company A' },
    { id: 2, amount: 250, entity: 'Company B' },
  ],
  '/api/stats': { totalRetired: 350, totalTransactions: 2 },
};

export const startWarmingJob = async () => {
  logger.info('Starting cache warming job');

  for (const [endpoint, data] of Object.entries(warmData)) {
    await set(`cache:${endpoint}`, data, 3600);
    logger.debug('Cache warmed', { endpoint });
  }

  logger.info('Cache warming completed');

  setInterval(async () => {
    logger.debug('Running scheduled cache warming');
    for (const [endpoint, data] of Object.entries(warmData)) {
      await set(`cache:${endpoint}`, data, 3600);
    }
  }, 3600000);
};
