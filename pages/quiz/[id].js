import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppState, useAppDispatch } from '../../store';

const decodeHtml = (html) => {
  let text = document.createElement("textarea");
  text.innerHTML = html;
  return text.value;
};

const Question = () => {
  const appState = useAppState();
  const appDispatch = useAppDispatch();
  const router = useRouter();

  const { questionData } = appState;

  useEffect(() => {
    if (!questionData) router.push('/');
  }, [questionData]);

  const questionIndex = router.query.id;
  const question = questionData?.[questionIndex];
  const lastQuestion = questionIndex == questionData?.length - 1;

  const [options, setOptions] = useState(null);
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    if (!question) return;
    setOptions(
      [
        ...question?.incorrect_answers,
        question?.correct_answer
      ].sort(() => Math.random() - 0.5)
    );
  }, [question]);

  const submitHandler = () => {
    question['answer'] = answer;
    appDispatch({ type: 'SET_USER_ANSWER', payload: questionData });
    setOptions(null);
    setAnswer(null);
    router.push(
      lastQuestion
        ? '/results'
        : `${Number(questionIndex) + 1}`
    );
  };

  if (!question || !options) return null;

  return (
    <main>

      <fieldset>
        <legend>{decodeHtml(question?.question)}</legend>
        <ul>
          {options?.map((value, index) => (
            <li key={index}>
              <input
                type="radio"
                name={0}
                id={index}
                value={decodeHtml(value)}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <label htmlFor={index}>{decodeHtml(value)}</label>
            </li>
          ))}
        </ul >
      </fieldset >

      <button onClick={submitHandler}>Next</button>

    </main>
  );
};

export default Question;