import * as dateRule from './dateRule';
import * as timeRule from './timeRule';
import * as helpRule from './helpRule';
import * as dolarRule from './dolarRule';
import {BotRule} from "../../types";

const rules: Array<BotRule> = [
  helpRule,
  dateRule,
  timeRule,
  dolarRule,
]

export default rules;