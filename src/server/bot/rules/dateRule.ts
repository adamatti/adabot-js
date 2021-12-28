import {UserMessage, BotMessage} from "../../types"; 

export const canHandle = (userMessage: UserMessage): boolean =>  {
  return userMessage.text === "date";
}

export const handle = (userMessage: UserMessage): Promise<BotMessage> => {
  const response: BotMessage = {
    text: new Date().toDateString(),
    userMessage 
  };
  return Promise.resolve(response);
}