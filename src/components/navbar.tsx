import Image from "next/image";
import { Button } from "./ui/button";
import { ThemeToggler } from "./theme-toggler";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";

const Navbar = async () => {
  const { userId } = await auth();
  return (
    <nav className="bg-transparent w-full sticky top-0 backdrop-blur-sm">
      <div className="container mx-auto p-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/arcana-logo.png" alt="logo" height={40} width={40} />
          <h1 className="font-bold text-3xl text-primary uppercase">Arcana</h1>
        </Link>
        <div className="flex items-center gap-2">
          <Button>
            <Link href="/dashboard">
              {userId ? "Dashboard" : "Get Started"}
            </Link>
          </Button>
          <ThemeToggler />
          {userId && (
            <UserButton
              appearance={{
                elements: { userButtonAvatarBox: "h-[34px] w-[34px]" },
              }}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
