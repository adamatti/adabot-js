import {UserMessage } from "../../types"; 
import * as helpRule from './helpRule';

describe ("helpRule", () => {
  it("happy path", () => {
    const userMessage: UserMessage = {text: "help", channel: "telegram"}
    expect(helpRule.canHandle(userMessage)).toBeTruthy();

    return expect(helpRule.handle(userMessage)).resolves.toHaveProperty("text");
  })
})