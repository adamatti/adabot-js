import type { NextApiRequest, NextApiResponse } from 'next';
import bot from "../../server/telegram/client";
import startup from '../../server/startup';
import parentLogger from '../../server/logger';
const logger = parentLogger.child({file: 'telegramWebhook'});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await startup();

    const json = JSON.stringify(req.body);
    logger.debug(`Msg received: ${json}`);
    await bot.handleUpdate(req.body);
  } catch (error: any) {
    logger.error("Error:", error.message);
  }
  res.status(200).end();
}