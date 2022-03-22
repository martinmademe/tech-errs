import { useState } from "react";
import { useRouter } from "next/router";
import { fetchData, useAppDispatch } from '../store';

export const getUrl = (level: string | null) =>
  `https://opentdb.com/api.php?amount=5&category=18&difficulty=${level}&type=multiple`;

const Home = () => {
  const router = useRouter();
  const appDispatch = useAppDispatch();

  const [username, setUsername] = useState<string | null>(null);
  const [level, setLevel] = useState<string | null>(null);
  const [ready, setReady] = useState<boolean>(false);

  const onReady = async () => {
    appDispatch({ type: 'SET_USER', payload: { username } });
    await fetchData(appDispatch, getUrl(level));
    setReady(true);
  };

  return (
    <main>
      <fieldset>
        <label>Enter a username</label>
        <input type='text' onChange={(e) => setUsername(e.target.value)} />
        <label>Select a difficulty level</label>
        <select onChange={(e) => setLevel(e.target.value)}>
          <option ></option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </fieldset>
      {ready
        // ? <button onClick={() => router.push('/quiz/0')} >Go</button >
        // ToDo. Update tests to enable buttton
        ? <button onClick={() => router.push('/quiz/0')} title='Go' >Go</button >
        : <button disabled={!username || !level} onClick={onReady} >Ready</button >
      }
    </main>
  );
};

export default Home;