/*
 * load all listeners here
 */
import engine from "./bot/engine";
import bot from "./telegram/client";

const startup = () => {
  if (!engine) throw new Error("engine is not started");

  if (!bot) throw new Error("bot is not started");
}

export default startup;