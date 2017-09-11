# FlexBuilder
- A module bundler, ESNext builder and development tool, using webpack, babel and nodemon
 
## Installation
`yarn add --dev flexbuilder`
or
`npm install --dev flexbuilder`

Install all necessary peer dependencies. Except `react` and `react-dom`, the rest should be installed as dev dependencies.

## Usage

Add a build.js file at the root

**build.js**
```js
process.on('unhandledRejection', (reason, p) => { throw reason });

require('babel-polyfill');
const builder = require('flexbuilder').default;
const argv = require('yargs').argv;

builder({
	root: __dirname,
	dev: !!argv.dev,
	// options documented below
});
```

Add these scripts to the `package.json` file:

**package.json**
```json
{
	"scripts": {
		"dev": "node ./build --dev",
		"build": "node ./build"
	}
}
```

If you have symlinked modules in your project (only during development), add node's `--preserve-symlinks` flag to the commands above.

**package.json** (for symlinked modules)
```json
{
	"scripts": {
		"dev": "node --preserve-symlinks ./build --dev",
		"build": "node --preserve-symlinks ./build"
	}
}
```

## Options

| Name          | Required           | Description  |
| --------------|:---------:| -----:|
| root          | Yes       | Root of the project. Use `__dirname` |
| dev           | Yes       | Should run in dev mode? It's best to use `!!argv.dev` |
| start         | Yes if target is an app and server code needs to be run in dev mode | relative path to the distribution server file |
| library       | Yes if target is a library | Name of the library |
| sources       | Yes       | `{ server: {}, client: {} }` Each key in the server or client object is used as the destination file name. Each value is a relative path to the source directory  |
| alias         | No        | `{ server: {}, client: {} }` Aliases to be used to resolve modules on the server and/or client. It's best to use `require.resolve` instead of an absolute path here. |
| define        | No        | `{ server: {}, client: {} }` Use to define any extra compile-time variables. |
| devServerPort | Yes if using webpack dev server | You must explicitly provide a port for webpack dev server |