import { Rule } from 'eslint'
import { Expression, Super } from 'estree'

/**
 * false implies object MAY NOT be safe.
 */
function isSafe(object: Expression | Super): boolean {
  return false
}

function createRule(context: Rule.RuleContext): Rule.RuleListener {
  return {
    FunctionDeclaration: node => {
      // TODO: Compile a list of params for this function
      // TODO: Check for guards
      //
      // TODO: Monitor property accesses and make sure they are guarded
    },
    MemberExpression: node => {
      // Check if the access uses optional (`obj?.prop`)
      if (node.optional) {
        return false
      }

      // Check if the object is safe
      // if (!isSafe(node.object)) {
      return context.report({
        node,
        message: 'Check object before dereferencing.',
      })
      // }
    },
  }
}

export default {
  meta: {
    type: 'problem',
    schema: [],
  },
  create: createRule,
} as const
