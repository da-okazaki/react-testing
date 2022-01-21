import React from 'react';

const FrameworkList = (props) => {
  if (!props || !props.frameworks) {
    return <h1>No data !</h1>;
  }

  return (
    <div>
      <ul>
        {props.frameworks.map(({ id, item }) => {
          return <li key={id}>{item}</li>;
        })}
      </ul>
    </div>
  );
};

export default FrameworkList;
