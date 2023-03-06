import { buttonVariants } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Separator } from "@/components/ui/Seperator";
import { Soup } from "lucide-react";
import Link from "next/link";

const RecipeSidebar: React.FC = () => {
  const buttonStyle = buttonVariants({
    variant: "ghost",
    className: "text-slate-700 dark:text-slate-400",
  });

  const recipes = [
    "Recipe 1",
    "Recipe 2",
    "Recipe 3",
    "Recipe 4",
    "Recipe 5",
    "Recipe 6",
    "Recipe 7",
    "Recipe 8",
    "Recipe 9",
  ];
  return (
    <aside>
      <h1 className="flex items-center px-8 py-6 text-2xl font-semibold">
        <Soup className="mr-2" /> Tatsugiri
      </h1>
      <div className="space-y-4 px-8">
        <Input placeholder="Search..." />
        <h2 className="text-lg font-semibold">All Recipes</h2>
        <div className="flex flex-col space-y-1">
          {recipes.map((r, i) => (
            // TODO: show preview image on hover
            <Link key={i} className={buttonStyle} href={"/recipe/" + r}>
              {r}
            </Link>
          ))}
        </div>
        <Separator />
      </div>
    </aside>
  );
};

export default RecipeSidebar;
