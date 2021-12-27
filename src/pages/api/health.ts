import type { NextApiRequest, NextApiResponse } from 'next';
import startup from '../../server/startup';
import parentLogger from '../../server/logger';
const logger = parentLogger.child({file: 'health'});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await startup();
  logger.debug("health check called");

  res.status(200).json({
    status: 'ok'
  });
}