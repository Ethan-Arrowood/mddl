import unist from 'unist'
import mdast from 'mdast'
import assertMdast from 'mdast-util-assert'
import visit from 'unist-util-visit'
import remark from 'remark'
import u from 'unist-builder'

export interface Literal extends unist.Literal {
  value: string
}

export interface Identifier extends Literal {
  type: 'identifier'
}

export interface Type extends Literal {
  type: 'type'
}

export interface Optional extends Literal {
  type: 'optional'
}

export interface Default extends Literal {
  type: 'default'
}

export interface InlineDescription extends Literal {
  type: 'inline-description'
}

type ParameterContent =
  | Identifier
  | Type
  | Optional
  | Default
  | InlineDescription

export interface Parameter extends unist.Parent {
  type: 'parameter';
  children: ParameterContent[];
}

remark()
  .use(() => {
    return tree => {
      visit<mdast.Paragraph>(tree, 'paragraph', paragraphNode => {
        const parameter: {
          identifier?: Identifier,
          type?: Type,
          optional?: Optional,
          default?: Default,
          inlineDescription?: InlineDescription
        } = {}
        console.log(paragraphNode)
        visit<mdast.Strong>(paragraphNode, 'strong', strongNode => {
          visit<mdast.Text>(strongNode, 'text', textNode => {
            if (!parameter.identifier) {
              parameter.identifier = u('identifier', textNode.value)
            }
          })
        })
        visit<mdast.InlineCode>(paragraphNode, 'inlineCode', inlineCodeNode => {
          if (!parameter.type) {
            parameter.type = u('type', inlineCodeNode.value)
          }
        })
        visit<mdast.Emphasis>(paragraphNode, 'emphasis', emphasisNode => {
          visit<mdast.Text>(emphasisNode, 'text', textNode => {
            if (!parameter.optional) {
              parameter.optional = u('optional', textNode.value)
            }
          })
        })
        
      })
    }
  })
  .process(
    '**iterations** - `number` - _optional_ - Default: `10` - The number of times the function `name` will execute.',
    () => {}
  )