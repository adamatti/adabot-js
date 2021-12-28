import eventEmitter from "../events";
import { EventNames, UserMessage, BotMessage } from "../types";
import rules from "./rules";

export const botReply = async (userMessage: UserMessage) => {
  for(const rule of rules) {
    if (rule.canHandle(userMessage)) {
      const botMessage: BotMessage = await rule.handle(userMessage);
      eventEmitter.emit(EventNames.MessageSendToUser, botMessage);
      return;
    }
  }

  // Generic response
  const botMessage: BotMessage = {
    text: `Message received: ${userMessage.text}`,
    userMessage,
  }
  eventEmitter.emit(EventNames.MessageSendToUser, botMessage);
}

eventEmitter.on(EventNames.MessageReceived, botReply);

export default {} as any;
