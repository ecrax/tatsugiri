import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { api } from "@/utils/api";
import { Icons } from "@/components/icons";
import RecipeContent from "@/components/recipe";
import Header from "@/components/ui/Header";

const SharedRecipePage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  console.log(id);

  if (Array.isArray(id)) {
    return <p>recipe id not valid</p>;
  } else if (!id) {
    return <></>;
  } else {
    return <SharedRecipePageContent recipeId={id} />;
  }
};

const SharedRecipePageContent: React.FC<{ recipeId: string }> = ({
  recipeId: id,
}) => {
  const { data: recipe, error } = api.recipe.getShared.useQuery({ id });

  return (
    <>
      <Head>
        <title>{recipe?.name ?? "Loading..."}</title>
      </Head>
      <main className="grid min-h-screen">
        <div className="px-8 py-6">
          <Header />
          {error && (
            <div className="flex h-full justify-center items-center text-lg">
              {error.message}
            </div>
          )}
          {recipe && !error ? (
            <div className="flex justify-center">
              <RecipeContent recipe={recipe} />
            </div>
          ) : (
            <div className="flex h-full justify-center items-center">
              <Icons.loadingSpinner className="stroke-primary w-6 h-6" />
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default SharedRecipePage;
