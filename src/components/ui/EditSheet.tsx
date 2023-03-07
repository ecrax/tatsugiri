import { type ReactNode } from "react";

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

const RecipeEditSheet: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<FormRecipe>({
    defaultValues: {
      ...recipe,
      recipeIngredients: recipe.recipeIngredients.map((v) => {
        return {
          value: v,
        };
      }),
      recipeInstructions: recipe.recipeInstructions.map((v) => {
        return {
          value: v,
        };
      }),
      recipeCategories: recipe.recipeCategories.map((v) => {
        return {
          value: v,
        };
      }),
      recipeCuisines: recipe.recipeCuisines.map((v) => {
        return {
          value: v,
        };
      }),
      recipeTypes: recipe.recipeTypes.map((v) => {
        return {
          value: v,
        };
      }),
      keyword: recipe.keyword.map((v) => {
        return {
          value: v,
        };
      }),
    },
  });
  return (
    <SheetContent position={"right"} size="default">
      <SheetHeader>
        <SheetTitle>Edit recipe</SheetTitle>
        <SheetDescription>
          Make changes to your recipe here. Click save when you&apos;re done.
        </SheetDescription>
      </SheetHeader>
      <form>
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
          <IngredientsInput
            control={control}
            register={register}
          ></IngredientsInput>
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

const IngredientsInput: React.FC<{
  register: UseFormRegister<FormRecipe>;
  control: Control<FormRecipe, unknown>;
  children?: ReactNode;
}> = ({ register, children, control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "recipeIngredients",
  });

  const destructiveButtonStyle = buttonVariants({
    variant: "destructive",
  });

  return (
    <div className="grid grid-cols-4 items-center gap-y-2 gap-x-4">
      {fields.map((field, index) => {
        return (
          <>
            {index == 0 && (
              <Label className="text-left col-span-1 col-start-1 col-end-1">
                Ingredients:
              </Label>
            )}
            <div className="col-span-3 col-start-2 flex gap-2">
              <Input
                key={field.id}
                {...register(`recipeIngredients.${index}.value`)}
              />
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
          </>
        );
      })}
      <Button type="button" className="" onClick={() => append({ value: "" })}>
        <Plus /> Add
      </Button>
    </div>
  );
};

export default RecipeEditSheet;
