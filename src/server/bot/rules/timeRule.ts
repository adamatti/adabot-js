import {UserMessage, BotMessage} from "../../types"; 

export const canHandle = (userMessage: UserMessage): boolean =>  {
  return userMessage.text === "time";
}

export const handle = (userMessage: UserMessage): Promise<BotMessage> => {
  const response: BotMessage = {
    text: new Date().toTimeString(),
    userMessage 
  };
  return Promise.resolve(response);
}