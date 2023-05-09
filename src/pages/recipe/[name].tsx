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
import { CopyButton } from "@/components/ui/CopyButton";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import RecipeEditSheet from "@/components/ui/EditSheet";
import Header from "@/components/ui/Header";
import { Input } from "@/components/ui/Input";
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
  const utils = api.useContext();
  const { data: recipe, isLoading: recipeLoading } =
    api.recipe.getByName.useQuery({ name });
  const deleteMutation = api.recipe.delete.useMutation({
    onSuccess: async () => {
      await utils.recipe.getRecipesForSidebar.invalidate();
      void router.push("/recipes");
    },
  });
  const shareMutation = api.recipe.shareByName.useMutation();
  const stopShareMutation = api.recipe.stopShareByName.useMutation({
    onSuccess: async () => {
      shareMutation.reset();
      await utils.recipe.getByName.invalidate({ name: recipe?.name ?? "" });
    },
  });

  return (
    <ProtectedRoute>
      <Head>
        <title>{recipeLoading ? "Loading..." : name}</title>
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
                  {/* TODO: this needs refactoring */}
                  <Dialog>
                    <DialogTrigger>
                      <div
                        className={buttonVariants({
                          variant: "ghost",
                          className: "bg-transparent text-primary",
                        })}
                      >
                        <Share className="h-4 w-4" />
                        <span className="sr-only">Share</span>
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Share this recipe?</DialogTitle>
                        <DialogDescription>
                          <span className="pb-4">
                            {recipe.shareUrl ? (
                              <>
                                You have already shared this recipe in the past.
                                Here is the link.
                              </>
                            ) : (
                              <>
                                By sharing this recipe everyone with a link to
                                it will be able to view it.
                              </>
                            )}
                          </span>
                        </DialogDescription>
                      </DialogHeader>
                      {shareMutation.isLoading &&
                        !shareMutation.data &&
                        !recipe.shareUrl && (
                          <div className="flex justify-center items-center">
                            <Icons.loadingSpinner className="stroke-primary" />
                            <span className="sr-only">Loading...</span>
                          </div>
                        )}

                      {!shareMutation.isLoading &&
                        !shareMutation.data &&
                        !recipe.shareUrl && (
                          <div className="flex gap-4">
                            <Button
                              className={buttonVariants({})}
                              disabled={shareMutation.isLoading}
                              onClick={() => {
                                shareMutation.mutate({ name });
                              }}
                            >
                              <span>Create Link</span>
                            </Button>
                            <Close>
                              <div
                                className={buttonVariants({
                                  variant: "secondary",
                                })}
                              >
                                Cancel
                              </div>
                            </Close>
                          </div>
                        )}

                      {(recipe.shareUrl || shareMutation.data) && (
                        <div className="flex gap-4 flex-col">
                          <div className="flex gap-4">
                            <div className="flex items-center rounded-md border border-input pr-3 w-full">
                              <Input
                                className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                type="text"
                                value={`${window.location.origin}/r/${
                                  shareMutation.data?.id ??
                                  recipe.shareUrl ??
                                  ""
                                }`}
                                readOnly
                              />
                              <CopyButton
                                value={`${window.location.origin}/r/${
                                  shareMutation.data?.id ??
                                  recipe.shareUrl ??
                                  ""
                                }`}
                              />
                            </div>
                            <Close>
                              <div
                                className={buttonVariants({
                                  variant: "secondary",
                                })}
                              >
                                Close
                              </div>
                            </Close>
                          </div>
                          <Button
                            className={buttonVariants({
                              variant: "destructive",
                            })}
                            disabled={stopShareMutation.isLoading}
                            onClick={() => {
                              stopShareMutation.mutate({ name });
                            }}
                          >
                            {stopShareMutation.isLoading ? (
                              <>
                                <Icons.loadingSpinner className="stroke-primary" />
                                <span className="sr-only">Loading...</span>
                              </>
                            ) : (
                              <span>Stop Sharing</span>
                            )}
                          </Button>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
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
                          <span className="pb-4">
                            This action cannot be undone. This will permanently
                            delete this recipe.
                          </span>
                        </DialogDescription>
                      </DialogHeader>
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
                            <span>Delete</span>
                          )}
                        </Button>
                        <Close>
                          <div
                            className={buttonVariants({
                              variant: "secondary",
                            })}
                          >
                            Cancel
                          </div>
                        </Close>
                      </div>
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