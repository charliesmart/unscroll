(function() {

  appendScreen();
  freezeBody();

  function freezeBody() {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
  }

  function appendScreen() {
    let $screen = document.createElement('div');
    $screen.classList.add('focus__screen');
    document.body.appendChild($screen);
  }

})()