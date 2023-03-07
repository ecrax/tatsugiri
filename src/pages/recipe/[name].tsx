import { type NextPage } from "next";
import { useRouter } from "next/router";

import { api } from "@/utils/api";
import RecipeContent from "@/components/recipe";
import { Button } from "@/components/ui/Button";
import RecipeEditSheet from "@/components/ui/EditSheet";
import Header from "@/components/ui/Header";
import RecipeSidebar from "@/components/ui/RecipeSidebar";
import { Sheet, SheetTrigger } from "@/components/ui/Sheet";

const RecipePage: NextPage = () => {
  const router = useRouter();
  const { name } = router.query;

  if (!name || Array.isArray(name)) {
    return <p>recipe not found</p>;
  }

  const { data: recipe } = api.recipe.getByName.useQuery({ name });

  return (
    <main className="grid min-h-screen grid-cols-4 2xl:grid-cols-6">
      <RecipeSidebar selectedRecipe={name} />

      <div className="col-span-3 border-l border-l-slate-200 px-8 py-6 2xl:col-span-5">
        <Header>
          {recipe && (
            <div className="flex gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button>Edit</Button>
                </SheetTrigger>
                <RecipeEditSheet recipe={recipe} />
              </Sheet>
              <Button>Share</Button>
              <Button>Delete</Button>
            </div>
          )}
        </Header>
        {recipe ? (
          <RecipeContent recipe={recipe} />
        ) : (
          <div className="flex h-full justify-center items-center">
            Loading...
          </div>
        )}
      </div>
    </main>
  );
};

export default RecipePage;
