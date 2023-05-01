import { atomWithStorage } from "jotai/utils";

export const cartAtom = atomWithStorage<Ingredient[]>("cart", []);

export type Ingredient = {
  name: string;
  amount: number;
};
