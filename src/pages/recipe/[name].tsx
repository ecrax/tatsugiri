import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { api } from "@/utils/api";
import ProtectedRoute from "@/components/ProtectedRoute";
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
    return <p>recipe name not valid</p>;
  } else {
    return <RecipePageContent recipeName={name} />;
  }
};

//TODO: gotta think about where to put context buttons on mobile
const RecipePageContent: React.FC<{ recipeName: string }> = ({
  recipeName: name,
}) => {
  const { data: recipe } = api.recipe.getByName.useQuery({ name });

  return (
    <ProtectedRoute>
      <Head>
        <title>{name}</title>
      </Head>
      <main className="grid min-h-screen grid-cols-1 md:grid-cols-4 2xl:grid-cols-6">
        <RecipeSidebar selectedRecipe={name} />

        <div className="col-span-3 col-start-1 md:col-start-2 border-l border-l-slate-200 dark:border-l-slate-700 px-8 py-6 2xl:col-span-5">
          <Header>
            {recipe && (
              <div className="gap-4 hidden md:flex">
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
    </ProtectedRoute>
  );
};

export default RecipePage;
