import { useRouter } from "next/router";

const QUESTION = 'This is a question';

const Results = ({ score }) => {
  const router = useRouter();

  return (
    <main>
      <h2>You scored {score}/5</h2>
      <ol>
        <li>
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
        </li>
      </ol>
      <button onClick={() => router.push('/')} >Home</button>
    </main>
  );
};

export default Results;