"use client";

import { cn } from "@/lib/utils";
import { DotPattern } from "./magicui/dot-pattern";

const DotPatternBackground = () => {
  return (
    <div className="absolute flex flex-col items-center justify-center overflow-hidden -z-10 pointer-events-none inset-0">
      <DotPattern
        glow={true}
        className={cn(
          "[mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
        )}
      />
    </div>
  );
};
export default DotPatternBackground;
