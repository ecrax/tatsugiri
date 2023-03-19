import { useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { Plus } from "lucide-react";

import { api } from "@/utils/api";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/Button";
import Header from "@/components/ui/Header";
import { Input } from "@/components/ui/Input";
import RecipeSidebar from "@/components/ui/RecipeSidebar";

const Recipes: NextPage = () => {
  const [url, setUrl] = useState<string>("");
  const router = useRouter();
  const { mutate, error } = api.recipe.scrape.useMutation({
    onSuccess(data) {
      void router.push(`/recipe/${data.name ?? ""}`);
    },
  });

  return (
    <ProtectedRoute>
      <Head>
        <title>Recipes</title>
      </Head>
      <main className="grid min-h-screen grid-cols-1 md:grid-cols-4 2xl:grid-cols-6">
        <RecipeSidebar />
        <div className="col-span-3 border-l col-start-1 md:col-start-2 border-l-slate-200 dark:border-l-slate-700 px-8 py-6 2xl:col-span-5">
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
            {error && <p>{error.message}</p>}
          </article>
        </div>
      </main>
    </ProtectedRoute>
  );
};

export default Recipes;
