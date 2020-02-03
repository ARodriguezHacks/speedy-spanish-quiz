import React from 'react';
import Answer from './Answer';

const Answers = (props) => {
  const correctAnswer = props.currentQuestion.correct_answer;
  console.log(correctAnswer);
  return (
    <div className="container">
      <div className="column">
        <Answer 
          letter="a" 
          answer={props.currentQuestion.answer_a} 
          correctAnswer={correctAnswer} 
          handleClick={props.handleClick}
          selected={props.currentAnswer === 'a'}
        />
        <Answer 
          letter="b" 
          answer={props.currentQuestion.answer_b} 
          correctAnswer={correctAnswer}
          handleClick={props.handleClick}
          selected={props.currentAnswer === 'b'}
        />
      </div>
      <div className="column">
        <Answer 
          letter="c" 
          answer={props.currentQuestion.answer_c} 
          correctAnswer={correctAnswer}
          handleClick={props.handleClick}
          selected={props.currentAnswer === 'c'}
        />
        <Answer 
          letter="d" 
          answer={props.currentQuestion.answer_d} 
          correctAnswer={correctAnswer}
          handleClick={props.handleClick}
          selected={props.currentAnswer === 'd'}
        />
      </div>
    </div>
  );
}
 
export default Answers;