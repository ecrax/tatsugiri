import { useState } from "react";
import Link from "next/link";

import { clsx } from "clsx";
import { ClipboardList, Soup, Timer } from "lucide-react";

import { api } from "@/utils/api";
import { Input } from "@/components/ui/Input";
import { Separator } from "@/components/ui/Seperator";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./HoverCard";

const RecipeSidebar: React.FC<{ selectedRecipe?: string }> = ({
  selectedRecipe,
}) => {
  const { data: allRecipes } = api.recipe.getRecipesForSidebar.useQuery();

  const [search, setSearch] = useState<string>();

  let recipes: typeof allRecipes = [];
  if (allRecipes) {
    recipes = allRecipes.filter((r) =>
      r.name?.toLowerCase().includes(search ?? "")
    );
  }

  return (
    <aside>
      <Link href={"/recipes"}>
        <h1 className="flex items-center px-8 py-6 text-2xl font-semibold">
          <Soup className="mr-2" /> Tatsugiri
        </h1>
      </Link>
      <div className="space-y-4 px-8">
        <Input
          placeholder="Search..."
          onChange={(e) => setSearch(e.currentTarget.value.toLowerCase())}
        />
        <h2 className="text-lg font-semibold">All Recipes</h2>
        {!allRecipes && <p>Loading...</p>}
        {allRecipes && (
          <div className="flex flex-col space-y-1">
            {allRecipes.length == 0 && <p>Wow such empty</p>}
            {recipes.length == 0 && <p>No recipes found</p>}
            {recipes.length > 0 &&
              recipes.map((r) => (
                //? Better/more useful info on hover
                <HoverCard key={r.name}>
                  <HoverCardTrigger asChild>
                    <Link
                      className={clsx(
                        "group flex w-full items-center rounded-md py-2 px-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800",
                        r.name === selectedRecipe && "bg-slate-200"
                      )}
                      href={`/recipe/${r.name ?? ""}`}
                    >
                      {r.name}
                    </Link>
                  </HoverCardTrigger>
                  <HoverCardContent side="right">
                    <div className="flex items-center justify-between ">
                      <div className="mr-4 flex w-full flex-col gap-3">
                        <p className="flex flex-col items-center text-xs">
                          <Timer />
                          {r.totalTime}
                        </p>
                        <Separator />
                        <p className="flex flex-col items-center text-xs">
                          <ClipboardList />
                          {r.recipeInstructions.length}
                        </p>
                      </div>
                      <img
                        src={r.image ?? ""}
                        alt={r.name ?? ""}
                        className="h-32 w-32 rounded-md object-cover"
                      />
                    </div>
                  </HoverCardContent>
                </HoverCard>
              ))}
          </div>
        )}
        <Separator />
      </div>
    </aside>
  );
};

export default RecipeSidebar;
