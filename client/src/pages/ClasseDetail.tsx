import { useParams, Link } from "wouter";
import { ChevronLeft, BookOpen, School, FileText, ArrowRight } from "lucide-react";
import classiDettagliate from "@/data/classiDettagliate.json";
import { classiConcorsoData } from "@/data/classiConcorsoData";
import { Breadcrumb } from "@/components/Breadcrumb";

interface TitoloAccesso {
  laurea?: string;
  diploma?: string;
  requisito?: string;
  cfu_richiesti?: string;
  note: string;
}

interface IstitutoMateria {
  tipo_istituto: string;
  materie: string;
  note: string;
}

interface ClasseDettagliata {
  codice: string;
  descrizione: string;
  codici_vecchio_ordinamento: string[];
  titoli_accesso: {
    dm_39_1998: TitoloAccesso[];
    dm_22_2005: TitoloAccesso[];
    dm_270_2004: TitoloAccesso[];
  };
  istituti_materie: IstitutoMateria[];
  note_importanti: string;
}

export default function ClasseDetail() {
  const params = useParams();
  const codice = params.codice?.toUpperCase();

  // Trova la classe nel JSON
  const classe = classiDettagliate.find(
    (c: ClasseDettagliata) => c.codice === codice
  ) as ClasseDettagliata | undefined;

  if (!classe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Classe non trovata
          </h1>
          <p className="text-gray-600 mb-8">
            La classe di concorso <strong>{codice}</strong> non è disponibile o
            non esiste.
          </p>
          <Link href="/trova-classe">
            <a className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <ChevronLeft className="w-5 h-5" />
              Torna alla ricerca
            </a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
        <div className="container">
          <Link href="/trova-classe">
            <a className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors">
              <ChevronLeft className="w-5 h-5" />
              Torna alla ricerca
            </a>
          </Link>
          <h1 className="text-4xl font-bold mb-4">
            Classe di concorso {classe.codice}
          </h1>
          <p className="text-xl text-white/90">{classe.descrizione}</p>
          {classe.codici_vecchio_ordinamento.length > 0 && (
            <p className="text-sm text-white/70 mt-4">
              Codici vecchio ordinamento: ex ({classe.codici_vecchio_ordinamento.join(", ")})
            </p>
          )}
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container py-3">
          <Breadcrumb 
            items={[
              { label: "Trova Classe", path: "/trova-classe" },
              { label: codice || "Classe" }
            ]}
          />
        </div>
      </div>

      {/* Contenuto */}
      <div className="container py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Sezione Titoli di Accesso */}
          <section className="bg-white rounded-xl shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                Titoli di Accesso
              </h2>
            </div>

            {/* DM 39/1998 - Vecchio Ordinamento */}
            {classe.titoli_accesso.dm_39_1998.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-amber-200 bg-amber-50 px-4 py-2 rounded-t-lg">
                  DM 39/1998 (Vecchio Ordinamento)
                </h3>
                <ul className="space-y-2 px-4">
                  {classe.titoli_accesso.dm_39_1998.map((titolo, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-blue-600 mt-1">•</span>
                      <div>
                        <span className="text-gray-700">{titolo.laurea || titolo.diploma || titolo.requisito || ''}</span>
                        {titolo.note && (
                          <span className="ml-2 text-sm text-amber-600">
                            {titolo.note}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* DM 22/2005 - Lauree Specialistiche */}
            {classe.titoli_accesso.dm_22_2005.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-green-200 bg-green-50 px-4 py-2 rounded-t-lg">
                  DM 22/2005 (Lauree Specialistiche e integrazione vecchio
                  ordinamento)
                </h3>
                <ul className="space-y-2 px-4">
                  {classe.titoli_accesso.dm_22_2005.map((titolo, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-blue-600 mt-1">•</span>
                      <div>
                        <span className="text-gray-700">{titolo.laurea || titolo.diploma || titolo.requisito || ''}</span>
                        {titolo.note && (
                          <span className="ml-2 text-sm text-amber-600">
                            {titolo.note}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* DM 270/2004 - Lauree Magistrali */}
            {classe.titoli_accesso.dm_270_2004.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-blue-200 bg-blue-50 px-4 py-2 rounded-t-lg">
                  DM 270/2004 (Lauree Magistrali e Diplomi Accademici di II
                  livello)
                </h3>
                <ul className="space-y-2 px-4">
                  {classe.titoli_accesso.dm_270_2004.map((titolo, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-blue-600 mt-1">•</span>
                      <div>
                        <span className="text-gray-700">{titolo.laurea || titolo.diploma || titolo.requisito || ''}</span>
                        {titolo.note && (
                          <span className="ml-2 text-sm text-amber-600">
                            {titolo.note}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
              <p className="text-sm text-gray-700">
                <strong>Nota importante:</strong> La lista riporta{" "}
                <strong>tutte le possibili classi di concorso</strong> associate
                al titolo di studio. È necessario verificare i{" "}
                <strong>crediti formativi universitari (CFU)</strong> necessari
                previsti per l'insegnamento della singola classe di concorso.
              </p>
            </div>
          </section>

          {/* Sezione Istituti e Materie */}
          {classe.istituti_materie.length > 0 && (
            <section className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <School className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Dove puoi insegnare
                </h2>
              </div>

              <p className="text-gray-600 mb-6">
                Elenco degli istituti e delle materie per cui è possibile
                prestare servizio con la classe di concorso {classe.codice}
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left p-4 font-semibold text-gray-700 border-b-2 border-gray-300">
                        Istituto
                      </th>
                      <th className="text-left p-4 font-semibold text-gray-700 border-b-2 border-gray-300">
                        Materia
                      </th>
                      <th className="text-left p-4 font-semibold text-gray-700 border-b-2 border-gray-300">
                        Note
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {classe.istituti_materie.map((item, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-4 text-gray-700 font-medium">
                          {item.tipo_istituto}
                        </td>
                        <td className="p-4 text-gray-700">{item.materie}</td>
                        <td className="p-4 text-gray-600 text-sm">
                          {item.note || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Classi Correlate */}
          <section className="bg-white rounded-xl shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                Classi di Concorso Correlate
              </h2>
            </div>
            <p className="text-gray-600 mb-6">
              Altre classi che potrebbero interessarti in base alla tua area disciplinare
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(() => {
                // Trova classi correlate basate su:
                // 1. Stesso prefisso (es. A-22, A-23, A-24 per italiano)
                // 2. Stessa area disciplinare (matematica, lingue, ecc.)
                const prefix = classe.codice.split('-')[0];
                const correlate = classiConcorsoData
                  .filter(c => 
                    c.codeId !== classe.codice && // Escludi classe corrente
                    (c.codeId.startsWith(prefix) || // Stesso prefisso
                     c.description.toLowerCase().includes(classe.descrizione.toLowerCase().split(' ')[0])) // Stessa parola chiave
                  )
                  .slice(0, 6); // Massimo 6 classi correlate
                
                return correlate.length > 0 ? (
                  correlate.map((c) => (
                    <Link key={c.codeId} href={`/classe/${c.codeId}`}>
                      <a className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {c.codeId}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              {c.description}
                            </div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                        </div>
                      </a>
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-500 col-span-2">Nessuna classe correlata trovata</p>
                );
              })()}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-8 text-white text-center">
            <FileText className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">
              Calcola il tuo punteggio GPS
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Scopri quanti punti hai per la classe di concorso {classe.codice}{" "}
              e ricevi un'analisi personalizzata delle tue possibilità di
              supplenza
            </p>
            <Link href="/calcola-gps">
              <a className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                Calcola Punteggio GPS
              </a>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
