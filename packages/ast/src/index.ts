import type { Position } from 'unist';
import type { Parent, RootContent, PhrasingContent } from 'mdast';

declare module 'mdast' {
    interface RootContentMap {
        mddlObject: MddlObject
    }
}

interface NodeOptions {
    position?: Position;
}

export interface MddlDocumentation extends Parent {
    type: 'mddl-documentation';
}

export interface DocumentationNodeOptions extends NodeOptions {
    children?: RootContent[];
}

export class MddlDocumentation {
    constructor ({ children = [], position }: DocumentationNodeOptions) {
        this.children = children;
        this.position = position;
        this.type = 'mddl-documentation';
    }
}

export interface MddlObject extends Parent {
    type: 'mddl-object';
    identifier: string;
    parameters: MddlParameter[];
    children: RootContent[]
}

export interface MddlObjectOptions extends NodeOptions {
    identifier: string;
    parameters?: MddlParameter[];
    children?: RootContent[];
}

export class MddlObject {
    constructor ({ children = [], identifier, parameters = [], position }: MddlObjectOptions) {
        this.children = children;
        this.identifier = identifier;
        this.parameters = parameters;
        this.position = position;
        this.type = 'mddl-object';
    }
}

export interface MddlParameter extends Parent {
    type: 'mddl-parameter';
    identifier: string;
    typeValue: string;
    optional: boolean;
    defaultValue?: any;
    children: PhrasingContent[];
}

export interface MddlParameterOptions extends NodeOptions {
    defaultValue?: any;
    children?: PhrasingContent[];
    identifier: string;
    optional?: boolean;
    typeValue: string;
}

export class MddlParameter {
    constructor({ children = [], defaultValue, identifier, optional = false, typeValue, position }: MddlParameterOptions) {
        this.children = children;
        this.defaultValue = defaultValue;
        this.identifier = identifier;
        this.optional = optional;
        this.typeValue = typeValue;
        this.position = position;
        this.type = 'mddl-parameter';
    }

}