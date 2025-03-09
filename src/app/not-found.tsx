import { Button } from "@/components/ui/button";
import { BanIcon, Undo2Icon } from "lucide-react";
import Link from "next/link";

export default function NotFound({
  href,
  message,
}: {
  href?: string;
  message?: string;
}) {
  return (
    <div className="flex flex-col gap-8 min-h-screen items-center justify-center rounded-md border p-8 text-center animate-in fade-in-50">
      <div className="flex items-center justify-center size-20 rounded-full bg-primary/10">
        <BanIcon className="size-10 text-primary" />
      </div>
      <h2 className="font-lg uppercase text-primary">
        Could not find requested resource or route
      </h2>

      <Link href={href || "/"}>
        <Button>
          <Undo2Icon className="size-5 mr-1" />
          {message || "Return Home"}
        </Button>
      </Link>
    </div>
  );
}
