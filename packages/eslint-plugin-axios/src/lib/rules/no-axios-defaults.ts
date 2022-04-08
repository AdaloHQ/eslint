import type { Rule } from "eslint";
import type { Node as ESTreeNode } from "estree";

const ERROR_NO_IMPORT = "Cannot import defaults from the axios library.";
const ERROR_NO_ACCESS = "Unexpected defaults property access";

function createRule(context: Rule.RuleContext): Rule.RuleListener {
  const sourceCode = context.getSourceCode();

  /**
   * Copied from: https://github.com/eslint/eslint/blob/bb4c0d530a231a8a14ed70ad61c06e284bbaaef0/lib/rules/no-self-compare.js#L34-L46
   */
  function hasSameTokens(nodeA: ESTreeNode, nodeB: ESTreeNode): boolean {
    const tokensA = sourceCode.getTokens(nodeA);
    const tokensB = sourceCode.getTokens(nodeB);

    return (
      tokensA.length === tokensB.length &&
      tokensA.every(
        (token, index) =>
          token.type === tokensB[index].type &&
          token.value === tokensB[index].value
      )
    );
  }

  const axiosNodes: ESTreeNode[] = [];

  return {
    ImportDeclaration: (node) => {
      if (node.source.type !== "Literal") {
        // This should be unreachable - type is always "Literal"
        return;
      }

      if (node.source.value !== "axios") {
        // This import is not axios
        return;
      }

      // This is an import of axios
      for (const specifier of node.specifiers) {
        switch (specifier.type) {
          case "ImportDefaultSpecifier": {
            // Record imported instance of th full axios object
            axiosNodes.push(specifier);

            break;
          }
          case "ImportSpecifier": {
            // Examples:
            // 1. `import { defaults } from 'axios'`
            // 2. `import { defaults as axiosDefaults } from 'axios'`
            if (specifier.imported.name === "defaults") {
              return context.report({
                node: specifier,
                message: ERROR_NO_IMPORT,
              });
            }

            break;
          }
          case "ImportNamespaceSpecifier": {
            // TODO(toby): Handle Case
            break;
          }
        }
      }
    },

    MemberExpression: (node) => {
      if (
        node.property.type !== "Identifier" ||
        node.property.name !== "defaults"
      ) {
        return;
      }

      // This is <object>.defaults. Is <object> axios?
      switch (node.object.type) {
        case "Identifier": {
          if (axiosNodes.length === 0) {
            return false;
          }

          for (const axiosNode of axiosNodes) {
            if (hasSameTokens(axiosNode, node.object)) {
              return context.report({
                node: node.object,
                message: ERROR_NO_ACCESS,
              });
            }
          }

          return false;
        }
        default: {
          // TODO(toby): Handle other object types
          return false;
        }
      }
    },
  };
}

export default {
  meta: {
    type: "problem",
    schema: [],
  },
  create: createRule,
} as const;
