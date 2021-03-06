import type { Rule } from 'eslint'
import type { Node as ESTreeNode, MemberExpression } from 'estree'
import utils from '../../utils'

const ERROR_NO_IMPORT = 'Cannot import defaults from the axios library.'
const ERROR_NO_ACCESS = 'Unexpected defaults property access'

function isPropertyAccessed(
  { property }: MemberExpression,
  propertyName: string
) {
  switch (property.type) {
    case 'Identifier': {
      // Example: `axios.defaults`
      return property.name === propertyName
    }
    case 'Literal': {
      // Example: `axios['defaults']`
      return property.value === propertyName
    }
    default: {
      // This won't detect any other form (including access to numeric indexes)
      return false
    }
  }
}

function createRule(context: Rule.RuleContext): Rule.RuleListener {
  const sourceCode = context.getSourceCode()

  const hasSameTokens = (a: ESTreeNode, b: ESTreeNode) =>
    utils.hasSameTokens(sourceCode, a, b)

  const axiosNodes: ESTreeNode[] = []

  return {
    CallExpression: node => {
      if (node.callee.type !== 'Identifier' || node.callee.name !== 'require') {
        return false
      }

      // This is an instance of `require(<module>)`. Is <module> 'axios'?
      const [modulePath] = node.arguments
      if (
        !modulePath ||
        modulePath.type !== 'Literal' ||
        modulePath.value !== 'axios'
      ) {
        return false
      }

      // This is an instance of `require('axios')`
      // How is this being used?
      switch (node.parent.type) {
        case 'VariableDeclarator': {
          // This is the left side of an assignment
          // Example: `axios = require('axios')
          if (node.parent.type !== 'VariableDeclarator') {
            return false
          }
          const variableDeclarator = node.parent
          // Record imported instance of the axios module
          axiosNodes.push(variableDeclarator.id)
          break
        }
        case 'MemberExpression': {
          // This is a direct member access
          // Example: `require('axios').defaults`
          if (!isPropertyAccessed(node.parent, 'defaults')) {
            return false
          }

          // This is an attempt to access `require('axios').defaults`.
          return context.report({
            node: node.parent.property,
            message: ERROR_NO_ACCESS,
          })

          break
        }
        default: {
          // TODO(toby): Handle more obscure cases as they come up
        }
      }
    },

    ImportDeclaration: node => {
      if (node.source.type !== 'Literal') {
        // This should be unreachable - type is always "Literal"
        return false
      }

      if (node.source.value !== 'axios') {
        // This import is not axios
        return false
      }

      // This is an import of axios
      for (const specifier of node.specifiers) {
        switch (specifier.type) {
          case 'ImportDefaultSpecifier': {
            // Record imported instance of the axios module
            axiosNodes.push(specifier)

            break
          }
          case 'ImportSpecifier': {
            // Examples:
            // 1. `import { defaults } from 'axios'`
            // 2. `import { defaults as axiosDefaults } from 'axios'`
            if (specifier.imported.name === 'defaults') {
              return context.report({
                node: specifier,
                message: ERROR_NO_IMPORT,
              })
            }

            break
          }
          case 'ImportNamespaceSpecifier': {
            // TODO(toby): Handle Case
            break
          }
        }
      }
    },

    MemberExpression: node => {
      if (!isPropertyAccessed(node, 'defaults')) {
        return false
      }

      // This is <object>.defaults. Is <object> axios?
      switch (node.object.type) {
        case 'Identifier': {
          if (axiosNodes.length === 0) {
            return false
          }

          for (const axiosNode of axiosNodes) {
            if (hasSameTokens(axiosNode, node.object)) {
              return context.report({
                node: node.property,
                message: ERROR_NO_ACCESS,
              })
            }
          }

          return false
        }
        default: {
          // TODO(toby): Handle other object types
          return false
        }
      }
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
