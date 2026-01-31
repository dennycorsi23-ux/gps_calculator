# Analisi Sezione "Trova la tua Classe di Concorso"

## Struttura da classidiconcorso.it

**Funzionalità:**
- Lista completa di tutti i titoli di studio (Lauree, Diplomi AFAM, ecc.)
- Campo di ricerca/filtro per trovare rapidamente il proprio titolo
- Ogni titolo è cliccabile e mostra le classi di concorso associate

**Esempio:**
- Titolo: "LS 76 - Scienze e tecniche delle attività motorie preventive e adattative"
- Classi associate:
  - A-48: Scienze motorie e sportive (I e II grado)
  - EEEM: Educazione motoria scuola primaria

## Struttura da cattedra.it

**Funzionalità:**
- Tabella con TUTTE le classi di concorso (A-01, A-02, ecc.)
- Colonne: CDC | Descrizione | Note | Azioni
- Pulsante "Visualizza dettagli" per ogni classe
- Note con informazioni su accorpamenti, sottocodici, requisiti CFU

**Esempio:**
- A-01: Arte e immagine nell'istruzione secondaria di I e II grado
- Note: Accorpa A-01 e A-17, sottocodici AM01 (I grado) e AS01 (II grado)

## Cosa implementare nel nostro sito

### Opzione 1: Ricerca per Titolo di Studio (come classidiconcorso.it)
- Input: "Inserisci il tuo titolo di studio"
- Output: Classi di concorso per cui puoi insegnare

### Opzione 2: Elenco Classi di Concorso (come cattedra.it)
- Tabella completa delle 133 classi
- Clic su una classe → mostra titoli di studio richiesti

### Opzione 3: ENTRAMBE
- Tab 1: "Cerca per Titolo" (input titolo → classi)
- Tab 2: "Cerca per Classe" (seleziona classe → titoli richiesti)

## Dati necessari

Per implementare serve mappare:
```
Titolo di Studio → Classi di Concorso
Esempio:
"Laurea in Scienze Motorie" → [A-48, EEEM]
"Laurea in Lettere" → [A-11, A-12, A-13, A-22]
```

Oppure al contrario:
```
Classe di Concorso → Titoli di Studio + CFU richiesti
Esempio:
A-48 → Laurea in Scienze Motorie (LM-67, LM-68) + 24 CFU pedagogici
```
