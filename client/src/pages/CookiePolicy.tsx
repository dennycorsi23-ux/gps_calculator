export function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Cookie Policy
          </h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p className="text-sm text-gray-500">
              Ultimo aggiornamento: {new Date().toLocaleDateString("it-IT")}
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                Cosa sono i cookie
              </h2>
              <p>
                I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo 
                quando visiti un sito web. Vengono utilizzati per migliorare la tua esperienza 
                di navigazione e per fornire funzionalità essenziali del sito.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                Tipologie di cookie utilizzati
              </h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
                1. Cookie Tecnici (Necessari)
              </h3>
              <p>
                Questi cookie sono essenziali per il corretto funzionamento del sito. 
                Permettono di navigare tra le pagine e utilizzare le funzionalità di base. 
                Senza questi cookie, il sito non può funzionare correttamente.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Cookie di sessione per la navigazione</li>
                <li>Cookie per memorizzare le preferenze dell'utente</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
                2. Cookie Analitici
              </h3>
              <p>
                Utilizziamo cookie analitici per raccogliere informazioni aggregate su come 
                i visitatori utilizzano il nostro sito. Questi dati ci aiutano a migliorare 
                il sito e l'esperienza utente.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Numero di visitatori</li>
                <li>Pagine più visitate</li>
                <li>Tempo di permanenza sul sito</li>
                <li>Provenienza geografica (a livello aggregato)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                Gestione dei cookie
              </h2>
              <p>
                Puoi gestire o disabilitare i cookie attraverso le impostazioni del tuo browser. 
                Tieni presente che la disabilitazione di alcuni cookie potrebbe influire sulla 
                funzionalità del sito.
              </p>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
                <p className="font-semibold text-blue-900">Come disabilitare i cookie:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li><strong>Chrome:</strong> Impostazioni → Privacy e sicurezza → Cookie</li>
                  <li><strong>Firefox:</strong> Opzioni → Privacy e sicurezza → Cookie e dati dei siti</li>
                  <li><strong>Safari:</strong> Preferenze → Privacy → Gestisci dati siti web</li>
                  <li><strong>Edge:</strong> Impostazioni → Cookie e autorizzazioni sito</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                Cookie di terze parti
              </h2>
              <p>
                Il nostro sito potrebbe contenere link a siti web di terze parti. 
                Non siamo responsabili per le politiche sulla privacy o sui cookie 
                di questi siti esterni.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                Aggiornamenti
              </h2>
              <p>
                Questa Cookie Policy può essere aggiornata periodicamente. 
                Ti consigliamo di consultare regolarmente questa pagina per 
                rimanere informato su eventuali modifiche.
              </p>
            </section>


          </div>
        </div>
      </div>
    </div>
  );
}
