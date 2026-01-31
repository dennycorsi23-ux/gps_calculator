import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  GraduationCap, 
  Globe, 
  Laptop, 
  BookOpen, 
  Award,
  Clock,
  Euro,
  CheckCircle,
  Send,
  AlertCircle
} from "lucide-react";

interface Corso {
  id: string;
  titolo: string;
  categoria: string;
  livello?: string;
  descrizione: string;
  dettagli: string[];
  durata: string;
  crediti: string;
  punteggioGps: string;
  costo: string;
  modalita: string;
  requisiti?: string;
  ente: string;
  icon: any;
  color: string;
}

const corsiData: Corso[] = [
  // PERCORSI ABILITANTI 60/30/36 CFU
  {
    id: "60-cfu",
    titolo: "Percorso Abilitante 60 CFU",
    categoria: "Abilitazione Insegnamento",
    livello: "60 CFU",
    descrizione: "Percorso universitario e accademico abilitante di formazione iniziale per l'insegnamento nelle scuole secondarie di primo e secondo grado, secondo il DPCM 4 agosto 2023.",
    dettagli: [
      "Fornisce l'abilitazione all'insegnamento per scuole secondarie",
      "Include tirocinio diretto in scuole convenzionate",
      "Copre discipline antropo-psico-pedagogiche e metodologie didattiche",
      "Permette l'inserimento in prima fascia GPS (docenti abilitati)",
      "Necessario per accedere ai concorsi per docenti",
      "Sostituisce i vecchi 24 CFU (non più conseguibili dopo 31/10/2022)"
    ],
    durata: "1 anno accademico",
    crediti: "60 CFU",
    punteggioGps: "Accesso prima fascia GPS",
    costo: "Da €1.880",
    modalita: "Blended (online + tirocinio in presenza)",
    requisiti: "Laurea magistrale o 180 CFU conseguiti. Possesso requisiti per accesso alla classe di concorso.",
    ente: "eCampus",
    icon: GraduationCap,
    color: "blue"
  },
  {
    id: "30-cfu-servizio",
    titolo: "Percorso Abilitante 30 CFU (con servizio)",
    categoria: "Abilitazione Insegnamento",
    livello: "30 CFU",
    descrizione: "Percorso abbreviato per docenti con esperienza di insegnamento. Riservato a chi ha almeno 3 anni di servizio (anche in scuole paritarie) negli ultimi 5 anni.",
    dettagli: [
      "Percorso abbreviato per docenti con esperienza",
      "Richiede almeno 3 anni di servizio negli ultimi 5 anni",
      "Fornisce abilitazione all'insegnamento",
      "Accesso a numero programmato",
      "Valido anche il servizio nelle scuole paritarie"
    ],
    durata: "6-8 mesi",
    crediti: "30 CFU",
    punteggioGps: "Accesso prima fascia GPS",
    costo: "Contattaci per info",
    modalita: "Blended",
    requisiti: "Almeno 3 anni di servizio di insegnamento negli ultimi 5 anni (anche paritarie)",
    ente: "eCampus",
    icon: Award,
    color: "green"
  },
  {
    id: "36-cfu",
    titolo: "Percorso Completamento 36 CFU",
    categoria: "Abilitazione Insegnamento",
    livello: "36 CFU",
    descrizione: "Percorso di completamento riservato ai vincitori di concorso che hanno conseguito i 24 CFU entro il 31 ottobre 2022.",
    dettagli: [
      "Riservato a vincitori di concorso",
      "Solo per chi ha conseguito 24 CFU entro 31/10/2022",
      "Completa il percorso abilitante",
      "Accesso libero (non a numero programmato)",
      "Valido se 24 CFU conseguiti entro 31/12/2024"
    ],
    durata: "6-8 mesi",
    crediti: "36 CFU",
    punteggioGps: "Completamento abilitazione",
    costo: "Contattaci per info",
    modalita: "Blended",
    requisiti: "Vincita concorso + 24 CFU conseguiti entro 31/10/2022",
    ente: "eCampus",
    icon: CheckCircle,
    color: "purple"
  },
  
  // CERTIFICAZIONI LINGUISTICHE
  {
    id: "cert-c2",
    titolo: "Certificazione Linguistica Inglese C2 - British Institutes",
    categoria: "Certificazioni Linguistiche",
    livello: "C2 CEFR",
    descrizione: "Certificazione linguistica inglese livello C2 rilasciata da British Institutes, riconosciuta dal MIUR e valida per concorsi e GPS. Il livello C2 (Mastery) attesta la padronanza completa della lingua inglese.",
    dettagli: [
      "Riconoscimento MIUR per concorsi pubblici e GPS",
      "Vale 6 punti nelle Graduatorie Provinciali Supplenze (GPS)",
      "Livello C2 = padronanza completa della lingua (Mastery)",
      "Corso di preparazione 100% online incluso",
      "Tutor dedicato per supporto durante la preparazione",
      "Esame ripetibile in caso di mancato superamento",
      "Certificato British Institutes riconosciuto internazionalmente",
      "Allineato al Common European Framework of Reference (CEFR)"
    ],
    durata: "Flessibile (corso online + esame)",
    crediti: "Certificazione linguistica",
    punteggioGps: "6 punti",
    costo: "Contattaci per info",
    modalita: "100% online (corso + esame Computer-Based)",
    requisiti: "Conoscenza avanzata della lingua inglese (consigliato test di livello preliminare)",
    ente: "British Institutes tramite eCampus",
    icon: Globe,
    color: "red"
  },
  {
    id: "cert-c1",
    titolo: "Certificazione Linguistica Inglese C1 - British Institutes",
    categoria: "Certificazioni Linguistiche",
    livello: "C1 CEFR",
    descrizione: "Certificazione linguistica inglese livello C1 rilasciata da British Institutes, riconosciuta dal MIUR. Il livello C1 (Advanced) attesta un'ottima padronanza della lingua inglese.",
    dettagli: [
      "Riconoscimento MIUR per concorsi e GPS",
      "Vale 4 punti nelle GPS",
      "Livello C1 = padronanza avanzata (Advanced)",
      "Corso di preparazione online con tutor",
      "Esame ripetibile",
      "Certificato British Institutes"
    ],
    durata: "Flessibile",
    crediti: "Certificazione linguistica",
    punteggioGps: "4 punti",
    costo: "Contattaci per info",
    modalita: "100% online",
    ente: "British Institutes tramite eCampus",
    icon: Globe,
    color: "orange"
  },
  {
    id: "cert-b2",
    titolo: "Certificazione Linguistica B2",
    categoria: "Certificazioni Linguistiche",
    livello: "B2 CEFR",
    descrizione: "Certificazione Pearson Test of English (PTE/PEIC) livello B2, riconosciuta dal MIUR.",
    dettagli: [
      "Riconoscimento MIUR",
      "Livello intermedio-avanzato",
      "Materiali preparazione completi",
      "Readiness Test incluso"
    ],
    durata: "Preparazione autonoma (12 mesi disponibili)",
    crediti: "2 CFU",
    punteggioGps: "3 punti",
    costo: "Contattaci per info",
    modalita: "Online + esame",
    ente: "eCampus - Pearson",
    icon: Globe,
    color: "yellow"
  },
  
  // CLIL
  {
    id: "clil",
    titolo: "Nuova didattica per le lingue: la metodologia CLIL",
    categoria: "Metodologie Didattiche",
    descrizione: "Corso di perfezionamento sulla metodologia CLIL (Content and Language Integrated Learning) per l'insegnamento di discipline non linguistiche in lingua straniera.",
    dettagli: [
      "Metodologia per insegnare discipline in lingua straniera",
      "Integra apprendimento linguistico e contenuti disciplinari",
      "Rivolto a docenti di lingue straniere (inglese, francese, spagnolo, tedesco)",
      "Valido anche per docenti di discipline non linguistiche",
      "Acquisizione competenze metodologiche CLIL",
      "Progettazione unità didattiche CLIL"
    ],
    durata: "1500 ore",
    crediti: "60 CFU",
    punteggioGps: "3 punti",
    costo: "€450-500",
    modalita: "100% online",
    requisiti: "Docenti e aspiranti docenti scuole secondarie",
    ente: "eCampus",
    icon: BookOpen,
    color: "indigo"
  },
  
  // MASTER L2
  {
    id: "master-l2",
    titolo: "L'insegnamento dell'italiano agli stranieri (L2)",
    categoria: "Master",
    descrizione: "Master di I livello per acquisire le competenze necessarie per insegnare l'italiano come lingua seconda e straniera presso istituzioni, enti e centri linguistici.",
    dettagli: [
      "Competenze richieste dal MUR per insegnare italiano L2",
      "Etnolinguistica, sociolinguistica e intercultura",
      "Linguistica italiana applicata a contesti scolastici multietniciRead more",
      "Didattica dell'italiano L2",
      "Metodologie e tecniche per l'insegnamento",
      "Valutazione e certificazione competenze linguistiche"
    ],
    durata: "1500 ore",
    crediti: "60 CFU",
    punteggioGps: "3 punti",
    costo: "€1.500-1.800",
    modalita: "100% online",
    requisiti: "Laurea triennale o magistrale",
    ente: "eCampus",
    icon: BookOpen,
    color: "teal"
  },
  
  // CERTIFICAZIONI INFORMATICHE
  {
    id: "cert-informatiche",
    titolo: "Certificazioni Informatiche",
    categoria: "Certificazioni Informatiche",
    descrizione: "Certificazioni informatiche riconosciute dal MIUR (EIPASS, PEKIT, ECDL/ICDL) per aumentare il punteggio GPS.",
    dettagli: [
      "Enti accreditati MIUR: EIPASS, PEKIT, ECDL/ICDL",
      "Uso del computer e gestione file",
      "Elaborazione testi e fogli di calcolo",
      "Presentazioni e internet",
      "Sicurezza informatica",
      "Fino a 4 certificazioni per massimo punteggio"
    ],
    durata: "Variabile",
    crediti: "Variabile",
    punteggioGps: "0,5 punti ciascuna (max 2 punti = 4 certificazioni)",
    costo: "Contattaci per info",
    modalita: "Esami online",
    ente: "Vari enti accreditati",
    icon: Laptop,
    color: "gray"
  }
];

export default function Corsi() {
  const [selectedCorso, setSelectedCorso] = useState<Corso | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefono: "",
    messaggio: ""
  });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleRichiestaInfo = (corso: Corso) => {
    setSelectedCorso(corso);
    setShowForm(true);
    setFormData({ ...formData, messaggio: `Richiedo informazioni sul corso: ${corso.titolo}` });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    
    // TODO: Implementare chiamata API
    setTimeout(() => {
      setFormStatus("success");
      setTimeout(() => {
        setShowForm(false);
        setFormStatus("idle");
        setFormData({ nome: "", email: "", telefono: "", messaggio: "" });
      }, 2000);
    }, 1000);
  };

  const categorie = Array.from(new Set(corsiData.map(c => c.categoria)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <GraduationCap className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Corsi di Formazione
          </h1>
          <p className="text-xl text-gray-600">
            Percorsi abilitanti, certificazioni linguistiche e informatiche, master e corsi di perfezionamento per aumentare il tuo punteggio GPS
          </p>
        </div>

        {/* Info Box Importante */}
        <Card className="max-w-4xl mx-auto mb-12 border-l-4 border-blue-500">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Informazioni Importanti</h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  I percorsi formativi 60/30/36 CFU sono regolati dal <strong>DPCM 4 agosto 2023</strong> e dal <strong>D.Lgs. 59/2017</strong>. 
                  L'accesso ai percorsi 60 CFU e 30 CFU (con servizio) è <strong>a numero programmato</strong>, 
                  mentre i percorsi 30/36 CFU per vincitori di concorso sono ad accesso libero.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Le certificazioni linguistiche e informatiche sono riconosciute dal MIUR e valutabili nelle GPS. 
                  Compila il form "Richiedi Info" per ricevere dettagli su costi, modalità di iscrizione e prossime sessioni.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Corsi per Categoria */}
        {categorie.map((categoria) => (
          <div key={categoria} className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              {categoria}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {corsiData
                .filter(c => c.categoria === categoria)
                .map((corso) => {
                  const Icon = corso.icon;
                  return (
                    <Card key={corso.id} className="shadow-lg hover:shadow-xl transition-shadow">
                      <CardHeader className={`bg-${corso.color}-50 border-b border-${corso.color}-100`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className={`inline-flex items-center justify-center w-12 h-12 bg-${corso.color}-100 rounded-lg mb-3`}>
                              <Icon className={`w-6 h-6 text-${corso.color}-600`} />
                            </div>
                            <CardTitle className="text-xl mb-2">{corso.titolo}</CardTitle>
                            {corso.livello && (
                              <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full bg-${corso.color}-100 text-${corso.color}-700`}>
                                {corso.livello}
                              </span>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                          {corso.descrizione}
                        </p>

                        <div className="space-y-3 mb-6">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700"><strong>Durata:</strong> {corso.durata}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Award className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700"><strong>Crediti:</strong> {corso.crediti}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-gray-700"><strong>Punteggio GPS:</strong> {corso.punteggioGps}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Euro className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700"><strong>Costo:</strong> {corso.costo}</span>
                          </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4 mb-4">
                          <p className="text-xs text-gray-500 mb-2"><strong>Modalità:</strong> {corso.modalita}</p>
                          <p className="text-xs text-gray-500"><strong>Ente:</strong> {corso.ente}</p>
                        </div>

                        <Button 
                          onClick={() => handleRichiestaInfo(corso)}
                          className="w-full"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Richiedi Informazioni
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </div>
        ))}

        {/* Modal Form Richiesta Info */}
        {showForm && selectedCorso && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Richiedi Informazioni</span>
                  <button 
                    onClick={() => setShowForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </CardTitle>
                <p className="text-sm text-gray-600 mt-2">
                  {selectedCorso.titolo}
                </p>
              </CardHeader>
              <CardContent>
                {formStatus === "success" ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Richiesta Inviata!
                    </h3>
                    <p className="text-gray-600">
                      Ti contatteremo presto per fornirti tutte le informazioni richieste.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome e Cognome *
                      </label>
                      <Input
                        required
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                        placeholder="Mario Rossi"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <Input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="mario.rossi@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefono *
                      </label>
                      <Input
                        required
                        type="tel"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        placeholder="3XX XXXXXXX"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Messaggio
                      </label>
                      <Textarea
                        value={formData.messaggio}
                        onChange={(e) => setFormData({ ...formData, messaggio: e.target.value })}
                        rows={4}
                        placeholder="Scrivi qui eventuali domande o richieste specifiche..."
                      />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-xs text-gray-600">
                        Inviando questo form accetti la nostra{" "}
                        <a href="/privacy-policy" className="text-blue-600 hover:underline">
                          Privacy Policy
                        </a>
                        . I tuoi dati verranno utilizzati esclusivamente per fornirti informazioni sui corsi richiesti.
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowForm(false)}
                        className="flex-1"
                        disabled={formStatus === "sending"}
                      >
                        Annulla
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1"
                        disabled={formStatus === "sending"}
                      >
                        {formStatus === "sending" ? "Invio..." : "Invia Richiesta"}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
