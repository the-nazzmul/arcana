import Image from "next/image";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section className="">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:items-center">
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
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
