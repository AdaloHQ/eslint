/**
 * @fileoverview Rules for using axios
 * @author Toby Sullivan
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { default as noDefaults } from "./rules/no-defaults";

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
export const rules = {
  "no-defaults": noDefaults,
};
