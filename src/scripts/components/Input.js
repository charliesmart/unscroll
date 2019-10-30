import React from 'react';

const Input = ({ value, onChange }) => (
  <textarea 
    type="text"
    value={value}
    onChange={onChange}
  />
)

export default Input;