import { MddlFunction, MddlParameter } from "@mddl/ast";
import { InlineCode, RootContent } from "mdast";
import { VFile } from "vfile";
import { ParseRule } from "./parseRule.js";
import { pointEnd, pointStart, position } from "unist-util-position";
import { name } from "estree-util-is-identifier-name";

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

	let optional = false;
	let declaredArgumentListSlice = declarationValue.slice(leftParenIndex+1, rightParenIndex);

	// Optional Starting Function Declaration Parameters
	if (declaredArgumentListSlice.indexOf('[') === 0) {
		// Validate closing bracket
		if (declaredArgumentListSlice.indexOf(']') === -1) {
			throw file.fail(
				new ParseRule("Function Declaration Expression", "]", { place: position(mdastInlineCodeNode) })
			)
		}

		// trim off brackets
		declaredArgumentListSlice = declaredArgumentListSlice.slice(1, -1)
		optional = true;
	}

	while (declaredArgumentListSlice !== '') {
		let commaIndex = declaredArgumentListSlice.indexOf(',');

		if (commaIndex === -1) { // last argument
			var identifier = declaredArgumentListSlice
			declaredArgumentListSlice = '';
		} else {
			const leftBracketIndex = declaredArgumentListSlice.indexOf('[');

			if (leftBracketIndex < commaIndex) {
				// Validate closing bracket
				if (declaredArgumentListSlice.indexOf(']') === -1) {
					throw file.fail(
						new ParseRule("Function Declaration Expression", "]", { place: position(mdastInlineCodeNode) })
					)
				}

				// trim off brackets
				declaredArgumentListSlice = declaredArgumentListSlice.slice(leftBracketIndex, -1)
				optional = true;
			}

			var identifier = declaredArgumentListSlice.slice(0, commaIndex);
			declaredArgumentListSlice = declaredArgumentListSlice.slice(commaIndex+1)
		}
		
		if (!name(identifier)) {
			throw file.fail(
				new ParseRule("Function Declaration Parameter", "valid JavaScript Identifier", {
					place: position(mdastInlineCodeNode),
				}),
			);
		}

		result.declaredArgumentList.push({ name: identifier, optional })
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
	} = transformFunctionDeclarationExpression(nodes[0].children[1], { file })

	let description: RootContent[] = [];
	let functionArguments: MddlParameter[] = [];

	const startPoint = pointStart(nodes[0]);
	let endPoint = pointEnd(nodes[0]);

	return new MddlFunction({
		children: description,
		identifier,
		returnType,
		functionArguments,
		position: 
			startPoint && endPoint
				? { start: startPoint,
					end: endPoint,
				} : undefined
	})
}