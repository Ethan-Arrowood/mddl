import type { Position } from 'unist';
import type { Parent, RootContent, PhrasingContent } from 'mdast';

declare module 'mdast' {
    interface RootContentMap {
        mddlObject: MDDLObject
    }
}

interface NodeOptions {
    position?: Position;
}

export interface MDDLDocumentation extends Parent {
    type: 'mddl-documentation';
}

export interface DocumentationNodeOptions extends NodeOptions {
    children?: RootContent[];
}

export class MDDLDocumentation {
    constructor ({ children = [], position }: DocumentationNodeOptions) {
        this.children = children;
        this.position = position;
        this.type = 'mddl-documentation';
    }
}

export interface MDDLObject extends Parent {
    type: 'mddl-object';
    identifier: string;
    parameters: MDDLParameter[];
    children: RootContent[]
}

export interface MDDLObjectOptions extends NodeOptions {
    identifier: string;
    parameters?: MDDLParameter[];
    children?: RootContent[];
}

export class MDDLObject {
    constructor ({ children = [], identifier, parameters = [], position }: MDDLObjectOptions) {
        this.children = children;
        this.identifier = identifier;
        this.parameters = parameters;
        this.position = position;
        this.type = 'mddl-object';
    }
}

export interface MDDLParameter extends Parent {
    type: 'mddl-parameter';
    identifier: string;
    typeValue: string;
    optional: boolean;
    defaultValue?: any;
    children: PhrasingContent[];
}

export interface MDDLParameterOptions extends NodeOptions {
    defaultValue?: any;
    children?: PhrasingContent[];
    identifier: string;
    optional?: boolean;
    typeValue: string;
}

export class MDDLParameter {
    constructor({ children = [], defaultValue, identifier, optional = false, typeValue, position }: MDDLParameterOptions) {
        this.children = children;
        this.defaultValue = defaultValue;
        this.identifier = identifier;
        this.optional = optional;
        this.typeValue = typeValue;
        this.position = position;
        this.type = 'mddl-parameter';
    }

}