import {UserMessage } from "../../types"; 
import * as dateRule from './dateRule';

describe ("dateRule", () => {
  it("happy path", () => {
    const userMessage: UserMessage = {text: "date", channel: "telegram"}
    expect(dateRule.canHandle(userMessage)).toBeTruthy();

    return expect(dateRule.handle(userMessage)).resolves.toHaveProperty("text");
  })
})