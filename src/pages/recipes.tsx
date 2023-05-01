import { useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";

import { api } from "@/utils/api";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Icons } from "@/components/icons";
import { GroupInput, TextAreaInput, TextInput } from "@/components/inputs";
import { type FormRecipe } from "@/components/types";
import { Button } from "@/components/ui/Button";
import Header from "@/components/ui/Header";
import { Input } from "@/components/ui/Input";
import RecipeSidebar from "@/components/ui/RecipeSidebar";
import { Separator } from "@/components/ui/Seperator";

const Recipes: NextPage = () => {
  const [url, setUrl] = useState<string>("");
  const router = useRouter();
  const scrapeMutation = api.recipe.scrape.useMutation({
    onSuccess(data) {
      void router.push(`/recipe/${data.name ?? ""}`);
    },
  });

  const formMutation = api.recipe.new.useMutation();
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<FormRecipe>({
    defaultValues: {
      recipeIngredients: [{}],
      recipeInstructions: [{}],
      recipeCategories: [{}],
      keywords: [{}],
    },
  });

  const onSubmit = async (data: FormRecipe) => {
    await formMutation.mutateAsync({
      recipe: {
        ...data,
        name: data.name ?? "",
        description: data.description ?? "",
        cookTime: data.cookTime ?? "",
        prepTime: data.prepTime ?? "",
        totalTime: data.totalTime ?? "",
        recipeYield: data.recipeYield ?? "",
        url: data.url ?? "",
        image: data.image ?? "",
        recipeIngredients: data.recipeIngredients?.map((v) => v.value) ?? [""],
        recipeInstructions: data.recipeInstructions?.map((v) => v.value) ?? [
          "",
        ],
        recipeCategories: data.recipeCategories?.map((v) => v.value) ?? [""],
        recipeCuisines: data.recipeCuisines?.map((v) => v.value) ?? [""],
        recipeTypes: data.recipeTypes?.map((v) => v.value) ?? [""],
        keywords: data.keywords?.map((v) => v.value) ?? [""],
      },
    });

    reset();

    console.log(data);
  };

  return (
    <ProtectedRoute>
      <Head>
        <title>Recipes</title>
      </Head>
      <main className="grid min-h-screen grid-cols-1 md:grid-cols-4 2xl:grid-cols-6">
        <RecipeSidebar />
        <div className="col-span-3 border-l col-start-1 md:col-start-2 border-l-border px-8 py-6 2xl:col-span-5">
          <Header />
          <article className="pt-6">
            <p className="text-lg pb-4">Scrape a recipe</p>
            <div className="flex gap-4">
              <Input
                placeholder="Add a url"
                type={"url"}
                onChange={(e) => setUrl(e.currentTarget.value)}
              />
              <Button
                onClick={() => {
                  if (url !== "") {
                    scrapeMutation.mutate({ url });
                  }
                }}
              >
                <Plus className="mr-2 h-4 w-4" /> Scrape
              </Button>
            </div>
            {scrapeMutation.error && <p>{scrapeMutation.error.message}</p>}
            <div className="relative flex py-5 items-center justify-center">
              <div className="flex-grow border-t border-2 mt-[2px] rounded-md border-muted-foreground"></div>
              <span className="flex-shrink mx-4 text-muted-foreground">or</span>
              <div className="flex-grow border-t border-2 mt-[2px] rounded-md border-muted-foreground"></div>
            </div>
            <p className="text-lg">Add a recipe yourself</p>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <TextInput required register={register} id="name">
                  Name:
                </TextInput>
                <TextInput register={register} id="image">
                  Image url:
                </TextInput>
                <TextAreaInput register={register} id="description">
                  Description:
                </TextAreaInput>
                <TextInput register={register} id="url">
                  Source:
                </TextInput>
                <TextInput register={register} id="totalTime">
                  Total time:
                </TextInput>
                <TextInput register={register} id="prepTime">
                  Prep time:
                </TextInput>
                <TextInput register={register} id="cookTime">
                  Cook time:
                </TextInput>
                <Separator />
                <GroupInput
                  control={control}
                  register={register}
                  type="recipeIngredients"
                >
                  Ingredients:
                </GroupInput>
                <Separator />
                <GroupInput
                  control={control}
                  register={register}
                  type="recipeInstructions"
                  textArea
                >
                  Instructions:
                </GroupInput>
                <Separator />
                <GroupInput
                  control={control}
                  register={register}
                  type="recipeCategories"
                >
                  Categories:
                </GroupInput>
                <Separator />
                <GroupInput
                  control={control}
                  register={register}
                  type="keywords"
                >
                  Keywords:
                </GroupInput>
              </div>
              <Button disabled={formMutation.isLoading}>
                {formMutation.isLoading ? (
                  <>
                    {" "}
                    <Icons.loadingSpinner /> Loading...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" /> Submit
                  </>
                )}
              </Button>
            </form>
          </article>
        </div>
      </main>
    </ProtectedRoute>
  );
};

export default Recipes;
