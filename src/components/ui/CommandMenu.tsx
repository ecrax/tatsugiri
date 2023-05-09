import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Library, Plus } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/Command";
import { Icons } from "../icons";
import { Button } from "./Button";

export function CommandMenu({
  recipes,
  className,
}: {
  recipes: {
    image: string | null;
    name: string | null;
    totalTime: string | null;
    recipeInstructions: string[];
  }[];
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.altKey || e.metaKey)) {
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-9 w-full justify-start rounded-md text-sm text-muted-foreground " +
            (className ?? "")
        )}
        onClick={() => setOpen(true)}
      >
        <span className="inline-flex">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            <CommandItem
              onSelect={() => runCommand(() => void router.push("/recipes"))}
            >
              <Library className="mr-2 h-4 w-4" /> Library
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => void router.push("/add"))}
            >
              <Plus className="mr-2 h-4 w-4" /> Scrape
            </CommandItem>
            {/* <CommandItem onSelect={() => void router.push("/add")}>
                <Plus className="mr-2 h-4 w-4" /> Scrape
              </CommandItem> */}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <Icons.sun className="mr-2 h-4 w-4" /> Light
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <Icons.moon className="mr-2 h-4 w-4" /> Dark
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <Icons.laptop className="mr-2 h-4 w-4" />
              System
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Recipes">
            {recipes.map((r) => (
              <CommandItem
                onSelect={() =>
                  runCommand(() => void router.push(`/recipe/${r.name ?? ""}`))
                }
                key={r.name}
              >
                {r.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
