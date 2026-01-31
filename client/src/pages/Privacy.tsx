import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ArrowLeft, Shield } from "lucide-react";

export default function Privacy() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/20 blur-[120px]" />
      </div>

      <main className="container relative z-10 py-12 md:py-20 max-w-4xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            className="mb-6 text-white/70 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Torna al Calcolatore
          </Button>

          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Privacy Policy
            </h1>
          </div>
          <p className="text-lg text-white/70">
            Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR)
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-panel p-8 md:p-12 space-y-8 text-white/90"
        >
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Titolare del Trattamento</h2>
            <p className="leading-relaxed">
              Il Titolare del trattamento dei dati personali raccolti tramite il presente sito web è [INSERIRE RAGIONE SOCIALE], 
              con sede legale in [INSERIRE INDIRIZZO COMPLETO], contattabile all'indirizzo email [INSERIRE EMAIL] 
              e al numero di telefono [INSERIRE TELEFONO].
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Dati Raccolti e Finalità del Trattamento</h2>
            <p className="leading-relaxed mb-4">
              Attraverso il modulo di calcolo del punteggio GPS, raccogliamo i seguenti dati personali:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Nome e Cognome</li>
              <li>Indirizzo email</li>
              <li>Numero di cellulare</li>
              <li>Classe di concorso di interesse</li>
              <li>Titoli di studio e certificazioni (voto di laurea, certificazioni linguistiche e informatiche)</li>
            </ul>
            <p className="leading-relaxed mt-4">
              <strong>Finalità del trattamento:</strong> I dati raccolti vengono utilizzati esclusivamente per:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
              <li>Fornire il servizio di calcolo del punteggio GPS e analisi delle province</li>
              <li>Contattare l'interessato tramite email e telefono per fornire informazioni relative alle Graduatorie Provinciali per le Supplenze</li>
              <li>Inviare comunicazioni di carattere informativo e promozionale relative ai servizi offerti</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Base Giuridica del Trattamento</h2>
            <p className="leading-relaxed">
              Il trattamento dei dati personali si basa sul <strong>consenso esplicito</strong> dell'interessato, 
              manifestato mediante la spunta del checkbox presente nel modulo di raccolta dati.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Modalità di Trattamento</h2>
            <p className="leading-relaxed">
              I dati personali sono trattati con strumenti automatizzati per il tempo strettamente necessario 
              a conseguire gli scopi per cui sono stati raccolti. Specifiche misure di sicurezza sono osservate 
              per prevenire la perdita dei dati, usi illeciti o non corretti ed accessi non autorizzati.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Comunicazione e Diffusione dei Dati</h2>
            <p className="leading-relaxed">
              I dati personali raccolti non saranno diffusi a terzi. Potranno essere comunicati esclusivamente 
              a soggetti che collaborano con il Titolare per l'erogazione dei servizi richiesti, previa 
              sottoscrizione di accordi di riservatezza e protezione dei dati.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Periodo di Conservazione</h2>
            <p className="leading-relaxed">
              I dati personali saranno conservati per un periodo massimo di <strong>24 mesi</strong> dalla 
              data di raccolta, salvo diversa richiesta dell'interessato o necessità di conservazione per 
              adempimenti di legge.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Diritti dell'Interessato</h2>
            <p className="leading-relaxed mb-4">
              L'interessato ha il diritto di:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Accesso:</strong> Ottenere conferma dell'esistenza dei propri dati personali e riceverne copia</li>
              <li><strong>Rettifica:</strong> Richiedere la correzione di dati inesatti o l'integrazione di dati incompleti</li>
              <li><strong>Cancellazione:</strong> Richiedere la cancellazione dei propri dati personali</li>
              <li><strong>Limitazione:</strong> Richiedere la limitazione del trattamento dei propri dati</li>
              <li><strong>Portabilità:</strong> Ricevere i propri dati in formato strutturato e trasmetterli ad altro titolare</li>
              <li><strong>Opposizione:</strong> Opporsi al trattamento dei propri dati personali</li>
              <li><strong>Revoca del consenso:</strong> Revocare il consenso in qualsiasi momento, senza pregiudicare la liceità del trattamento basata sul consenso prestato prima della revoca</li>
            </ul>
            <p className="leading-relaxed mt-4">
              Per esercitare i propri diritti, l'interessato può contattare il Titolare all'indirizzo email 
              [INSERIRE EMAIL] o tramite raccomandata A/R all'indirizzo [INSERIRE INDIRIZZO POSTALE].
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Diritto di Reclamo</h2>
            <p className="leading-relaxed">
              L'interessato ha il diritto di proporre reclamo all'Autorità Garante per la Protezione dei Dati Personali 
              (www.garanteprivacy.it) qualora ritenga che il trattamento dei propri dati personali violi il Regolamento UE 2016/679.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Modifiche alla Privacy Policy</h2>
            <p className="leading-relaxed">
              Il Titolare si riserva il diritto di modificare la presente Privacy Policy in qualsiasi momento. 
              Le modifiche saranno pubblicate su questa pagina con indicazione della data di ultimo aggiornamento.
            </p>
            <p className="text-sm text-white/60 mt-4">
              <strong>Ultimo aggiornamento:</strong> 11 Dicembre 2024
            </p>
          </section>

          <div className="pt-8 border-t border-white/10">
            <Button
              onClick={() => setLocation("/")}
              className="bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary shadow-lg"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Torna al Calcolatore
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
