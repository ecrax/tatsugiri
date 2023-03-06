import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button, buttonVariants } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Input } from "@/components/ui/Input";
import { Separator } from "@/components/ui/Seperator";
import { Settings, Soup, User } from "lucide-react";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";

const Recipes: NextPage = () => {
  const { data: sessionData } = useSession();

  const buttonStyle = buttonVariants({
    variant: "ghost",
    className: "justify-start text-slate-700 dark:text-slate-400",
  });

  return (
    <main className="grid min-h-screen grid-cols-4 xl:grid-cols-6">
      <aside>
        <h1 className="flex items-center px-8 py-6 text-2xl font-semibold">
          <Soup className="mr-2" /> Tatsugiri
        </h1>
        <div className="space-y-4 px-8">
          <Input placeholder="Search..." />
          <h2 className="text-lg font-semibold">All Recipes</h2>
          <div className="flex flex-col justify-start space-y-1">
            <Button className={buttonStyle}>Recipe 1</Button>
            <Button className={buttonStyle}>Recipe 2</Button>
            <Button className={buttonStyle}>Recipe 3</Button>
            <Button className={buttonStyle}>Recipe 4</Button>
            <Button className={buttonStyle}>Recipe 5</Button>
            <Button className={buttonStyle}>Recipe 6</Button>
            <Button className={buttonStyle}>Recipe 7</Button>
          </div>
          <Separator />
        </div>
      </aside>
      <div className="col-span-3 border-l border-l-slate-200 px-8 py-6 xl:col-span-5">
        <header className="flex items-center justify-between">
          <div className="flex gap-4">
            <Button>Edit</Button>
            <Button>Share</Button>
            <Button>Delete</Button>
          </div>
          <div className="flex items-center gap-4">
            <span>Welcome back</span>
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:rounded-full focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2">
                <Avatar>
                  <AvatarImage
                    src={sessionData?.user.image ?? ""}
                    alt="@ecrax"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel>{sessionData?.user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center justify-between">
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4" /> Profile
                  </div>
                  <span className="">⌘+L</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </div>
                  <span>⌘+,</span>
                </DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <article className="pt-6">
          <h1>Recipe</h1>
        </article>
      </div>
    </main>
  );
};

export default Recipes;
