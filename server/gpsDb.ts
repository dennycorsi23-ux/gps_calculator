import { eq, and, sql, desc, asc } from "drizzle-orm";
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
        classeDescrizione: classiConcorso.denominazione,
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
 * Stima la posizione in graduatoria basandosi sui dati aggregati
 * Usa una distribuzione normale approssimata
 */
function stimaPosizioneInGraduatoria(
  punteggioUtente: number,
  punteggioMax: number,
  punteggioMin: number,
  punteggioMedio: number,
  numeroCandidati: number
): { posizione: number; percentile: number } {
  // Se non ci sono candidati, stima basata sul punteggio
  if (numeroCandidati === 0 || !punteggioMax || !punteggioMin) {
    return { posizione: 1, percentile: 100 };
  }

  // Calcola la deviazione standard approssimata
  // Assumendo una distribuzione normale, circa il 95% dei dati cade entro 2 deviazioni standard
  const range = punteggioMax - punteggioMin;
  const stdDev = range / 4; // Approssimazione

  // Calcola lo z-score
  const zScore = stdDev > 0 ? (punteggioUtente - punteggioMedio) / stdDev : 0;

  // Converti z-score in percentile usando la funzione di distribuzione cumulativa approssimata
  // Approssimazione della CDF normale
  const percentile = Math.min(100, Math.max(0, 50 * (1 + erf(zScore / Math.sqrt(2)))));

  // Calcola la posizione stimata
  // Se sei nel 90° percentile, sei tra i primi 10%, quindi posizione = 10% dei candidati
  const posizione = Math.max(1, Math.round(numeroCandidati * (1 - percentile / 100)));

  return { posizione, percentile };
}

/**
 * Funzione di errore (error function) approssimata
 * Usata per calcolare la CDF della distribuzione normale
 */
function erf(x: number): number {
  // Approssimazione di Horner
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);

  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return sign * y;
}

/**
 * Analizza le opportunità per un candidato in base al suo punteggio
 * Ritorna le province ordinate per probabilità di nomina con stima posizione
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
        numeroCandidati: 0,
        hasData: false,
        posizioneStimata: null,
        percentile: null,
        differenzaDaMinimo: null,
        probabilita: getProbabilita(punteggioUtente, 45),
        probabilitaScore: getProbabilitaScore(punteggioUtente, 45),
        consiglioTesto: "Dati non disponibili per questa classe di concorso",
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

    // Calcola probabilità e posizione stimata per ogni provincia
    const results = allProvince.map(p => {
      const gps = gpsMap.get(p.id);
      
      const punteggioMax = gps?.punteggioMax ? Number(gps.punteggioMax) : null;
      const punteggioMin = gps?.punteggioMin ? Number(gps.punteggioMin) : null;
      const punteggioMedio = gps?.punteggioMedio ? Number(gps.punteggioMedio) : null;
      const numeroCandidati = gps?.numeroCandidati || 0;
      
      const punteggioRiferimento = punteggioMin || 45;
      const differenzaDaMinimo = punteggioMin ? punteggioUtente - punteggioMin : null;
      
      // Stima la posizione
      let posizioneStimata: number | null = null;
      let percentile: number | null = null;
      
      if (punteggioMax && punteggioMin && punteggioMedio && numeroCandidati > 0) {
        const stima = stimaPosizioneInGraduatoria(
          punteggioUtente,
          punteggioMax,
          punteggioMin,
          punteggioMedio,
          numeroCandidati
        );
        posizioneStimata = stima.posizione;
        percentile = Math.round(stima.percentile * 10) / 10;
      }
      
      // Genera consiglio testuale
      const consiglio = generaConsiglio(
        punteggioUtente,
        punteggioMin,
        punteggioMedio,
        punteggioMax,
        posizioneStimata,
        numeroCandidati
      );
      
      return {
        provinciaId: p.id,
        provinciaNome: p.nome,
        provinciaRegione: p.regione,
        punteggioMin,
        punteggioMedio,
        punteggioMax,
        numeroCandidati,
        hasData: !!gps,
        posizioneStimata,
        percentile,
        differenzaDaMinimo,
        probabilita: getProbabilita(punteggioUtente, punteggioRiferimento),
        probabilitaScore: getProbabilitaScore(punteggioUtente, punteggioRiferimento),
        consiglioTesto: consiglio,
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
 * Genera un consiglio testuale basato sui dati
 */
function generaConsiglio(
  punteggioUtente: number,
  punteggioMin: number | null,
  punteggioMedio: number | null,
  punteggioMax: number | null,
  posizioneStimata: number | null,
  numeroCandidati: number
): string {
  if (!punteggioMin || !punteggioMedio) {
    return "Dati storici non disponibili per questa provincia";
  }

  const diff = punteggioUtente - punteggioMin;

  if (diff >= 20) {
    return `Ottima posizione! Sei ${diff.toFixed(1)} punti sopra il minimo storico. Alta probabilità di chiamata.`;
  } else if (diff >= 10) {
    return `Buona posizione! Sei ${diff.toFixed(1)} punti sopra il minimo storico. Probabilità di chiamata medio-alta.`;
  } else if (diff >= 0) {
    return `Posizione nella media. Sei ${diff.toFixed(1)} punti sopra il minimo storico. Probabilità discreta.`;
  } else if (diff >= -10) {
    return `Posizione sotto la soglia storica di ${Math.abs(diff).toFixed(1)} punti. Considera province alternative.`;
  } else {
    return `Punteggio significativamente sotto il minimo storico (${Math.abs(diff).toFixed(1)} punti). Valuta altre province.`;
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
 * Confronta le opportunità tra più province per una classe di concorso
 */
export async function confrontaProvince(
  codiceClasse: string, 
  punteggioUtente: number, 
  fascia: "1" | "2" = "1",
  provinceIds: number[]
) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const opportunities = await analyzeOpportunities(codiceClasse, punteggioUtente, fascia);
    
    // Filtra solo le province richieste
    const filtered = opportunities.filter(o => provinceIds.includes(o.provinciaId));
    
    // Aggiungi ranking
    return filtered.map((o, index) => ({
      ...o,
      ranking: index + 1,
      miglioreScelta: index === 0,
    }));
  } catch (error) {
    console.error("[Database] Failed to compare provinces:", error);
    throw error;
  }
}

/**
 * Simula l'effetto di punti aggiuntivi sulla posizione
 */
export async function simulaPuntiAggiuntivi(
  codiceClasse: string,
  punteggioBase: number,
  puntiAggiuntivi: number[],
  fascia: "1" | "2" = "1",
  provinciaId?: number
) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const simulazioni = [];
    
    for (const punti of puntiAggiuntivi) {
      const punteggioSimulato = punteggioBase + punti;
      const opportunities = await analyzeOpportunities(codiceClasse, punteggioSimulato, fascia);
      
      // Se specificata una provincia, filtra solo quella
      const risultato = provinciaId 
        ? opportunities.find(o => o.provinciaId === provinciaId)
        : opportunities[0]; // Prendi la migliore
      
      if (risultato) {
        simulazioni.push({
          puntiAggiuntivi: punti,
          punteggioTotale: punteggioSimulato,
          ...risultato,
        });
      }
    }
    
    return simulazioni;
  } catch (error) {
    console.error("[Database] Failed to simulate additional points:", error);
    throw error;
  }
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

/**
 * Trova le migliori province per una classe di concorso dato un punteggio
 */
export async function trovaMiglioriProvince(
  codiceClasse: string,
  punteggioUtente: number,
  fascia: "1" | "2" = "1",
  limit: number = 10
) {
  const opportunities = await analyzeOpportunities(codiceClasse, punteggioUtente, fascia);
  
  // Prendi le prime N province con dati disponibili
  return opportunities
    .filter(o => o.hasData)
    .slice(0, limit)
    .map((o, index) => ({
      ...o,
      ranking: index + 1,
    }));
}
