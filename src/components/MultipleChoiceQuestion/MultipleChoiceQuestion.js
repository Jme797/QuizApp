import React, { useEffect, useState } from "react";

import styles from "./MultipleChoiceQuestion.module.scss";

const MultipleChoiceQuestion = ({
  question,
  submitAnswer,
  showAnswers,
  progressQuestion,
  givenAnswer,
  setScore,
}) => {
  let answers = [...question.incorrect_answers, question.correct_answer];
  const correctAnswer = question.correct_answer;
  const [answerVisible, setAnswerVisible] = useState(false);

  if (!givenAnswer) {
    answers.sort(() => (Math.random() > 0.5 ? 1 : -1));
  }

  return (
    <>
      <h2
        className={styles.header}
        dangerouslySetInnerHTML={{ __html: question.question }}
      ></h2>
      <div className={styles.options}>
        {answers.map((option, i) => (
          <button
            key={i}
            className={givenAnswer == option ? styles.answerSelected : ""}
            onClick={() => {
              if (!showAnswers || answerVisible) {
                if (!givenAnswer) submitAnswer(option);
                if (givenAnswer) progressQuestion();
                setAnswerVisible(false);
              } else {
                if (correctAnswer == givenAnswer) setScore();
                setAnswerVisible(true);
              }
            }}
            dangerouslySetInnerHTML={{ __html: option }}
          ></button>
        ))}
      </div>
      {answerVisible && (
        <div className={styles.answer}>
          <h1>
            <span dangerouslySetInnerHTML={{ __html: correctAnswer }}></span>
          </h1>
          <p>
            {/* You put{" "}
            <span dangerouslySetInnerHTML={{ __html: givenAnswer }}></span> */}
          </p>
        </div>
      )}
    </>
  );
};

export default MultipleChoiceQuestion;
