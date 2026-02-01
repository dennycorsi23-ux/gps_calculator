import { eq, and, sql } from "drizzle-orm";
import { getDb } from "./db";
import { province, classiConcorso, graduatorieGps } from "../drizzle/schema";

/**
 * Recupera tutte le province
 */
export async function getAllProvince() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const results = await db.select().from(province).orderBy(province.nome);
    return results;
  } catch (error) {
    console.error("[Database] Failed to get province:", error);
    throw error;
  }
}

/**
 * Recupera tutte le classi di concorso
 */
export async function getAllClassiConcorso() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const results = await db.select().from(classiConcorso).orderBy(classiConcorso.codice);
    return results;
  } catch (error) {
    console.error("[Database] Failed to get classi concorso:", error);
    throw error;
  }
}

/**
 * Recupera i dati GPS per una specifica classe di concorso
 * Ritorna i punteggi minimi per ogni provincia
 */
export async function getGpsDataByClasse(codiceClasse: string) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    // Prima trova l'ID della classe
    const [classe] = await db
      .select()
      .from(classiConcorso)
      .where(eq(classiConcorso.codice, codiceClasse))
      .limit(1);

    if (!classe) {
      return [];
    }

    // Poi recupera i dati GPS per quella classe
    const results = await db
      .select({
        provinciaId: graduatorieGps.provinciaId,
        provinciaNome: province.nome,
        provinciaRegione: province.regione,
        fascia: graduatorieGps.fascia,
        punteggioMax: graduatorieGps.punteggioMax,
        punteggioMin: graduatorieGps.punteggioMin,
        punteggioMedio: graduatorieGps.punteggioMedio,
        numeroCandidati: graduatorieGps.numeroCandidati,
        annoScolastico: graduatorieGps.annoScolastico,
      })
      .from(graduatorieGps)
      .innerJoin(province, eq(graduatorieGps.provinciaId, province.id))
      .where(eq(graduatorieGps.classeConcorsoId, classe.id))
      .orderBy(province.nome);

    return results;
  } catch (error) {
    console.error("[Database] Failed to get GPS data by classe:", error);
    throw error;
  }
}

/**
 * Recupera i dati GPS per tutte le classi di una provincia
 */
export async function getGpsDataByProvincia(provinciaId: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const results = await db
      .select({
        classeCodice: classiConcorso.codice,
        classeDescrizione: classiConcorso.descrizione,
        fascia: graduatorieGps.fascia,
        punteggioMax: graduatorieGps.punteggioMax,
        punteggioMin: graduatorieGps.punteggioMin,
        punteggioMedio: graduatorieGps.punteggioMedio,
        numeroCandidati: graduatorieGps.numeroCandidati,
        annoScolastico: graduatorieGps.annoScolastico,
      })
      .from(graduatorieGps)
      .innerJoin(classiConcorso, eq(graduatorieGps.classeConcorsoId, classiConcorso.id))
      .where(eq(graduatorieGps.provinciaId, provinciaId))
      .orderBy(classiConcorso.codice);

    return results;
  } catch (error) {
    console.error("[Database] Failed to get GPS data by provincia:", error);
    throw error;
  }
}

/**
 * Analizza le opportunità per un candidato in base al suo punteggio
 * Ritorna le province ordinate per probabilità di nomina
 */
export async function analyzeOpportunities(codiceClasse: string, punteggioUtente: number, fascia: "1" | "2" = "1") {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    // Prima trova l'ID della classe
    const [classe] = await db
      .select()
      .from(classiConcorso)
      .where(eq(classiConcorso.codice, codiceClasse))
      .limit(1);

    if (!classe) {
      // Se la classe non esiste, ritorna tutte le province con probabilità stimata
      const allProvince = await db.select().from(province).orderBy(province.nome);
      return allProvince.map(p => ({
        provinciaId: p.id,
        provinciaNome: p.nome,
        provinciaRegione: p.regione,
        punteggioMin: null,
        punteggioMedio: null,
        punteggioMax: null,
        hasData: false,
        probabilita: getProbabilita(punteggioUtente, 45), // Media nazionale stimata
        probabilitaScore: getProbabilitaScore(punteggioUtente, 45),
      }));
    }

    // Recupera i dati GPS per quella classe e fascia
    const gpsData = await db
      .select({
        provinciaId: graduatorieGps.provinciaId,
        provinciaNome: province.nome,
        provinciaRegione: province.regione,
        punteggioMax: graduatorieGps.punteggioMax,
        punteggioMin: graduatorieGps.punteggioMin,
        punteggioMedio: graduatorieGps.punteggioMedio,
        numeroCandidati: graduatorieGps.numeroCandidati,
      })
      .from(graduatorieGps)
      .innerJoin(province, eq(graduatorieGps.provinciaId, province.id))
      .where(
        and(
          eq(graduatorieGps.classeConcorsoId, classe.id),
          eq(graduatorieGps.fascia, fascia)
        )
      );

    // Crea un map per i dati GPS
    const gpsMap = new Map(gpsData.map(g => [g.provinciaId, g]));

    // Recupera tutte le province
    const allProvince = await db.select().from(province).orderBy(province.nome);

    // Calcola probabilità per ogni provincia
    const results = allProvince.map(p => {
      const gps = gpsMap.get(p.id);
      const punteggioRiferimento = gps?.punteggioMin ? Number(gps.punteggioMin) : 45;
      
      return {
        provinciaId: p.id,
        provinciaNome: p.nome,
        provinciaRegione: p.regione,
        punteggioMin: gps?.punteggioMin ? Number(gps.punteggioMin) : null,
        punteggioMedio: gps?.punteggioMedio ? Number(gps.punteggioMedio) : null,
        punteggioMax: gps?.punteggioMax ? Number(gps.punteggioMax) : null,
        numeroCandidati: gps?.numeroCandidati || 0,
        hasData: !!gps,
        probabilita: getProbabilita(punteggioUtente, punteggioRiferimento),
        probabilitaScore: getProbabilitaScore(punteggioUtente, punteggioRiferimento),
      };
    });

    // Ordina per probabilità decrescente
    return results.sort((a, b) => b.probabilitaScore - a.probabilitaScore);
  } catch (error) {
    console.error("[Database] Failed to analyze opportunities:", error);
    throw error;
  }
}

/**
 * Calcola la probabilità testuale
 */
function getProbabilita(punteggioUtente: number, punteggioRiferimento: number): "Alta" | "Media" | "Bassa" {
  const diff = punteggioUtente - punteggioRiferimento;
  
  if (diff >= 10) return "Alta";
  if (diff >= 0) return "Media";
  return "Bassa";
}

/**
 * Calcola lo score numerico della probabilità (0-100)
 */
function getProbabilitaScore(punteggioUtente: number, punteggioRiferimento: number): number {
  const diff = punteggioUtente - punteggioRiferimento;
  
  if (diff >= 20) return 95;
  if (diff >= 10) return 85;
  if (diff >= 5) return 70;
  if (diff >= 0) return 55;
  if (diff >= -5) return 35;
  if (diff >= -10) return 20;
  return 10;
}

/**
 * Recupera statistiche generali GPS
 */
export async function getGpsStats() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const [provinceCount] = await db.select({ count: sql<number>`count(*)` }).from(province);
    const [classiCount] = await db.select({ count: sql<number>`count(*)` }).from(classiConcorso);
    const [graduatorieCount] = await db.select({ count: sql<number>`count(*)` }).from(graduatorieGps);

    return {
      province: provinceCount?.count || 0,
      classiConcorso: classiCount?.count || 0,
      graduatorie: graduatorieCount?.count || 0,
    };
  } catch (error) {
    console.error("[Database] Failed to get GPS stats:", error);
    throw error;
  }
}
