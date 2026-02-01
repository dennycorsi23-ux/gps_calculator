import { ProvinceData, provinces } from "@/data/gpsData";
import { calculateTitoliGPSScore } from "./calculateTitoliGPS";

export interface CalculationResult {
  totalScore: number;
  breakdown: {
    laurea: number;
    titoliCulturali: number;
    informatica: number;
    titoliGPSAggiuntivi?: number;
    abilitazioni?: number;
    accademici?: number;
    artistici?: number;
    servizio?: number;
  };
  provincesAnalysis: ProvinceAnalysis[];
}

export interface ProvinceAnalysis {
  provinceId: string;
  provinceName: string;
  region: string;
  minScore2023: number | null;
  minScore2024: number | null;
  avgScore: number | null;
  maxScore: number | null;
  numCandidati: number;
  probability: "Alta" | "Media" | "Bassa" | "N/D";
  probabilityScore: number; // 0-100 for sorting/visuals
  trend: "stable" | "increasing" | "decreasing" | "unknown";
  sourceUrl?: string;
  hasData: boolean;
  // Nuovi campi per stima posizione
  posizioneStimata: number | null;
  percentile: number | null;
  differenzaDaMinimo: number | null;
  consiglioTesto: string;
}

export function calculateScore(data: {
  votoDiploma?: number; // Voto diploma (per ITP e Infanzia/Primaria)
  lodeDiploma?: boolean; // Lode diploma
  votoLaurea?: number;
  lode?: boolean;
  numC2: number;
  numClil: number;
  numBiannale: number;
  hasMasterL2: boolean; // Master universitario in L2 (3 punti, massimo 1)
  numDigComp22: number; // Certificazioni in linea al DigComp 2.2 (0.5 punti ciascuna)
  numDigCompEdu: number; // Certificazioni in linea al DigComp Edu (1 punto ciascuna)
  titoliGPS?: Record<string, any>; // Tutti i titoli GPS aggiuntivi dall'Allegato A
}): { totalScore: number; breakdown: any } {
  // 1. Calcolo Punteggio Titolo di Accesso (Diploma o Laurea)
  let titoloAccessoScore = 12;
  
  // Se c'è il diploma, usa quello (ITP, Infanzia, Primaria)
  if (data.votoDiploma && data.votoDiploma > 0) {
    // Diploma: base 12 + 0.5 per ogni punto oltre 76
    if (data.votoDiploma > 76) {
      titoloAccessoScore += (data.votoDiploma - 76) * 0.5;
    }
    if (data.lodeDiploma) {
      titoloAccessoScore += 4;
    }
  } 
  // Altrimenti usa la laurea
  else if (data.votoLaurea && data.votoLaurea > 0) {
    // Laurea: base 12 + 0.5 per ogni punto oltre 76
    if (data.votoLaurea > 76) {
      titoloAccessoScore += (data.votoLaurea - 76) * 0.5;
    }
    if (data.lode) {
      titoloAccessoScore += 4;
    }
  }
  // Cap at 33 (110/100 e lode = 12 + 17 + 4 = 33)
  
  // 2. Titoli Culturali
  const c2Score = data.numC2 * 6;
  const clilScore = data.numClil * 3;
  const biannaleScore = data.numBiannale * 2;
  const masterL2Score = data.hasMasterL2 ? 3 : 0; // Massimo 1 master L2
  const titoliCulturaliScore = c2Score + clilScore + biannaleScore + masterL2Score;

  // 3. Informatica (massimo 2 punti)
  // DigComp 2.2: 0.5 punti ciascuna
  // DigComp Edu: 1 punto ciascuna
  const digComp22Score = data.numDigComp22 * 0.5;
  const digCompEduScore = data.numDigCompEdu * 1.0;
  const informaticaScoreRaw = digComp22Score + digCompEduScore;
  // Cap massimo a 2 punti
  const informaticaScore = Math.min(informaticaScoreRaw, 2);

  // 4. Calcola i titoli GPS aggiuntivi dall'Allegato A
  let titoliGPSScore = 0;
  let titoliGPSBreakdown = {
    abilitazioni: 0,
    accademici: 0,
    artistici: 0,
    servizio: 0,
  };
  
  if (data.titoliGPS && Object.keys(data.titoliGPS).length > 0) {
    const titoliResult = calculateTitoliGPSScore(data.titoliGPS);
    titoliGPSScore = titoliResult.totalScore;
    titoliGPSBreakdown = titoliResult.breakdown;
  }

  const totalScore = titoloAccessoScore + titoliCulturaliScore + informaticaScore + titoliGPSScore;

  return {
    totalScore,
    breakdown: {
      laurea: titoloAccessoScore, // Può essere diploma o laurea
      titoliCulturali: titoliCulturaliScore,
      informatica: informaticaScore,
      titoliGPSAggiuntivi: titoliGPSScore,
      ...titoliGPSBreakdown
    }
  };
}

/**
 * Stima la posizione in graduatoria usando distribuzione normale approssimata
 */
function stimaPosizioneInGraduatoria(
  punteggioUtente: number,
  punteggioMax: number,
  punteggioMin: number,
  punteggioMedio: number,
  numeroCandidati: number
): { posizione: number; percentile: number } {
  if (numeroCandidati === 0 || !punteggioMax || !punteggioMin) {
    return { posizione: 1, percentile: 100 };
  }

  const range = punteggioMax - punteggioMin;
  const stdDev = range / 4;

  const zScore = stdDev > 0 ? (punteggioUtente - punteggioMedio) / stdDev : 0;

  // Approssimazione CDF normale
  const percentile = Math.min(100, Math.max(0, 50 * (1 + erf(zScore / Math.sqrt(2)))));

  const posizione = Math.max(1, Math.round(numeroCandidati * (1 - percentile / 100)));

  return { posizione, percentile };
}

/**
 * Funzione di errore approssimata
 */
function erf(x: number): number {
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
 * Genera consiglio testuale
 */
function generaConsiglio(
  punteggioUtente: number,
  punteggioMin: number | null,
  punteggioMedio: number | null,
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
 * Analizza le province usando i dati statici locali
 * Questa funzione viene usata come fallback quando l'API non è disponibile
 */
export function analyzeProvinces(userScore: number, classeConcorso: string): ProvinceAnalysis[] {
  return provinces.map(province => {
    const min2024 = province.minScores2024[classeConcorso] || null;
    const min2025 = province.minScores2025[classeConcorso] || null;
    const hasData = min2024 !== null || min2025 !== null;
    
    let probability: "Alta" | "Media" | "Bassa" | "N/D" = "N/D";
    let probabilityScore = 0;
    let trend: "stable" | "increasing" | "decreasing" | "unknown" = "unknown";

    // Determine trend
    if (min2024 !== null && min2025 !== null) {
      if (min2025 > min2024 + 2) trend = "increasing";
      else if (min2025 < min2024 - 2) trend = "decreasing";
      else trend = "stable";
    }

    // Determine probability based on the most recent data (2025 preferred, then 2024)
    // If no data available, use standard score of 45
    const referenceScore = min2025 !== null ? min2025 : (min2024 !== null ? min2024 : 45);

    if (referenceScore !== null) {
      const diff = userScore - referenceScore;
      
      if (diff >= 10) {
        probability = "Alta";
        probabilityScore = 95;
      } else if (diff >= 5) {
        probability = "Alta";
        probabilityScore = 85;
      } else if (diff >= 0) {
        probability = "Media";
        probabilityScore = 65;
      } else if (diff >= -5) {
        probability = "Media";
        probabilityScore = 45;
      } else if (diff >= -10) {
        probability = "Bassa";
        probabilityScore = 25;
      } else {
        probability = "Bassa";
        probabilityScore = 10;
      }
    } else {
      // No data available - use standard score of 45
      const diff = userScore - 45;
      
      if (diff >= 10) {
        probability = "Alta";
        probabilityScore = 90;
      } else if (diff >= 5) {
        probability = "Alta";
        probabilityScore = 80;
      } else if (diff >= 0) {
        probability = "Media";
        probabilityScore = 60;
      } else if (diff >= -5) {
        probability = "Media";
        probabilityScore = 40;
      } else if (diff >= -10) {
        probability = "Bassa";
        probabilityScore = 20;
      } else {
        probability = "Bassa";
        probabilityScore = 5;
      }
    }

    // Default source URL if not provided
    const sourceUrl = province.sourceUrl || `https://www.voglioinsegnare.it/graduatorie-gps`;

    const differenzaDaMinimo = min2025 !== null ? userScore - min2025 : (min2024 !== null ? userScore - min2024 : null);

    return {
      provinceId: province.id,
      provinceName: province.name,
      region: province.region,
      minScore2023: min2024,
      minScore2024: min2025,
      avgScore: null,
      maxScore: null,
      numCandidati: 0,
      probability,
      probabilityScore,
      trend,
      sourceUrl,
      hasData,
      posizioneStimata: null,
      percentile: null,
      differenzaDaMinimo,
      consiglioTesto: generaConsiglio(userScore, min2025 || min2024, null, null, 0)
    };
  }).sort((a, b) => b.probabilityScore - a.probabilityScore);
}

/**
 * Analizza le province usando i dati dal database via API
 * Ritorna una Promise con l'analisi delle opportunità
 */
export async function analyzeProvincesFromAPI(
  userScore: number, 
  classeConcorso: string,
  fascia: "1" | "2" = "1"
): Promise<ProvinceAnalysis[]> {
  try {
    const response = await fetch(`/api/trpc/gps.analyzeOpportunities?input=${encodeURIComponent(JSON.stringify({
      codiceClasse: classeConcorso,
      punteggio: userScore,
      fascia
    }))}`);
    
    if (!response.ok) {
      console.warn('API non disponibile, uso dati locali');
      return analyzeProvinces(userScore, classeConcorso);
    }
    
    const data = await response.json();
    
    if (!data.result?.data || data.result.data.length === 0) {
      console.warn('Nessun dato dall\'API, uso dati locali');
      return analyzeProvinces(userScore, classeConcorso);
    }
    
    // Trasforma i dati API nel formato ProvinceAnalysis
    return data.result.data.map((item: any) => ({
      provinceId: String(item.provinciaId),
      provinceName: item.provinciaNome,
      region: item.provinciaRegione,
      minScore2023: null,
      minScore2024: item.punteggioMin,
      avgScore: item.punteggioMedio,
      maxScore: item.punteggioMax,
      numCandidati: item.numeroCandidati || 0,
      probability: item.probabilita as "Alta" | "Media" | "Bassa" | "N/D",
      probabilityScore: item.probabilitaScore,
      trend: "unknown" as const,
      sourceUrl: `https://www.voglioinsegnare.it/graduatorie-gps`,
      hasData: item.hasData,
      posizioneStimata: item.posizioneStimata,
      percentile: item.percentile,
      differenzaDaMinimo: item.differenzaDaMinimo,
      consiglioTesto: item.consiglioTesto || ""
    }));
  } catch (error) {
    console.error('Errore nel recuperare dati dall\'API:', error);
    return analyzeProvinces(userScore, classeConcorso);
  }
}

/**
 * Simula l'effetto di punti aggiuntivi sulla posizione
 */
export async function simulaPuntiAggiuntivi(
  punteggioBase: number,
  classeConcorso: string,
  puntiAggiuntivi: number[] = [1, 2, 3, 5, 10],
  fascia: "1" | "2" = "1",
  provinciaId?: number
): Promise<any[]> {
  try {
    const response = await fetch(`/api/trpc/gps.simulaPuntiAggiuntivi?input=${encodeURIComponent(JSON.stringify({
      codiceClasse: classeConcorso,
      punteggioBase,
      puntiAggiuntivi,
      fascia,
      provinciaId
    }))}`);
    
    if (!response.ok) {
      return [];
    }
    
    const data = await response.json();
    return data.result?.data || [];
  } catch (error) {
    console.error('Errore nella simulazione punti:', error);
    return [];
  }
}

/**
 * Trova le migliori province per un punteggio
 */
export async function trovaMiglioriProvince(
  punteggio: number,
  classeConcorso: string,
  fascia: "1" | "2" = "1",
  limit: number = 10
): Promise<ProvinceAnalysis[]> {
  try {
    const response = await fetch(`/api/trpc/gps.trovaMiglioriProvince?input=${encodeURIComponent(JSON.stringify({
      codiceClasse: classeConcorso,
      punteggio,
      fascia,
      limit
    }))}`);
    
    if (!response.ok) {
      return analyzeProvinces(punteggio, classeConcorso).slice(0, limit);
    }
    
    const data = await response.json();
    
    if (!data.result?.data || data.result.data.length === 0) {
      return analyzeProvinces(punteggio, classeConcorso).slice(0, limit);
    }
    
    return data.result.data.map((item: any) => ({
      provinceId: String(item.provinciaId),
      provinceName: item.provinciaNome,
      region: item.provinciaRegione,
      minScore2023: null,
      minScore2024: item.punteggioMin,
      avgScore: item.punteggioMedio,
      maxScore: item.punteggioMax,
      numCandidati: item.numeroCandidati || 0,
      probability: item.probabilita as "Alta" | "Media" | "Bassa" | "N/D",
      probabilityScore: item.probabilitaScore,
      trend: "unknown" as const,
      sourceUrl: `https://www.voglioinsegnare.it/graduatorie-gps`,
      hasData: item.hasData,
      posizioneStimata: item.posizioneStimata,
      percentile: item.percentile,
      differenzaDaMinimo: item.differenzaDaMinimo,
      consiglioTesto: item.consiglioTesto || ""
    }));
  } catch (error) {
    console.error('Errore nel trovare migliori province:', error);
    return analyzeProvinces(punteggio, classeConcorso).slice(0, limit);
  }
}
