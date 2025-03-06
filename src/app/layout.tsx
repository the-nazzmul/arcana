import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider, GoogleOneTap } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Recursive } from "next/font/google";
import "./globals.css";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arcana",
  description: "Manage your courses in Arcana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={recursive.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <GoogleOneTap />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
