import { json, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  courseId: varchar("courseId").notNull(),
  courseTitle: varchar("courseTitle").notNull(),
  category: varchar("category").notNull(),
  difficulty: varchar("difficulty").notNull(),
  courseOutline: json("courseOutline").notNull(),
  createdBy: varchar("createdBy").notNull(),
  userName: varchar("userName").notNull(),
  userProfileImage: varchar("userProfileImage").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});
