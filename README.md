# Aggregating JSON file loader for webpack

## Install

```
npm install multi-json-loader
```

## Usage

[Documentation: Using loaders](https://webpack.js.org/concepts/loaders/#using-loaders)

### ./data/places.json

```json
{
  "placesKey": "places value"
}
```

### ./data/users/account.json

```json
{
  "accountKey": "account value"
}
```

### ./data/users/profile.json

```json
{
  "profileKey": "profile value"
}
```

### ./irrelevant.whatever

```
/* Doesn't matter */
```

### example.js

``` javascript
var data = require('multi-json-loader?cwd=data&glob=**/*.json!./irrelevant.whatever');
// => {
//   places: {
//     placesKey: "places value"
//   },
//   users: {
//     account: {
//       accountKey: "account value"
//     },
//     profile: {
//       profileKey: "profile value"
//     }
//   }
// }
```

Note that because I don't understand webpack enough, you have to provide a valid resource file (`./irrelevant.whatever` above) even though it won't actually be loaded.

### Without webpack

You can also use the loader's functionality independent of webpack.

```javascript
var multiJsonLoader = require('multi-json-loader');
var messages = multiJsonLoader.loadFiles('./i18n' /*, optional glob - defaults to '*.json'*/);
console.log(messages);
// => { a: { 'a-key': 'a-value' }, b: { 'b-key': 'b-value' } }
```

See `no-webpack-example` subdirectory.

## Options

* `cwd` The current working directory in which to search. Defaults to `process.cwd()`.
* `glob` Glob to match files against using [`node-glob`](https://github.com/isaacs/node-glob#glob-primer). Defaults to `*.json`.

## Why not combine the two options?

Path parts in `cwd` will *not* be included in the aggregated JSON object, whereas path parts in `glob` will.

```javascript
var data = require('multi-json-loader?cwd=a/b&glob=c/*.json!./irrelevant.whatever');
// => {
//   c: {
//     <contents of c directory>
//   }
// }
```

```javascript
var data = require('multi-json-loader?glob=a/b/c/*.json!./irrelevant.whatever');
// => {
//   a: {
//     b: {
//       c: {
//         <contents of c directory>
//       }
//     }
//   }
// }
```

## License

MIT
