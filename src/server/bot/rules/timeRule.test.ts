import {UserMessage } from "../../types"; 
import * as timeRule from './timeRule';

describe ("timeRule", () => {
  it("happy path", () => {
    const userMessage: UserMessage = {text: "time", channel: "telegram"}
    expect(timeRule.canHandle(userMessage)).toBeTruthy();

    return expect(timeRule.handle(userMessage)).resolves.toHaveProperty("text");
  })
})