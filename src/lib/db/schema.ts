import { json, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  courseId: varchar("courseId").notNull(),
  title: varchar("title").notNull(),
  category: varchar("category").notNull(),
  level: varchar("level").notNull(),
  courseOutline: json("courseOutline").notNull(),
  createdBy: varchar("createdBy").notNull(),
  userName: varchar("userName").notNull(),
  userProfileImage: varchar("userProfileImage").notNull(),
});
