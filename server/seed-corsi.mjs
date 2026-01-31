import { drizzle } from "drizzle-orm/mysql2";
import { corsiEcampus } from "../drizzle/schema.ts";

const db = drizzle(process.env.DATABASE_URL);

const corsiData = [
  // PERCORSI ABILITANTI CFU
  {
    titolo: "Percorso Formativo 60 CFU",
    categoria: "Percorsi Abilitanti",
    livello: "60 CFU",
    descrizione: "Percorso abilitante di formazione iniziale degli insegnanti per la scuola secondaria di primo e secondo grado (DPCM 4 agosto 2023).",
    dettagli: JSON.stringify([
      "Percorso abilitante secondo DPCM 4/8/2023",
      "Necessario per l'abilitazione all'insegnamento",
      "Include tirocinio diretto e indiretto",
      "Prova finale con valore abilitante",
      "Valido per concorsi scuola secondaria"
    ]),
    durata: "1 anno accademico",
    crediti: "60 CFU",
    punteggioGps: "Abilitazione completa",
    costo: "Contattaci per info",
    modalita: "Blended (online + presenza per tirocinio)",
    requisiti: "Laurea magistrale o titolo equipollente nella classe di concorso",
    ente: "eCampus",
    attivo: 1,
    ordine: 1
  },
  {
    titolo: "Percorso Formativo 36 CFU",
    categoria: "Percorsi Abilitanti",
    livello: "36 CFU",
    descrizione: "Percorso formativo per docenti già in servizio con 3 anni di esperienza o vincitori di concorso.",
    dettagli: JSON.stringify([
      "Per docenti con almeno 3 anni di servizio",
      "Per vincitori di concorso non abilitati",
      "Include tirocinio indiretto",
      "Prova finale abilitante",
      "Percorso abbreviato rispetto ai 60 CFU"
    ]),
    durata: "6-8 mesi",
    crediti: "36 CFU",
    punteggioGps: "Abilitazione",
    costo: "Contattaci per info",
    modalita: "Prevalentemente online",
    requisiti: "3 anni servizio o vincitore concorso + laurea magistrale",
    ente: "eCampus",
    attivo: 1,
    ordine: 2
  },
  {
    titolo: "Percorso Formativo 30 CFU",
    categoria: "Percorsi Abilitanti",
    livello: "30 CFU",
    descrizione: "Percorso transitorio per l'acquisizione dei crediti formativi universitari necessari per l'insegnamento.",
    dettagli: JSON.stringify([
      "Percorso transitorio fase iniziale",
      "Permette partecipazione concorsi",
      "Da integrare successivamente con altri 30 CFU",
      "Include discipline antropo-psico-pedagogiche",
      "Metodologie didattiche"
    ]),
    durata: "4-6 mesi",
    crediti: "30 CFU",
    punteggioGps: "Titolo di accesso concorsi",
    costo: "Contattaci per info",
    modalita: "Online",
    requisiti: "Laurea magistrale nella classe di concorso",
    ente: "eCampus",
    attivo: 1,
    ordine: 3
  },

  // CERTIFICAZIONI LINGUISTICHE
  {
    titolo: "Certificazione Linguistica Inglese C2 - British Institutes",
    categoria: "Certificazioni Linguistiche",
    livello: "C2 CEFR",
    descrizione: "Certificazione linguistica inglese livello C2 rilasciata da British Institutes, riconosciuta dal MIUR. Il livello C2 (Mastery) attesta la padronanza completa della lingua inglese.",
    dettagli: JSON.stringify([
      "Riconoscimento MIUR per concorsi e GPS",
      "Vale 6 punti nelle GPS",
      "Livello C2 = padronanza completa (Mastery)",
      "Corso preparazione 100% online incluso",
      "Tutor dedicato per supporto",
      "Esame ripetibile",
      "Certificato British Institutes riconosciuto internazionalmente"
    ]),
    durata: "Flessibile (corso online + esame)",
    crediti: "Certificazione linguistica",
    punteggioGps: "6 punti",
    costo: "Contattaci per info",
    modalita: "100% online (corso + esame Computer-Based)",
    requisiti: "Conoscenza avanzata inglese (consigliato test livello preliminare)",
    ente: "British Institutes tramite eCampus",
    attivo: 1,
    ordine: 4
  },
  {
    titolo: "Certificazione Linguistica Inglese C1 - British Institutes",
    categoria: "Certificazioni Linguistiche",
    livello: "C1 CEFR",
    descrizione: "Certificazione linguistica inglese livello C1 rilasciata da British Institutes, riconosciuta dal MIUR. Il livello C1 (Advanced) attesta un'ottima padronanza della lingua inglese.",
    dettagli: JSON.stringify([
      "Riconoscimento MIUR per concorsi e GPS",
      "Vale 4 punti nelle GPS",
      "Livello C1 = padronanza avanzata (Advanced)",
      "Corso preparazione online con tutor",
      "Esame ripetibile",
      "Certificato British Institutes"
    ]),
    durata: "Flessibile",
    crediti: "Certificazione linguistica",
    punteggioGps: "4 punti",
    costo: "Contattaci per info",
    modalita: "100% online",
    requisiti: "Buona conoscenza inglese",
    ente: "British Institutes tramite eCampus",
    attivo: 1,
    ordine: 5
  },

  // CLIL
  {
    titolo: "Nuova didattica per le lingue: la metodologia CLIL",
    categoria: "Metodologie Didattiche",
    livello: "Perfezionamento",
    descrizione: "Corso di perfezionamento sulla metodologia CLIL (Content and Language Integrated Learning) per l'insegnamento di discipline non linguistiche in lingua straniera.",
    dettagli: JSON.stringify([
      "Metodologia CLIL riconosciuta MIUR",
      "Vale 3 punti nelle GPS",
      "1500 ore di formazione",
      "Approccio innovativo all'insegnamento",
      "Integrazione contenuti disciplinari e lingua straniera",
      "Certificazione finale"
    ]),
    durata: "1500 ore (circa 6-8 mesi)",
    crediti: "60 CFU",
    punteggioGps: "3 punti",
    costo: "Contattaci per info",
    modalita: "100% online",
    requisiti: "Laurea + certificazione linguistica B2 o superiore",
    ente: "eCampus",
    attivo: 1,
    ordine: 6
  },

  // CERTIFICAZIONI INFORMATICHE
  {
    titolo: "Certificazione Informatica EIPASS",
    categoria: "Certificazioni Informatiche",
    livello: "Base/Avanzato",
    descrizione: "Certificazione EIPASS (European Informatics Passport) riconosciuta dal MIUR per attestare le competenze digitali.",
    dettagli: JSON.stringify([
      "Riconoscimento MIUR",
      "Vale 0.5 punti nelle GPS (max 2 punti con 4 certificazioni)",
      "Moduli su: hardware, software, internet, sicurezza informatica",
      "Esame online",
      "Certificato valido in Europa"
    ]),
    durata: "Flessibile (preparazione autonoma)",
    crediti: "Certificazione informatica",
    punteggioGps: "0.5 punti",
    costo: "Contattaci per info",
    modalita: "100% online",
    requisiti: "Nessun requisito specifico",
    ente: "EIPASS tramite eCampus",
    attivo: 1,
    ordine: 7
  },
  {
    titolo: "Certificazione Informatica PEKIT",
    categoria: "Certificazioni Informatiche",
    livello: "Base/Avanzato",
    descrizione: "Certificazione PEKIT (Permanent Education and Knowledge on Information Technology) riconosciuta MIUR.",
    dettagli: JSON.stringify([
      "Riconoscimento MIUR",
      "Vale 0.5 punti nelle GPS",
      "4 moduli: sistema operativo, office, web, sicurezza",
      "Esami online",
      "Certificato permanente"
    ]),
    durata: "Flessibile",
    crediti: "Certificazione informatica",
    punteggioGps: "0.5 punti",
    costo: "Contattaci per info",
    modalita: "100% online",
    requisiti: "Nessuno",
    ente: "PEKIT tramite eCampus",
    attivo: 1,
    ordine: 8
  },

  // MASTER
  {
    titolo: "Master in Didattica dell'Italiano L2",
    categoria: "Master",
    livello: "I Livello",
    descrizione: "Master di I livello in Didattica dell'Italiano come Lingua Seconda per l'insegnamento dell'italiano a stranieri.",
    dettagli: JSON.stringify([
      "Master di I livello (1500 ore)",
      "Vale 1 punto nelle GPS",
      "Competenze didattiche specifiche per italiano L2",
      "Sbocchi: insegnamento italiano a stranieri, CPIA, corsi integrazione",
      "Tesi finale"
    ]),
    durata: "1 anno accademico (1500 ore)",
    crediti: "60 CFU",
    punteggioGps: "1 punto",
    costo: "Contattaci per info",
    modalita: "100% online",
    requisiti: "Laurea triennale o magistrale",
    ente: "eCampus",
    attivo: 1,
    ordine: 9
  },
  {
    titolo: "Master in Metodologie Didattiche Innovative",
    categoria: "Master",
    livello: "I Livello",
    descrizione: "Master di I livello sulle metodologie didattiche innovative e tecnologie per l'insegnamento.",
    dettagli: JSON.stringify([
      "Master di I livello",
      "Vale 1 punto nelle GPS",
      "Didattica digitale e innovativa",
      "Tecnologie educative",
      "Metodologie attive"
    ]),
    durata: "1 anno (1500 ore)",
    crediti: "60 CFU",
    punteggioGps: "1 punto",
    costo: "Contattaci per info",
    modalita: "100% online",
    requisiti: "Laurea triennale",
    ente: "eCampus",
    attivo: 1,
    ordine: 10
  }
];

async function seedCorsi() {
  try {
    console.log("🌱 Inizio popolamento database corsi...");

    for (const corso of corsiData) {
      await db.insert(corsiEcampus).values(corso);
      console.log(`✅ Inserito: ${corso.titolo}`);
    }

    console.log(`\n✨ Completato! Inseriti ${corsiData.length} corsi nel database.`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Errore durante il popolamento:", error);
    process.exit(1);
  }
}

seedCorsi();
