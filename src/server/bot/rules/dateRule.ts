import {UserMessage, BotMessage} from "../../types"; 

export const canHandle = (userMessage: UserMessage): boolean =>  {
  const keywords = ["date", "/date"];
  return Boolean(keywords.some(it => userMessage.text === it));
}

export const handle = (userMessage: UserMessage): Promise<BotMessage> => {
  const response: BotMessage = {
    text: new Date().toDateString(),
    userMessage 
  };
  return Promise.resolve(response);
}