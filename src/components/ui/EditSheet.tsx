import React, { useEffect } from "react";

import { type Recipe } from "@prisma/client";
import { useForm } from "react-hook-form";

import { api } from "@/utils/api";
import { Button, buttonVariants } from "@/components/ui/Button";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/Sheet";
import { GroupInput, TextAreaInput, TextInput } from "../inputs";
import { type FormRecipe } from "../types";
import { ScrollArea } from "./ScrollArea";
import { Separator } from "./Seperator";

const getDefaultRecipe = (recipe: Recipe) => {
  return {
    ...recipe,
    recipeIngredients:
      recipe.recipeIngredients.length > 0
        ? recipe.recipeIngredients.map((v) => {
            return {
              value: v,
            };
          })
        : [{ value: "" }],
    recipeInstructions:
      recipe.recipeInstructions.length > 0
        ? recipe.recipeInstructions.map((v) => {
            return {
              value: v,
            };
          })
        : [{ value: "" }],
    recipeCategories:
      recipe.recipeCategories.length > 0
        ? recipe.recipeCategories.map((v) => {
            return {
              value: v,
            };
          })
        : [{ value: "" }],
    recipeCuisines:
      recipe.recipeCuisines.length > 0
        ? recipe.recipeCuisines.map((v) => {
            return {
              value: v,
            };
          })
        : [{ value: "" }],
    recipeTypes:
      recipe.recipeTypes.length > 0
        ? recipe.recipeTypes.map((v) => {
            return {
              value: v,
            };
          })
        : [{ value: "" }],
    keywords:
      recipe.keywords.length > 0
        ? recipe.keywords.map((v) => {
            return {
              value: v,
            };
          })
        : [{ value: "" }],
  };
};

const RecipeEditSheet: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<FormRecipe>({
    defaultValues: getDefaultRecipe(recipe),
  });

  const updateMutation = api.recipe.update.useMutation();

  const onSubmit = async (data: FormRecipe) => {
    await updateMutation.mutateAsync({
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

    console.log(data);
  };

  // This is stupid but it works
  useEffect(() => {
    reset(getDefaultRecipe(recipe));
  }, [recipe, reset]);

  return (
    <SheetContent position={"right"} size="default">
      <ScrollArea className="h-full w-full rounded-md pr-4 pb-4 mt-6">
        <SheetHeader>
          <SheetTitle>Edit recipe</SheetTitle>
          <SheetDescription>
            Make changes to your recipe here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form className="pb-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <TextInput register={register} id="name">
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
            <GroupInput control={control} register={register} type="keywords">
              Keywords:
            </GroupInput>
          </div>
          <SheetFooter>
            <Button
              type="button"
              className={buttonVariants({ variant: "outline" })}
              onClick={() => reset()}
            >
              Reset
            </Button>
            <Button type="submit">Save changes</Button>
          </SheetFooter>
        </form>
      </ScrollArea>
    </SheetContent>
  );
};

export default RecipeEditSheet;
