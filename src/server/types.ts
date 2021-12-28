export enum EventNames {
  MessageReceived = 'message.received',
  MessageSendToUser = 'message.sendToUser',
  MessageSentToUser = 'message.sentToUser'
}

export type UserMessage = {
  text: string
  channel: string // e.g. telegram
  raw?: any
}

export type BotMessage = {
  text: string
  userMessage?: UserMessage
}

export type BotRule = {
  canHandle: (userMessage: UserMessage) => boolean
  handle: (userMessage: UserMessage) => Promise<BotMessage>
}