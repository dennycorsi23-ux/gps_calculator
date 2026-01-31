import { Link } from "wouter";
import { ArrowRight, BookOpen, GraduationCap, Award, Briefcase, Globe, CheckCircle, TrendingUp, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function GuideAumentarePunteggio() {
  const titoliPunteggi = [
    {
      categoria: "Titoli di Accesso",
      icon: <GraduationCap className="w-6 h-6" />,
      color: "blue",
      titoli: [
        { nome: "Laurea Magistrale/Specialistica", punti: "Variabile", note: "Base per l'accesso alle GPS" },
        { nome: "Diploma (per ITP)", punti: "Variabile", note: "Per classi di concorso tecnico-pratiche" },
        { nome: "Diploma Magistrale ante 2001/02", punti: "Variabile", note: "Per infanzia e primaria" },
      ]
    },
    {
      categoria: "Abilitazioni e Specializzazioni",
      icon: <Award className="w-6 h-6" />,
      color: "green",
      titoli: [
        { nome: "Abilitazione all'insegnamento", punti: "12", note: "Conseguita tramite concorso o TFA" },
        { nome: "Specializzazione sul sostegno", punti: "30", note: "TFA Sostegno - molto richiesto" },
        { nome: "Abilitazione scientifica nazionale", punti: "12", note: "Per docenti universitari" },
      ]
    },
    {
      categoria: "Titoli Accademici",
      icon: <BookOpen className="w-6 h-6" />,
      color: "purple",
      titoli: [
        { nome: "Dottorato di ricerca", punti: "12", note: "Attinente alla classe di concorso" },
        { nome: "Diploma di specializzazione", punti: "6", note: "Conseguito in università" },
        { nome: "Master universitario di I livello", punti: "3", note: "Annuale (1500 ore, 60 CFU)" },
        { nome: "Master universitario di II livello", punti: "3", note: "Annuale (1500 ore, 60 CFU)" },
        { nome: "Corso di perfezionamento", punti: "3", note: "Annuale (1500 ore, 60 CFU)" },
        { nome: "Seconda laurea magistrale", punti: "5", note: "Oltre al titolo di accesso" },
      ]
    },
    {
      categoria: "Certificazioni e Competenze",
      icon: <Globe className="w-6 h-6" />,
      color: "amber",
      titoli: [
        { nome: "Certificazione linguistica B2", punti: "3", note: "Per ogni lingua (max 4 lingue)" },
        { nome: "Certificazione linguistica C1", punti: "4", note: "Per ogni lingua (max 4 lingue)" },
        { nome: "Certificazione linguistica C2", punti: "6", note: "Per ogni lingua (max 4 lingue)" },
        { nome: "Certificazione informatica", punti: "0.5", note: "ECDL, EIPASS, ecc. (max 4 certificazioni)" },
        { nome: "CLIL (Content and Language Integrated Learning)", punti: "3", note: "Metodologia didattica" },
      ]
    },
    {
      categoria: "Servizio di Insegnamento",
      icon: <Briefcase className="w-6 h-6" />,
      color: "red",
      titoli: [
        { nome: "Servizio specifico (con abilitazione)", punti: "12/anno", note: "Massimo 48 punti (4 anni)" },
        { nome: "Servizio specifico (senza abilitazione)", punti: "12/anno", note: "Massimo 48 punti (4 anni)" },
        { nome: "Servizio aspecifico", punti: "6/anno", note: "Su altra classe di concorso" },
        { nome: "Servizio su sostegno (con specializzazione)", punti: "12/anno", note: "Massimo 48 punti" },
        { nome: "Servizio su sostegno (senza specializzazione)", punti: "12/anno", note: "Massimo 48 punti" },
      ]
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; icon: string }> = {
      blue: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-900", icon: "text-blue-600" },
      green: { bg: "bg-green-50", border: "border-green-200", text: "text-green-900", icon: "text-green-600" },
      purple: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-900", icon: "text-purple-600" },
      amber: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-900", icon: "text-amber-600" },
      red: { bg: "bg-red-50", border: "border-red-200", text: "text-red-900", icon: "text-red-600" },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
              <TrendingUp className="w-10 h-10" />
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Come Aumentare il Punteggio GPS
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Guida completa ai titoli valutabili nelle Graduatorie Provinciali per le Supplenze. 
              Scopri quali certificazioni, master e specializzazioni possono aumentare il tuo punteggio 
              e migliorare le tue possibilità di ottenere una supplenza.
            </p>
          </div>
        </div>
      </div>

      {/* Contenuto Principale */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Introduzione */}
          <Card className="mb-12 shadow-lg border-2 border-blue-200">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
                Perché è Importante Aumentare il Punteggio?
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Il punteggio GPS determina la tua posizione nelle graduatorie provinciali e, di conseguenza, 
                  le tue possibilità di essere chiamato per una supplenza. Un punteggio più alto significa:
                </p>
                <div className="grid md:grid-cols-3 gap-6 my-8">
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">+30%</div>
                    <div className="text-sm text-gray-700">Più possibilità di nomina</div>
                  </div>
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">+50%</div>
                    <div className="text-sm text-gray-700">Supplenze più lunghe</div>
                  </div>
                  <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6 text-center">
                    <div className="text-4xl font-bold text-purple-600 mb-2">+40%</div>
                    <div className="text-sm text-gray-700">Province più competitive</div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Investire in titoli valutabili è fondamentale per scalare le graduatorie e aumentare 
                  le opportunità di lavoro nella scuola pubblica.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Sezioni Titoli */}
          {titoliPunteggi.map((sezione, idx) => {
            const colors = getColorClasses(sezione.color);
            return (
              <Card key={idx} className={`mb-8 shadow-lg border-2 ${colors.border}`}>
                <CardHeader className={`${colors.bg} border-b-2 ${colors.border}`}>
                  <CardTitle className={`flex items-center gap-3 text-2xl ${colors.text}`}>
                    <div className={colors.icon}>{sezione.icon}</div>
                    {sezione.categoria}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Titolo</th>
                          <th className="text-center py-3 px-4 font-semibold text-gray-700">Punti</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Note</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sezione.titoli.map((titolo, tidx) => (
                          <tr key={tidx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-4 font-medium text-gray-900">{titolo.nome}</td>
                            <td className="py-4 px-4 text-center">
                              <span className={`inline-block px-3 py-1 rounded-full font-bold ${colors.bg} ${colors.text}`}>
                                {titolo.punti}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-gray-600 text-sm">{titolo.note}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* Strategie Consigliate */}
          <Card className="mb-12 shadow-lg border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader className="bg-green-100 border-b-2 border-green-200">
              <CardTitle className="flex items-center gap-3 text-2xl text-green-900">
                <TrendingUp className="w-8 h-8 text-green-600" />
                Strategie per Massimizzare il Punteggio
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Specializzazione Sostegno (30 punti)</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Il TFA Sostegno è il titolo che dà più punti in assoluto. Inoltre, apre l'accesso a molte più 
                      opportunità di supplenza, dato che il sostegno è sempre molto richiesto.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Certificazioni Linguistiche (fino a 24 punti)</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Ottenere certificazioni B2, C1 o C2 in più lingue (inglese, francese, spagnolo, tedesco) 
                      può darti fino a 24 punti totali. Investimento relativamente rapido con alto ritorno.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Master e Corsi di Perfezionamento (fino a 12 punti)</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Puoi conseguire fino a 4 titoli tra master di I/II livello e corsi di perfezionamento, 
                      ottenendo 3 punti per ciascuno. Scegli titoli attinenti alla tua classe di concorso.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Servizio di Insegnamento (fino a 48 punti)</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Ogni anno di servizio vale 12 punti. Accetta anche supplenze brevi per accumulare esperienza 
                      e punteggio. Il servizio è fondamentale per scalare le graduatorie.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    5
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Dottorato di Ricerca (12 punti)</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Se hai ambizioni accademiche, il dottorato dà 12 punti e apre anche opportunità nell'università. 
                      Richiede 3-4 anni ma è un investimento a lungo termine.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Esempio Pratico */}
          <Card className="mb-12 shadow-lg border-2 border-purple-200">
            <CardHeader className="bg-purple-50 border-b-2 border-purple-200">
              <CardTitle className="flex items-center gap-3 text-2xl text-purple-900">
                <Award className="w-8 h-8 text-purple-600" />
                Esempio Pratico: Da 40 a 80 Punti
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Situazione Iniziale</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-700">Laurea Magistrale</span>
                      <span className="font-bold text-gray-900">40 punti</span>
                    </div>
                    <div className="flex justify-between items-center py-2 font-bold text-lg">
                      <span>Totale</span>
                      <span className="text-purple-600">40 punti</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Dopo 2 Anni di Investimento</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-700">Laurea Magistrale</span>
                      <span className="font-bold text-gray-900">40 punti</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-700">Certificazione Inglese C1</span>
                      <span className="font-bold text-green-600">+4 punti</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-700">Master I livello</span>
                      <span className="font-bold text-green-600">+3 punti</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-700">Corso di perfezionamento</span>
                      <span className="font-bold text-green-600">+3 punti</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-700">Certificazioni informatiche (2)</span>
                      <span className="font-bold text-green-600">+1 punto</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-700">Servizio (2 anni)</span>
                      <span className="font-bold text-green-600">+24 punti</span>
                    </div>
                    <div className="flex justify-between items-center py-2 font-bold text-lg bg-green-50 px-3 rounded-lg">
                      <span>Totale</span>
                      <span className="text-green-600">75 punti</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-green-100 border-2 border-green-300 rounded-xl">
                <p className="text-green-900 font-semibold text-center text-lg">
                  🎯 Risultato: <span className="text-2xl">+35 punti</span> in 2 anni = Posizione in graduatoria molto migliorata!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* CTA Finale */}
          <Card className="shadow-xl border-2 border-blue-300 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
            <CardContent className="p-12 text-center">
              <div className="max-w-3xl mx-auto">
                <GraduationCap className="w-16 h-16 mx-auto mb-6 text-blue-100" />
                <h2 className="text-4xl font-bold mb-6">
                  Calcola il Tuo Punteggio GPS Attuale
                </h2>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Usa il nostro calcolatore gratuito per scoprire quanti punti hai già e 
                  ricevi un'analisi personalizzata delle tue possibilità di supplenza in tutte le province italiane
                </p>
                <Link href="/calcola-gps">
                  <Button size="lg" variant="secondary" className="text-lg px-8 py-6 bg-white text-blue-600 hover:bg-blue-50">
                    Calcola il Tuo Punteggio
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Note Legali */}
          <div className="mt-12 p-6 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-600">
            <p className="mb-2">
              <strong>Nota:</strong> I punteggi indicati sono basati sull'Ordinanza Ministeriale n. 112 del 6 maggio 2022 
              e successive modifiche. Le tabelle di valutazione dei titoli possono subire aggiornamenti. 
              Verifica sempre le disposizioni più recenti sul sito del MIUR.
            </p>
            <p>
              Per informazioni ufficiali, consulta:{" "}
              <a 
                href="https://www.mim.gov.it/graduatorie-provinciali-di-supplenza" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline inline-flex items-center gap-1"
              >
                Ministero dell'Istruzione e del Merito
                <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
