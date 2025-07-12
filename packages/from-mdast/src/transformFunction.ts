import { MddlFunction, MddlParameter } from "@mddl/ast";
import { InlineCode, RootContent } from "mdast";
import { VFile } from "vfile";
import { ParseRule } from "./parseRule.js";
import { pointEnd, pointStart, position } from "unist-util-position";
import { name } from "estree-util-is-identifier-name";
import { toPosition } from "./toPosition.js";

interface FunctionDeclarationExpression {
	identifier: string;
	declaredArgumentList: { name: string, optional: boolean }[];
}

function transformFunctionDeclarationExpression (
	mdastInlineCodeNode: InlineCode,
	{ file }: { file: VFile }
): FunctionDeclarationExpression {
	const declarationValue = mdastInlineCodeNode.value.trim();

	const leftParenIndex = declarationValue.indexOf('(');
	if (leftParenIndex === -1) {
		throw file.fail(
			new ParseRule("Function Declaration Expression", "(", { place: position(mdastInlineCodeNode) })
		)
	}

	const rightParenIndex = declarationValue.indexOf(')');
	if (rightParenIndex === -1) {
		throw file.fail(
			new ParseRule("Function Declaration Expression", ")", { place: position(mdastInlineCodeNode) })
		)
	}

	const result: FunctionDeclarationExpression = {
		identifier: declarationValue.slice(0, leftParenIndex),
		declaredArgumentList: []
	}

	if (leftParenIndex === rightParenIndex - 1) {
		return result
	}

	const argStringList = declarationValue.slice(leftParenIndex+1, rightParenIndex).split(',');
	let optional = false;
	for (let i = 0; i < argStringList.length; i++) {
		const argString = argStringList[i].trim();
		const leftBracketIndex = argString.indexOf('[');
		const rightBracketIndex = argString.indexOf(']');
		if (leftBracketIndex === 1 && rightBracketIndex === argString.length - 1) {
			result.declaredArgumentList.push({ name: argString.slice(1, -1), optional: true })
		} else if (leftBracketIndex !== -1 && rightBracketIndex === -1) {
			if (argStringList[argStringList.length-1].indexOf(']') === -1) {
				throw file.fail(
					new ParseRule("Function Declaration Expression", "]", { place: position(mdastInlineCodeNode) })
				)
			}

			result.declaredArgumentList.push({ name: argString.slice(0, leftBracketIndex), optional: false })
			optional = true;
		} else if (rightBracketIndex !== -1) {
			result.declaredArgumentList.push({ name: argString.slice(0, rightBracketIndex), optional: optional })
		} else {
			result.declaredArgumentList.push({ name: argString, optional: optional })
		}
	}

	return result;
}

export function transformFunction(
	nodes: RootContent[],
	{ file }: { file: VFile },
): MddlFunction {
	// Validate input contains anything
	if (nodes.length === 0) {
		throw file.fail(
			new ParseRule("Function", "Heading", { place: { line: 1, column: 1 } })
		)
	}

	// Validate input starts with a Heading node
	if (nodes[0].type !== 'heading') {
		throw file.fail(
			new ParseRule("Function Declaration", 'Heading', {
				place: position(nodes[0])
			})
		)
	}

	// Validate Heading node starts with `Function: `
	if (
		nodes[0].children.length <= 1 ||
		nodes[0].children[0].type !== 'text' ||
		!nodes[0].children[0].value.startsWith('Function: ')
	) {
		throw file.fail(
			new ParseRule("Function Declaration", "Text", "starting with `Function: `", { place: position(nodes[0])})
		)
	}

	if (
		nodes[0].children.length !== 2 ||
		nodes[0].children[1].type !== 'inlineCode'
	) {
		throw file.fail(
			new ParseRule("Function Declaration", "InlineCode", "Function Declaration Expression should be surrounded with ` characters", { place: position(nodes[0])})
		)
	}

	const {
		identifier,
		declaredArgumentList
	} = transformFunctionDeclarationExpression(nodes[0].children[1], { file });

	console.log(declaredArgumentList);

	let description: RootContent[] = [];
	let functionArguments: MddlParameter[] = [];

	const startPoint = pointStart(nodes[0]);
	let endPoint = pointEnd(nodes[0]);

	let returnType = 'null';

	for (let i = 1; i < nodes.length; i++) {
		const node = nodes[i];
		switch (node.type) {
			case 'paragraph': {
				if (node.children.length === 0 || node.children[0].type !== 'text') {
					throw file.fail(new ParseRule("Function", "Paragraph", "containing a Text node", { place: position(nodes[i]) }))
				}

				const textNode = node.children[0];
				if (textNode.value.startsWith('Returns: ')) {
					if (node.children.length !== 2 || node.children[1].type !== 'inlineCode') {
						throw file.fail(new ParseRule("Function", "InlineCode", "return type should be surrounded with ` characters", { place: position(nodes[i]) }))
					}

					returnType = node.children[1].value;
				}

				break;
			}
			default: throw file.fail(new ParseRule("Function", "Paragraph", `. Received ${node.type}`, { place: position(nodes[i]) }))
		}
	}

	return new MddlFunction({
		children: description,
		identifier,
		returnType,
		functionArguments,
		position: toPosition(startPoint, endPoint)
	})
}