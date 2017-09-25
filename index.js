var fs = require('fs');
var path = require('path');
var glob = require('glob');
var loaderUtils = require('loader-utils');

function pitch() {
  var query = loaderUtils.parseQuery(this.query);

  var results = loadFiles(query.cwd, query.glob, this.addContextDependency.bind(this));

  this.cacheable && this.cacheable();
  this.value = [ results ];

  return JSON.stringify(results, null, '\t');
}

function loadFiles(cwd, fileGlob, addContextDependency) {
  var absoluteCwd = path.resolve(cwd || '');
  var currentGlob = fileGlob || '*.json';
  var results = {};

  glob.sync(currentGlob, {
    cwd: absoluteCwd
  }).forEach(function(filePath) {
    var absoluteFilePath = path.join(absoluteCwd, filePath);
    var parsedAbsoluteFilePath = path.parse(absoluteFilePath);

    // Notify webpack of dependency on file's directory (for watching)
    if (typeof addContextDependency === 'function') {
      addContextDependency(parsedAbsoluteFilePath.dir);
    }

    // Store file contents at appropriate path in results object
    // Based on https://github.com/messageformat/messageformat.js/blob/v1.0.0-rc.3/bin/messageformat.js#L95-L102
    var extension = parsedAbsoluteFilePath.ext;
    var end = -1 * extension.length;
    var parts = filePath.slice(0, end).split(path.sep);
    var last = parts.length - 1;
    parts.reduce(function(root, part, idx) {
      if (idx == last) root[part] = JSON.parse(fs.readFileSync(absoluteFilePath));
      else if (!(part in root)) root[part] = {};
      return root[part];
    }, results);
  });

  return results;
}

module.exports = function() {};
module.exports.pitch = pitch;
module.exports.loadFiles = loadFiles;
