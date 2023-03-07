import { type Recipe } from "@prisma/client";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/Button";
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

const RecipeEditSheet: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Recipe>({
    defaultValues: recipe,
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" className="col-span-3" {...register("name")} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Image url:
            </Label>
            <Input
              id="image"
              type={"url"}
              className="col-span-3"
              {...register("image")}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              className="col-span-3"
              {...register("description")}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="url" className="text-right">
              Source:
            </Label>
            <Input
              id="url"
              type={"url"}
              className="col-span-3"
              {...register("url")}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="totalTime" className="text-right">
              Total time:
            </Label>
            <Input
              id="totalTime"
              className="col-span-3"
              {...register("totalTime")}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="prepTime" className="text-right">
              Prep time:
            </Label>
            <Input
              id="prepTime"
              className="col-span-3"
              {...register("prepTime")}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cookTime" className="text-right">
              Cook time:
            </Label>
            <Input
              id="cookTime"
              className="col-span-3"
              {...register("cookTime")}
            />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
        </SheetFooter>
      </form>
    </SheetContent>
  );
};

export default RecipeEditSheet;
