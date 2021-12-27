import TelegramBot, {Message, Metadata, ChatId} from 'node-telegram-bot-api';

export type TelegramSendToUser = {
  chatId: ChatId
  text: string
}

export enum EventNames {
  TelegramMessageReceived = 'telegram.message.received',
  TelegramMessageSendToUser = 'telegram.message.sendToUser',
  TelegramMessageSentToUser = 'telegram.message.sentToUser'
}