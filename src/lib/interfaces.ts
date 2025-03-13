export interface IChapterOutline {
  chapterNumber: number;
  chapterTitle: string;
  description: string;
  duration: string;
  topicsCovered: string[];
  videoLink: string;
}

export interface IContentOutline {
  chapterName: number;
  chapterTitle: string;
  topicsCovered: string[];
}

export interface IChapterContent {
  introduction: string;
  sections: {
    title: string;
    explanation: string;
    example: {
      description: string;
      code: string;
    };
    usageNotes: string;
    realWorldApplication: string;
  }[];
  conclusion: string;
}
