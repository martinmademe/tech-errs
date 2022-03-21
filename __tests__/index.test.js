import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock Router
const useRouter = jest.spyOn(require('next/router'), 'useRouter');
const router = { push: jest.fn() };

useRouter.mockReturnValue(router);

// Mock Components

const Button = ({ value, slug }) => <button onClick={() => router.push(slug)} >{value}</button>;

const Home = () => (
  <>
    <input type='text' />
    <select>
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">C</option>
    </select>,
    <Button value='GO' slug='/quiz' />;
  </>
);

const QUESTION = 'This is a question';

const QuizOptions = () => (
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
);

const Quiz = () => (
  <>
    <QuizOptions />
    <Button value='RESULTS' slug='/results' />;
  </>
);

const Results = ({ score }) => (
  <>
    <h2>You scored {score}/5</h2>
    <ol>
      <li><QuizOptions /></li>
    </ol>
    <Button value='HOME' slug='/' />;
  </>
);

// Tests

describe('Home', () => {

  it('allows me to set a username...', () => {
    render(<Home />);

    const USERNAME = { target: { value: 'userOne' } };
    const textInput = screen.getByRole('textbox');

    fireEvent.change(textInput, USERNAME);
    expect(textInput).toHaveValue(USERNAME.target.value);
  });

  test('& allows me to set a difficulty level...', () => {
    render(<Home />);

    fireEvent.click(screen.getByRole('combobox'), 'easy');
    expect(screen.getByRole('option', { name: 'Easy' }).selected).toBe(true);
  });

  test('& clicking the button re-routes me to the Quiz.', () => {
    render(<Home />);

    fireEvent.click(screen.getByRole('button'));
    expect(router.push).toHaveBeenCalledWith('/quiz');
  });
});

describe('Quiz', () => {

  it('displays me a question...', () => {
    render(<Quiz />);

    const question = screen.getByRole('group');

    expect(question).toHaveAccessibleName(QUESTION);
  });

  test('& a list of selectable options...', () => {
    render(<Quiz />);

    const radio = screen.getByLabelText('One');

    fireEvent.click(radio, '1');
    expect(radio).toBeChecked();
  });

  test('& clicking the button re-routes me to the Results screen.', () => {
    render(<Quiz />);

    fireEvent.click(screen.getByRole('button'));
    expect(router.push).toHaveBeenCalledWith('/results');
  });
});

describe('Results', () => {

  it('displays me a score...', () => {
    render(<Results score={5} />);

    const score = screen.getByRole('heading');

    expect(score).toHaveTextContent(5);
  });

  test('& shows me some feedback...', () => {
    render(<Results />);

    const radio = screen.getByLabelText('One');

    fireEvent.click(radio, '1');
    expect(radio).toBeChecked();
  });

  test('& clicking the button re-routes me Home.', () => {
    render(<Results />);

    fireEvent.click(screen.getByRole('button', { value: /HOME/ }));
    expect(router.push).toHaveBeenCalledWith('/');
  });
});

