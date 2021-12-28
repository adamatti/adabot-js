import type { NextApiRequest, NextApiResponse } from 'next';
import bot from "../../server/telegram/client";
import parentLogger from '../../server/logger';
const logger = parentLogger.child({file: 'telegramWebhook'});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const json = JSON.stringify(req.body);
  logger.debug(`Msg received: ${json}`);
  bot.processUpdate(req.body);
  res.status(200).end();
}