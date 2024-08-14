import { useSearchParams } from "react-router-dom";
import "./App.css";
import { useFoods } from "./queries/useFoods";

function useSearch() {
  const [params, setParams] = useSearchParams();

  return [
    params.get("search")?.toString() ?? "",
    (search: string) => {
      setParams({ search });
    },
  ] as const;
}

function App() {
  const [search, setSearch] = useSearch();
  const foodsQuery = useFoods();

  // Derived state
  const filteredFoods =
    foodsQuery.data?.filter((food) =>
      food.name.toLowerCase().includes(search.toLowerCase())
    ) ?? [];
  const numFoods = filteredFoods.length;

  function renderFoods() {
    if (!foodsQuery.data) return;

    return (
      <ul>
        {filteredFoods.map((food) => (
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
      {numFoods === 0 && !foodsQuery.isLoading && <p>No foods found</p>}
      {foodsQuery.isLoading ? <p>Loading...</p> : renderFoods()}
    </>
  );
}

export default App;
