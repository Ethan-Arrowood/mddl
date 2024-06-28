import type { Position } from "unist";
import type { Parent, RootContent, PhrasingContent } from "mdast";

declare module "mdast" {
	interface RootContentMap {
		mddlObject: MddlObject;
		mddlFunction: MddlFunction;
	}
}

interface NodeOptions {
	position?: Position;
}

export interface DocumentationNodeOptions extends NodeOptions {
	children?: RootContent[];
}

export class MddlDocumentation implements Parent {
	type = "mddl-documentation" as const;

	children: RootContent[];
	position?: Position | undefined;

	constructor({ children = [], position }: DocumentationNodeOptions) {
		this.children = children;
		this.position = position;
	}
}

export interface MddlObjectOptions extends NodeOptions {
	identifier: string;
	parameters?: MddlParameter[];
	children?: RootContent[];
}

export class MddlObject implements Parent {
	type = "mddl-object" as const;

	children: RootContent[];
	position?: Position | undefined;
	identifier: string;
	parameters: MddlParameter[];

	constructor({
		children = [],
		identifier,
		parameters = [],
		position,
	}: MddlObjectOptions) {
		this.children = children;
		this.identifier = identifier;
		this.parameters = parameters;
		this.position = position;
	}
}

export interface MddlParameterOptions extends NodeOptions {
	defaultValue?: unknown;
	children?: PhrasingContent[];
	identifier: string;
	optional?: boolean;
	typeValue: string;
}

export class MddlParameter implements Parent {
	type = "mddl-parameter" as const;

	identifier: string;
	typeValue: string;
	optional: boolean;
	defaultValue?: unknown;
	children: PhrasingContent[];
	position: Position | undefined;

	constructor({
		children = [],
		defaultValue,
		identifier,
		optional = false,
		typeValue,
		position,
	}: MddlParameterOptions) {
		this.children = children;
		this.defaultValue = defaultValue;
		this.identifier = identifier;
		this.optional = optional;
		this.typeValue = typeValue;
		this.position = position;
	}
}

export interface MddlFunctionOptions extends NodeOptions {
	identifier: string;
	/** Description Nodes */
	children?: RootContent[];
	functionArguments?: MddlParameter[];
	returnType: string;
}

export class MddlFunction implements Parent {
	type = "mddl-function" as const;

	children: RootContent[];
	functionArguments: MddlParameter[];
	returnType: string;
	identifier: string;
	position?: Position | undefined;

	constructor({
		children = [],
		functionArguments = [],
		returnType,
		identifier,
		position
	}: MddlFunctionOptions) {
		this.children = children;
		this.functionArguments = functionArguments;
		this.returnType = returnType;
		this.identifier = identifier;
		this.position = position;
	}
}