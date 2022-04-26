import rule from '../../../lib/rules/no-unsafe-deref'

import { RuleTester } from 'eslint'

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
})

ruleTester.run('no-axios-defaults', rule, {
  valid: [
    {
      code: `
      function name(a) {
        return a?.prop
      }
      `,
    },
  ],
  invalid: [
    {
      code: `
      function name(a) {
        return a.prop
      }
      `,
      errors: [
        {
          message: 'Check object before dereferencing.',
          type: 'MemberExpression',
        },
      ],
    },
  ],
})
