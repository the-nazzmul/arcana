import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arcana | Create Course",
  description: "Create your AI powered course",
};

export default function CreateCourseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
