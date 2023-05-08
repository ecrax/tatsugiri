import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { api } from "@/utils/api";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Icons } from "@/components/icons";
import Header from "@/components/ui/Header";

const Add: NextPage = () => {
  const { data: allRecipes, isLoading } =
    api.recipe.getRecipesForSidebar.useQuery();

  return (
    <ProtectedRoute>
      <Head>
        <title>Recipes</title>
      </Head>
      <main className="min-h-screen">
        <div className="col-span-3 border-l col-start-1 md:col-start-2 border-l-border px-8 py-6 2xl:col-span-5">
          <Header logo />
          <article className="pt-6">
            <h2 className="text-lg font-medium pb-4">Your library</h2>

            {isLoading ? (
              <div className="flex items-center justify-center">
                <Icons.loadingSpinner />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {allRecipes?.map((recipe, index) => (
                  <Link
                    key={`${recipe.name ?? ""} + ${index}`}
                    href={`/recipe/${recipe.name ?? ""}`}
                  >
                    <div className="overflow-hidden rounded mb-1">
                      <img
                        src={recipe.image ?? ""}
                        alt={`An image of "${recipe.name ?? "food"}"`}
                        className="flex w-full aspect-[3/4] object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                    <p className="truncate">{recipe.name}</p>
                  </Link>
                ))}
              </div>
            )}
          </article>
        </div>
      </main>
    </ProtectedRoute>
  );
};

export default Add;
