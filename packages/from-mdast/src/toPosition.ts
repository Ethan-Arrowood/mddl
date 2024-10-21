import type { Point, Position } from "unist";

export function toPosition (start?: Point, end?: Point): Position | undefined {
		return start && end ? {
			start,
			end,
		} : undefined;
}