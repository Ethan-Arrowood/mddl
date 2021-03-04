import remark from 'remark'
import mdast from 'mdast'
import unified from 'unified'
import u from 'unist-builder'

const input = `**iterations** - \`number\` - _optional_ - Default: \`10\` - The number of times the function \`name\` will execute.`

const types = {
	PARAMETER: 'parameter',
	IDENTIFIER: 'identifier',
	TYPE: 'type',
	OPTIONAL: 'optional',
	DEFAULT: 'default',
	DESCRIPTION: 'description'
}

// const mddl: unified.Plugin<[], remark.RemarkOptions> = () => {
// 	return transformer

// 	const transformer: unified.Transformer = (tree: mdast.Node) => {

// 	}
// }

// const transform = tree => {
// 	console.log(tree)
// 	const parameters = []
// 	for (const node of tree.children) {

// 	}
// 	// let id = 0

// 	// const mddlTree = u('root', [])
// 	// console.log(mddlTree)
// }

// remark()
// 	.use(mddl)
// 	.process(input, () => {})