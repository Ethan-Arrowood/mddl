import { position } from "unist-util-position";
import type { Heading, Root as MdastRoot, RootContent, Text } from "mdast";
import { MddlDocumentation } from "@mddl/ast";
import { transformObject } from "./transformObject.js";
import type { VFile } from "vfile";
import { ParseRule } from "./parseRule.js";
import { transformFunction } from "./transformFunction.js";

type HeadingRange = [Heading, ...RootContent[]];

export function toMddl(
	tree: MdastRoot,
	{ file }: { file: VFile },
): MddlDocumentation {
	const documentation = new MddlDocumentation({
		position: position(tree),
	});

	const headingRanges: HeadingRange[] = [];
	let start;
	for (let i = 0; i < tree.children.length; i++) {
		if (tree.children[i].type === "heading") {
			if (start) {
				headingRanges.push(tree.children.slice(start, i+1) as HeadingRange);
				start = undefined;
			} else {
				start = i;
			}
		}
	}

	if (start !== undefined) {
		headingRanges.push(tree.children.slice(start) as HeadingRange);
	}

	for (const headingRange of headingRanges) {
		switch (matchHeading(headingRange[0], { file })) {
			case "object":
				documentation.children.push(transformObject(headingRange, { file }));
			case "function":
				documentation.children.push(transformFunction(headingRange, { file }));
		}
	}

	return documentation;
}

function matchHeading (node: Heading, { file }: { file: VFile }): 'object' | 'function' {
	if (node.children.length === 0 || node.children[0].type !== "text") {
		throw file.fail(new ParseRule("Heading", "Text", "with content", { place: position(node) }));
	}

	switch(node.children[0].value.trim()) {
		case "Object:": return 'object';
		case "Function:": return 'function';
		default: throw file.fail(new ParseRule("Heading", "Text", "starting with `Object: ` or `Function: `", { place: position(node) }));
	}
}