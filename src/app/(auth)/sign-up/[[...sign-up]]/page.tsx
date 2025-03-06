import DotPatternBackground from "@/components/dot-background";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="h-screen w-full flex items-center justify-center relative">
      <SignUp />
      <DotPatternBackground />
    </div>
  );
}
