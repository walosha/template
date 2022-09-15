# @walosha/create-boilerplate

## Usage

```
npx @walosha/create-boilerplate
```

These projects are not production complete. They are designed as lightweight projects that can be used to quickly prototype a new feature or library.

## Programmatic Usage

```js
const { buildProject } = require('@walosha/create-boilerplate')

buildProject({
  type: 'Application',
  name: 'my-project',
  port: '8080',
  framework: 'react',
  language: 'typescript',
  css: 'Tailwind',
})
```
