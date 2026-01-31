# Brainstorming Design & Struttura Dati - GPS Calculator

<response>
<probability>0.05</probability>
<text>
<idea>
**Design Movement**: Neumorphism (Soft UI)
**Core Principles**:
1. **Softness & Depth**: Elementi che sembrano estrusi dalla superficie, morbidi al tatto.
2. **Minimalism**: Pochi colori, focus sulle ombre e luci.
3. **Clarity**: Tipografia pulita e leggibile.

**Color Philosophy**:
- Background: Off-white o grigio chiaro (#E0E5EC).
- Shadows: Doppie ombre (chiara in alto a sx, scura in basso a dx) per creare volume.
- Accents: Blu morbido o verde acqua per le azioni principali.

**Layout Paradigm**:
- Card-based: Ogni sezione (Laurea, Titoli, Risultati) è una card "fluttuante".
- Vertical Flow: Scorrimento fluido dall'alto verso il basso.

**Signature Elements**:
- **Soft Buttons**: Bottoni che sembrano premibili fisicamente.
- **Inset Inputs**: Campi di input che sembrano scavati nella superficie.
- **Circular Progress**: Indicatori di punteggio circolari.

**Interaction Philosophy**:
- Feedback tattile visivo (i bottoni si "premono" al click).
- Transizioni morbide.

**Animation**:
- Fade-in delicati.
- I numeri del punteggio "corrono" fino al valore finale.

**Typography System**:
- Font: **Nunito** (arrotondato) o **Quicksand**.
- Headings: Bold, soft color.
- Body: Regular, dark grey.
</idea>
</text>
</response>

<response>
<probability>0.05</probability>
<text>
<idea>
**Design Movement**: Swiss Style (International Typographic Style)
**Core Principles**:
1. **Grid Systems**: Layout rigoroso e ordinato.
2. **Asymmetry**: Bilanciamento visivo senza simmetria forzata.
3. **Typography as Image**: Testo grande e impattante.

**Color Philosophy**:
- Background: Bianco puro o nero profondo.
- Palette: Colori primari forti (Rosso Svizzero, Blu Cobalto, Giallo) su base neutra.
- High Contrast.

**Layout Paradigm**:
- Modular Grid: Griglia visibile o percepibile.
- Whitespace: Ampio uso dello spazio negativo.

**Signature Elements**:
- **Big Bold Type**: Titoli enormi in Helvetica/Inter.
- **Geometric Shapes**: Linee divisorie spesse, rettangoli di colore.
- **Functional Icons**: Icone minimaliste e geometriche.

**Interaction Philosophy**:
- Scatti precisi e veloci.
- Hover effects netti (cambio colore immediato).

**Animation**:
- Slide-in laterali veloci.
- Reveal geometrici.

**Typography System**:
- Font: **Helvetica Now** o **Inter** (tight tracking).
- Hierarchy: Estrema differenza di dimensione tra titoli e corpo.
</idea>
</text>
</response>

<response>
<probability>0.05</probability>
<text>
<idea>
**Design Movement**: Glassmorphism (Frosted Glass)
**Core Principles**:
1. **Translucency**: Effetto vetro smerigliato su sfondi colorati/sfumati.
2. **Vibrancy**: Colori di sfondo vivi e saturi che filtrano attraverso il vetro.
3. **Layering**: Profondità creata dalla sovrapposizione di strati traslucidi.

**Color Philosophy**:
- Background: Gradienti complessi e colorati (Viola/Blu/Rosa).
- Glass: Bianco semitrasparente con blur.
- Text: Bianco o blu scuro per contrasto.

**Layout Paradigm**:
- Floating Layers: Pannelli di vetro sospesi sullo sfondo.
- Central Focus: Il form è l'elemento centrale, luminoso.

**Signature Elements**:
- **Frosted Cards**: Card con `backdrop-filter: blur()`.
- **Border Highlights**: Bordi sottili semitrasparenti per definire i contorni.
- **Vivid Orbs**: Sfere colorate sfocate nello sfondo.

**Interaction Philosophy**:
- Effetto "lente" al passaggio del mouse.
- Parallasse leggero tra gli strati.

**Animation**:
- Floating background elements.
- Glow effects sugli input attivi.

**Typography System**:
- Font: **Poppins** o **Montserrat**.
- Clean, modern sans-serif.
</idea>
</text>
</response>

---

## Struttura Dati Storici (JSON)

```json
{
  "provinces": [
    {
      "id": "MI",
      "name": "Milano",
      "region": "Lombardia",
      "data_2023": {
        "A046": 42.5,
        "A048": 38.0,
        "ADSS": 52.0,
        "ADMM": 48.5
      },
      "data_2024": {
        "A046": 44.0,
        "A048": 39.5
      },
      "source_link": "https://www.uilscuolarualombardia.it/..."
    },
    {
      "id": "RM",
      "name": "Roma",
      "region": "Lazio",
      "data_2023": {
        "A046": 48.0,
        "A048": 45.0
      },
      "source_link": "https://www.atpromaistruzione.it/..."
    }
    // ... altre province
  ]
}
```

## Scelta Design
Seleziono lo stile **Glassmorphism** (Idea 3) perché:
1. È moderno e visivamente accattivante, perfetto per un tool che deve sembrare "magico" e tecnologico.
2. I gradienti di sfondo possono evocare un senso di "futuro" e "possibilità".
3. La struttura a card traslucide organizza bene le informazioni complesse (form, risultati, mappa) senza appesantire.

**Design Philosophy**: "Clarity through Transparency" - Rendere chiaro e trasparente il complesso mondo delle graduatorie GPS attraverso un'interfaccia pulita e luminosa.
