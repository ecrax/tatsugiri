import React, { type ReactNode } from "react";

import { Plus } from "lucide-react";
import {
  useFieldArray,
  type Control,
  type UseFormRegister,
} from "react-hook-form";

import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { type FormRecipe } from "./types";
import { Button, buttonVariants } from "./ui/Button";

export const TextInput: React.FC<{
  register: UseFormRegister<FormRecipe>;
  id: keyof FormRecipe;
  children: ReactNode;
  required?: boolean;
}> = ({ register, children, id, required }) => (
  <div className="grid grid-cols-4 items-center gap-4">
    <Label htmlFor={id} className="text-left">
      {children}
    </Label>
    <Input
      id={id}
      className="col-span-3"
      {...register(id, {
        required,
      })}
    />
  </div>
);

export const TextAreaInput: React.FC<{
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

export const GroupInput: React.FC<{
  register: UseFormRegister<FormRecipe>;
  control: Control<FormRecipe, unknown>;
  type:
    | "recipeIngredients"
    | "recipeInstructions"
    | "recipeCategories"
    | "recipeCuisines"
    | "recipeTypes"
    | "keywords";
  children?: ReactNode;
  textArea?: boolean;
}> = ({ register, children, control, type, textArea }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: type,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-y-2 gap-x-4">
      {fields.map((field, index) => {
        return (
          <React.Fragment key={field.id}>
            {index == 0 && (
              <Label className="text-left md:col-span-1 md:col-start-1 md:col-end-1">
                {children}
              </Label>
            )}
            <div className="md:col-span-3 md:col-start-2 flex gap-2">
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
        <Plus className="mr-2 h-4 w-4" /> Add
      </Button>
    </div>
  );
};
