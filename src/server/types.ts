
export type TelegramSendToUser = {
  chatId: string
  text: string
}

export enum EventNames {
  TelegramMessageReceived = 'telegram.message.received',
  TelegramMessageSendToUser = 'telegram.message.sendToUser',
  TelegramMessageSentToUser = 'telegram.message.sentToUser'
}