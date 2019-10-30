import React from 'react';

const Quote = ({ prompt, userEntry }) => (
  <p className="prompt">
    {prompt.split('').map((letter, i) => {
      let userLetter = userEntry[i];
      let spanClass;

      if (i >= userEntry.length) {
        spanClass = 'untyped';
      } else if (letter === userEntry[i]) {
        spanClass = 'correct';
      } else {
        spanClass = 'incorrect';
      }

      return (
        <span key={letter + i} className={spanClass}>{letter}</span>
      )
    })}
  </p>
)

export default Quote;