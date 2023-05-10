import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { LayoutGrid, List, Plus } from "lucide-react";

import { api } from "@/utils/api";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/Button";
import { CommandMenu } from "@/components/ui/CommandMenu";
import Header from "@/components/ui/Header";
import { Separator } from "@/components/ui/Seperator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

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
          <Header logo>
            {allRecipes && (
              <CommandMenu
                recipes={allRecipes}
                className="w-full sm:w-48 lg:w-64 mr-2"
              />
            )}
          </Header>
          <article className="pt-6">
            <Tabs defaultValue="grid">
              <div className="flex justify-between items-center">
                <div className="flex justify-between items-center gap-4">
                  <h2 className="text-lg font-medium">Your library</h2>

                  <TabsList>
                    <TabsTrigger value="grid">
                      <LayoutGrid className="h-4 w-4" />
                    </TabsTrigger>
                    <TabsTrigger value="list">
                      <List className="h-4 w-4" />
                    </TabsTrigger>
                  </TabsList>
                </div>
                <Link href="/add" className={buttonVariants({})}>
                  <Plus className="mr-2 h-4 w-4" /> Scrape
                </Link>
              </div>

              <div className="my-4" />

              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Icons.loadingSpinner className="stroke-primary w-6 h-6" />
                </div>
              ) : (
                <>
                  <TabsContent value="grid">
                    <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-2 md:gap-4">
                      {allRecipes?.map((recipe, index) => (
                        <Link
                          key={`${recipe.name ?? ""} + ${index}`}
                          href={`/recipe/${recipe.name ?? ""}`}
                        >
                          <div className="relative overflow-hidden rounded md:mb-1">
                            <img
                              src={recipe.image ?? ""}
                              alt={`An image of "${recipe.name ?? "food"}"`}
                              className="w-full aspect-[3/4] object-cover hover:scale-105 transition-transform"
                            />
                            {/* TODO: add hover options for sharing, deleting */}
                          </div>
                          <p className="truncate p-2 rounded">{recipe.name}</p>
                        </Link>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="list">
                    <div className="grid grid-cols-1 gap-1">
                      {allRecipes?.map((recipe, index) => (
                        <Link
                          key={`${recipe.name ?? ""} + ${index}`}
                          href={`/recipe/${recipe.name ?? ""}`}
                        >
                          <p className="truncate p-2 hover:bg-border transition-colors rounded">
                            {recipe.name}
                          </p>
                          <Separator className="mt-1" />
                        </Link>
                      ))}
                    </div>
                  </TabsContent>
                </>
              )}
            </Tabs>
          </article>
        </div>
      </main>
    </ProtectedRoute>
  );
};

export default Add;
