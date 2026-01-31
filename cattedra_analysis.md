# Analisi cattedra.it - Struttura Trova Classe

## Come funziona cattedra.it

### 1. RICERCA PER LAUREA → CLASSI
- Pagina: https://cattedra.it/titolitocdc.php
- Mostra lista di tutte le lauree magistrali (LM-1, LM-2, ecc.)
- Cliccando su "Visualizza dettagli" di una laurea si apre pagina dettaglio
- Esempio: DS/S-1-Scienze marittime e navali

**Pagina dettaglio laurea:**
- Titolo: "Titolo di Laurea: [NOME LAUREA]"
- Tabella con 3 colonne:
  * **Classe** (es. A-43)
  * **Descrizione** (es. "Scienze e tecnologie nautiche")
  * **Nota** (es. "Con almeno 80 crediti nei settori scientifico disciplinari ING-IND, FIS e GEO di cui 24 ING-IND/01, 12 ING-IND/02, 12 FIS/05, 12 FIS/06 o GEO/12")

### 2. RICERCA PER CLASSE → REQUISITI
(Devo ancora verificare questa parte)

## Cosa devo implementare

### Database necessario:
1. **Lauree** (circa 100+ lauree magistrali)
   - Codice (es. "LM-1")
   - Nome completo (es. "Antropologia culturale ed Etnologia")

2. **Classi di Concorso** (già abbiamo 150 classi)
   - Codice (es. "A-01")
   - Descrizione (es. "Arte e immagine nella scuola secondaria di I grado")

3. **Mapping Laurea → Classe** (relazione molti-a-molti)
   - laurea_code
   - classe_code
   - note_cfu (es. "Con almeno 80 crediti nei settori ING-IND...")

### UI da creare:
- **Due tab separate:**
  1. Tab "Cerca per Laurea": dropdown lauree → mostra tabella classi accessibili
  2. Tab "Cerca per Classe": dropdown classi → mostra tabella lauree richieste + CFU

- **Design:**
  - Sfondo CHIARO (bianco/grigio chiaro) - NON scuro
  - Tabelle semplici e leggibili
  - Stile simile a cattedra.it (pulito, professionale)

## Esempio dati da estrarre:

**Laurea: DS/S-1-Scienze marittime e navali**
→ Classe A-43: Scienze e tecnologie nautiche
   Note CFU: "Con almeno 80 crediti nei settori scientifico disciplinari ING-IND, FIS e GEO di cui 24 ING-IND/01, 12 ING-IND/02, 12 FIS/05, 12 FIS/06 o GEO/12"


## STRUTTURA COMPLETA TROVATA

### Pagina 1: RICERCA LAUREA → CLASSI
URL: https://cattedra.it/titolitocdc.php
- Lista di tutte le lauree magistrali
- Click su "Visualizza dettagli" → mostra tabella classi accessibili con quella laurea

**Esempio dettaglio laurea DS/S-1:**
Tabella con colonne: Classe | Descrizione | Nota
- A-43 | Scienze e tecnologie nautiche | Con almeno 80 crediti nei settori ING-IND, FIS e GEO...

### Pagina 2: RICERCA CLASSE → LAUREE (INVERSA)
URL: https://cattedra.it/cdcfromcdl.php
- Titolo: "CLASSI DI CONCORSO (da CDL)"
- Sottotitolo: "Seleziona una CDC per vedere i CDL collegati"
- Tabella con tutte le classi (A-01, A-02, ecc.)
- Click su "Visualizza dettagli" → mostra TUTTE le lauree che danno accesso

**Esempio dettaglio A-01:**
- Titolo: "CDC: A-01 - Arte e immagine nell'istruzione secondaria di I e II grado"
- Box rosa con descrizione classe
- Tabella con colonne: CDL | Note CDL

**Lauree che danno accesso ad A-01:**
1. Diploma accademico di II livello Accademie Belle Arti
   - Note: "Congiunto al diploma di istruzione secondaria..."
   
2. LM 10-Conservazione dei beni architettonici
   - Note: "con 48 CFU nei SSD ICAR e L/ART di cui: 16 CFU in ICAR/17; 16 CFU in L-ART/01..."

3. LM 12-Design
   - Note: "con 48 CFU nei SSD ICAR e L/ART di cui: 16 CFU in ICAR/17..."

4. LM 2-Archeologia
   - Note: "Con 48 CFU nei SSD ICAR, L-ART e M-FIL di cui: 12 CFU in L-ART/03..."

...e molte altre lauree

## DESIGN OSSERVATO
- Sfondo CHIARO (bianco/grigio chiaro)
- Box colorati per titoli (rosa per classi, azzurro per STEP)
- Tabelle semplici con bordi leggeri
- Font leggibile, spaziatura generosa
- Pulsanti blu "Visualizza dettagli"

## COSA DEVO FARE
1. Creare database completo con mapping bidirezionale
2. Due tab: "Cerca per Laurea" e "Cerca per Classe"
3. Design chiaro con sfondo bianco
4. Mostrare SEMPRE i CFU richiesti nelle note
