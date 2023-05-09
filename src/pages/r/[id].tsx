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
import Header from "@/components/ui/Header";
import RecipeSidebar from "@/components/ui/RecipeSidebar";
import { Separator } from "@/components/ui/Seperator";

const SharedRecipePage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id || Array.isArray(id)) {
    return <p>recipe name not valid</p>;
  } else {
    return <SharedRecipePageContent recipeId={id} />;
  }
};

const SharedRecipePageContent: React.FC<{ recipeId: string }> = ({
  recipeId: id,
}) => {
  const { data: recipe } = api.recipe.getShared.useQuery({ id });

  return (
    <>
      <Head>
        <title>{recipe?.name ?? "Loading..."}</title>
      </Head>
      <main className="grid min-h-screen">
        <div className="px-8 py-6 ">
          <Header />
          {recipe ? (
            <RecipeContent recipe={recipe} />
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
