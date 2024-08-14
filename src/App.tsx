import { useSearchParams } from "react-router-dom";
import "./App.css";
import { useFoods } from "./queries/useFoods";

function useSearch() {
  const [params, setParams] = useSearchParams();

  return [
    params.get("search")?.toString(),
    (search: string) => {
      setParams({ search });
    },
  ] as const;
}

function App() {
  const [search, setSearch] = useSearch();
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
      <input
        type="search"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {foodsQuery.isLoading ? <p>Loading...</p> : renderFoods()}
    </>
  );
}

export default App;
