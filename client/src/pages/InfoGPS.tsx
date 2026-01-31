import { Info, GraduationCap, Award, Clock, Languages, Laptop, BookOpen } from "lucide-react";

export function InfoGPS() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-12 md:py-16">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl">
                <Info className="w-12 h-12 md:w-16 md:h-16" />
              </div>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Guida alle Graduatorie GPS
            </h1>
            
            <p className="text-lg md:text-xl text-white/90">
              Tutto quello che devi sapere su punteggi, fasce e strategie
            </p>
          </div>
        </div>
      </div>

      <main className="container py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Cosa sono le GPS */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-100 p-3 rounded-xl">
                <GraduationCap className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Cosa sono le Graduatorie GPS?
              </h2>
            </div>
            
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p className="leading-relaxed">
                Le <strong>Graduatorie Provinciali per le Supplenze (GPS)</strong> sono lo strumento principale 
                utilizzato dagli Uffici Scolastici Provinciali (USP) per l'assegnazione degli incarichi di supplenza 
                nelle scuole dell'Infanzia, Primarie e Secondarie di I e II grado.
              </p>
              
              <p className="leading-relaxed">
                Vengono utilizzate per la copertura di:
              </p>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Supplenze annuali (31 agosto)</strong>: cattedre vacanti fino alla fine dell'anno scolastico</li>
                <li><strong>Supplenze temporanee (30 giugno)</strong>: cattedre scoperte per il periodo delle attività didattiche</li>
              </ul>
            </div>
          </div>

          {/* Fasce GPS */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-3 rounded-xl">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Le Fasce delle GPS
              </h2>
            </div>
            
            <div className="space-y-8">
              {/* Infanzia e Primaria */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">Scuola dell'Infanzia e Primaria</h3>
                <div className="grid gap-4">
                  <div className="p-5 rounded-xl bg-green-50 border-2 border-green-200">
                    <div className="inline-block bg-green-600 text-white font-bold px-3 py-1 rounded-lg text-sm mb-3">
                      I Fascia
                    </div>
                    <p className="text-gray-700">
                      Soggetti in possesso dell'<strong>abilitazione</strong>: laurea in Scienze della Formazione Primaria 
                      o diploma magistrale conseguito entro il 2001/2002
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-yellow-50 border-2 border-yellow-200">
                    <div className="inline-block bg-yellow-600 text-white font-bold px-3 py-1 rounded-lg text-sm mb-3">
                      II Fascia
                    </div>
                    <p className="text-gray-700">
                      Studenti del corso di laurea in Scienze della Formazione Primaria dal 3°, 4° e 5° anno 
                      (con 150, 200 o 250 CFU conseguiti)
                    </p>
                  </div>
                </div>
              </div>

              {/* Secondaria */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">Scuola Secondaria di I e II Grado</h3>
                <div className="grid gap-4">
                  <div className="p-5 rounded-xl bg-green-50 border-2 border-green-200">
                    <div className="inline-block bg-green-600 text-white font-bold px-3 py-1 rounded-lg text-sm mb-3">
                      I Fascia
                    </div>
                    <p className="text-gray-700">Docenti già <strong>abilitati</strong></p>
                  </div>

                  <div className="p-5 rounded-xl bg-yellow-50 border-2 border-yellow-200">
                    <div className="inline-block bg-yellow-600 text-white font-bold px-3 py-1 rounded-lg text-sm mb-3">
                      II Fascia
                    </div>
                    <p className="text-gray-700">
                      Docenti in possesso del titolo di accesso + 24 CFU, oppure abilitazione su altra classe 
                      di concorso, oppure già inseriti nelle GPS per la stessa classe
                    </p>
                  </div>
                </div>
              </div>

              {/* Sostegno */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">Posto di Sostegno</h3>
                <div className="grid gap-4">
                  <div className="p-5 rounded-xl bg-green-50 border-2 border-green-200">
                    <div className="inline-block bg-green-600 text-white font-bold px-3 py-1 rounded-lg text-sm mb-3">
                      I Fascia
                    </div>
                    <p className="text-gray-700">Docenti <strong>specializzati</strong> su sostegno nel relativo grado</p>
                  </div>

                  <div className="p-5 rounded-xl bg-yellow-50 border-2 border-yellow-200">
                    <div className="inline-block bg-yellow-600 text-white font-bold px-3 py-1 rounded-lg text-sm mb-3">
                      II Fascia
                    </div>
                    <p className="text-gray-700">
                      Soggetti con almeno 3 anni di servizio su sostegno oppure in possesso del titolo 
                      di accesso alle GPS di II fascia
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Punteggio Voto di Laurea */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-cyan-100 p-3 rounded-xl">
                <GraduationCap className="w-8 h-8 text-cyan-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Punteggio Voto di Laurea
              </h2>
            </div>
            
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed text-lg">
                Il punteggio base parte da <strong>12 punti</strong> per un voto di 76/110 o inferiore. 
                Per ogni voto superiore a 76 si aggiungono <strong>0,5 punti</strong>.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left py-3 px-4 font-bold text-gray-900 border-b-2 border-gray-300">Voto</th>
                      <th className="text-right py-3 px-4 font-bold text-gray-900 border-b-2 border-gray-300">Punteggio</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-900 border-b-2 border-gray-300">Voto</th>
                      <th className="text-right py-3 px-4 font-bold text-gray-900 border-b-2 border-gray-300">Punteggio</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4">≤ 76</td>
                      <td className="text-right py-3 px-4 font-mono">12</td>
                      <td className="py-3 px-4">95</td>
                      <td className="text-right py-3 px-4 font-mono">21.5</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="py-3 px-4">80</td>
                      <td className="text-right py-3 px-4 font-mono">14</td>
                      <td className="py-3 px-4">100</td>
                      <td className="text-right py-3 px-4 font-mono">24</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4">85</td>
                      <td className="text-right py-3 px-4 font-mono">16.5</td>
                      <td className="py-3 px-4">105</td>
                      <td className="text-right py-3 px-4 font-mono">26.5</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="py-3 px-4">90</td>
                      <td className="text-right py-3 px-4 font-mono">19</td>
                      <td className="py-3 px-4 font-bold">110</td>
                      <td className="text-right py-3 px-4 font-mono font-bold">29</td>
                    </tr>
                    <tr className="bg-green-50 border-b-2 border-green-300">
                      <td colSpan={2}></td>
                      <td className="py-3 px-4 font-bold text-green-800">110 e lode</td>
                      <td className="text-right py-3 px-4 font-mono font-bold text-green-800 text-lg">33</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Punteggio Servizio */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-100 p-3 rounded-xl">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Punteggio per Servizio (Supplenze)
              </h2>
            </div>
            
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed text-lg">
                Le supplenze rappresentano una delle principali fonti di punteggio. 
                Il punteggio varia in base alla durata e al tipo di servizio.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Servizio Specifico */}
                <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                  <h4 className="font-bold text-gray-900 text-lg mb-2">Servizio Specifico</h4>
                  <p className="text-sm text-gray-600 mb-4">Nella propria classe di concorso</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2 border-b border-blue-200">
                      <span>16-45 giorni</span>
                      <span className="font-mono font-bold">2 pt</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-blue-200">
                      <span>46-75 giorni</span>
                      <span className="font-mono font-bold">4 pt</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-blue-200">
                      <span>76-105 giorni</span>
                      <span className="font-mono font-bold">6 pt</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-blue-200">
                      <span>106-135 giorni</span>
                      <span className="font-mono font-bold">8 pt</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-blue-200">
                      <span>136-165 giorni</span>
                      <span className="font-mono font-bold">10 pt</span>
                    </div>
                    <div className="flex justify-between py-2 font-bold text-blue-900">
                      <span>≥ 166 giorni</span>
                      <span className="font-mono text-lg">12 pt</span>
                    </div>
                  </div>
                </div>

                {/* Servizio Aspecifico */}
                <div className="bg-orange-50 rounded-xl p-6 border-2 border-orange-200">
                  <h4 className="font-bold text-gray-900 text-lg mb-2">Servizio Aspecifico</h4>
                  <p className="text-sm text-gray-600 mb-4">In classe di concorso diversa</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2 border-b border-orange-200">
                      <span>16-45 giorni</span>
                      <span className="font-mono font-bold">1 pt</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-orange-200">
                      <span>46-75 giorni</span>
                      <span className="font-mono font-bold">2 pt</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-orange-200">
                      <span>76-105 giorni</span>
                      <span className="font-mono font-bold">3 pt</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-orange-200">
                      <span>106-135 giorni</span>
                      <span className="font-mono font-bold">4 pt</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-orange-200">
                      <span>136-165 giorni</span>
                      <span className="font-mono font-bold">5 pt</span>
                    </div>
                    <div className="flex justify-between py-2 font-bold text-orange-900">
                      <span>≥ 166 giorni</span>
                      <span className="font-mono text-lg">6 pt</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-xl">
                <p className="text-blue-900 font-semibold">
                  <strong>Nota:</strong> Anche le supplenze da MAD (Messa a Disposizione) danno diritto al punteggio pieno!
                </p>
              </div>
            </div>
          </div>

          {/* Certificazioni Linguistiche */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-indigo-100 p-3 rounded-xl">
                <Languages className="w-8 h-8 text-indigo-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Certificazioni Linguistiche
              </h2>
            </div>
            
            <div className="space-y-4">
              <div className="grid gap-3">
                <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border-2 border-gray-200">
                  <span className="font-semibold text-gray-900">Inglese B2</span>
                  <span className="bg-blue-100 text-blue-800 font-bold px-4 py-2 rounded-lg">3 punti</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border-2 border-gray-200">
                  <span className="font-semibold text-gray-900">Inglese C1</span>
                  <span className="bg-green-100 text-green-800 font-bold px-4 py-2 rounded-lg">4 punti</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border-2 border-gray-200">
                  <span className="font-semibold text-gray-900">Inglese C2</span>
                  <span className="bg-green-100 text-green-800 font-bold px-4 py-2 rounded-lg">6 punti</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-green-50 border-2 border-green-300">
                  <span className="font-bold text-green-900">CLIL + Certificazione Linguistica</span>
                  <span className="bg-green-600 text-white font-bold px-4 py-2 rounded-lg">+3 punti</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-100 to-cyan-100 border-2 border-green-300 rounded-xl p-6">
                <div className="font-bold text-gray-900 mb-2">Esempio Massimo Punteggio:</div>
                <div className="text-lg">
                  Inglese C2 (6 pt) + CLIL (3 pt) = <span className="font-bold text-green-700 text-xl">9 punti</span>
                </div>
              </div>
            </div>
          </div>

          {/* Master e Perfezionamenti */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-orange-100 p-3 rounded-xl">
                <BookOpen className="w-8 h-8 text-orange-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Master e Perfezionamenti
              </h2>
            </div>
            
            <div className="grid gap-3">
              <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border-2 border-gray-200">
                <span className="font-semibold text-gray-900">Master I o II livello (60 CFU)</span>
                <span className="bg-purple-100 text-purple-800 font-bold px-4 py-2 rounded-lg">1 punto</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border-2 border-gray-200">
                <span className="font-semibold text-gray-900">Corso di Perfezionamento (60 CFU)</span>
                <span className="bg-purple-100 text-purple-800 font-bold px-4 py-2 rounded-lg">1 punto</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-purple-50 border-2 border-purple-300">
                <span className="font-bold text-purple-900">Master in L2 (Didattica Italiano L2)</span>
                <span className="bg-purple-600 text-white font-bold px-4 py-2 rounded-lg">3 punti</span>
              </div>
            </div>
          </div>

          {/* Certificazioni Informatiche */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-3 rounded-xl">
                <Laptop className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Certificazioni Informatiche
              </h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Ogni certificazione informatica vale <strong>0,5 punti</strong>, fino a un massimo di <strong>2 punti</strong> (4 certificazioni).
              </p>

              <div className="grid gap-3">
                <div className="p-5 rounded-xl bg-blue-50 border-2 border-blue-200">
                  <div className="font-bold text-gray-900 mb-2">In linea al DigComp 2.2 (0.5 pt)</div>
                  <p className="text-sm text-gray-600">
                    EIPASS User, EIPASS Standard, IDPASS EDSC DigComp 2.2, IDCERT DigComp 2.2
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-indigo-50 border-2 border-indigo-200">
                  <div className="font-bold text-gray-900 mb-2">In linea al DigComp Edu (1 pt)</div>
                  <p className="text-sm text-gray-600">
                    EIPASS DigCompEdu, IDPASS DigCompEdu, IDCERT DigCompEdu
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
