import Image from "next/image";
import { Button } from "./ui/button";
import { ThemeToggler } from "./theme-toggler";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

const Navbar = async () => {
  const { userId } = await auth();
  return (
    <nav className="bg-transparent w-full sticky top-0">
      <div className="container mx-auto p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/arcana-logo.png" alt="logo" height={40} width={40} />
          <h1 className="font-serif font-bold text-3xl text-primary uppercase">
            Arcana
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <Link href="/dashboard">
              {userId ? "Dashboard" : "Get Started"}
            </Link>
          </Button>
          <ThemeToggler />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
