import { Button } from "@/components/ui/Button";
import Header from "@/components/ui/Header";

import RecipeSidebar from "@/components/ui/RecipeSidebar";

import { type NextPage } from "next";

const RecipePage: NextPage = () => {
  return (
    <main className="grid min-h-screen grid-cols-4 xl:grid-cols-6">
      {/* TODO: highlight selected recipe */}
      <RecipeSidebar />

      <div className="col-span-3 border-l border-l-slate-200 px-8 py-6 xl:col-span-5">
        <Header>
          <div className="flex gap-4">
            <Button>Edit</Button>
            <Button>Share</Button>
            <Button>Delete</Button>
            <Button>Delete</Button>
          </div>
        </Header>
        <article className="pt-6">RECIPE</article>
      </div>
    </main>
  );
};

export default RecipePage;
