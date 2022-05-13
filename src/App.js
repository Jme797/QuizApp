import { useEffect, useLayoutEffect, useState } from "react";

import background from "./assets/background.jpg";

import "./App.scss";
import SettingsForm from "./components/SettingsForm/SettingsForm";
import MultipleChoiceQuestion from "./components/MultipleChoiceQuestion/MultipleChoiceQuestion";

function App() {
  const [showAnswers, setShowAnswers] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [live, setLive] = useState(true);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);

  useLayoutEffect(() => {
    if (questionNumber == questionCount && questionCount != 0) setLive(false);
  }, [questionNumber]);
  useEffect(() => {
    setQuestionCount(questions.length);
  }, [questions]);

  const submitAnswer = (answer) => {
    setAnswers((curr) => [...curr, answer]);
    setQuestionNumber((curr) => curr + 1);
  };
  const progressQuestion = () => {
    setQuestionNumber((curr) => curr + 1);
  };

  const markCorrect = () => {
    setScore((curr) => curr + 1);
  };

  return (
    <div className="background">
      <img src={background} />

      <div className="container">
        {live ? (
          <>
            {questions.length > 0 && questions[questionNumber] ? (
              <>
                <div>
                  <p>
                    {questionNumber + 1} / {questionCount}
                  </p>
                  {showAnswers && <p className="score">{score}</p>}
                </div>
                <MultipleChoiceQuestion
                  question={questions[questionNumber]}
                  submitAnswer={submitAnswer}
                  showAnswers={showAnswers}
                  progressQuestion={progressQuestion}
                  givenAnswer={answers[questionNumber] || false}
                  setScore={markCorrect}
                />
              </>
            ) : (
              <SettingsForm setQuestions={setQuestions} />
            )}
          </>
        ) : (
          <>
            {score == 0 ? (
              <div className="centered">
                <h2>That's all</h2>
                <button
                  onClick={() => {
                    setShowAnswers(true);
                    setLive(true);
                    setQuestionNumber(0);
                  }}
                >
                  See Answers
                </button>
              </div>
            ) : (
              <div className="centered">
                <h2 style={{ fontSize: "4rem" }}>
                  Score <span>{score}</span> / <span>{questionCount}</span>
                </h2>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
