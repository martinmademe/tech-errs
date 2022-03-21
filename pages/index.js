import { useRouter } from "next/router";
import { Fragment } from "react";

const Home = () => {
  const router = useRouter();

  return (
    <main>
      <input type='text' />
      <select>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button onClick={() => router.push('/quiz')} >GO</button >
    </main>
  );
};

export default Home;