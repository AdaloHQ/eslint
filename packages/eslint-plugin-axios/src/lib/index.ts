/**
 * @fileoverview Rules for using axios
 * @author Toby Sullivan
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { default as noAxiosDefaults } from "./rules/no-axios-defaults";

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
export const rules = {
  "no-axios-defaults": noAxiosDefaults,
};
