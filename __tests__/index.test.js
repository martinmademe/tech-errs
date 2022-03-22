import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../pages/index';
// import Quiz from '../pages/quiz/[id]';
import Results from '../pages/results';
import QUESTIONS from '../__mocks__/questionWithAnswers.json';

// Mock Router
const useRouter = jest.spyOn(require('next/router'), 'useRouter');
const router = { push: jest.fn(), query: { id: 1 } };

useRouter.mockReturnValue(router);

// Make fetch -> resolve mock
window.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

// Mock dispatch
const useAppDispatch = jest.spyOn(require('../store'), 'useAppDispatch');
const appDispatch = jest.fn();

const useAppState = jest.spyOn(require('../store'), 'useAppState');
const appState = jest.fn();
const { questionData = QUESTIONS, userData } = appState;

useAppDispatch.mockReturnValue(appDispatch);
useAppState.mockReturnValue(appState);

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

    fireEvent.click(screen.getByRole('combobox'), { target: { value: 'easy' } });
    expect(screen.getByRole('option', { name: 'Easy' }).selected).toBe(true);
  });

  test('& clicking READY fetches questions, then renders GO button, which re-routes to the Quiz.', async () => {
    render(<Home />);

    fireEvent.click(screen.getByRole('button', { name: /Ready/ }));

    // const goButton = await screen.findByRole('button', { name: /Go/ });

    // fireEvent.click(goButton);
    // expect(router.push).toHaveBeenCalledTimes(1);
  });
});

// describe('Quiz', () => {

//   it('displays me a question...', () => {
//     render(<Quiz />);

//     const question = screen.getByRole('group');

//     expect(question).toHaveAccessibleName('This is a question');
//   });

//   test('& a list of selectable options...', () => {
//     render(<Quiz />);

//     const radio = screen.getByLabelText('One');

//     fireEvent.click(radio, '1');
//     expect(radio).toBeChecked();
//   });

//   test('& clicking the button re-routes me to the Results screen.', () => {
//     render(<Quiz />);

//     fireEvent.click(screen.getByRole('button'));
//     expect(router.push).toHaveBeenCalledWith('/results');
//   });
// });

describe('Results', () => {

  it('displays me a score...', () => {
    render(<Results />);

    const score = screen.getByRole('heading');

    expect(score).toHaveTextContent('You scored');
  });

  test('& shows me some feedback...', () => {
    render(<Results />);

    const feedback = screen.getByRole('list', { name: 'feedback' });

    expect(feedback).toBeInTheDocument();
  });

  test('& clicking the button re-routes me Home.', () => {
    render(<Results />);

    fireEvent.click(screen.getByRole('button', { value: /HOME/ }));
    expect(router.push).toHaveBeenCalledWith('/');
  });
});

