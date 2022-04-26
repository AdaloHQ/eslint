# @adalo/eslint-plugin

Rules for working safely with JavaScript

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `@adalo/eslint-plugin`:

```sh
npm install @adalo/eslint-plugin --save-dev
```

## Usage

Add `@adalo` to the plugins section of your `.eslintrc` configuration file.

```json
{
  "plugins": ["@adalo"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "@adalo/no-unsafe-deref": 2
  }
}
```

## Supported Rules

**Key**: :wrench: = fixable

| Name                     | Description                                  | :wrench: |
| ------------------------ | -------------------------------------------- | -------- |
| `@adalo/no-unsafe-deref` | Requires all property accesses to be guarded |          |
