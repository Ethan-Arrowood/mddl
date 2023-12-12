import { VFileMessage, Options as VFileMessageOptions } from 'vfile-message';

class FromMdastVFileMessage extends VFileMessage {
    constructor (reason: string, options?: VFileMessageOptions) {
        super(reason, { ...options, source: '@mddl/from-mdast' })
    }
}

export class ParseRule extends FromMdastVFileMessage {
    constructor(parseNode: string, expectedNode: string, extraReasonOrOptions?: string | VFileMessageOptions, options?: VFileMessageOptions) {
        if (typeof extraReasonOrOptions !== 'string') {
            options = extraReasonOrOptions;
            extraReasonOrOptions = undefined;
        }
        super(`Failed to parse ${parseNode}. Expected ${expectedNode} node${extraReasonOrOptions ? `${extraReasonOrOptions}.` : '.'}`, options);
    }
}