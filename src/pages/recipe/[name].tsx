import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { Edit3, Share, Trash } from "lucide-react";

import { api } from "@/utils/api";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Icons } from "@/components/icons";
import RecipeContent from "@/components/recipe";
import { Button, buttonVariants } from "@/components/ui/Button";
import RecipeEditSheet from "@/components/ui/EditSheet";
import Header from "@/components/ui/Header";
import RecipeSidebar from "@/components/ui/RecipeSidebar";
import { Separator } from "@/components/ui/Seperator";
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
  const router = useRouter();
  const { data: recipe } = api.recipe.getByName.useQuery({ name });
  const deleteMutation = api.recipe.delete.useMutation({
    onSuccess: () => {
      void router.push("/recipes");
    },
  });

  return (
    <ProtectedRoute>
      <Head>
        <title>{name}</title>
      </Head>
      <main className="grid min-h-screen grid-cols-1 md:grid-cols-4 2xl:grid-cols-6">
        <RecipeSidebar selectedRecipe={name} />

        <div className="col-span-3 col-start-1 md:col-start-2 border-l border-l-border px-8 py-6 2xl:col-span-5">
          <Header>
            {recipe && (
              <div className="flex">
                <div className="gap-2 flex pr-2">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        className={buttonVariants({
                          variant: "ghost",
                          className: "bg-transparent text-primary",
                        })}
                      >
                        <Edit3 className="h-4 w-4" />{" "}
                        <span className="sr-only">Edit</span>
                      </Button>
                    </SheetTrigger>
                    <RecipeEditSheet recipe={recipe} />
                  </Sheet>
                  <Button
                    className={buttonVariants({
                      variant: "ghost",
                      className: "bg-transparent text-primary",
                    })}
                  >
                    <Share className="h-4 w-4" />{" "}
                    <span className="sr-only">Share</span>
                  </Button>
                  <Button
                    className={buttonVariants({
                      variant: "ghost",
                      className: "bg-transparent text-primary",
                    })}
                    disabled={deleteMutation.isLoading}
                    onClick={() => {
                      //TODO: add a confirmation modal
                      deleteMutation.mutate({ name });
                    }}
                  >
                    {deleteMutation.isLoading ? (
                      <>
                        <Icons.loadingSpinner />
                        <span className="sr-only">Loading</span>
                      </>
                    ) : (
                      <>
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </>
                    )}
                  </Button>
                  <Separator orientation="vertical" />
                </div>
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
