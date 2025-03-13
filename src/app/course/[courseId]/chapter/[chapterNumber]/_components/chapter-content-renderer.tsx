"use client";

import { IChapterContent } from "@/lib/interfaces";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ChapterContentRendererProps {
  content: IChapterContent;
}

export default function ChapterContentRenderer({
  content,
}: ChapterContentRendererProps) {
  return (
    <div>
      {/* Introduction */}
      <p className="mb-6 text-gray-700">{content.introduction}</p>

      {/* Sections */}
      {content.sections.map((section, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            {section.title}
          </h2>
          <p className="mb-3 text-gray-700">{section.explanation}</p>
          <p className="mb-3 text-gray-600 italic">
            {section.example.description}
          </p>
          {section.example.code && (
            <SyntaxHighlighter
              language="python"
              style={tomorrow}
              className="rounded-md mb-3"
            >
              {section.example.code}
            </SyntaxHighlighter>
          )}
          <p className="mb-3 text-gray-700">{section.usageNotes}</p>
          <p className="mb-3 text-gray-700">{section.realWorldApplication}</p>
        </div>
      ))}

      {/* Conclusion */}
      <p className="mt-6 text-gray-700">{content.conclusion}</p>
    </div>
  );
}
