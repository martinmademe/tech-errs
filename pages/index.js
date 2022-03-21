import { useDebugValue, useState } from "react";
import { useRouter } from "next/router";
import { useAppState, appDispatch, fetchData, useAppDispatch } from '../store';


export const getUrl = (level) =>
  `https://opentdb.com/api.php?amount=5&category=18&difficulty=${level}&type=multiple`;

const Home = () => {
  const router = useRouter();
  const appDispatch = useAppDispatch();

  const [username, setUsername] = useState(null);
  const [level, setLevel] = useState(null);

  const onReady = async () => {
    if (!level) return;
    await fetchData(appDispatch, getUrl(level));
    appDispatch({ type: 'SET_USER', payload: { username } });
    router.push('/quiz');
  };

  return (
    <main>
      <input type='text' onChange={(e) => setUsername(e.target.value)} />
      <select onChange={(e) => setLevel(e.target.value)}>
        <option >Please select a level</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button disabled={!username || !level} onClick={onReady} >READY</button >
    </main>
  );
};

export default Home;