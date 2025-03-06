import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Recursive } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
          <main>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
