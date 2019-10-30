import '../styles/main.styl';
import React from 'react';
import ReactDOM from 'react-dom';
import Screen from './components/Screen'; 

ReactDOM.render(
  <Screen removeScreen={removeScreen}/>,
  document.body
);

function removeScreen() {
  let currentHost = window.location.hostname;
  chrome.runtime.sendMessage({hostname: currentHost});
}