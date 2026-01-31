// Configurazione completa titoli GPS secondo Allegato A
// Fonte: Decreto Ministeriale - Tabelle di valutazione titoli GPS

export interface TitoloGPS {
  id: string;
  sezione: "A" | "B" | "BA" | "C";
  codice: string; // A.1, B.12, ecc.
  descrizione: string;
  punti: number | string; // Può essere fisso o variabile (es. "4-12")
  tipo: "checkbox" | "number" | "select";
  opzioni?: { value: string; label: string; punti: number }[];
  note?: string;
  max?: number; // Massimo numero di titoli dello stesso tipo
  fascia?: "I" | "II" | "entrambe";
}

export const titoliGPS: TitoloGPS[] = [
  // ========== SEZIONE A - ABILITAZIONI (SOLO I FASCIA) ==========
  {
    id: "a1_abilitazione",
    sezione: "A",
    codice: "A.1",
    descrizione: "Abilitazione specifica alla classe di concorso",
    punti: "4-12",
    tipo: "select",
    fascia: "I",
    opzioni: [
      { value: "60-65", label: "Voto 60-65", punti: 4 },
      { value: "66-70", label: "Voto 66-70", punti: 5 },
      { value: "71-75", label: "Voto 71-75", punti: 6 },
      { value: "76-80", label: "Voto 76-80", punti: 7 },
      { value: "81-85", label: "Voto 81-85", punti: 8 },
      { value: "86-90", label: "Voto 86-90", punti: 9 },
      { value: "91-95", label: "Voto 91-95", punti: 11 },
      { value: "96-100", label: "Voto 96-100", punti: 12 },
    ],
    note: "I titoli di abilitazione il cui voto non è espresso in centesimi sono rapportati a 100"
  },
  
  // ========== SEZIONE B - TITOLI ACCADEMICI/PROFESSIONALI/CULTURALI ==========
  {
    id: "b1_diploma_laurea_aggiuntivo",
    sezione: "B",
    codice: "B.1",
    descrizione: "Diploma di laurea, laurea specialistica, laurea magistrale, diploma accademico di vecchio ordinamento o diploma accademico di II livello aggiuntivo",
    punti: 3,
    tipo: "number",
    max: 4,
    fascia: "entrambe"
  },
  {
    id: "b2_diploma_isef_triennale",
    sezione: "B",
    codice: "B.2",
    descrizione: "Diploma ISEF, Laurea triennale o diploma accademico di I livello",
    punti: 1.5,
    tipo: "number",
    max: 4,
    fascia: "entrambe"
  },
  {
    id: "b3_diploma_tecnico_superiore",
    sezione: "B",
    codice: "B.3",
    descrizione: "Diploma di Istituto Tecnico Superiore",
    punti: 1.5,
    tipo: "number",
    max: 4,
    fascia: "entrambe"
  },
  {
    id: "b4_ulteriore_abilitazione",
    sezione: "B",
    codice: "B.4",
    descrizione: "Ulteriore abilitazione nella medesima classe di concorso",
    punti: 3,
    tipo: "number",
    max: 4,
    fascia: "entrambe"
  },
  {
    id: "b5_specializzazione_sostegno",
    sezione: "B",
    codice: "B.5",
    descrizione: "Titolo di specializzazione sul sostegno agli alunni con disabilità",
    punti: 9,
    tipo: "checkbox",
    fascia: "entrambe"
  },
  {
    id: "b6_superamento_concorso",
    sezione: "B",
    codice: "B.6",
    descrizione: "Superamento delle prove di un concorso ordinario per titoli ed esami per la scuola dell'infanzia e primo e secondo grado",
    punti: 3,
    tipo: "checkbox",
    fascia: "entrambe"
  },
  {
    id: "b7_dottorato",
    sezione: "B",
    codice: "B.7",
    descrizione: "Dottorato di ricerca, diploma di perfezionamento equiparato per legge",
    punti: 12,
    tipo: "checkbox",
    fascia: "entrambe"
  },
  {
    id: "b8_abilitazione_scientifica",
    sezione: "B",
    codice: "B.8",
    descrizione: "Abilitazione scientifica nazionale a professore di I o II fascia",
    punti: 12,
    tipo: "checkbox",
    fascia: "entrambe"
  },
  {
    id: "b9_attivita_ricerca",
    sezione: "B",
    codice: "B.9",
    descrizione: "Attività di ricerca scientifica sulla base di assegni",
    punti: 12,
    tipo: "checkbox",
    fascia: "entrambe"
  },
  {
    id: "b10_graduatorie_afam",
    sezione: "B",
    codice: "B.10",
    descrizione: "Inserimento nelle graduatorie nazionali preposte alla stipula di contratti di docenza a tempo indeterminato per i docenti AFAM",
    punti: 12,
    tipo: "checkbox",
    fascia: "entrambe"
  },
  {
    id: "b11_diploma_specializzazione",
    sezione: "B",
    codice: "B.11",
    descrizione: "Diploma di specializzazione universitario, non altrimenti valutato",
    punti: 2,
    tipo: "number",
    max: 4,
    fascia: "entrambe"
  },
  {
    id: "b12_clil",
    sezione: "B",
    codice: "B.12",
    descrizione: "Titolo di perfezionamento all'insegnamento in CLIL",
    punti: 6,
    tipo: "checkbox",
    fascia: "entrambe",
    note: "Solo perfezionamenti/master universitari (no campus)"
  },
  {
    id: "b13_certificazione_cecil",
    sezione: "B",
    codice: "B.13",
    descrizione: "Certificazione CeCIL o certificazione ottenuta a seguito di positiva frequenza dei percorsi di perfezionamento in CLIL",
    punti: 3,
    tipo: "checkbox",
    fascia: "entrambe"
  },
  {
    id: "b14_certificazioni_linguistiche",
    sezione: "B",
    codice: "B.14",
    descrizione: "Certificazioni linguistiche di livello almeno B2 in lingua straniera",
    punti: "3-6",
    tipo: "select",
    fascia: "entrambe",
    opzioni: [
      { value: "b2", label: "B2 (3 punti)", punti: 3 },
      { value: "c1", label: "C1 (4 punti)", punti: 4 },
      { value: "c2", label: "C2 (6 punti)", punti: 6 },
    ],
    max: 2,
    note: "Massimo 2 certificazioni valutabili"
  },
  {
    id: "b15_master_perfezionamento",
    sezione: "B",
    codice: "B.15",
    descrizione: "Diploma di perfezionamento post diploma o post laurea, master universitario di I o II livello, corrispondenti a 60 CFU con esame finale",
    punti: 1,
    tipo: "number",
    max: 3,
    fascia: "entrambe",
    note: "Massimo 3 titoli valutabili"
  },
  {
    id: "b16_specializzazione_italiano_l2",
    sezione: "B",
    codice: "B.16",
    descrizione: "Titolo di specializzazione in italiano L2",
    punti: 3,
    tipo: "checkbox",
    fascia: "entrambe"
  },
  {
    id: "b17_certificazioni_informatiche",
    sezione: "B",
    codice: "B.17",
    descrizione: "Certificazioni informatiche",
    punti: 0.5,
    tipo: "number",
    max: 4,
    fascia: "entrambe",
    note: "Massimo 2 punti totali (4 certificazioni x 0,5)"
  },

  // ========== SEZIONE BA - TITOLI ARTISTICI (solo classi A-55, A-56, A-59, A-57, A-58) ==========
  {
    id: "ba18_diploma_conservatorio",
    sezione: "BA",
    codice: "BA.18",
    descrizione: "Diploma di perfezionamento conseguito presso l'Accademia Nazionale di Santa Cecilia",
    punti: 6,
    tipo: "checkbox",
    fascia: "entrambe",
    note: "Solo per classi artistiche"
  },
  {
    id: "ba19_premi_concorsi",
    sezione: "BA",
    codice: "BA.19",
    descrizione: "Premi in concorsi nazionali o internazionali relativi allo specifico strumento",
    punti: "1-3",
    tipo: "select",
    fascia: "entrambe",
    opzioni: [
      { value: "primo", label: "Primo premio (3 punti)", punti: 3 },
      { value: "secondo", label: "Secondo premio (2 punti)", punti: 2 },
      { value: "terzo", label: "Terzo premio (1 punto)", punti: 1 },
    ],
    max: 6,
    note: "Solo per classi artistiche"
  },
  {
    id: "ba20_idoneita_orchestre",
    sezione: "BA",
    codice: "BA.20",
    descrizione: "Idoneità in concorsi per orchestre sinfoniche di Fondazioni Lirico Sinfoniche o Orchestre riconosciute",
    punti: 2,
    tipo: "checkbox",
    fascia: "entrambe",
    note: "Solo per classi artistiche"
  },
  {
    id: "ba21_attivita_professionale_orchestre",
    sezione: "BA",
    codice: "BA.21",
    descrizione: "Attività professionale, compresa quella di direzione, in orchestre sinfoniche di Fondazioni Lirico Sinfoniche",
    punti: 5,
    tipo: "checkbox",
    fascia: "entrambe",
    note: "Solo per classi artistiche"
  },
  {
    id: "ba22_attivita_concertistica",
    sezione: "BA",
    codice: "BA.22",
    descrizione: "Attività concertistica solistica o in formazioni di musica da camera (dal duo), in Italia purché all'interno di attività finanziate dal Fondo unico per lo spettacolo, o all'estero",
    punti: 30,
    tipo: "number",
    max: 1,
    fascia: "entrambe",
    note: "Solo per classi artistiche - Massimo 30 punti"
  },
  {
    id: "ba23_premi_danza",
    sezione: "BA",
    codice: "BA.23",
    descrizione: "Premi in qualità di interprete in concorsi nazionali od internazionali relativi alla specifica classe di concorso - danza classica o danza contemporanea",
    punti: "1-3",
    tipo: "select",
    fascia: "entrambe",
    opzioni: [
      { value: "primo", label: "Primo premio (3 punti)", punti: 3 },
      { value: "secondo", label: "Secondo premio (2 punti)", punti: 2 },
      { value: "terzo", label: "Terzo premio (1 punto)", punti: 1 },
    ],
    max: 6,
    note: "Solo per classi artistiche"
  },
  {
    id: "ba24_attivita_danzatore",
    sezione: "BA",
    codice: "BA.24",
    descrizione: "Attività artistica, in qualità di danzatore, nei corpi di ballo degli Enti Lirico Sinfonici oppure in enti stranieri omologhi",
    punti: 5,
    tipo: "checkbox",
    fascia: "entrambe",
    note: "Solo per classi artistiche"
  },
  {
    id: "ba25_attivita_coreografo",
    sezione: "BA",
    codice: "BA.25",
    descrizione: "Attività artistica, in qualità di coreografo, nei corpi di ballo degli Enti Lirico Sinfonici oppure in enti stranieri omologhi",
    punti: 3,
    tipo: "checkbox",
    fascia: "entrambe",
    note: "Solo per classi artistiche"
  },
  {
    id: "ba26_altra_attivita_artistica",
    sezione: "BA",
    codice: "BA.26",
    descrizione: "Altra attività artistica, in qualità di coreografo o danzatore, non altrimenti dichiarata, svolta in Italia nell'ambito di attività finanziate dal Fondo unico per lo spettacolo, o all'estero",
    punti: 2,
    tipo: "checkbox",
    fascia: "entrambe",
    note: "Solo per classi artistiche"
  },

  // ========== SEZIONE C - TITOLI DI SERVIZIO ==========
  {
    id: "c1_servizio_specifico",
    sezione: "C",
    codice: "C.1",
    descrizione: "Servizio di insegnamento prestato sullo specifico grado, per scuola dell'infanzia e primaria, per ciascuno degli anni di servizio di cui si procede alla valutazione",
    punti: "2-12",
    tipo: "number",
    fascia: "entrambe",
    note: "2 punti per mese (12 punti per anno completo)"
  },
  {
    id: "c2_servizio_altra_classe",
    sezione: "C",
    codice: "C.2",
    descrizione: "Servizio di insegnamento prestato su altra classe di concorso o su altro posto anche di altro grado",
    punti: "1-6",
    tipo: "number",
    fascia: "entrambe",
    note: "1 punto per mese (6 punti per anno completo)"
  },
];

// Helper per filtrare titoli per sezione
export const getTitoliBySezione = (sezione: "A" | "B" | "BA" | "C") => {
  return titoliGPS.filter(t => t.sezione === sezione);
};

// Helper per filtrare titoli per fascia
export const getTitoliByFascia = (fascia: "I" | "II") => {
  return titoliGPS.filter(t => t.fascia === fascia || t.fascia === "entrambe");
};
