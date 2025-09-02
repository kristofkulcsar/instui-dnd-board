import { type Item } from "./Item";

export type Column = {
	title: string;
	columnId: string;
	items: Item[];
};