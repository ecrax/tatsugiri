import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";



import { Close } from "@radix-ui/react-dialog";
import { Edit3, Share, Trash } from "lucide-react";



import { api } from "@/utils/api";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Icons } from "@/components/icons";
import RecipeContent from "@/components/recipe";
import { Button, buttonVariants } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
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
                        <Edit3 className="h-4 w-4" />
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
                    <Share className="h-4 w-4" />
                    <span className="sr-only">Share</span>
                  </Button>
                  <Dialog>
                    <DialogTrigger>
                      <div
                        className={buttonVariants({
                          variant: "ghost",
                          className: "bg-transparent text-primary",
                        })}
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          <div className="pb-4">
                            This action cannot be undone. This will permanently
                            delete this recipe.
                          </div>
                          <div className="flex gap-4">
                            <Button
                              className={buttonVariants({
                                variant: "destructive",
                              })}
                              disabled={deleteMutation.isLoading}
                              onClick={() => {
                                deleteMutation.mutate({ name });
                              }}
                            >
                              {deleteMutation.isLoading ? (
                                <>
                                  <Icons.loadingSpinner className="stroke-primary" />
                                  <span className="sr-only">Loading...</span>
                                </>
                              ) : (
                                <span className="">Delete</span>
                              )}
                            </Button>
                            <Close>
                              <div
                                className={buttonVariants()}
                                
                              >
                                Cancel
                              </div>
                            </Close>
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>

                  <Separator orientation="vertical" />
                </div>
              </div>
            )}
          </Header>
          {recipe ? (
            <RecipeContent recipe={recipe} />
          ) : (
            <div className="flex h-full justify-center items-center">
              <Icons.loadingSpinner className="stroke-primary w-6 h-6" />
            </div>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
};

export default RecipePage;