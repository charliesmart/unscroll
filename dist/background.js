// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"DcSP":[function(require,module,exports) {
module.exports = ["reddit.com", "twitter.com"];
},{}],"bEr1":[function(require,module,exports) {
"use strict";

var _default_sites = _interopRequireDefault(require("../data/default_sites.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * On install, save default list of blocked sites
 */
chrome.runtime.onInstalled.addListener(function () {
  setDefaultSites(_default_sites.default);
});
/*
 * Set tab update listener to track page changes and check
 * sites against block list. 
 */

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.url) {
    // We need to get the hostname of the URL, so we use the
    // URL constructor to access it
    var url = new URL(changeInfo.url); // Get our current list of blocked sites from storage and check
    // if it includes the current hostname

    chrome.storage.sync.get(['BLOCKED_SITES', 'UNLOCKED_SITES'], function (_ref) {
      var BLOCKED_SITES = _ref.BLOCKED_SITES,
          UNLOCKED_SITES = _ref.UNLOCKED_SITES;

      // If the hostname is in the block list, render the block page
      if (isCurrentlyBlocked(url.hostname, BLOCKED_SITES, UNLOCKED_SITES)) {
        renderBlocker();
      }
    });
  }
});

function renderBlocker() {
  chrome.tabs.executeScript({
    file: 'content.js'
  });
}
/*
 * Checks a hostname against a block list and unblock list to 
 * determine whether it should be blocked.
 * @param {string} hostname - The current hostname
 * @param {string[]} blocked - A list of blocked hostnames
 * @param {string[]} unblocked - A list of currently unblocked hostnames
 * @return {boolean} - Whether or not the site is currently blocked
 */


function isCurrentlyBlocked(hostname, blocked, unblocked) {
  return blocked.includes(hostname) && !unblocked.includes(hostname);
}
/*
 * Use chrome storage to set initial list of blocked sites
 * @param {string[]} defaultSites - List of default blocked sites
 */


function setDefaultSites(defaultSites) {
  chrome.storage.sync.set({
    BLOCKED_SITES: defaultSites,
    UNLOCKED_SITES: []
  });
}
},{"../data/default_sites.json":"DcSP"}]},{},["bEr1"], null)