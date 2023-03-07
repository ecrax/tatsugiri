import { type NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";



import { type Recipe } from "@prisma/client";
import { LinkIcon } from "lucide-react";
import { parseIngredient } from "parse-ingredient";

import { api } from "@/utils/api";
import { Button } from "@/components/ui/Button";
import Header from "@/components/ui/Header";
import RecipeSidebar from "@/components/ui/RecipeSidebar";
import { Separator } from "@/components/ui/Seperator";

const RecipeImage: React.FC<{
  image: string | undefined | null;
  name: string | undefined | null;
}> = ({ image, name }) => (
  <>
    {image && (
      <div className="relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] w-screen max-w-[100vw] py-8 xl:left-0 xl:right-0 xl:m-0 xl:flex xl:w-full xl:p-0">
        <img
          src={image}
          alt={`An image of "${name ?? "food"}"`}
          className="max-h-[32rem] rounded-md object-cover"
        />
      </div>
    )}
  </>
);

const RecipeIngredients: React.FC<{
  recipeIngredients: string[] | undefined | null;
}> = ({ recipeIngredients }) => (
  <>
    {recipeIngredients &&
      recipeIngredients.map((ingredient, i) => (
        <div key={`${ingredient}+${i}`}>
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
          {i + 1 < recipeIngredients.length && <Separator />}
        </div>
      ))}
  </>
);

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
      <div className="flex pt-4">
        {recipeCategories.map((category, i) => (
          <p
            key={`${category}+${i}`}
            className="m-0 rounded-md border border-slate-600 py-2 px-4 text-sm"
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
  <>
    {recipeInstructions &&
      recipeInstructions.map((instruction, i) => (
        <div key={`${instruction}+${i}`} className="flex py-2">
          <div className="w-1/12">{i + 1}.</div>
          <div className="w-11/12">{instruction}</div>
        </div>
      ))}
  </>
);

const RecipeContent: React.FC<{ recipe: Recipe }> = ({ recipe }) => (
  <article className="grid max-w-7xl grid-cols-3 gap-x-8 pt-6">
    <div>
      <RecipeImage image={recipe.image} name={recipe.name} />

      <div className="mt-10">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 dark:border-b-slate-700">
          Ingredients
        </h2>
        <RecipeIngredients recipeIngredients={recipe.recipeIngredients} />
      </div>
    </div>
    <div className="col-span-2">
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

      <div>
        <h2 className="font-headline pt-16 pb-4 text-3xl font-bold tracking-tight">
          Instructions
        </h2>
        <RecipeInstructions recipeInstructions={recipe.recipeInstructions} />
      </div>
    </div>
  </article>
);

const RecipePage: NextPage = () => {
  const router = useRouter();
  const { name } = router.query;

  if (!name || Array.isArray(name)) {
    return <p>recipe not found</p>;
  }

  const { data: recipe } = api.recipe.getByName.useQuery({ name });

  return (
    <main className="grid min-h-screen grid-cols-4 2xl:grid-cols-6">
      <RecipeSidebar selectedRecipe={name} />

      <div className="col-span-3 border-l border-l-slate-200 px-8 py-6 2xl:col-span-5">
        <Header>
          <div className="flex gap-4">
            <Button>Edit</Button>
            <Button>Share</Button>
            <Button>Delete</Button>
          </div>
        </Header>
        {recipe ? (
          <RecipeContent recipe={recipe} />
        ) : (
          <div className="flex h-full justify-center items-center">
            Loading...
          </div>
        )}
      </div>
    </main>
  );
};

export default RecipePage;