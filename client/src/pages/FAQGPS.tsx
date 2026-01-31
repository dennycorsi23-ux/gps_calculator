import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, Calendar, Users, FileText, AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

interface FAQItem {
  question: string;
  answer: string;
  category: "generale" | "iscrizione" | "punteggio" | "graduatorie" | "supplenze";
}

const faqData: FAQItem[] = [
  {
    category: "generale",
    question: "Cosa sono le GPS (Graduatorie Provinciali per le Supplenze)?",
    answer: "Le GPS sono graduatorie provinciali utilizzate per l'assegnazione delle supplenze nelle scuole statali. Sono suddivise in due fasce: prima fascia per docenti abilitati e seconda fascia per docenti non abilitati. Le GPS vengono aggiornate ogni due anni e sono valide per l'assegnazione di supplenze annuali (31 agosto) e fino al termine delle attività didattiche (30 giugno)."
  },
  {
    category: "generale",
    question: "Quando escono le graduatorie GPS 2026?",
    answer: "Le graduatorie GPS vengono aggiornate ogni due anni. L'ultimo aggiornamento è stato nel 2024, quindi il prossimo aggiornamento sarà nel 2026. Le tempistiche precise vengono comunicate dal Ministero dell'Istruzione con un'ordinanza ministeriale, solitamente pubblicata tra aprile e maggio. Le domande di inserimento/aggiornamento si presentano tipicamente tra maggio e giugno, mentre le graduatorie definitive vengono pubblicate tra agosto e settembre."
  },
  {
    category: "iscrizione",
    question: "Posso inserirmi nelle GPS di più province?",
    answer: "Sì, puoi inserirti nelle GPS di una sola provincia per ogni classe di concorso, ma puoi scegliere province diverse per classi di concorso diverse. Ad esempio, puoi inserirti per A-22 (Italiano) nella provincia di Roma e per A-11 (Inglese) nella provincia di Milano. Non è possibile inserirsi nella stessa classe di concorso in più province contemporaneamente."
  },
  {
    category: "iscrizione",
    question: "Posso cambiare provincia dopo l'inserimento?",
    answer: "No, una volta presentata la domanda e pubblicate le graduatorie, non è possibile cambiare provincia fino al prossimo aggiornamento (che avviene ogni due anni). Per questo è fondamentale scegliere con attenzione la provincia in cui inserirsi, valutando il proprio punteggio rispetto ai punteggi minimi degli anni precedenti e le effettive possibilità di convocazione."
  },
  {
    category: "iscrizione",
    question: "Devo inserirmi nelle GPS anche se sono già in GaE?",
    answer: "No, se sei già inserito nelle Graduatorie ad Esaurimento (GaE) non puoi inserirti nelle GPS per la stessa classe di concorso. Le GaE hanno priorità assoluta sulle GPS per l'assegnazione delle supplenze. Tuttavia, puoi inserirti nelle GPS per altre classi di concorso diverse da quella per cui sei in GaE."
  },
  {
    category: "punteggio",
    question: "Come viene calcolato il punteggio GPS?",
    answer: "Il punteggio GPS è la somma di diversi titoli valutabili: titolo di accesso (laurea/diploma), abilitazione all'insegnamento, titoli accademici (dottorato, master, specializzazioni), certificazioni linguistiche e informatiche, servizio scolastico pregresso. Ogni titolo ha un punteggio specifico stabilito dall'ordinanza ministeriale. Ad esempio: specializzazione sostegno (30 punti), dottorato di ricerca (12 punti), master universitario (3 punti), certificazione linguistica B2 (3 punti), ogni anno di servizio (12 punti)."
  },
  {
    category: "punteggio",
    question: "Cosa succede se cambio il mio punteggio dopo l'inserimento?",
    answer: "Se consegui nuovi titoli dopo aver presentato la domanda ma prima della pubblicazione delle graduatorie definitive, puoi presentare un'istanza di integrazione nei termini previsti dall'ordinanza ministeriale. Una volta pubblicate le graduatorie definitive, non è più possibile modificare il punteggio fino al prossimo aggiornamento biennale. Per questo è importante conseguire tutti i titoli possibili prima della scadenza della domanda."
  },
  {
    category: "punteggio",
    question: "Qual è il punteggio minimo per essere convocati?",
    answer: "Non esiste un punteggio minimo garantito per la convocazione. Le possibilità di essere chiamati dipendono da: numero di posti disponibili nella provincia scelta, numero di candidati inseriti nella stessa classe di concorso, punteggio degli altri candidati. In alcune province e classi di concorso molto richieste (es. A-22 Italiano a Roma) servono punteggi molto alti (70-80 punti), mentre in province o classi meno richieste si può essere convocati anche con 40-50 punti. Usa il nostro calcolatore GPS per verificare le tue possibilità."
  },
  {
    category: "graduatorie",
    question: "Qual è la differenza tra GPS e GI (Graduatorie di Istituto)?",
    answer: "Le GPS sono graduatorie provinciali gestite dagli Uffici Scolastici Territoriali (UST) e utilizzate per supplenze annuali (31 agosto) e fino al termine delle attività didattiche (30 giugno). Le Graduatorie di Istituto (GI) sono invece gestite dalle singole scuole e utilizzate per supplenze brevi e temporanee. Le GI si compilano scegliendo fino a 20 scuole nella provincia in cui si è inseriti nelle GPS. Le convocazioni dalle GPS hanno priorità rispetto alle GI."
  },
  {
    category: "graduatorie",
    question: "Quante scuole posso scegliere per le Graduatorie di Istituto?",
    answer: "Puoi scegliere fino a 20 scuole per ogni classe di concorso in cui sei inserito nelle GPS, tutte nella stessa provincia. È strategico scegliere scuole vicine tra loro o raggiungibili facilmente, considerando che le convocazioni per supplenze brevi possono arrivare con poco preavviso. Puoi modificare la scelta delle scuole ad ogni aggiornamento delle GPS (ogni due anni)."
  },
  {
    category: "supplenze",
    question: "Quando vengono assegnate le supplenze dalle GPS?",
    answer: "Le supplenze annuali (31 agosto) e fino al termine delle attività didattiche (30 giugno) vengono assegnate prima dell'inizio dell'anno scolastico, tipicamente tra fine agosto e inizio settembre. Le convocazioni avvengono tramite l'algoritmo informatico del Ministero, che assegna i posti disponibili in base al punteggio e alle preferenze espresse. Le supplenze brevi (da Graduatorie di Istituto) vengono invece assegnate durante tutto l'anno scolastico, in base alle necessità delle singole scuole."
  },
  {
    category: "supplenze",
    question: "Posso rifiutare una supplenza dalle GPS?",
    answer: "Sì, puoi rifiutare una proposta di supplenza dalle GPS, ma ci sono conseguenze. Se rifiuti una supplenza annuale (31 agosto) o fino al termine delle attività didattiche (30 giugno), perdi la possibilità di ricevere altre proposte da quella graduatoria per l'intero anno scolastico. Se rifiuti una supplenza breve dalle Graduatorie di Istituto, non ci sono penalizzazioni e puoi continuare a ricevere altre convocazioni. È importante valutare bene prima di rifiutare."
  },
  {
    category: "supplenze",
    question: "Il servizio svolto con supplenza vale come punteggio?",
    answer: "Sì, il servizio svolto come supplente nelle scuole statali viene valutato per l'aggiornamento delle GPS. Ogni anno di servizio vale 12 punti, calcolati in base ai giorni effettivamente lavorati (16 giorni = 1 mese, 12 mesi = 1 anno). Il servizio deve essere svolto nella stessa classe di concorso o in classi affini. Il servizio nelle scuole paritarie vale meno (6 punti per anno) e solo se svolto con contratto a tempo indeterminato o determinato annuale."
  },
  {
    category: "punteggio",
    question: "I 24 CFU sono ancora necessari per le GPS?",
    answer: "A partire dall'aggiornamento GPS 2024, i 24 CFU in discipline antropo-psico-pedagogiche e metodologie didattiche non sono più obbligatori per l'inserimento in seconda fascia GPS. Tuttavia, se conseguiti entro il 31 ottobre 2022, continuano a valere 24 punti e rappresentano un titolo molto importante per aumentare il punteggio. Chi non li ha conseguiti entro quella data non può più ottenerli, ma può compensare con altri titoli (master, certificazioni, servizio)."
  },
  {
    category: "punteggio",
    question: "Quali certificazioni linguistiche sono valutate nelle GPS?",
    answer: "Sono valutate le certificazioni linguistiche rilasciate da enti certificatori riconosciuti dal MIUR, per le lingue inglese, francese, tedesco, spagnolo. I punteggi sono: B2 (3 punti), C1 (4 punti), C2 (6 punti). È possibile inserire una sola certificazione per lingua, quindi conviene conseguire il livello più alto possibile. Le certificazioni devono essere conseguite prima della scadenza della domanda di aggiornamento GPS."
  },
  {
    category: "punteggio",
    question: "Quali certificazioni informatiche sono valutate nelle GPS?",
    answer: "Sono valutate le certificazioni informatiche rilasciate da enti accreditati dal MIUR, come EIPASS, PEKIT, ECDL/ICDL. Ogni certificazione vale 0,5 punti, fino a un massimo di 2 punti (quindi 4 certificazioni). Le certificazioni devono coprire competenze informatiche di base (uso del computer, elaborazione testi, fogli di calcolo, presentazioni, internet, sicurezza informatica). È strategico conseguire 4 certificazioni diverse per ottenere il massimo punteggio."
  }
];

const categories = [
  { id: "generale", label: "Informazioni Generali", icon: HelpCircle, color: "blue" },
  { id: "iscrizione", label: "Iscrizione e Province", icon: FileText, color: "green" },
  { id: "punteggio", label: "Calcolo Punteggio", icon: CheckCircle, color: "purple" },
  { id: "graduatorie", label: "Graduatorie", icon: Users, color: "orange" },
  { id: "supplenze", label: "Supplenze e Convocazioni", icon: Calendar, color: "red" }
];

export default function FAQGPS() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const filteredFAQs = selectedCategory
    ? faqData.filter(faq => faq.category === selectedCategory)
    : faqData;

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <HelpCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            FAQ GPS 2026
          </h1>
          <p className="text-xl text-gray-600">
            Risposte alle domande più frequenti sulle Graduatorie Provinciali per le Supplenze
          </p>
        </div>

        {/* Category Filter */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedCategory === null
                  ? "bg-blue-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              Tutte le Domande
            </button>
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                    selectedCategory === cat.id
                      ? `bg-${cat.color}-600 text-white shadow-lg scale-105`
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFAQs.map((faq, index) => {
            const category = categories.find(c => c.id === faq.category);
            const isOpen = openFAQ === index;

            return (
              <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-6 flex items-start justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {category && (
                        <span className={`text-xs font-semibold px-2 py-1 rounded bg-${category.color}-100 text-${category.color}-700`}>
                          {category.label}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {faq.question}
                    </h3>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <CardContent className="px-6 pb-6 pt-0">
                    <div className="pl-4 border-l-4 border-blue-200">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <Card className="max-w-4xl mx-auto mt-12 shadow-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Non hai trovato la risposta che cercavi?
            </h3>
            <p className="text-gray-700 mb-6">
              Calcola il tuo punteggio GPS e scopri le tue possibilità di supplenza 
              in tutte le province italiane
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/calcola-gps">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Calcola il Tuo Punteggio GPS
                </Button>
              </Link>
              <Link href="/contatti">
                <Button size="lg" variant="outline">
                  Contattaci per Supporto
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Info Box */}
        <div className="max-w-4xl mx-auto mt-8 bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-amber-900 mb-2">
                Nota Importante
              </h4>
              <p className="text-amber-800 text-sm leading-relaxed">
                Le informazioni contenute in questa pagina sono aggiornate al 2024 e potrebbero 
                subire modifiche con le prossime ordinanze ministeriali. Ti consigliamo di 
                verificare sempre le informazioni ufficiali sul sito del Ministero dell'Istruzione 
                e degli Uffici Scolastici Territoriali.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
