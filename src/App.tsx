import "./App.css";
import { useFoods } from "./queries/useFoods";

function App() {
  const foodsQuery = useFoods();

  function renderFoods() {
    if (!foodsQuery.data) return;

    return (
      <ul>
        {foodsQuery.data.map((food) => (
          <li key={food.id}>{food.name}</li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <h1>Menu</h1>

      {foodsQuery.error && <p>Sorry, an error occurred.</p>}

      {foodsQuery.isLoading ? <p>Loading...</p> : renderFoods()}
    </>
  );
}

export default App;
