import { type ReactNode } from "react";
import { useRouter } from "next/router";



import { useAtom } from "jotai";
import {
  LogOut,
  MinusIcon,
  Plus,
  PlusIcon,
  Settings,
  ShoppingCartIcon,
  User,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";

import { cartAtom } from "@/lib/atoms";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/DropdownMenu";
import { Icons } from "../icons";

const Header: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const [cart, setCart] = useAtom(cartAtom);

  return (
    <header className="flex items-center justify-end">
      <div>{children}</div>
      <div className="flex items-center gap-4">
        {/* <span>Welcome back</span> */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="relative">
              <ShoppingCartIcon className="my-2 h-6 w-6" />
              {cart.length > 0 && (
                <span className="absolute top-[3.25px] left-[6px] inline-flex items-center justify-center w-4 h-4 rounded-full text-[8px] font-bold leading-none text-white ">
                  {cart.reduce((acc, item) => acc + item.amount, 0)}
                </span>
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="sm:w-96 w-screen" align="end">
            <div className="flex justify-between">
              <DropdownMenuLabel>Shopping List</DropdownMenuLabel>
              <div className="flex gap-2">
                <button
                  className="text-sm font-medium py-1.5 px-2 underline underline-offset-2"
                  onClick={() =>
                    void navigator.clipboard.writeText(
                      cart.reduce(
                        (acc, item) =>
                          acc + `${item.amount}x ${item.name}` + "\n",
                        ""
                      )
                    )
                  }
                >
                  Copy
                </button>
                <button
                  className="text-sm font-medium py-1.5 px-2 underline underline-offset-2"
                  onClick={() => setCart([])}
                >
                  Clear
                </button>
              </div>
            </div>
            <DropdownMenuSeparator />
            {cart.length > 0 ? (
              cart.map((item, i) => (
                <div
                  className="relative flex items-center rounded-sm py-1.5 px-2 text-sm font-medium transition-colors hover:bg-accent"
                  key={i}
                >
                  <div className="flex gap-4 items-start">
                    <div className="flex gap-2 items-center">
                      <button
                        onClick={() => {
                          if (item.amount > 1) {
                            setCart([
                              ...cart.map((cartItem, index) => {
                                if (index === i) {
                                  return {
                                    name: cartItem.name,
                                    amount: cartItem.amount - 1,
                                  };
                                }
                                return cartItem;
                              }),
                            ]);
                          } else {
                            setCart([
                              ...cart.filter((_, index) => index !== i),
                            ]);
                          }
                        }}
                      >
                        <MinusIcon className="w-4 h-4" />
                      </button>
                      <span className="text-gray-500">{item.amount}x</span>
                      <button
                        onClick={() => {
                          setCart([
                            ...cart.map((cartItem, index) => {
                              if (index === i) {
                                return {
                                  name: cartItem.name,
                                  amount: cartItem.amount + 1,
                                };
                              }
                              return cartItem;
                            }),
                          ]);
                        }}
                      >
                        <PlusIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <span>{item.name}</span>
                  </div>
                </div>
              ))
            ) : (
              <span className="relative flex items-center rounded-sm py-1.5 px-2 text-sm font-medium">
                Cart empty, add some items :)
              </span>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="focus:rounded-full focus:outline-none focus:ring-2 focus:ring-muted focus:ring-offset-2">
            <Avatar>
              <AvatarImage
                src={sessionData?.user.image ?? ""}
                alt={`@${sessionData?.user.name ?? ""}`}
              />
              <AvatarFallback>
                {sessionData?.user.name?.substring(0, 2)}
              </AvatarFallback>
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