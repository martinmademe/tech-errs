import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppState } from '../../store';

const Results = () => {
  const decodeHtml = (html) => {
    let text = document.createElement("textarea");
    text.innerHTML = html;
    return text.value;
  };

  const appState = useAppState();
  const router = useRouter();

  const { questionData } = appState;

  useEffect(() => {
    if (!questionData) router.push('/');
  }, [questionData]);

  const score = questionData?.filter(q => q.answer === q.correct_answer).length;
  const quizLength = questionData?.length;
  const feedback = quizLength / 2 > score ? 'OKISH' : 'GRAND';

  return (
    <main>
      <h2>You scored {score}/{quizLength}</h2>
      <p>
        <span>YOU </span>
        <span>DID </span>
        <span>{feedback}</span>
      </p>
      <ol aria-label="feedback">
        {questionData?.map((q) => {
          const isCorrect = q.answer === q.correct_answer;

          return (
            <li>
              <h2>{isCorrect ? 'WELL DONE!' : 'OH NO!'}</h2>
              <p>{decodeHtml(q.question)}</p>
              <h3>Your answer</h3>
              <p>{decodeHtml(q.answer)}</p>
              {!isCorrect && (
                <Fragment>
                  <h3>Correct answer</h3>
                  <p>{decodeHtml(q.correct_answer)}</p>
                </Fragment>
              )}
            </li>
          );
        })}
      </ol>
      <button onClick={() => router.push('/')} >Home</button>
    </main>
  );
};

export default Results;