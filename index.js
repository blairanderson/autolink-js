(function(root, factory) {
  // Set up appropriately for the environment. Start with AMD.
  if (typeof define === 'function' && define.amd) {
    define(['exports'], function(exports) {
      // Export global even in AMD case in case this script is loaded with
      // others that may still expect a global Backbone.
      root.autoLink = factory(root, exports);
    });

    // Next for Node.js or CommonJS. jQuery may not be needed as a module.
  } else if (typeof exports !== 'undefined') {
    factory(root, exports);
    // Finally, as a browser global.
  } else {
    root.autoLink = factory(root, {});
  }

}(this, function(root, autoLink) {

  // Initial Setup
  // -------------
  var slice = [].slice;

  autoLink = function(target) {
    var k, linkAttributes, option, options, pattern, v;
    options = 2 <= arguments.length ? slice.call(arguments, 1) : [];

    pattern = /(^|[\s\n]|<br\/?>)((?:https?|ftp):\/\/[\-A-Z0-9+\u0026\u2019@#\/%?=()~_|!:,.;]*[\-A-Z0-9+\u0026@#\/%=~()_|])/gi;
    if (!(options.length > 0)) {
      return target.replace(pattern, "$1<a href='$2'>$2</a>");
    }
    option = options[0];
    linkAttributes = ((function() {
      var _results;
      _results = [];
      for (k in option) {
        v = option[k];
        if (k !== 'callback') {
          _results.push(" " + k + "='" + v + "'");
        }
      }
      return _results;
    })()).join('');

    return target.replace(pattern, function(match, space, url) {
      var link;
      link = (typeof option.callback === "function" ? option.callback(url) : void 0) || ("<a href='" + url + "'" + linkAttributes + ">" + url + "</a>");
      return "" + space + link;
    });
  };
  return autoLink;
}));
