import config from '../config';
import TelegramBot, {Message, Metadata, ChatId} from 'node-telegram-bot-api';
import eventEmiter from "../events";
import {EventNames} from "../types";
import parentLogger from '../logger';
const logger = parentLogger.child({file: 'telegram'});

const telegramArgs = config.web.publicUrl ? undefined : {polling: true};
const bot = new TelegramBot(config.telegram.token as string, telegramArgs);

if (config.web.publicUrl) {
  const path = `${config.web.publicUrl}/api/telegram`;
  logger.debug(`Using webhook: ${path}`);
  bot.setWebHook(path);
}

bot.on('message', (message: Message, metadata: Metadata) => {
  const json = JSON.stringify({message, metadata});
  logger.debug(`message received: ${json}`);

  eventEmiter.emit(EventNames.TelegramMessageReceived, {message, metadata});
});

bot.on('error', (error: Error) => {
  logger.error("Error:", error.message);
})

bot.on('polling_error', (error: any) => {
  logger.error(`polling_error: ${error.code}`);
});

bot.on('webhook_error', (error: any) => {
  logger.error(`webhook_error: ${error.code}`);
});

eventEmiter.on(EventNames.TelegramMessageSendToUser, ({ chatId, text }: {chatId: ChatId, text: string }) => {
  logger.debug(`message sent: ${chatId} ${text}`);
  bot.sendMessage(chatId, text);
  eventEmiter.emit(EventNames.TelegramMessageSentToUser, {chatId, text});
})

logger.info("telegram bot loaded");

export default bot;