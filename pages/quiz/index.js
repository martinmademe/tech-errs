import { useRouter } from "next/router";

const QUESTION = 'This is a question';

const Quiz = () => {
  const router = useRouter();

  return (
    <main>
      <fieldset>
        <legend>{QUESTION}</legend>
        <ul>
          <li>
            <input type="radio" name="one" id="1" value="1" />
            <label htmlFor="1">One</label>
          </li>
          <li>
            <input type="radio" name="one" id="2" value="2" />
            <label htmlFor="2">Two</label>
          </li>
          <li>
            <input type="radio" name="one" id="3" value="3" />
            <label htmlFor="3">Three</label>
          </li >
        </ul >
      </fieldset >
      <button onClick={() => router.push('/results')} >RESULTS</button>
    </main>
  );
};

export default Quiz;
