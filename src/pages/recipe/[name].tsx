import { Button } from "@/components/ui/Button";
import Header from "@/components/ui/Header";

import RecipeSidebar from "@/components/ui/RecipeSidebar";
import { api } from "@/utils/api";

import { type NextPage } from "next";
import { useRouter } from "next/router";

const RecipePage: NextPage = () => {
  const router = useRouter();
  const { name } = router.query;

  if (!name || Array.isArray(name)) {
    return <p>recipe not found</p>;
  }

  const { data } = api.recipe.getByName.useQuery({ name });

  return (
    <main className="grid min-h-screen grid-cols-4 2xl:grid-cols-6">
      <RecipeSidebar selectedRecipe={name} />

      <div className="col-span-3 border-l border-l-slate-200 px-8 py-6 2xl:col-span-5">
        <Header>
          <div className="flex gap-4">
            <Button>Edit</Button>
            <Button>Share</Button>
            <Button>Delete</Button>
          </div>
        </Header>
        <article className="grid grid-cols-3 pt-6">
          <div className="">
            <div>Image</div>
            <div>Instructions</div>
          </div>
          <div className="col-span-2">
            <h1>{data && name}</h1>
            <div>Ingredients</div>
          </div>
        </article>
      </div>
    </main>
  );
};

export default RecipePage;
