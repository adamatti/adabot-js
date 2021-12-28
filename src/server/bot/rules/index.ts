import * as dateRule from './dateRule';
import * as timeRule from './timeRule';
import {BotRule} from "../../types";

const rules: Array<BotRule> = [
  dateRule,
  timeRule,
]

export default rules;