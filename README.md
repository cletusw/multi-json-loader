# Multiple JSON file loader for webpack

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

## License

MIT
