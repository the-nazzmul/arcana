import {
  boolean,
  integer,
  json,
  pgTable,
  serial,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  courseId: varchar("courseId").notNull().unique(),
  courseTitle: varchar("courseTitle").notNull(),
  category: varchar("category").notNull(),
  topic: varchar("topic").notNull(),
  duration: varchar("duration").notNull(),
  chapters: integer("chapters").notNull(),
  difficulty: varchar("difficulty").notNull(),
  description: varchar("description").notNull(),
  courseOutline: json("courseOutline").notNull(),
  courseImageUrl: varchar("courseImageUrl"),
  createdBy: varchar("createdBy").notNull(),
  video: varchar("video").notNull().default("yes"),
  userName: varchar("userName").notNull(),
  userProfileImage: varchar("userProfileImage").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  isPublished: boolean("isPublished").notNull().default(false),
  isDeleted: boolean("isDeleted").notNull().default(false),
});

export const chapterContent = pgTable("chapterContent", {
  id: serial("id").primaryKey(),
  courseId: varchar("courseId")
    .notNull()
    .references(() => courses.courseId),
  chapterId: varchar("chapterId").notNull(),
  chapterNumber: integer("chapterNumber").notNull(),
  content: json("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  videoId: varchar("videoId").default(""),
  isCompleted: boolean("isCompleted").notNull().default(false),
});

export const userCourseProgress = pgTable(
  "userCourseProgress",
  {
    id: serial("id").primaryKey(),
    userEmail: varchar("userEmail").notNull(),
    courseId: varchar("courseId").notNull(),
    lastChapterNumber: integer("lastChapterNumber").notNull().default(1),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    uniqueUserCourse: unique().on(table.userEmail, table.courseId),
  })
);
