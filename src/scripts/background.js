import defaultSites from '../data/default_sites.json';

/*
 * On install, save default list of blocked sites
 */
chrome.runtime.onInstalled.addListener(function() {
  setDefaultSites(defaultSites);
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
  hostname = hostname.replace(/^www\./,'')
  console.log(unblocked, blocked, hostname)
  let isUnlocked = unblocked[hostname] && unblocked[hostname] > Date.now();
  return blocked.includes(hostname) && !isUnlocked; 
}

/*
 * Use chrome storage to set initial list of blocked sites
 * @param {string[]} defaultSites - List of default blocked sites
 */
function setDefaultSites(defaultSites) {
  chrome.storage.sync.set({
    BLOCKED_SITES: defaultSites,
    UNLOCKED_SITES: {},
  });
}