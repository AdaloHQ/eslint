/**
 * Source: https://github.com/eslint/eslint/blob/bb4c0d530a231a8a14ed70ad61c06e284bbaaef0/lib/rules/no-self-compare.js#L34-L46
 *
 * This version is modified from the original.
 *
 * ORGININAL LICENSE (MIT)
 * -----------------------
 * Copyright OpenJS Foundation and other contributors, <www.openjsf.org>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import { SourceCode } from 'eslint'
import type { Node as ESTreeNode } from 'estree'

export default function hasSameTokens(
  sourceCode: SourceCode,
  nodeA: ESTreeNode,
  nodeB: ESTreeNode
): boolean {
  const tokensA = sourceCode.getTokens(nodeA)
  const tokensB = sourceCode.getTokens(nodeB)

  return (
    tokensA.length === tokensB.length &&
    tokensA.every(
      (token, index) =>
        token.type === tokensB[index].type &&
        token.value === tokensB[index].value
    )
  )
}
