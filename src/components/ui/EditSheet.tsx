import React, { useEffect, type ReactNode } from "react";

import { type Recipe } from "@prisma/client";
import { Plus } from "lucide-react";
import {
  useFieldArray,
  useForm,
  type Control,
  type UseFormRegister,
} from "react-hook-form";

import { Button, buttonVariants } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/Sheet";
import { Textarea } from "@/components/ui/Textarea";
import { ScrollArea } from "./ScrollArea";
import { Separator } from "./Seperator";

type FormRecipe = {
  recipeIngredients: { value: string }[];
  recipeInstructions: { value: string }[];
  recipeCategories: { value: string }[];
  recipeCuisines: { value: string }[];
  recipeTypes: { value: string }[];
  keyword: { value: string }[];
} & Omit<
  Recipe,
  | "recipeIngredients"
  | "recipeInstructions"
  | "recipeCategories"
  | "recipeCuisines"
  | "recipeTypes"
  | "keyword"
>;

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
    keyword:
      recipe.keyword.length > 0
        ? recipe.keyword.map((v) => {
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
        <form className="pb-4">
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
            <GroupInput control={control} register={register} type="keyword">
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

const TextInput: React.FC<{
  register: UseFormRegister<FormRecipe>;
  id: keyof FormRecipe;
  children: ReactNode;
}> = ({ register, children, id }) => (
  <div className="grid grid-cols-4 items-center gap-4">
    <Label htmlFor={id} className="text-left">
      {children}
    </Label>
    <Input id={id} className="col-span-3" {...register(id)} />
  </div>
);

const TextAreaInput: React.FC<{
  register: UseFormRegister<FormRecipe>;
  id: keyof FormRecipe;
  children: ReactNode;
}> = ({ register, children, id }) => (
  <div className="grid grid-cols-4 items-center gap-4">
    <Label htmlFor={id} className="text-left">
      {children}
    </Label>
    <Textarea id={id} className="col-span-3" {...register(id)} />
  </div>
);

const destructiveButtonStyle = buttonVariants({
  variant: "destructive",
});

const GroupInput: React.FC<{
  register: UseFormRegister<FormRecipe>;
  control: Control<FormRecipe, unknown>;
  type:
    | "recipeIngredients"
    | "recipeInstructions"
    | "recipeCategories"
    | "recipeCuisines"
    | "recipeTypes"
    | "keyword";
  children?: ReactNode;
  textArea?: boolean;
}> = ({ register, children, control, type, textArea }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: type,
  });

  return (
    <div className="grid grid-cols-4 items-center gap-y-2 gap-x-4">
      {fields.map((field, index) => {
        return (
          <React.Fragment key={field.id}>
            {index == 0 && (
              <Label className="text-left col-span-1 col-start-1 col-end-1">
                {children}
              </Label>
            )}
            <div className="col-span-3 col-start-2 flex gap-2">
              {textArea ? (
                <Textarea rows={50} {...register(`${type}.${index}.value`)} />
              ) : (
                <Input {...register(`${type}.${index}.value`)} />
              )}
              {fields.length > 1 && (
                <Button
                  type="button"
                  className={destructiveButtonStyle}
                  onClick={() => remove(index)}
                >
                  -
                </Button>
              )}
            </div>
          </React.Fragment>
        );
      })}
      <Button
        type="button"
        className={buttonVariants({
          variant: "outline",
        })}
        onClick={() => append({ value: "" })}
      >
        <Plus /> Add
      </Button>
    </div>
  );
};

export default RecipeEditSheet;
