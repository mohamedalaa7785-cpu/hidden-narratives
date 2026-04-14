import {
  boolean,
  datetime,
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }).unique(),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Stories / narrative engine
 */
export const stories = mysqlTable("stories", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  userId: int("userId"),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  mood: varchar("mood", { length: 100 }),
  category: mysqlEnum("category", ["dark", "romantic", "psychological"]).default("psychological").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const storyProgress = mysqlTable("story_progress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  storyId: int("storyId").notNull(),
  progress: int("progress").default(0).notNull(),
  completed: boolean("completed").default(false).notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const savedStories = mysqlTable("saved_stories", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  storyId: int("storyId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Story = typeof stories.$inferSelect;
export type InsertStory = typeof stories.$inferInsert;

/**
 * Research generation workflows
 */
export const researchRequests = mysqlTable("research_requests", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  field: varchar("field", { length: 200 }).notNull(),
  pages: int("pages").default(3).notNull(),
  type: varchar("type", { length: 100 }).notNull(),
  language: varchar("language", { length: 20 }).default("en").notNull(),
  status: mysqlEnum("status", ["pending", "completed", "failed"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const generatedResearch = mysqlTable("generated_research", {
  id: int("id").autoincrement().primaryKey(),
  requestId: int("requestId").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const tasks = mysqlTable("tasks", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  input: text("input").notNull(),
  result: text("result").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const userBehavior = mysqlTable("user_behavior", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  page: varchar("page", { length: 255 }).notNull(),
  timeSpent: int("timeSpent").default(0).notNull(),
  interaction: varchar("interaction", { length: 120 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const payments = mysqlTable("payments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  amount: int("amount").notNull(),
  method: varchar("method", { length: 100 }).notNull(),
  referenceNote: text("referenceNote").notNull(),
  screenshotUrl: varchar("screenshotUrl", { length: 500 }),
  status: mysqlEnum("status", ["pending", "approved", "rejected"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const userSubscriptions = mysqlTable("user_subscriptions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  plan: mysqlEnum("plan", ["free", "pro", "premium"]).default("free").notNull(),
  credits: int("credits").default(20).notNull(),
  expiresAt: datetime("expiresAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

/**
 * Legacy content table retained for compatibility with existing episode pages.
 */
export const episodes = mysqlTable("episodes", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  titleEn: varchar("titleEn", { length: 255 }).notNull(),
  titleAr: varchar("titleAr", { length: 255 }).notNull(),
  descriptionEn: text("descriptionEn").notNull(),
  descriptionAr: text("descriptionAr").notNull(),
  contentEn: text("contentEn").notNull(),
  contentAr: text("contentAr").notNull(),
  keywordsEn: text("keywordsEn"),
  keywordsAr: text("keywordsAr"),
  category: varchar("category", { length: 100 }),
  thumbnailUrl: varchar("thumbnailUrl", { length: 500 }),
  youtubeVideoId: varchar("youtubeVideoId", { length: 100 }),
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Episode = typeof episodes.$inferSelect;
export type InsertEpisode = typeof episodes.$inferInsert;

/**
 * Newsletter subscriptions table
 */
export const subscriptions = mysqlTable("subscriptions", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  language: varchar("language", { length: 10 }).default("en").notNull(),
  verified: boolean("verified").default(false).notNull(),
  verificationToken: varchar("verificationToken", { length: 255 }),
  subscribedAt: timestamp("subscribedAt").defaultNow().notNull(),
  unsubscribedAt: timestamp("unsubscribedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = typeof subscriptions.$inferInsert;

/**
 * Contact form submissions table
 */
export const contacts = mysqlTable("contacts", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  language: varchar("language", { length: 10 }).default("en").notNull(),
  read: boolean("read").default(false).notNull(),
  notificationSent: boolean("notificationSent").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Contact = typeof contacts.$inferSelect;
export type InsertContact = typeof contacts.$inferInsert;
