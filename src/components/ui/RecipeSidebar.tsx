import React from "react";
import Link from "next/link";

import { clsx } from "clsx";
import { ClipboardList, MenuIcon, Soup, Timer } from "lucide-react";

import { api } from "@/utils/api";
import { Separator } from "@/components/ui/Seperator";
import { CommandMenu } from "./CommandMenu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./HoverCard";
import { Sheet, SheetContent, SheetTrigger } from "./Sheet";

const RecipeSidebar: React.FC<{ selectedRecipe?: string }> = ({
  selectedRecipe,
}) => {
  return (
    <aside className="absolute md:static">
      <div className="inline md:hidden">
        <Sheet>
          <SheetTrigger className="py-8 pl-8 w-10 h-10">
            <MenuIcon className="w-6 h-6" />
          </SheetTrigger>
          <SheetContent
            portalStyles="inline md:hidden"
            className="inline md:hidden"
            position="left"
            size="content"
          >
            <Content selectedRecipe={selectedRecipe} />
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:inline">
        <Content selectedRecipe={selectedRecipe} />
      </div>
    </aside>
  );
};

const Content: React.FC<{ selectedRecipe?: string }> = ({ selectedRecipe }) => {
  const { data: allRecipes } = api.recipe.getRecipesForSidebar.useQuery();

  return (
    <>
      <div className="flex justify-between md:px-8 pb-6 md:pt-6">
        <Link href={"/recipes"}>
          <h1 className="flex items-center text-2xl font-semibold">
            <Soup className="mr-2" /> Tatsugiri
          </h1>
        </Link>
      </div>

      <div className="space-y-4 md:px-8">
        {allRecipes && (
          <CommandMenu
            className="sm:pr-12 md:w-40 lg:w-64"
            recipes={allRecipes}
          />
        )}
        <h2 className="text-lg font-semibold">All Recipes</h2>
        {/* {!allRecipes && <p>Loading...</p>} */}
        {allRecipes && (
          <div className="flex flex-col space-y-1">
            {allRecipes.length == 0 && <p>Wow such empty</p>}
            {allRecipes.map((r) => (
              //? Better/more useful info on hover
              <HoverCard key={r.name}>
                <HoverCardTrigger asChild>
                  <Link
                    className={clsx(
                      "group flex w-full items-center rounded-md py-2 px-2 text-sm font-medium hover:bg-accent transition-colors",
                      r.name === selectedRecipe && "bg-accent"
                    )}
                    href={`/recipe/${r.name ?? ""}`}
                  >
                    {r.name}
                  </Link>
                </HoverCardTrigger>
                <HoverCardContent side="right">
                  <div className="flex items-center justify-between ">
                    <div className="mr-4 flex w-full flex-col gap-3">
                      <p className="flex flex-col items-center text-xs">
                        <Timer />
                        {r.totalTime}
                      </p>
                      <Separator />
                      <p className="flex flex-col items-center text-xs">
                        <ClipboardList />
                        {r.recipeInstructions.length}
                      </p>
                    </div>
                    <img
                      src={r.image ?? ""}
                      alt={r.name ?? ""}
                      className="h-32 w-32 rounded-md object-cover"
                    />
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        )}
        <Separator />
      </div>
    </>
  );
};

export default RecipeSidebar;
