# Aggregating JSON file loader for webpack

## Install

```
npm install multi-json-loader
```

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

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
var data = require('multi-json?cwd=data&glob=**/*.json!./irrelevant.whatever');
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

Note that because I don't understand webpack enough, you have to provide a valid resource file even though it won't actually be loaded.

## Options (passed as [query parameters](http://webpack.github.io/docs/using-loaders.html#query-parameters))

* `cwd` The current working directory in which to search. Defaults to `process.cwd()`.
* `glob` Glob to match files against using [`node-glob`](https://github.com/isaacs/node-glob#glob-primer). Defaults to `*.json`.

## Why not combine the two options?

Path parts in `cwd` will *not* be included in the aggregated JSON object, whereas path parts in `glob` will.

```javascript
var data = require('multi-json?cwd=a/b&glob=c/*.json!./irrelevant.whatever');
// => {
//   c: {
//     <contents of c directory>
//   }
// }
```

```javascript
var data = require('multi-json?glob=a/b/c/*.json!./irrelevant.whatever');
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
