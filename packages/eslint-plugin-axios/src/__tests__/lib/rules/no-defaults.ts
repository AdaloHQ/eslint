import rule from '../../../lib/rules/no-defaults'

import { RuleTester } from 'eslint'

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
  },
})

ruleTester.run('no-axios-defaults', rule, {
  valid: [
    {
      code: `
      import axios from 'axios'

      const instance = axios.create()
      instance.defaults.headers["User-Agent"] = "Bot 1.0"
      `,
    },
    {
      code: `
      import { defaults } from 'not-axios'
      `,
    },
    {
      code: `
      const axios = require('axios')

      const instance = axios.create()
      instance['defaults'].baseURL = 'https://example.com'
      `,
    },
    {
      code: `require()`,
    },
  ],
  invalid: [
    {
      code: `
      import { defaults } from 'axios'
      `,
      errors: [
        {
          message: 'Cannot import defaults from the axios library.',
          type: 'ImportSpecifier',
        },
      ],
    },
    {
      code: `
      import axios from 'axios'

      axios.defaults.header['User-Agent'] = 'Bot 2.0'
      `,
      errors: [
        {
          message: 'Unexpected defaults property access',
          type: 'Identifier',
        },
      ],
    },
    {
      code: `const axios = require('axios')
axios.defaults.headers['User-Agent'] = 'MyBot 1.2'`,
      errors: [
        {
          message: 'Unexpected defaults property access',
          type: 'Identifier',
          line: 2,
          column: 7,
        },
      ],
    },
    {
      code: `const axios = require('axios')
axios['defaults'].headers['User-Agent'] = 'MyBot 1.2'`,
      errors: [
        {
          message: 'Unexpected defaults property access',
          type: 'Literal',
          line: 2,
          column: 7,
        },
      ],
    },
    {
      code: `
      require('axios').defaults.baseURL = 'https://www.google.com'
      `,
      errors: [
        {
          message: 'Unexpected defaults property access',
          type: 'Identifier',
        },
      ],
    },
    {
      code: `
      require('axios')['defaults'].baseURL = 'https://www.google.com'
      `,
      errors: [
        {
          message: 'Unexpected defaults property access',
          type: 'Literal',
        },
      ],
    },
  ],
})
