import Image from "next/image";

import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import DotPatternBackground from "@/components/dot-background";

const Hero = async () => {
  const { userId } = await auth();
  return (
    <section className="">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:items-center relative">
        <div className="mx-auto max-w-xl text-center">
          <div className="flex flex-col items-center gap-5">
            <Image src="/arcana-logo.png" alt="logo" height={200} width={200} />
            <h1 className="text-5xl font-extrabold sm:text-5xl text-primary uppercase">
              Arcana
            </h1>

            <h2 className=" text-3xl font-extrabold sm:text-4xl ">
              Your AI Powered learning assistant.
            </h2>
            <p className="mt-4 sm:text-xl/relaxed text-muted-foreground">
              Arcana simplifies learning by curating and organizing the best
              free resources out there into digestible chapters, saving you time
              and effort.
            </p>
            <Button className="mt-4" size="lg">
              <Link href="/dashboard">
                {userId ? "Dashboard" : "Get Started"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <DotPatternBackground />
    </section>
  );
};

export default Hero;
