import { useEffect, useState } from "react";
import "./App.css";
import { Food } from "./food";

function App() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function getFoods() {
      try {
        setLoading(true);
        const resp = await fetch("http://localhost:3001/foods");
        const json = await resp.json();
        setFoods(json);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }
    getFoods();
  }, []);

  function renderFoods() {
    return (
      <ul>
        {foods.map((food) => (
          <li key={food.id}>{food.name}</li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <h1>Menu</h1>

      {error && <p>Sorry, an error occurred.</p>}

      {loading ? <p>Loading...</p> : renderFoods()}
    </>
  );
}

export default App;
