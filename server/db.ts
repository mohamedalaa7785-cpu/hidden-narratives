import { and, desc, eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertContact,
  InsertEpisode,
  InsertStory,
  InsertUser,
  contacts,
  episodes,
  generatedResearch,
  payments,
  researchRequests,
  savedStories,
  stories,
  storyProgress,
  subscriptions,
  tasks,
  userBehavior,
  userSubscriptions,
  users,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};

  const textFields = ["name", "email", "loginMethod"] as const;
  for (const field of textFields) {
    const value = user[field];
    if (value === undefined) continue;
    const normalized = value ?? null;
    values[field] = normalized;
    updateSet[field] = normalized;
  }

  if (user.lastSignedIn !== undefined) {
    values.lastSignedIn = user.lastSignedIn;
    updateSet.lastSignedIn = user.lastSignedIn;
  }

  if (user.role !== undefined) {
    values.role = user.role;
    updateSet.role = user.role;
  } else if (user.openId === ENV.ownerOpenId) {
    values.role = "admin";
    updateSet.role = "admin";
  }

  if (!values.lastSignedIn) {
    values.lastSignedIn = new Date();
  }

  if (Object.keys(updateSet).length === 0) {
    updateSet.lastSignedIn = new Date();
  }

  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

export async function getAllEpisodes() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(episodes).orderBy(desc(episodes.publishedAt));
}

export async function getEpisodeBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(episodes).where(eq(episodes.slug, slug)).limit(1);
  return result[0];
}

export async function createEpisode(data: InsertEpisode) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(episodes).values(data);
}

export async function subscribeEmail(email: string, language = "en") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(subscriptions).values({ email, language }).onDuplicateKeyUpdate({
    set: { language, updatedAt: new Date() },
  });
}

export async function createContact(data: InsertContact) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(contacts).values(data);
}

export async function getUnreadContacts() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(contacts).where(eq(contacts.read, false));
}

export async function listStories(category?: "dark" | "romantic" | "psychological") {
  const db = await getDb();
  if (!db) return [];
  const query = db.select().from(stories).orderBy(desc(stories.createdAt));
  if (!category) return query;
  return db.select().from(stories).where(eq(stories.category, category)).orderBy(desc(stories.createdAt));
}

export async function getStoryBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const [story] = await db.select().from(stories).where(eq(stories.slug, slug)).limit(1);
  return story;
}

export async function createStory(data: InsertStory) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(stories).values(data);
}

export async function getRelatedStories(storyId: number, category: string) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(stories)
    .where(and(eq(stories.category, category as any), sql`${stories.id} != ${storyId}`))
    .orderBy(desc(stories.createdAt))
    .limit(3);
}

export async function upsertStoryProgress(userId: number, storyId: number, progress: number) {
  const db = await getDb();
  if (!db) return;

  const [existing] = await db
    .select()
    .from(storyProgress)
    .where(and(eq(storyProgress.userId, userId), eq(storyProgress.storyId, storyId)))
    .limit(1);

  if (existing) {
    await db
      .update(storyProgress)
      .set({ progress, completed: progress >= 100, updatedAt: new Date() })
      .where(eq(storyProgress.id, existing.id));
    return;
  }

  await db.insert(storyProgress).values({ userId, storyId, progress, completed: progress >= 100 });
}

export async function saveStory(userId: number, storyId: number) {
  const db = await getDb();
  if (!db) return;

  const [existing] = await db
    .select()
    .from(savedStories)
    .where(and(eq(savedStories.userId, userId), eq(savedStories.storyId, storyId)))
    .limit(1);

  if (!existing) {
    await db.insert(savedStories).values({ userId, storyId });
  }
}

export async function createResearchRequest(data: typeof researchRequests.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(researchRequests).values(data);
  return Number(result[0].insertId);
}

export async function setResearchResult(requestId: number, content: string, status: "completed" | "failed") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(researchRequests).set({ status }).where(eq(researchRequests.id, requestId));
  if (status === "completed") {
    await db.insert(generatedResearch).values({ requestId, content });
  }
}

export async function listResearchByUser(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select({ request: researchRequests, generated: generatedResearch })
    .from(researchRequests)
    .leftJoin(generatedResearch, eq(generatedResearch.requestId, researchRequests.id))
    .where(eq(researchRequests.userId, userId))
    .orderBy(desc(researchRequests.createdAt));
}

export async function createTask(userId: number, input: string, result: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(tasks).values({ userId, input, result });
}

export async function listTasksByUser(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(tasks).where(eq(tasks.userId, userId)).orderBy(desc(tasks.createdAt));
}

export async function trackBehavior(payload: typeof userBehavior.$inferInsert) {
  const db = await getDb();
  if (!db) return;
  await db.insert(userBehavior).values(payload);
}


export async function getAnalyticsOverview() {
  const db = await getDb();
  if (!db) return { pageViews: 0, topPages: [], webVitals: [], ctr: 0 };

  const totals = await db
    .select({ count: sql<number>`count(*)` })
    .from(userBehavior);

  const topPages = await db
    .select({ page: userBehavior.page, views: sql<number>`count(*)` })
    .from(userBehavior)
    .groupBy(userBehavior.page)
    .orderBy(sql`count(*) desc`)
    .limit(10);

  const webVitals = await db
    .select({ interaction: userBehavior.interaction, avgTime: sql<number>`avg(${userBehavior.timeSpent})` })
    .from(userBehavior)
    .where(sql`${userBehavior.interaction} in ('LCP','CLS','INP')`)
    .groupBy(userBehavior.interaction);

  const clickEvents = await db
    .select({ count: sql<number>`count(*)` })
    .from(userBehavior)
    .where(eq(userBehavior.interaction, "click"));

  const pageViews = Number(totals[0]?.count ?? 0);
  const clicks = Number(clickEvents[0]?.count ?? 0);
  const ctr = pageViews > 0 ? (clicks / pageViews) * 100 : 0;

  return { pageViews, topPages, webVitals, ctr };
}

export async function createPayment(payload: typeof payments.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(payments).values(payload);
}

export async function listPayments() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(payments).orderBy(desc(payments.createdAt));
}

export async function listPaymentsByUser(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(payments).where(eq(payments.userId, userId)).orderBy(desc(payments.createdAt));
}

export async function getOrCreateUserSubscription(userId: number) {
  const db = await getDb();
  if (!db) return null;
  const [existing] = await db.select().from(userSubscriptions).where(eq(userSubscriptions.userId, userId)).limit(1);
  if (existing) return existing;

  await db.insert(userSubscriptions).values({ userId, plan: "free", credits: 20 });
  const [created] = await db.select().from(userSubscriptions).where(eq(userSubscriptions.userId, userId)).limit(1);
  return created ?? null;
}

export async function updateSubscriptionForApprovedPayment(userId: number, plan: "free" | "pro" | "premium") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const creditsByPlan = { free: 20, pro: 300, premium: 5000 } as const;
  const expiresAt = new Date();
  expiresAt.setMonth(expiresAt.getMonth() + 1);

  const [existing] = await db.select().from(userSubscriptions).where(eq(userSubscriptions.userId, userId)).limit(1);
  if (existing) {
    await db
      .update(userSubscriptions)
      .set({
        plan,
        credits: creditsByPlan[plan],
        expiresAt,
        updatedAt: new Date(),
      })
      .where(eq(userSubscriptions.id, existing.id));
    return;
  }

  await db.insert(userSubscriptions).values({
    userId,
    plan,
    credits: creditsByPlan[plan],
    expiresAt,
  });
}

export async function setPaymentStatus(paymentId: number, status: "approved" | "rejected") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const [payment] = await db.select().from(payments).where(eq(payments.id, paymentId)).limit(1);
  if (!payment) throw new Error("Payment not found");

  await db.update(payments).set({ status }).where(eq(payments.id, paymentId));

  if (status === "approved") {
    const normalized = payment.amount >= 30 ? "premium" : payment.amount >= 15 ? "pro" : "free";
    await updateSubscriptionForApprovedPayment(payment.userId, normalized);
  }
}

export async function consumeCredit(userId: number) {
  const db = await getDb();
  if (!db) return;
  const subscription = await getOrCreateUserSubscription(userId);
  if (!subscription) return;
  if (subscription.credits <= 0) throw new Error("No credits left. Upgrade your plan.");

  await db
    .update(userSubscriptions)
    .set({ credits: subscription.credits - 1, updatedAt: new Date() })
    .where(eq(userSubscriptions.id, subscription.id));
}

export async function getDashboardData(userId: number) {
  const [research, taskList, saved, paymentList, subscription] = await Promise.all([
    listResearchByUser(userId),
    listTasksByUser(userId),
    (async () => {
      const db = await getDb();
      if (!db) return [];
      return db
        .select({ saved: savedStories, story: stories })
        .from(savedStories)
        .leftJoin(stories, eq(savedStories.storyId, stories.id))
        .where(eq(savedStories.userId, userId))
        .orderBy(desc(savedStories.createdAt));
    })(),
    listPaymentsByUser(userId),
    getOrCreateUserSubscription(userId),
  ]);

  return { research, tasks: taskList, savedStories: saved, payments: paymentList, subscription };
}
