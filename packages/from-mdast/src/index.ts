import { position } from "unist-util-position";
import type { Root as MdastRoot, RootContent } from "mdast";
import { MddlDocumentation } from "@mddl/ast";
import { transformObject } from "./transformObject.js";
import { VFile } from "vfile";

export function toMddl(
	tree: MdastRoot,
	{ file }: { file: VFile },
): MddlDocumentation {
	const documentation = new MddlDocumentation({
		position: position(tree),
	});

	const headingRanges: RootContent[][] = [];
	let headingRange: RootContent[] = [];
	for (let i = 0; i < tree.children.length; i++) {
		if (tree.children[i].type === "heading") {
			if (headingRange.length > 0) {
				headingRanges.push(headingRange);
			}
			headingRange = [tree.children[i]];
		} else {
			headingRange.push(tree.children[i]);
		}
	}

	if (headingRange.length > 0) {
		headingRanges.push(headingRange);
	}

	for (const headingRange of headingRanges) {
		documentation.children.push(transformObject(headingRange, { file }));
	}

	return documentation;
}
