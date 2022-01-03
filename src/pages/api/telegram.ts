import type { NextApiRequest, NextApiResponse } from 'next';
import bot from "../../server/telegram/client";
import startup from '../../server/startup';
import eventEmitter from "../../server/events";
import parentLogger from '../../server/logger';
import {EventNames, BotMessage} from '../../server/types';
const logger = parentLogger.child({file: 'telegramWebhook'});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await startup();

    const telegramUpdate: any = req.body;
    const json = JSON.stringify(telegramUpdate);
    logger.debug(`Msg received: ${json}`);

    // not the best solution, but vercel need to wait for response
    const botResponse = new Promise((resolve) => {
      eventEmitter.on(EventNames.MessageSentToUser, (botMessage:BotMessage) => {
        if (telegramUpdate.update_id === botMessage.userMessage?.raw.update_id) {
          resolve(null);
        }
      })
    })
    
    await bot.handleUpdate(telegramUpdate);
    logger.debug("Waiting bot response");
    await botResponse;
    logger.debug("Request completed");
  } catch (error: any) {
    logger.error("Error:", error.message);
  }
  res.status(200).end();
}