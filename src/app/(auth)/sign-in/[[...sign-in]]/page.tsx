import DotPatternBackground from "@/components/dot-background";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="h-screen w-full flex items-center justify-center relative">
      <SignIn />
      <DotPatternBackground />
    </div>
  );
}
