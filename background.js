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
      chrome.storage.sync.get(['BLOCKED_SITES', 'UNLOCKED_SITES'], ({BLOCKED_SITES, UNLOCKED_SITES}) => {
        // If the hostname is in the block list, render the block page
        if (isCurrentlyBlocked(url.hostname, BLOCKED_SITES, UNLOCKED_SITES)) {
          renderBlocker();
        }
      })
    }
  }
);

function renderBlocker() {
  chrome.tabs.executeScript({
    file: 'renderBlocker.js'
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
    UNLOCKED_SITES: [],
  });
}