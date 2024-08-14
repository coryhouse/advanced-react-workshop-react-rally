import { z } from "zod";

export const tagSchema = z.enum([
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Drink",
  "Appetizer",
  "Spicy",
  "Vegetarian",
  "Alcoholic",
]);

export const foodSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  price: z.number(),
  description: z.string(),
  tags: z.array(tagSchema),
});

export type Food = z.infer<typeof foodSchema>;

export const foodTags = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Drink",
  "Appetizer",
  "Spicy",
  "Vegetarian",
  "Alcoholic",
] as const;

export type FoodTag = z.infer<typeof tagSchema>;
