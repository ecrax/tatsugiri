import { Input } from "@/components/ui/Input";
import { Separator } from "@/components/ui/Seperator";
import { api } from "@/utils/api";
import { clsx } from "clsx";
import { Soup } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const RecipeSidebar: React.FC<{ selectedRecipe?: string }> = ({
  selectedRecipe,
}) => {
  const { data: allRecipes } = api.recipe.getRecipesForSidebar.useQuery();

  const [recipes, setRecipes] = useState(allRecipes ?? []);

  return (
    <aside>
      <h1 className="flex items-center px-8 py-6 text-2xl font-semibold">
        <Soup className="mr-2" /> Tatsugiri
      </h1>
      <div className="space-y-4 px-8">
        <Input
          placeholder="Search..."
          onChange={(e) => {
            if (allRecipes) {
              const filteredRecipes = allRecipes.filter((r) =>
                r.name
                  ?.toLowerCase()
                  .includes(e.currentTarget.value.toLowerCase())
              );
              setRecipes(filteredRecipes);
            }
          }}
        />
        <h2 className="text-lg font-semibold">All Recipes</h2>
        {allRecipes && (
          <div className="flex flex-col space-y-1">
            {recipes.length == 0 && allRecipes.length == 0 && (
              <p>Wow such empty</p>
            )}
            {recipes.length == 0 && allRecipes.length > 0 && (
              <p>No recipe found</p>
            )}
            {recipes.map((r, i) => (
              // TODO: show preview image on hover
              <Link
                key={i}
                className={clsx(
                  "group flex w-full items-center rounded-md py-2 px-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800",
                  r.name === selectedRecipe && "bg-slate-200"
                )}
                href={`/recipe/${r.name ?? ""}`}
              >
                {r.name}
              </Link>
            ))}
          </div>
        )}
        <Separator />
      </div>
    </aside>
  );
};

export default RecipeSidebar;
