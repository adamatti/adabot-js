import {UserMessage, BotMessage} from "../../types"; 

export const canHandle = (userMessage: UserMessage): boolean =>  {
  const keywords = ["help", "/help"];
  return Boolean(keywords.some(it => userMessage.text === it));
}

export const handle = (userMessage: UserMessage): Promise<BotMessage> => {
  const response: BotMessage = {
    text: `Welcome to AdaBot! Try send one of those (still on progress):
    - /date - send the server date
    - /time - send the server time
    - /dolar - usd to brl conversion
    - /help - send this message`,
    userMessage 
  };
  return Promise.resolve(response);
}