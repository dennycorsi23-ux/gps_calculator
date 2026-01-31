import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal } from "drizzle-orm/mysql-core";

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
 * Tabella per raccogliere i dati dei docenti che usano il calcolatore GPS
 * Nessuna autenticazione richiesta - solo raccolta lead per contatto
 */
export const gpsLeads = mysqlTable("gps_leads", {
  id: int("id").autoincrement().primaryKey(),
  
  // Dati personali
  nome: varchar("nome", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  cellulare: varchar("cellulare", { length: 20 }).notNull(),
  
  // Dati GPS
  classeConcorso: varchar("classe_concorso", { length: 50 }).notNull(),
  
  // Titolo di accesso: Diploma O Laurea (almeno uno dei due)
  votoDiploma: int("voto_diploma"), // NULL se ha laurea
  lodeDiploma: int("lode_diploma").default(0), // 0 = no, 1 = sì
  votoLaurea: int("voto_laurea"), // NULL se ha diploma
  lode: int("lode").default(0), // 0 = no, 1 = sì
  
  // Titoli culturali
  numC2: int("num_c2").default(0).notNull(),
  numClil: int("num_clil").default(0).notNull(),
  numBiannale: int("num_biannale").default(0).notNull(),
  certificazioniInformatiche: int("certificazioni_informatiche").default(0).notNull(), // 0 = no, 1 = sì
  
  // Punteggio calcolato
  punteggioLaurea: decimal("punteggio_laurea", { precision: 5, scale: 2 }).notNull(),
  punteggioTitoli: decimal("punteggio_titoli", { precision: 5, scale: 2 }).notNull(),
  punteggioTotale: decimal("punteggio_totale", { precision: 5, scale: 2 }).notNull(),
  
  // Consenso privacy
  privacyConsent: int("privacy_consent").default(1).notNull(), // 1 = consenso dato (obbligatorio per invio form)
  
  // Metadata
  createdAt: timestamp("created_at").defaultNow().notNull(),
  ipAddress: varchar("ip_address", { length: 45 }), // IPv4 o IPv6
  userAgent: text("user_agent"),
});

export type GpsLead = typeof gpsLeads.$inferSelect;
export type InsertGpsLead = typeof gpsLeads.$inferInsert;

/**
 * Tabella per i corsi eCampus (gestita da admin)
 */
export const corsiEcampus = mysqlTable("corsi_ecampus", {
  id: int("id").autoincrement().primaryKey(),
  
  // Informazioni corso
  titolo: varchar("titolo", { length: 255 }).notNull(),
  categoria: mysqlEnum("categoria", [
    "Percorsi Abilitanti",
    "Certificazioni Linguistiche",
    "Metodologie Didattiche",
    "Certificazioni Informatiche",
    "Master"
  ]).notNull(),
  livello: varchar("livello", { length: 50 }), // es: "C2", "B2", "60 CFU", "30 CFU"
  descrizione: text("descrizione").notNull(),
  durata: varchar("durata", { length: 100 }), // es: "1500 ore", "12 mesi"
  crediti: varchar("crediti", { length: 50 }), // es: "60 CFU", "2 CFU"
  punteggioGps: varchar("punteggio_gps", { length: 50 }), // es: "6 punti", "3 punti"
  
  // Dettagli economici
  costo: varchar("costo", { length: 100 }), // es: "€ 2.500", "Contattaci per info"
  costoPromo: varchar("costo_promo", { length: 100 }),
  
  // Modalità e requisiti
  modalita: varchar("modalita", { length: 100 }), // es: "100% online", "Blended"
  requisiti: text("requisiti"),
  
  // Stato e visibilità
  attivo: int("attivo").default(1).notNull(), // 0 = nascosto, 1 = visibile
  ordine: int("ordine").default(0).notNull(), // per ordinamento visualizzazione
  
  // Metadata
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type CorsoEcampus = typeof corsiEcampus.$inferSelect;
export type InsertCorsoEcampus = typeof corsiEcampus.$inferInsert;

/**
 * Tabella per le richieste info sui corsi (lead generation)
 */
export const richiesteInfoCorsi = mysqlTable("richieste_info_corsi", {
  id: int("id").autoincrement().primaryKey(),
  
  // Riferimento al corso
  corsoId: int("corso_id").notNull(),
  
  // Dati utente
  nome: varchar("nome", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  telefono: varchar("telefono", { length: 20 }).notNull(),
  messaggio: text("messaggio"),
  
  // Stato richiesta
  stato: mysqlEnum("stato", ["nuova", "contattato", "interessato", "iscritto", "non_interessato"])
    .default("nuova")
    .notNull(),
  note: text("note"), // Note admin
  
  // Consenso privacy
  privacyConsent: int("privacy_consent").default(1).notNull(),
  
  // Metadata
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
});

export type RichiestaInfoCorso = typeof richiesteInfoCorsi.$inferSelect;
export type InsertRichiestaInfoCorso = typeof richiesteInfoCorsi.$inferInsert;
