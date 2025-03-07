"use client";

import { createContext, useState } from "react";

interface IUserCourseInput {
  category: string;
  topic: string;
  description: string;
  difficulty: string;
  duration: string;
  addVideo: string;
  numChapters: number;
}

interface UserInputContextType {
  userCourseInput: IUserCourseInput;
  setUserCourseInput: React.Dispatch<React.SetStateAction<IUserCourseInput>>;
}

export const UserInputContext = createContext<UserInputContextType>({
  userCourseInput: {
    category: "",
    topic: "",
    description: "",
    difficulty: "",
    duration: "",
    addVideo: "",
    numChapters: 0,
  },
  setUserCourseInput: () => {},
});

export const UserInputContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userCourseInput, setUserCourseInput] = useState<IUserCourseInput>({
    category: "",
    topic: "",
    description: "",
    difficulty: "",
    duration: "",
    addVideo: "",
    numChapters: 0,
  });

  return (
    <UserInputContext.Provider value={{ userCourseInput, setUserCourseInput }}>
      {children}
    </UserInputContext.Provider>
  );
};
