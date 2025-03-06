import Image from "next/image";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="bg-transparent backdrop-blur w-full sticky top-0 shadow-md">
      <div className="container mx-auto p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/arcana-logo.png" alt="logo" height={40} width={40} />
          <h1 className="font-serif font-bold text-4xl text-primary">Arcana</h1>
        </div>
        <Button>Get Started</Button>
      </div>
    </nav>
  );
};

export default Navbar;
