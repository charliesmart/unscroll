import '../styles/main.styl';
import React from 'react';
import ReactDOM from 'react-dom';
import Screen from './components/Screen'; 

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

  let currentHost = window.location.hostname;
  chrome.runtime.sendMessage({hostname: currentHost});
}