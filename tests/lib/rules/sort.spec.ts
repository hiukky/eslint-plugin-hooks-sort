/**
 * @fileoverview A simple organizer for ordering hooks.
 * @author Hiukky
 */
'use strict'

import { RuleTester } from 'eslint'
import * as rule from '../../../lib/rules/sort'

const Tester = new RuleTester()

const parserOptions: any = {
  ecmaVersion: 6,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true,
  },
}

const options = [
  {
    groups: ['useReducer', 'useContext', 'useState'],
  },
]

Tester.run('order-hooks', rule as any, {
  valid: [
    {
      code: `
      const [todos, dispatch] = useReducer(todosReducer)

      const locale = useContext(LocaleContext)

      const [count, setCount] = useState(0)

      const [size, setSize] = useState(0)

      const memoizedCallback = useCallback(() => {
        doSomething(a, b);
      },[a, b])

      useEffect(() => {
        document.title = "Hello"
      }, [])
    `,
      parserOptions,
      options,
    },
  ],
  invalid: [
    {
      code: `
      const [count, setCount] = useState(0)

      const locale = useContext(LocaleContext)

      const [todos, dispatch] = useReducer(todosReducer)

      const [size, setSize] = useState(0)
    `,
      errors: [
        {
          message:
            'Non-matching declaration order. useState comes after useReducer.',
          type: 'VariableDeclaration',
        },
        {
          message:
            'Non-matching declaration order. useReducer comes before useState.',
          type: 'VariableDeclaration',
        },
      ],
      parserOptions,
      options,
    },
    {
      code: `
      const [count, setCount] = useState(0)

      const locale = useContext(LocaleContext)

      const [todos, dispatch] = useReducer(todosReducer)

      useEffect(() => {
        document.title = "Hello"
      }, [])

      const memoizedCallback = useCallback(() => {
        doSomething(a, b);
      },[a, b])

      const [size, setSize] = useState(0)
    `,
      errors: [
        {
          message:
            'Non-matching declaration order. useState comes after useReducer.',
          type: 'VariableDeclaration',
        },
        {
          message:
            'Non-matching declaration order. useReducer comes before useState.',
          type: 'VariableDeclaration',
        },
      ],
      parserOptions,
      options,
    },
  ],
})
