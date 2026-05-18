import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, childProfiles, activitySessions, rewards, dailyScheduleTasks } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
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

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Child Profile Queries
 */
export async function createChildProfile(
  parentId: number,
  name: string,
  age?: number
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(childProfiles).values({
    parentId,
    name,
    age,
  });

  return result;
}

export async function getChildProfilesByParent(parentId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return db
    .select()
    .from(childProfiles)
    .where(eq(childProfiles.parentId, parentId));
}

export async function getChildProfile(childId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db
    .select()
    .from(childProfiles)
    .where(eq(childProfiles.id, childId))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function updateChildCustomization(
  childId: number,
  fontSizePreference?: string,
  colorTheme?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const updateData: Record<string, unknown> = {};
  if (fontSizePreference) updateData.fontSizePreference = fontSizePreference;
  if (colorTheme) updateData.colorTheme = colorTheme;

  if (Object.keys(updateData).length === 0) return;

  await db
    .update(childProfiles)
    .set(updateData)
    .where(eq(childProfiles.id, childId));
}

/**
 * Activity Session Queries
 */
export async function createActivitySession(
  childId: number,
  activityTypeId: number
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(activitySessions).values({
    childId,
    activityTypeId,
  });

  // Get the inserted ID by querying the most recent session
  const sessions = await db
    .select({ id: activitySessions.id })
    .from(activitySessions)
    .where(eq(activitySessions.childId, childId))
    .orderBy(activitySessions.startedAt)
    .limit(1);

  return sessions[0]?.id || 0;
}

export async function completeActivitySession(
  sessionId: number,
  correctAnswers: number,
  totalQuestions: number
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const startTime = await db
    .select({ startedAt: activitySessions.startedAt })
    .from(activitySessions)
    .where(eq(activitySessions.id, sessionId))
    .limit(1);

  const durationSeconds = startTime[0]
    ? Math.floor(
        (new Date().getTime() - startTime[0].startedAt.getTime()) / 1000
      )
    : 0;

  await db
    .update(activitySessions)
    .set({
      status: "completed",
      completedAt: new Date(),
      correctAnswers,
      totalQuestions,
      durationSeconds,
    })
    .where(eq(activitySessions.id, sessionId));
}

export async function getActivitySessionsByChild(childId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return db
    .select()
    .from(activitySessions)
    .where(eq(activitySessions.childId, childId));
}

/**
 * Reward Queries
 */
export async function createReward(
  childId: number,
  starsEarned: number,
  message?: string,
  activitySessionId?: number
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return db.insert(rewards).values({
    childId,
    starsEarned,
    message,
    activitySessionId,
  });
}

export async function getTotalStarsByChild(childId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db
    .select()
    .from(rewards)
    .where(eq(rewards.childId, childId));

  return result.reduce((sum, r) => sum + (r.starsEarned || 0), 0);
}

/**
 * Daily Schedule Queries
 */
export async function createDailyScheduleTask(
  childId: number,
  title: string,
  order: number,
  description?: string,
  icon?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return db.insert(dailyScheduleTasks).values({
    childId,
    title,
    order,
    description,
    icon,
  });
}

export async function getDailyScheduleByChild(childId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return db
    .select()
    .from(dailyScheduleTasks)
    .where(eq(dailyScheduleTasks.childId, childId))
    .orderBy(dailyScheduleTasks.order);
}

export async function completeScheduleTask(taskId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(dailyScheduleTasks)
    .set({
      completedToday: true,
      completedAt: new Date(),
    })
    .where(eq(dailyScheduleTasks.id, taskId));
}


