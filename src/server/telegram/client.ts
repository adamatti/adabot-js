import config from '../config';
import { Telegraf, Context, Types } from 'telegraf';
import eventEmiter from "../events";
import {EventNames, UserMessage, BotMessage} from "../types";
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
  const update: any = ctx.update;
  const json = JSON.stringify(update);
  logger.debug(`message received: ${json}`);

  const userMessage: UserMessage = {
    text: update.message.text,
    channel: "telegram",
    raw: update
  };

  eventEmiter.emit(EventNames.MessageReceived, userMessage);
});

eventEmiter.on(EventNames.MessageSendToUser, (botMessage: BotMessage) => {
  if (botMessage.userMessage?.channel !== "telegram") {
    return;
  }
  const text = botMessage.text;
  const chatId = botMessage.userMessage?.raw.message.chat.id;

  logger.debug(`message sent: ${chatId} ${text}`);
  bot.telegram.sendMessage(chatId, text);
  eventEmiter.emit(EventNames.MessageSentToUser,botMessage);
})

if (!config.web.publicUrl) {
  logger.debug("Using polling");
  bot.launch();
}
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