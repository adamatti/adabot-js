import eventEmitter from "../events";
import { EventNames, UserMessage, BotMessage } from "../types";
import rules from "./rules";

const triggerRules = async (userMessage: UserMessage): Promise<boolean> => {
  for(const rule of rules) {
    if (rule.canHandle(userMessage)) {
      const botMessage: BotMessage = await rule.handle(userMessage);
      eventEmitter.emit(EventNames.MessageSendToUser, botMessage);
      return true;
    }
  }
  return false;
}

const sendGenericResponse = (userMessage: UserMessage) => {
  const botMessage: BotMessage = {
    text: `Message received: ${userMessage.text}`,
    userMessage,
  }
  eventEmitter.emit(EventNames.MessageSendToUser, botMessage);
}

const sendErrorMessage = (userMessage: UserMessage, error: any) => {
  const botMessage: BotMessage = {
    text: `Error processing rules: ${error.message}`,
    userMessage,
  }  
  eventEmitter.emit(EventNames.MessageSendToUser, botMessage);
}

export const botReply = async (userMessage: UserMessage) => {
  try {
    if (await triggerRules(userMessage)) {
      return;
    }  
  } catch (error: any) {
    sendErrorMessage(userMessage, error);
    return;
  }

  sendGenericResponse(userMessage);
}

eventEmitter.on(EventNames.MessageReceived, botReply);

export default {} as any;
