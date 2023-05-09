import { type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useAtom } from "jotai";
import {
  Library,
  LogOut,
  MinusIcon,
  Plus,
  PlusIcon,
  Settings,
  ShoppingCartIcon,
  Soup,
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";

import { cartAtom } from "@/lib/atoms";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Icons } from "../icons";
import { buttonVariants } from "./Button";

const Header: React.FC<{ children?: ReactNode; logo?: boolean }> = ({
  children,
  logo,
}) => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const [cart, setCart] = useAtom(cartAtom);

  return (
    <header
      className={cn(
        `flex items-center ${logo ? "justify-between" : "justify-end"}`
      )}
    >
      {logo && (
        <Link href={"/recipes"}>
          <h1 className="flex items-center text-2xl font-semibold -mt-2 -ml-[0.5px] ">
            <Soup className="mr-2" /> Tatsugiri
          </h1>
        </Link>
      )}
      <div className="flex items-center justify-end">
        <div>{children}</div>
        <div className="flex items-center gap-2">
          {/* <span>Welcome back</span> */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div
                className={buttonVariants({
                  variant: "ghost",
                  className: "relative",
                })}
              >
                <ShoppingCartIcon className="my-2 h-6 w-6" />
                {cart.length > 0 && (
                  <span className="absolute top-[11.25px] left-[21.5px] inline-flex items-center justify-center w-4 h-4 rounded-full text-[8px] font-bold leading-none text-white ">
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
          {sessionData ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:rounded-full focus:outline-none focus:ring-2 focus:ring-muted focus:ring-offset-2">
                <Avatar>
                  <AvatarImage
                    src={sessionData.user.image ?? ""}
                    alt={`@${sessionData.user.name ?? ""}`}
                  />
                  <AvatarFallback>
                    {sessionData?.user.name?.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel>{sessionData?.user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => void router.push("/recipes")}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <Library className="mr-2 h-4 w-4" /> Library
                  </div>
                  <span>⌘+L</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => void router.push("/add")}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" /> Scrape
                  </div>
                  <span>⌘+N</span>
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
                    <span>Light</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex flex-col items-center"
                    onClick={() => setTheme("dark")}
                  >
                    <Icons.moon className="h-4 w-4 dark:fill-slate-400 fill-none" />
                    <span>Dark</span>
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
          ) : (
            <button
              className={buttonVariants({})}
              onClick={() => void signIn("github")}
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
