"use client";

import { createContext, useState } from "react";

export interface IUserCourseInput {
  category: string;
  topic: string;
  description: string;
  difficulty: string;
  duration: string;
  video: string;
  chapters: number;
}

interface IUserInputContextType {
  userCourseInput: IUserCourseInput;
  setUserCourseInput: React.Dispatch<React.SetStateAction<IUserCourseInput>>;
}

const initialValue: IUserCourseInput = {
  category: "",
  topic: "",
  description: "",
  difficulty: "",
  duration: "",
  video: "",
  chapters: 1,
};

export const UserInputContext = createContext<IUserInputContextType>({
  userCourseInput: initialValue,
  setUserCourseInput: () => {},
});

export const UserInputContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userCourseInput, setUserCourseInput] =
    useState<IUserCourseInput>(initialValue);

  return (
    <UserInputContext.Provider value={{ userCourseInput, setUserCourseInput }}>
      {children}
    </UserInputContext.Provider>
  );
};
