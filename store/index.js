import { createContext, useReducer, useContext } from 'react';
// import ANSWERS from '../__mocks__/questionWithAnswers.json';

const AppStateContext = createContext();
const AppDispatchContext = createContext();

const INITIAL_STATE = {
  isLoading: false,
  error: false,
  userData: null,
  questionData: null
};

const AppReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true };
    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, questionData: action.payload };
    case 'FETCH_ERROR':
      return { ...state, isLoading: false, error: true };
    case 'SET_USER':
      return { ...state, userData: action.payload };
    case 'SET_USER_ANSWER':
      return { ...state, questionData: action.payload };
    case 'RESET':
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, INITIAL_STATE);

  console.log('store', state);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

const useAppState = () => useContext(AppStateContext);
const useAppDispatch = () => useContext(AppDispatchContext);

const fetchData = async (dispatch, url) => {
  dispatch({ type: 'FETCH_START' });
  try {
    let response = await fetch(url);
    let data = await response.json();
    dispatch({ type: 'FETCH_SUCCESS', payload: data.results });
  } catch (error) {
    dispatch({ type: 'FETCH_ERROR' });
  }
};

export { AppProvider, useAppState, useAppDispatch, fetchData };