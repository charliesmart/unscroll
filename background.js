/*
 * On install, save default list of blocked sites
 */
chrome.runtime.onInstalled.addListener(function() {
  fetch('./data/default_sites.json')
    .then(d => d.json())
    .then(setDefaultSites)
});

/*
 * Set tab update listener to track page changes and check
 * sites against block list. 
 */
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
      // We need to get the hostname of the URL, so we use the
      // URL constructor to access it
      let url = new URL(changeInfo.url);
      
      // Get our current list of blocked sites from storage and check
      // if it includes the current hostname
      chrome.storage.sync.get(['BLOCKED_SITES'], (data) => {
        // If the hostname is in the block list, render the block page
        if (data.BLOCKED_SITES.indexOf(hostname) >= 0) {
          console.log('blocked');
        }
      })
    }
  }
);

/*
 * Use chrome storage to set initial list of blocked sites
 * @param {string[]} - List of default blocked sites
 */
function setDefaultSites(defaultSites) {
  chrome.storage.sync.set({
    BLOCKED_SITES: defaultSites
  });
}