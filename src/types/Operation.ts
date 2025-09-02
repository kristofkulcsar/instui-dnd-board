import { type Outcome } from "./Outcome";
import { type Trigger } from "./Trigger";

export type Operation = {
	trigger: Trigger;
	outcome: Outcome;
};