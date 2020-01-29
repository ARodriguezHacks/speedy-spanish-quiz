import React from 'react';

const ProgressBar = (props) => {
  return (
    <div>
      <h3>Question {props.question} of {props.qData}</h3>
    </div>
  );
}
 
export default ProgressBar;