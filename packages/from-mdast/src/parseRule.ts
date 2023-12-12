import { VFileMessage, Options as VFileMessageOptions } from "vfile-message";

class FromMdastVFileMessage extends VFileMessage {
	constructor(reason: string, options?: VFileMessageOptions) {
		super(reason, { ...options, source: "@mddl/from-mdast" });
	}
}

export class ParseRule extends FromMdastVFileMessage {
	constructor(
		parseNode: string,
		expectedNode: string,
		extraReasonOrOptions?: string | VFileMessageOptions,
		maybeOptions?: VFileMessageOptions,
	) {
		let extraReason = extraReasonOrOptions;
		let options = maybeOptions;
		if (typeof extraReason !== "string") {
			options = extraReason;
			extraReason = undefined;
		}
		super(
			`Failed to parse ${parseNode}. Expected ${expectedNode} node${
				extraReason ? `${extraReason}.` : "."
			}`,
			options,
		);
	}
}
