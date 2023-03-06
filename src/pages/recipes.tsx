import Header from "@/components/ui/Header";
import RecipeSidebar from "@/components/ui/RecipeSidebar";
import { type NextPage } from "next";

const Recipes: NextPage = () => {
  return (
    <main className="grid min-h-screen grid-cols-4 xl:grid-cols-6">
      <RecipeSidebar />
      <div className="col-span-3 border-l border-l-slate-200 px-8 py-6 xl:col-span-5">
        <Header />
        <article className="pt-6">Select a recipe or whatever</article>
      </div>
    </main>
  );
};

export default Recipes;
