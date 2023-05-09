import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";



import { Soup } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";



import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/Button";


const Header = () => {
  const { data: sessionData } = useSession();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-border bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex flex-1 items-center space-x-4">Helloooo</div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link
              href={"https://github.com/ecrax/tatsugiri"}
              target="_blank"
              rel="noreferrer"
            >
              <Button size="sm" variant="ghost">
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link
              href={"https://twitter.com/LeoKling_"}
              target="_blank"
              rel="noreferrer"
            >
              <Button size="sm" variant="ghost">
                <Icons.twitter className="h-5 w-5 fill-current" />
                <span className="sr-only">Twitter</span>
              </Button>
            </Link>
            <Button
              size="sm"
              className="px-4"
              onClick={
                sessionData
                  ? () => void signOut()
                  : () => void signIn("discord")
              }
            >
              {sessionData ? "Sign out" : "Sign in"}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>Tatsugiri</title>
      </Head>
      <Header />
      <main className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
        <div className="flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="flex justify-center items-center text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            {/* Create <span className="text-emerald-500">T3</span> App */}
            <Soup className="mr-6 h-16 w-16" />
            Tatsugiri
          </h1>

          <div className="flex gap-4">
            {sessionData ? (
              <Link
                className={buttonVariants({
                  className: "font-medium px-8 h-11",
                })}
                href="/recipes"
              >
                <h3>Head to Library</h3>
              </Link>
            ) : (
              <Button
                className="font-medium px-8 h-11"
                onClick={() => void signIn("discord")}
              >
                <h3>Get Started</h3>
              </Button>
            )}
            <a
              href="https://github.com/ecrax/tatsugiri"
              className={buttonVariants({
                variant: "outline",
                className: "font-medium px-8 h-11",
              })}
            >
              GitHub
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;