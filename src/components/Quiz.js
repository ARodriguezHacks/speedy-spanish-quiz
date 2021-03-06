import React, {useState, useEffect} from 'react';
import ProgressBar from './ProgressBar';
import Question from './Question';
import NextButton from './NextButton';
import RestartButton from './RestartButton';
import Answers from './Answers';
import questionData from './../questionData'; //original questiondata. Don't alter.
import initialData from './randomQuestions.js';

const Quiz = (props) => {
  const [questionArray, setQuestionArray] = useState(initialData); 
  const [question, setQuestion] = useState(0);
  const [quizSession, setQuizSession] = useState(true);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState('');
  const [disableClick, setDisableClick] = useState(false);

  //let qData = newData;
  //console.log(qData);
  //console.log(questionData);
  //let qData = initialData;
  const currentQuestion = questionArray[question];
  const correctAnswer = questionArray[question].correct_answer;

  const dataArray = () => {
    const questionsDuplicate = [...questionData];

    const newData = [];

    while (newData.length < 10) {
      createRandomArray();
    }

    function getRandomInt(max) {
      return Math.ceil(Math.random() * Math.ceil(max));
    }

    function createRandomArray() {
      let dataLength = questionsDuplicate.length;
      const index = getRandomInt(dataLength);
      const output = questionsDuplicate.splice(index - 1, 1);
      newData.push(...output);
    }

    return newData;
  }

  const next = () => {
    setDisableClick(false);
    setShowCorrectAnswer(false);
    const answer = {questionId: currentQuestion.id, answer: currentAnswer};
    console.log(answers);
    if (!currentAnswer) {
      setError('Please select an option');
      return;
    }

    answers.push(answer);
    setAnswers(answers);
    setCurrentAnswer('');

    if (question + 1 < questionArray.length) {
      setQuestion(question + 1);
      return;
    }
  };

  const finish = () => {
    if (!currentAnswer) {
      setError('Please select and option');
      return;
    }
    setDisableClick(false);
    setQuizSession(false);
  };

  const reset = () => {
    const newList = dataArray();
    setQuestionArray(newList);
    setQuestion(0);
    setCurrentAnswer('');
    setAnswers([]);
    setQuizSession(true);
    setShowCorrectAnswer(false);
  };

  const handleClick = e => {
    setCurrentAnswer(e.target.value);
    setDisableClick(true);
    setShowCorrectAnswer(true);
    setError('');
  };

  useEffect( () => {
    console.log(`You clicked ${currentAnswer}`);
  });

  const renderError = () => {
    if (!error) {
      return;
    }

    return <div className="error">{error}</div>
  };

  const renderResultMark = (question, answer) => {
    if (question.correct_answer === answer.answer) {
      return <span className="correct">Correct</span>;
    }
    return <span className="failed">Failed</span>;
  }

  const renderResultsData = () => {
    return answers.map( answer => {
      const question = questionArray.find( 
        question => question.id === answer.questionId
        );

        return (
          <div key={question.id} className="result-item">
            {question.question} - {renderResultMark(question, answer)}
          </div>
        )
    });
  };

  return (
    <div>
      { quizSession ?
      <div>
        <ProgressBar currentQuestion={question + 1} qData={questionArray.length}/>
        <Question
          currentQuestion={currentQuestion.question} 
          startQuiz={props.startQuiz}
        />
        <div className="render-error-container">
          { error ? 
          <span className="render-error">{renderError()}</span> : 
          null
          }
        </div>
        <Answers
          currentQuestion={currentQuestion}
          correctAnswer={correctAnswer}
          currentAnswer={currentAnswer}
          showCorrectAnswer={showCorrectAnswer}
          handleClick={handleClick}
          disableClick={disableClick}
        />
        <NextButton
          next={next} 
          finish={finish}
          currentQuestion={question + 1} 
          qData={questionArray.length}
          quizSession={quizSession}
        />
      </div> :
       (
        <div>
          <h2>¡Felicidades! Way to complete the quiz!</h2>
          <div>
            <h3 className="quiz-results">Quiz Results</h3>
            <RestartButton reset={reset}/>
          </div>
          <ul>
            {renderResultsData()}
          </ul>
        </div>
      )
      }
    </div>
  );
}
 
export default Quiz;