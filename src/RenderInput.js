import React, { useState } from 'react';

const RenderInput = ({ outputConsole }) => {
  const [input, setInput] = useState('');
  const outputvalue = () => {
    if (input) {
      console.log('outputConsole', outputConsole);
      outputConsole(input);
    }
  };

  const updatevalue = (e) => {
    setInput(e.target.value);
  };
  return (
    <div>
      <input type="text" placeholder="Enter" value={input} onChange={updatevalue} />
      <button onClick={outputvalue}>Console</button>
    </div>
  );
};
export default RenderInput;
