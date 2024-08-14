import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Food, foodSchema } from "../food";
import { z } from "zod";

const getFoodsResponseSchema = z.array(foodSchema);

type GetFoodsResponse = z.infer<typeof getFoodsResponseSchema>;

export function useFoods(): UseQueryResult<GetFoodsResponse> {
  return useQuery({
    queryFn: async () => {
      const resp = await fetch("http://localhost:3001/foods");
      const foodsResponse = await resp.json();
      const food = getFoodsResponseSchema.parse(foodsResponse);
      return food;
    },
    queryKey: ["foods"],
  });
}
