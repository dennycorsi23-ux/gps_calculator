export function TermsConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Termini e Condizioni
          </h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p className="text-sm text-gray-500">
              Ultimo aggiornamento: {new Date().toLocaleDateString("it-IT")}
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                1. Accettazione dei Termini
              </h2>
              <p>
                Utilizzando questo sito web, accetti di essere vincolato dai presenti Termini e Condizioni. 
                Se non accetti questi termini, ti preghiamo di non utilizzare il sito.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                2. Descrizione del Servizio
              </h2>
              <p>
                Il sito <strong>GPS Calculator</strong> fornisce uno strumento gratuito per il calcolo 
                del punteggio GPS (Graduatorie Provinciali per le Supplenze) e informazioni sulle 
                classi di concorso accessibili in base ai titoli di studio.
              </p>
              <p className="mt-4">
                Il servizio è fornito a scopo informativo. I risultati del calcolo sono indicativi 
                e basati sui dati storici disponibili. Non garantiamo l'accuratezza assoluta dei 
                risultati né l'inserimento effettivo nelle graduatorie.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                3. Utilizzo del Sito
              </h2>
              <p>L'utente si impegna a:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Utilizzare il sito in modo lecito e conforme alle leggi vigenti</li>
                <li>Non tentare di accedere a aree riservate o protette del sito</li>
                <li>Non utilizzare il sito per scopi commerciali non autorizzati</li>
                <li>Non diffondere contenuti offensivi, diffamatori o illegali</li>
                <li>Fornire informazioni veritiere nei form di contatto</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                4. Proprietà Intellettuale
              </h2>
              <p>
                Tutti i contenuti presenti sul sito (testi, immagini, loghi, grafica, codice) 
                sono protetti da diritti d'autore e proprietà intellettuale. È vietata la 
                riproduzione, distribuzione o modifica senza autorizzazione scritta.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                5. Limitazione di Responsabilità
              </h2>
              <p>
                Il sito e i suoi contenuti sono forniti "così come sono" senza garanzie di alcun tipo. 
                Non siamo responsabili per:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Eventuali errori o imprecisioni nei calcoli o nelle informazioni fornite</li>
                <li>Danni diretti o indiretti derivanti dall'uso del sito</li>
                <li>Interruzioni del servizio o malfunzionamenti tecnici</li>
                <li>Decisioni prese dall'utente basandosi sulle informazioni del sito</li>
              </ul>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4">
                <p className="font-semibold text-yellow-900">⚠️ Importante:</p>
                <p className="mt-2">
                  I punteggi calcolati e le probabilità di inserimento sono puramente indicativi. 
                  Per informazioni ufficiali, consultare sempre il sito del Ministero dell'Istruzione 
                  e gli uffici scolastici provinciali competenti.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                6. Privacy e Trattamento Dati
              </h2>
              <p>
                Il trattamento dei dati personali è regolato dalla nostra{" "}
                <a href="/privacy" className="text-blue-600 hover:text-blue-800 underline">
                  Privacy Policy
                </a>
                . Utilizzando il sito, accetti il trattamento dei tuoi dati come descritto 
                nella Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                7. Link Esterni
              </h2>
              <p>
                Il sito può contenere link a siti web di terze parti. Non siamo responsabili 
                per il contenuto, le politiche sulla privacy o le pratiche di questi siti esterni.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                8. Modifiche ai Termini
              </h2>
              <p>
                Ci riserviamo il diritto di modificare questi Termini e Condizioni in qualsiasi 
                momento. Le modifiche entreranno in vigore immediatamente dopo la pubblicazione 
                sul sito. L'uso continuato del sito dopo le modifiche costituisce accettazione 
                dei nuovi termini.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                9. Legge Applicabile
              </h2>
              <p>
                I presenti Termini e Condizioni sono regolati dalla legge italiana. 
                Per qualsiasi controversia sarà competente il foro di residenza del consumatore.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
