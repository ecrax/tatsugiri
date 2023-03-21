import { type ReactNode } from "react";
import { useRouter } from "next/router";



import { LogOut, Plus, Settings, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";



import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/DropdownMenu";
import { Icons } from "../icons";

const Header: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const { setTheme, theme } = useTheme();

  return (
    <header className="flex items-center justify-between">
      <div>{children}</div>
      <div className="flex items-center gap-4">
        <span>Welcome back</span>
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:rounded-full focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2">
            <Avatar>
              <AvatarImage src={sessionData?.user.image ?? ""} alt="@ecrax" />
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
            <DropdownMenuItem
              onClick={() => void router.push("/recipes")}
              className="flex items-center justify-between"
            >
              <div className="flex items-center">
                <Plus className="mr-2 h-4 w-4" /> Scrape
              </div>
              <span className="">⌘+N</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center justify-between">
              <div className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </div>
              <span>⌘+,</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center"
              onClick={() => void signOut()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <div className="grid grid-cols-3 justify-between">
              <DropdownMenuItem
                className="flex flex-col items-center"
                onClick={() => setTheme("light")}
              >
                <Icons.sun className="h-4 w-4 fill-slate-700 dark:fill-none" />
                <span className="">Light</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex flex-col items-center"
                onClick={() => setTheme("dark")}
              >
                <Icons.moon className="h-4 w-4 dark:fill-slate-400 fill-none" />
                <span className="">Dark</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className={`flex flex-col items-center`}
                onClick={() => setTheme("system")}
              >
                <Icons.laptop
                  className={`h-4 w-4 ${
                    theme === "system"
                      ? "fill-slate-400 dark:fill-slate-500"
                      : ""
                  }`}
                />
                <span>System</span>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;