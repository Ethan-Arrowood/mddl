"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var unist_util_visit_1 = __importDefault(require("unist-util-visit"));
var remark_1 = __importDefault(require("remark"));
var unist_builder_1 = __importDefault(require("unist-builder"));
remark_1.default()
    .use(function () {
    return function (tree) {
        unist_util_visit_1.default(tree, 'paragraph', function (paragraphNode) {
            var parameter = {};
            console.log(paragraphNode);
            unist_util_visit_1.default(paragraphNode, 'strong', function (strongNode) {
                unist_util_visit_1.default(strongNode, 'text', function (textNode) {
                    if (!parameter.identifier) {
                        parameter.identifier = unist_builder_1.default('identifier', textNode.value);
                    }
                });
            });
            unist_util_visit_1.default(paragraphNode, 'inlineCode', function (inlineCodeNode) {
                if (!parameter.type) {
                    parameter.type = unist_builder_1.default('type', inlineCodeNode.value);
                }
            });
        });
    };
})
    .process('**iterations** - `number` - _optional_ - Default: `10` - The number of times the function `name` will execute.', function () { });
