import config from '../config';
import TelegramBot, {Message, Metadata, ChatId} from 'node-telegram-bot-api';
import eventEmiter from "../events";
import {EventNames} from "../types";
import parentLogger from '../logger';
const logger = parentLogger.child({file: 'telegram'});

const bot = new TelegramBot(config.telegram.token as string, {polling: true});

bot.on('message', (message: Message, metadata: Metadata) => {
  eventEmiter.emit(EventNames.TelegramMessageReceived, {message, metadata});
});

eventEmiter.on(EventNames.TelegramMessageSendToUser, ({ chatId, text }: {chatId: ChatId, text: string }) => {
  bot.sendMessage(chatId, text);
  eventEmiter.emit(EventNames.TelegramMessageSentToUser, {chatId, text});
})

logger.info("telegram bot loaded");

export default bot;