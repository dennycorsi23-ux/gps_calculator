import { Sparkles, AlertCircle, CheckCircle, Calendar, Users, FileText, Clock } from "lucide-react";

export function NewsGPS2026() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-12 md:py-16">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl">
                <Sparkles className="w-12 h-12 md:w-16 md:h-16" />
              </div>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Novità GPS 2026
            </h1>
            
            <p className="text-lg md:text-xl text-white/90">
              Tutte le novità e i cambiamenti normativi per l'aggiornamento GPS 2026-2028
            </p>
          </div>
        </div>
      </div>

      <main className="container py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Tempistiche */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-3 rounded-xl">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                📅 Tempistiche Aggiornamento GPS 2026/28
              </h2>
            </div>
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="leading-relaxed mb-4">
                Il prossimo aggiornamento delle <strong>Graduatorie Provinciali per le Supplenze (GPS)</strong> è previsto per la 
                <strong> primavera 2026</strong>. Le graduatorie avranno validità biennale e copriranno gli anni scolastici 
                <strong> 2026/27 e 2027/28</strong>.
              </p>
              
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-xl mt-4">
                <p className="text-blue-900 font-semibold mb-2">
                  ⏰ Tempistiche Previste (da confermare dal MIUR):
                </p>
                <ul className="list-disc list-inside space-y-1 text-blue-800">
                  <li>Apertura domande: <strong>Primavera 2026</strong></li>
                  <li>Pubblicazione graduatorie: <strong>Estate 2026</strong></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Novità Principali */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-100 p-3 rounded-xl">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                ✅ Novità Principali GPS 2026
              </h2>
            </div>
            
            <div className="space-y-6">
              {/* Novità 1 */}
              <div className="border-l-4 border-green-500 pl-6 py-2">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  1. Nuove Classi di Concorso
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Sono state introdotte <strong>nuove classi di concorso</strong> per rispondere alle esigenze del sistema scolastico. 
                  Verifica se la tua laurea ti permette di accedere a queste nuove opportunità.
                </p>
              </div>

              {/* Novità 2 */}
              <div className="border-l-4 border-blue-500 pl-6 py-2">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  2. Requisiti CFU Aggiornati
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  I <strong>requisiti di CFU</strong> per alcune classi di concorso sono stati modificati. È fondamentale verificare 
                  di possedere tutti i CFU richiesti nei settori scientifico-disciplinari (SSD) previsti.
                </p>
              </div>

              {/* Novità 3 */}
              <div className="border-l-4 border-purple-500 pl-6 py-2">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  3. Valutazione Titoli Culturali
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Sono stati <strong>rivalutati i punteggi</strong> per alcune certificazioni linguistiche e informatiche. 
                  Le certificazioni di livello C2 e i percorsi CLIL continuano a garantire il massimo punteggio.
                </p>
              </div>

              {/* Novità 4 */}
              <div className="border-l-4 border-orange-500 pl-6 py-2">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  4. Procedura Telematica Semplificata
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  La <strong>piattaforma MIUR</strong> per la presentazione delle domande è stata rinnovata per rendere la procedura 
                  più intuitiva e veloce. Sarà possibile salvare bozze e modificare la domanda fino alla scadenza.
                </p>
              </div>

              {/* Novità 5 - Certificazioni Informatiche Accreditate */}
              <div className="border-l-4 border-cyan-500 pl-6 py-2">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  5. Certificazioni Informatiche Accreditate
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Dal 2026, le <strong>certificazioni informatiche</strong> devono essere rilasciate esclusivamente da <strong>enti accreditati Accredia</strong> e 
                  devono essere <strong>in linea con i framework DigComp 2.2 e DigCompEdu</strong>. Solo le certificazioni conformi a questi standard 
                  saranno riconosciute per l'attribuzione del punteggio GPS.
                </p>
              </div>
            </div>
          </div>

          {/* Cosa Fare Ora */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-orange-100 p-3 rounded-xl">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                🎯 Cosa Fare Ora per Prepararsi
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Step 1 */}
              <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-blue-600 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center">
                    1
                  </span>
                  <h3 className="font-bold text-gray-900">Verifica i Requisiti</h3>
                </div>
                <p className="text-gray-700">
                  Controlla di possedere il titolo di studio e i CFU richiesti per la classe di concorso di tuo interesse.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-green-600 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center">
                    2
                  </span>
                  <h3 className="font-bold text-gray-900">Acquisisci Certificazioni</h3>
                </div>
                <p className="text-gray-700">
                  Inizia subito a conseguire certificazioni linguistiche (C1/C2), CLIL e informatiche per aumentare il punteggio.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-purple-600 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center">
                    3
                  </span>
                  <h3 className="font-bold text-gray-900">Calcola il Punteggio</h3>
                </div>
                <p className="text-gray-700">
                  Usa il nostro calcolatore GPS per stimare il tuo punteggio attuale e capire dove puoi migliorare.
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-white rounded-xl p-6 border-2 border-orange-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-orange-600 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center">
                    4
                  </span>
                  <h3 className="font-bold text-gray-900">Resta Aggiornato</h3>
                </div>
                <p className="text-gray-700">
                  Segui le comunicazioni ufficiali del MIUR e rimani informato su tutte le novità e le scadenze.
                </p>
              </div>
            </div>
          </div>

          {/* Alert Importante */}
          <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl shadow-lg p-8 md:p-10 text-white">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-8 h-8 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold mb-3">
                  ⚠️ Attenzione alle Scadenze
                </h3>
                <p className="text-white/90 leading-relaxed text-lg">
                  Le finestre temporali per presentare domanda sono <strong>molto brevi</strong>. Preparati con anticipo raccogliendo 
                  tutta la documentazione necessaria e assicurandoti di avere le credenziali SPID/CIE per accedere alla piattaforma MIUR.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
