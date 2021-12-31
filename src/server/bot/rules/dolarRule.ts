import {UserMessage, BotMessage} from "../../types"; 

export const canHandle = (userMessage: UserMessage): boolean =>  {
  const keywords = [
    "dolar", "/dolar",
    "usdtobrl", "/usdtobrl",
  ];
  return Boolean(keywords.some(it => userMessage.text === it));
}

export const handle = async (userMessage: UserMessage): Promise<BotMessage> => {
  // FIXME jest + nextjs + got = https://dev.to/steveruizok/jest-and-esm-cannot-use-import-statement-outside-a-module-4mmj
  const { got } = await import("got");
  
  const url = "http://economia.awesomeapi.com.br/json/last/USD-BRL";
  const response: any = await got({
    url
  }).json();
  
  const botMessage: BotMessage = {
    text: response.USDBRL.bid,
    userMessage 
  };
  return Promise.resolve(botMessage);
}