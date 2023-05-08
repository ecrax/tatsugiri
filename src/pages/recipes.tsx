import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";



import { Plus } from "lucide-react";

import { api } from "@/utils/api";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/Button";
import Header from "@/components/ui/Header";
import { Separator } from "@/components/ui/Seperator";

const Add: NextPage = () => {
  const { data: allRecipes, isLoading } =
    api.recipe.getRecipesForSidebar.useQuery();

  return (
    <ProtectedRoute>
      <Head>
        <title>Recipes</title>
      </Head>
      <main className="min-h-screen">
        <div className="h-full col-span-3 border-l col-start-1 md:col-start-2 border-l-border px-8 py-6 2xl:col-span-5">
          <Header logo />
          <article className="pt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">Your library</h2>
              <Link href="/add" className={buttonVariants({})}>
                <Plus className="mr-2 h-4 w-4" /> Scrape
              </Link>
            </div>

            <div className="my-2" />

            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <Icons.loadingSpinner className="stroke-primary w-6 h-6" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-1 md:gap-4">
                {allRecipes?.map((recipe, index) => (
                  <Link
                    key={`${recipe.name ?? ""} + ${index}`}
                    href={`/recipe/${recipe.name ?? ""}`}
                  >
                    <div className="relative overflow-hidden rounded md:mb-1">
                      <img
                        src={recipe.image ?? ""}
                        alt={`An image of "${recipe.name ?? "food"}"`}
                        className="hidden md:flex w-full aspect-[3/4] object-cover hover:scale-105 transition-transform"
                      />
                      {/* TODO: add hover options for sharing, deleting */}
                    </div>
                    <p className="truncate p-2 hover:bg-border md:hover:bg-transparent transition-colors rounded">
                      {recipe.name}
                    </p>
                    <Separator className="block md:hidden mt-1" />
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