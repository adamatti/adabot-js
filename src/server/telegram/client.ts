import config from '../config';
import { Telegraf, Context } from 'telegraf';
import eventEmiter from "../events";
import {EventNames} from "../types";
import parentLogger from '../logger';
const logger = parentLogger.child({file: 'telegram'});
const SIGINT = "SIGINT";
const SIGTERM = "SIGTERM";

const bot = new Telegraf(config.telegram.token as string);
if (config.web.publicUrl) {
  const path = `${config.web.publicUrl}/api/telegram`;
  bot.telegram.setWebhook(path);
  logger.debug("Using webhook");
}

bot.on('message', (ctx: Context) => {
  const json = JSON.stringify(ctx.update);
  logger.debug(`message received: ${json}`);

  eventEmiter.emit(EventNames.TelegramMessageReceived, ctx.update);
});

eventEmiter.on(EventNames.TelegramMessageSendToUser, ({ chatId, text }: {chatId: string, text: string }) => {
  logger.debug(`message sent: ${chatId} ${text}`);
  bot.telegram.sendMessage(chatId, text);
  eventEmiter.emit(EventNames.TelegramMessageSentToUser, {chatId, text});
})

bot.launch();
logger.info("telegram bot loaded");

// Enable graceful stop
process.once(SIGINT, () => {
  logger.info(SIGINT);
  bot.stop(SIGINT)
});

process.once(SIGTERM, () => {
  logger.info(SIGTERM);
  bot.stop(SIGTERM)
});

export default bot;