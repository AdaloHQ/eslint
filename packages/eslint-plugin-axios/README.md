# eslint-plugin-axios

Rules for using axios

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `@adalo/eslint-plugin-axios`:

```sh
npm install @adalo/eslint-plugin-axios --save-dev
```

## Usage

Add `axios` to the plugins section of your `.eslintrc` configuration file.

```json
{
  "plugins": ["@adalo/eslint-plugin-axios"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "axios/no-axios-defaults": 2
  }
}
```

## Supported Rules

**Key**: :wrench: = fixable

| Name                | Description                       | :wrench: |
| ------------------- | --------------------------------- | -------- |
| `no-axios-defaults` | Disallows use of `axios.defaults` |          |
