import { Button } from "@/components/ui/Button";
import Header from "@/components/ui/Header";
import { Input } from "@/components/ui/Input";
import RecipeSidebar from "@/components/ui/RecipeSidebar";
import { api } from "@/utils/api";
import { Plus } from "lucide-react";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

const Recipes: NextPage = () => {
  const [url, setUrl] = useState<string>("");
  const router = useRouter();
  const { mutate } = api.recipe.scrape.useMutation({
    onSuccess(data) {
      void router.push(`/recipe/${data.name ?? ""}`);
    },
  });

  return (
    <main className="grid min-h-screen grid-cols-4 xl:grid-cols-6">
      <RecipeSidebar />
      <div className="col-span-3 border-l border-l-slate-200 px-8 py-6 xl:col-span-5">
        <Header />
        <article className="pt-6">
          Select a recipe or whatever
          <div className="flex gap-4">
            <Input
              placeholder="Add a url"
              type={"url"}
              onChange={(e) => setUrl(e.currentTarget.value)}
            />
            <Button
              onClick={() => {
                if (url !== "") {
                  mutate({ url });
                }
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> Scrape
            </Button>
          </div>
        </article>
      </div>
    </main>
  );
};

export default Recipes;