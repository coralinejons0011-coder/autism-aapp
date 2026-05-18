import { boolean, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Activity types for the autism support app
 */
export const activityTypes = mysqlTable("activity_types", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 64 }).notNull(), // "shape_matching", "emotions", "schedule"
  displayName: varchar("display_name", { length: 128 }).notNull(),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ActivityType = typeof activityTypes.$inferSelect;
export type InsertActivityType = typeof activityTypes.$inferInsert;

/**
 * Child profiles linked to users (parents)
 */
export const childProfiles = mysqlTable("child_profiles", {
  id: int("id").autoincrement().primaryKey(),
  parentId: int("parent_id").notNull().references(() => users.id),
  name: varchar("name", { length: 128 }).notNull(),
  age: int("age"),
  fontSizePreference: varchar("font_size_preference", { length: 32 }).default("medium").notNull(), // small, medium, large
  colorTheme: varchar("color_theme", { length: 32 }).default("calm").notNull(), // calm, warm, cool
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ChildProfile = typeof childProfiles.$inferSelect;
export type InsertChildProfile = typeof childProfiles.$inferInsert;

/**
 * Activity sessions - tracks each time a child completes an activity
 */
export const activitySessions = mysqlTable("activity_sessions", {
  id: int("id").autoincrement().primaryKey(),
  childId: int("child_id").notNull().references(() => childProfiles.id),
  activityTypeId: int("activity_type_id").notNull().references(() => activityTypes.id),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
  durationSeconds: int("duration_seconds"),
  correctAnswers: int("correct_answers"),
  totalQuestions: int("total_questions"),
  status: mysqlEnum("status", ["in_progress", "completed", "abandoned"]).default("in_progress").notNull(),
});

export type ActivitySession = typeof activitySessions.$inferSelect;
export type InsertActivitySession = typeof activitySessions.$inferInsert;

/**
 * Daily schedule tasks for each child
 */
export const dailyScheduleTasks = mysqlTable("daily_schedule_tasks", {
  id: int("id").autoincrement().primaryKey(),
  childId: int("child_id").notNull().references(() => childProfiles.id),
  title: varchar("title", { length: 128 }).notNull(),
  description: text("description"),
  order: int("order").notNull(), // sequence in the daily schedule
  icon: varchar("icon", { length: 64 }), // emoji or icon name
  completedToday: boolean("completed_today").default(false),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type DailyScheduleTask = typeof dailyScheduleTasks.$inferSelect;
export type InsertDailyScheduleTask = typeof dailyScheduleTasks.$inferInsert;

/**
 * Rewards and achievements for children
 */
export const rewards = mysqlTable("rewards", {
  id: int("id").autoincrement().primaryKey(),
  childId: int("child_id").notNull().references(() => childProfiles.id),
  activitySessionId: int("activity_session_id").references(() => activitySessions.id),
  starsEarned: int("stars_earned").default(1).notNull(),
  message: text("message"), // encouraging message
  earnedAt: timestamp("earned_at").defaultNow().notNull(),
});

export type Reward = typeof rewards.$inferSelect;
export type InsertReward = typeof rewards.$inferInsert;