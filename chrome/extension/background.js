const bluebird = require('bluebird');

global.Promise = bluebird;

function promisifier(method) {
  // return a function
  return function promisified(...args) {
    // which returns a promise
    return new Promise((resolve) => {
      args.push(resolve);
      method.apply(this, args);
    });
  };
}

function promisifyAll(obj, list) {
  list.forEach(api => bluebird.promisifyAll(obj[api], { promisifier }));
}

// let chrome extension api support Promise
promisifyAll(chrome, [
  'tabs',
  'windows',
  'browserAction'
]);
promisifyAll(chrome.storage, [
  'local',
]);

var timerWindowIsOpen = false;
var timerWindowId;

chrome.browserAction.onClicked.addListener(function() {
  var spacer = 10;
  var timerWindowWidth = 300;

  chrome.windows.onRemoved.addListener(function(windowId) {
    if (timerWindowId && windowId === timerWindowId) {
      timerWindowIsOpen = false
    }
  });

  chrome.windows.getCurrent(function(wind) {
    var maxWidth = window.screen.availWidth;
    var maxHeight = window.screen.availHeight;
    var primaryWindowUpdates = {
      left: timerWindowWidth + spacer * 2,
      top: window.screen.availTop + spacer,
      width: maxWidth - (timerWindowWidth + spacer * 2),
      height: maxHeight - spacer * 2
    };

    var timerWindowUpdates = {
      left: spacer,
      top: window.screen.availTop + spacer,
      width: timerWindowWidth,
      height: maxHeight - spacer * 2
    };

    chrome.windows.update(wind.id, primaryWindowUpdates);

    if (timerWindowIsOpen) {
      chrome.windows.update(timerWindowId, timerWindowUpdates);
    } else {
      chrome.windows.create({
        url: chrome.runtime.getURL("../window.html"),
        type: "popup"
      }, function(timerWindowParams) {
        timerWindowIsOpen = true;
        timerWindowId = timerWindowParams.id;

        chrome.windows.update(timerWindowParams.id, timerWindowUpdates);
      });
    }
  });
});
