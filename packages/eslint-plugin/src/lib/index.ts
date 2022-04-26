/**
 * @fileoverview Standard rules for JavaScript at Adalo
 * @author Toby Sullivan
 */
'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { default as noUnsafeDeref } from './rules/no-unsafe-deref'

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
export const rules = {
  'no-unsafe-deref': noUnsafeDeref,
}
