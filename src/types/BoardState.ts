import { type ColumnMap } from "./ColumnMap";
import { type Operation } from "./Operation";

export type BoardState = {
	columnMap: ColumnMap;
	orderedColumnIds: string[];
	lastOperation: Operation | null;
};