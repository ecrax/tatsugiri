import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "@/utils/api";
import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/Button";

const Header = () => {
  const { data: sessionData } = useSession();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-slate-200 bg-white dark:border-b-slate-700 dark:bg-slate-900">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex flex-1 items-center space-x-4">Helloooo</div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link
              href={"https://github.com/ecrax/tatsugiri"}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                  className: "text-slate-700 dark:text-slate-400",
                })}
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link
              href={"https://twitter.com/LeoKling_"}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                  className: "text-slate-700 dark:text-slate-400",
                })}
              >
                <Icons.twitter className="h-5 w-5 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            <Button
              className={buttonVariants({
                size: "sm",
                className: "px-4",
              })}
              onClick={
                sessionData
                  ? () => void signOut()
                  : () => void signIn("discord")
              }
            >
              {sessionData ? "Sign out" : "Sign in"}
            </Button>
            {/* <ThemeToggle /> */}
          </nav>
        </div>
      </div>
    </header>
  );
};

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
        <div className="flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Create <span className="text-emerald-500">T3</span> App
          </h1>
          <div className="grid grid-cols-1 gap-4 text-slate-700 dark:text-slate-400 sm:grid-cols-2 md:gap-8">
            {sessionData ? (
              <Link
                className="flex max-w-xs flex-col gap-4 rounded-xl border border-slate-200 bg-white/10 p-4 hover:bg-white/20 hover:bg-slate-100 dark:border-slate-700"
                href="/recipes"
              >
                <h3 className="text-2xl font-bold">Head to Library ???</h3>
                <div className="text-lg">
                  Just the basics - Everything you need to know to set up your
                  database and authentication.
                </div>
              </Link>
            ) : (
              <button
                className="flex max-w-xs flex-col gap-4 rounded-xl border border-slate-200 bg-white/10 p-4 hover:bg-white/20 hover:bg-slate-100 dark:border-slate-700"
                onClick={() => void signIn("discord")}
              >
                <h3 className="text-2xl font-bold">Get Started ???</h3>
                <div className="text-lg">
                  Just the basics - Everything you need to know to set up your
                  database and authentication.
                </div>
              </button>
            )}
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl border border-slate-200 bg-white/10 p-4 hover:bg-white/20 hover:bg-slate-100 dark:border-slate-700"
              href=""
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Documentation ???</h3>
              <div className="text-lg">
                Learn more about Create T3 App, the libraries it uses, and how
                to deploy it.
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
