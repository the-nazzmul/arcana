import {
  integer,
  json,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  courseId: varchar("courseId").notNull(),
  courseTitle: varchar("courseTitle").notNull(),
  category: varchar("category").notNull(),
  topic: varchar("topic").notNull(),
  duration: varchar("duration").notNull(),
  chapters: integer("chapters").notNull(),
  difficulty: varchar("difficulty").notNull(),
  description: varchar("description").notNull(),
  courseOutline: json("courseOutline").notNull(),
  createdBy: varchar("createdBy").notNull(),
  video: varchar("video").notNull().default("yes"),
  userName: varchar("userName").notNull(),
  userProfileImage: varchar("userProfileImage").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});
