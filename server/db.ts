import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, gpsLeads, InsertGpsLead } from "../drizzle/schema";
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

// ============================================
// GPS Leads Management
// ============================================

/**
 * Inserisce un nuovo lead GPS nel database
 */
export async function insertGpsLead(lead: InsertGpsLead) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const result = await db.insert(gpsLeads).values(lead);
    return result;
  } catch (error) {
    console.error("[Database] Failed to insert GPS lead:", error);
    throw error;
  }
}

/**
 * Recupera tutti i lead GPS ordinati per data di creazione (più recenti prima)
 */
export async function getAllGpsLeads() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const results = await db.select().from(gpsLeads).orderBy(gpsLeads.createdAt);
    return results;
  } catch (error) {
    console.error("[Database] Failed to get GPS leads:", error);
    throw error;
  }
}

/**
 * Conta il numero totale di lead GPS
 */
export async function countGpsLeads() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const result = await db.select().from(gpsLeads);
    return result.length;
  } catch (error) {
    console.error("[Database] Failed to count GPS leads:", error);
    throw error;
  }
}


// ============================================
// Corsi eCampus Management
// ============================================

/**
 * Inserisce una nuova richiesta info corso
 */
export async function insertRichiestaInfoCorso(richiesta: any) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const { richiesteInfoCorsi } = await import("../drizzle/schema");
    const result = await db.insert(richiesteInfoCorsi).values(richiesta);
    return result;
  } catch (error) {
    console.error("[Database] Failed to insert richiesta info corso:", error);
    throw error;
  }
}

/**
 * Recupera tutte le richieste info corsi
 */
export async function getAllRichiesteInfoCorsi() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const { richiesteInfoCorsi } = await import("../drizzle/schema");
    const results = await db.select().from(richiesteInfoCorsi);
    return results;
  } catch (error) {
    console.error("[Database] Failed to get richieste info corsi:", error);
    throw error;
  }
}

/**
 * Aggiorna lo stato di una richiesta info
 */
export async function updateRichiestaInfoCorso(id: number, updates: any) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const { richiesteInfoCorsi } = await import("../drizzle/schema");
    await db.update(richiesteInfoCorsi).set(updates).where(eq(richiesteInfoCorsi.id, id));
  } catch (error) {
    console.error("[Database] Failed to update richiesta info corso:", error);
    throw error;
  }
}

/**
 * Recupera tutti i corsi attivi
 */
export async function getCorsiAttivi() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const { corsiEcampus } = await import("../drizzle/schema");
    const results = await db.select().from(corsiEcampus).where(eq(corsiEcampus.attivo, 1));
    return results;
  } catch (error) {
    console.error("[Database] Failed to get corsi attivi:", error);
    throw error;
  }
}

/**
 * Recupera un corso per ID
 */
export async function getCorsoById(id: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const { corsiEcampus } = await import("../drizzle/schema");
    const [corso] = await db.select().from(corsiEcampus).where(eq(corsiEcampus.id, id));
    return corso;
  } catch (error) {
    console.error("[Database] Failed to get corso:", error);
    throw error;
  }
}

/**
 * Inserisce un nuovo corso
 */
export async function insertCorso(corso: any) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const { corsiEcampus } = await import("../drizzle/schema");
    const result = await db.insert(corsiEcampus).values(corso);
    return result;
  } catch (error) {
    console.error("[Database] Failed to insert corso:", error);
    throw error;
  }
}

/**
 * Aggiorna un corso
 */
export async function updateCorso(id: number, updates: any) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const { corsiEcampus } = await import("../drizzle/schema");
    await db.update(corsiEcampus).set(updates).where(eq(corsiEcampus.id, id));
  } catch (error) {
    console.error("[Database] Failed to update corso:", error);
    throw error;
  }
}

/**
 * Elimina un corso (soft delete)
 */
export async function deleteCorso(id: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const { corsiEcampus } = await import("../drizzle/schema");
    await db.update(corsiEcampus).set({ attivo: 0 }).where(eq(corsiEcampus.id, id));
  } catch (error) {
    console.error("[Database] Failed to delete corso:", error);
    throw error;
  }
}
