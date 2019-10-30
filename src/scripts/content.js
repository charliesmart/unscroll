import '../styles/main.styl';
import React from 'react';
import ReactDOM from 'react-dom';
import Screen from './components/Screen'; 
import { addMinutes } from 'date-fns';

let $wrap = document.createElement('div');
document.body.appendChild($wrap);
document.body.style.overflow = 'hidden';
ReactDOM.render(
  <Screen removeScreen={removeScreen}/>,
  $wrap
);

function removeScreen() {
  document.body.style.overflow = null;
  $wrap.remove();

  chrome.storage.sync.get(['UNLOCKED_SITES'], function({unlockedSites}) {
    let currentHost = window.location.hostname;
    unlockedSites[currentHost] = addMinutes(new Date(), 5)
    chrome.storage.sync.set({
      UNLOCKED_SITES: unlockedSites
    });
  });
}