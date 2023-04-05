import Link from "next/link";



import { type Recipe } from "@prisma/client";
import { useAtom } from "jotai";
import { LinkIcon, PlusCircleIcon } from "lucide-react";
import { parseIngredient } from "parse-ingredient";

import { cartAtom } from "@/utils/atoms";
import { Separator } from "@/components/ui/Seperator";

const RecipeImage: React.FC<{
  image: string | undefined | null;
  name: string | undefined | null;
}> = ({ image, name }) => (
  <>
    {image && (
      <div className="relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] w-screen max-w-[100vw] py-8 md:left-0 md:right-0 md:m-0 md:flex md:w-full md:p-0 md:pt-10 lg:pt-0">
        <img
          src={image}
          alt={`An image of "${name ?? "food"}"`}
          className="max-h-[32rem] w-full md:rounded-md object-cover"
        />
      </div>
    )}
  </>
);

const RecipeIngredients: React.FC<{
  recipeIngredients: string[] | undefined | null;
}> = ({ recipeIngredients }) => {
  const [cart, setCart] = useAtom(cartAtom);

  return (
    <>
      {recipeIngredients &&
        recipeIngredients.map((ingredient, i) => (
          <div key={`${ingredient}+${i}`}>
            <div className="flex justify-between">
              <div className="flex py-2 diagonal-fractions tracking-normal">
                {parseIngredient(ingredient).map((v, i) => {
                  if (!v.quantity && v.unitOfMeasureID) {
                    return (
                      <span key={`${v.description}+${i}`} className="mr-1">
                        {v.description}
                      </span>
                    );
                  } else {
                    return (
                      <span key={`${v.description}+${i}`} className="mr-1">
                        <span className="mr-1 font-bold">
                          {`${v.quantity ?? ""}${
                            v.quantity2 ? " " + v.quantity2.toString() : ""
                          } ${v.unitOfMeasure ?? ""}`}
                        </span>
                        <span>{v.description}</span>
                      </span>
                    );
                  }
                })}
              </div>
              <button
                onClick={() => {
                  cart.some((item) => item.name === ingredient)
                    ? setCart(
                        cart.map((item) => {
                          if (item.name === ingredient) {
                            return {
                              name: item.name,
                              amount: item.amount + 1,
                            };
                          } else {
                            return item;
                          }
                        })
                      )
                    : setCart([
                        ...cart,
                        {
                          name: ingredient,
                          amount: 1,
                        },
                      ]);
                }}
              >
                <PlusCircleIcon className="text-slate-500 w-5 h-5" />
              </button>
            </div>
            {i + 1 < recipeIngredients.length && <Separator />}
          </div>
        ))}
    </>
  );
};

const RecipeDescription: React.FC<{
  description: string | undefined | null;
}> = ({ description }) => (
  <>
    {description && (
      <blockquote className="mt-6 border-l-2 border-slate-300 pl-6 italic text-slate-800 dark:border-slate-600 dark:text-slate-200">
        {description}
      </blockquote>
    )}
  </>
);

const RecipeLink: React.FC<{ url: string | null | undefined }> = ({ url }) => (
  <>
    {url && (
      <div className="flex items-center space-x-2 pt-2 text-slate-500">
        from:
        <div />
        <Link
          href={url}
          rel="noreferrer"
          target="_blank"
          className="font-semibold underline"
        >
          {url.split("/")[2]?.replace("www.", "")}
        </Link>
        <LinkIcon className="mr-2 h-4 w-4" />
      </div>
    )}
  </>
);

const RecipeCategories: React.FC<{
  recipeCategories: string[] | undefined | null;
}> = ({ recipeCategories }) => (
  <>
    {recipeCategories && (
      <div className="flex gap-2 pt-4 flex-wrap">
        {recipeCategories.map((category, i) => (
          <p
            key={`${category}+${i}`}
            className="rounded-md border border-slate-600 py-2 px-4 text-sm"
          >
            {category}
          </p>
        ))}
      </div>
    )}
  </>
);

const RecipeTimes: React.FC<{
  totalTime: string | undefined | null;
  prepTime: string | undefined | null;
  cookTime: string | undefined | null;
}> = ({ totalTime, cookTime, prepTime }) => (
  <div className="flex gap-6 pt-8">
    {totalTime && (
      <p>
        <span className="pr-2 text-slate-500">Total</span>
        <span>{totalTime}</span>
      </p>
    )}
    {prepTime && (
      <p>
        <span className="pr-2 text-slate-500">Prep</span>
        <span>{prepTime}</span>
      </p>
    )}
    {cookTime && (
      <p>
        <span className="pr-2 text-slate-500">Cook</span>
        <span>{cookTime}</span>
      </p>
    )}
  </div>
);

const RecipeInstructions: React.FC<{
  recipeInstructions: string[] | undefined | null;
}> = ({ recipeInstructions }) => (
  <ol className="list-decimal pl-4">
    {recipeInstructions &&
      recipeInstructions.map((instruction, i) => (
        <li key={`${instruction}+${i}`} className="break-words py-2">
          {instruction}
        </li>
      ))}
  </ol>
);

const RecipeContent: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const [cart, setCart] = useAtom(cartAtom);

  return (
    <article className="grid grid-areas-slim lg:grid-areas-wide lg:grid-cols-wide lg:grid-rows-wide max-w-7xl gap-x-8 pt-6">
      <div className="grid-in-a">
        <RecipeImage image={recipe.image} name={recipe.name} />

        <div className="mt-10">
          <div className="flex gap-4 items-center pb-2">
            <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0 dark:border-b-slate-700">
              Ingredients
            </h2>
            <button
              onClick={() => {
                const ingredients = recipe.recipeIngredients.map(
                  (ingredient) => {
                    return {
                      name: ingredient,
                      amount: 1,
                    };
                  }
                );

                // merge ingredients with existing cart
                ingredients.forEach((ingredient) => {
                  const existingIngredient = cart.find(
                    (i) => i.name === ingredient.name
                  );

                  if (existingIngredient) {
                    existingIngredient.amount += ingredient.amount;
                  } else {
                    cart.push(ingredient);
                  }
                });

                setCart([...cart]);
              }}
            >
              <PlusCircleIcon />
            </button>
          </div>
          <RecipeIngredients recipeIngredients={recipe.recipeIngredients} />
        </div>
      </div>
      <div className="grid-in-b">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {recipe.name}
        </h1>
        <RecipeDescription description={recipe.description} />
        <RecipeLink url={recipe.url} />
        <RecipeCategories recipeCategories={recipe.recipeCategories} />
        <RecipeTimes
          cookTime={recipe.cookTime}
          prepTime={recipe.prepTime}
          totalTime={recipe.totalTime}
        />
      </div>

      <div className="grid-in-c">
        <h2 className="font-headline pt-10 pb-4 text-3xl font-bold tracking-tight">
          Instructions
        </h2>
        <RecipeInstructions recipeInstructions={recipe.recipeInstructions} />
      </div>
    </article>
  );
};

export default RecipeContent;