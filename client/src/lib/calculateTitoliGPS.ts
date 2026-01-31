// Helper per calcolare i punti dei titoli GPS dall'Allegato A
import { titoliGPS } from "@/data/titoliGPS";

export function calculateTitoliGPSScore(titoliValues: Record<string, any>): {
  totalScore: number;
  breakdown: {
    abilitazioni: number;
    accademici: number;
    artistici: number;
    servizio: number;
  };
} {
  let abilitazioniScore = 0;
  let accademiciScore = 0;
  let artisticiScore = 0;
  let servizioScore = 0;

  // Itera su tutti i titoli compilati
  Object.entries(titoliValues).forEach(([titoloId, value]) => {
    // Trova la configurazione del titolo
    const titoloConfig = titoliGPS.find(t => t.id === titoloId);
    if (!titoloConfig || !value) return;

    let puntiTitolo = 0;

    switch (titoloConfig.tipo) {
      case "checkbox":
        // Se checked, aggiungi i punti fissi
        if (value === true) {
          puntiTitolo = typeof titoloConfig.punti === "number" ? titoloConfig.punti : 0;
        }
        break;

      case "number":
        // Moltiplica il numero per i punti unitari
        const numTitoli = typeof value === "number" ? value : 0;
        const puntiUnitari = typeof titoloConfig.punti === "number" ? titoloConfig.punti : 0;
        puntiTitolo = numTitoli * puntiUnitari;
        
        // Applica il massimo se specificato
        if (titoloConfig.max) {
          const maxPunti = titoloConfig.max * puntiUnitari;
          puntiTitolo = Math.min(puntiTitolo, maxPunti);
        }
        break;

      case "select":
        // Trova l'opzione selezionata e prendi i suoi punti
        if (titoloConfig.opzioni && typeof value === "string") {
          const opzioneSelezionata = titoloConfig.opzioni.find(opt => opt.value === value);
          if (opzioneSelezionata) {
            puntiTitolo = opzioneSelezionata.punti;
          }
        }
        break;
    }

    // Aggiungi i punti alla sezione corretta
    switch (titoloConfig.sezione) {
      case "A":
        abilitazioniScore += puntiTitolo;
        break;
      case "B":
        accademiciScore += puntiTitolo;
        break;
      case "BA":
        artisticiScore += puntiTitolo;
        break;
      case "C":
        servizioScore += puntiTitolo;
        break;
    }
  });

  return {
    totalScore: abilitazioniScore + accademiciScore + artisticiScore + servizioScore,
    breakdown: {
      abilitazioni: abilitazioniScore,
      accademici: accademiciScore,
      artistici: artisticiScore,
      servizio: servizioScore,
    },
  };
}
