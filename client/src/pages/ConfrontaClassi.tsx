import { useState } from "react";
import { classiConcorsoData } from "@/data/classiConcorsoData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Plus, Search, ArrowRight, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function ConfrontaClassi() {
  const [selectedClassi, setSelectedClassi] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClassi = classiConcorsoData.filter(
    (c) =>
      !selectedClassi.includes(c.codeId) &&
      (c.codeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const addClasse = (codeId: string) => {
    if (selectedClassi.length < 3) {
      setSelectedClassi([...selectedClassi, codeId]);
      setSearchTerm("");
    }
  };

  const removeClasse = (codeId: string) => {
    setSelectedClassi(selectedClassi.filter((id) => id !== codeId));
  };

  const getClasseData = (codeId: string) => {
    return classiConcorsoData.find((c) => c.codeId === codeId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Confronta Classi di Concorso
            </h1>
            <p className="text-xl text-gray-600">
              Seleziona fino a 3 classi di concorso per confrontare titoli richiesti, 
              requisiti e opportunità
            </p>
          </div>

          {/* Search Box */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Cerca e Aggiungi Classi di Concorso
                <span className="ml-auto text-sm font-normal text-gray-500">
                  {selectedClassi.length}/3 selezionate
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Cerca per codice (es. A-22) o descrizione..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-6 text-lg"
                  disabled={selectedClassi.length >= 3}
                />
              </div>

              {/* Search Results */}
              {searchTerm && selectedClassi.length < 3 && (
                <div className="mt-4 max-h-[300px] overflow-y-auto space-y-2">
                  {filteredClassi.slice(0, 10).map((classe) => (
                    <button
                      key={classe.codeId}
                      onClick={() => addClasse(classe.codeId)}
                      className="w-full text-left px-4 py-3 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all flex items-center justify-between group"
                    >
                      <div>
                        <div className="font-bold text-blue-600">{classe.codeId}</div>
                        <div className="text-sm text-gray-900">{classe.code}</div>
                        {classe.description && (
                          <div className="text-xs text-gray-500 mt-1 line-clamp-1">
                            {classe.description}
                          </div>
                        )}
                      </div>
                      <Plus className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                    </button>
                  ))}
                  {filteredClassi.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      Nessuna classe trovata
                    </div>
                  )}
                </div>
              )}

              {/* Selected Classes Pills */}
              {selectedClassi.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedClassi.map((codeId) => {
                    const classe = getClasseData(codeId);
                    return (
                      <div
                        key={codeId}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 border border-blue-300 rounded-full text-sm font-medium text-blue-900"
                      >
                        <span>{classe?.codeId} - {classe?.code}</span>
                        <button
                          onClick={() => removeClasse(codeId)}
                          className="hover:bg-blue-200 rounded-full p-1 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Comparison Table */}
        {selectedClassi.length > 0 ? (
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedClassi.map((codeId) => {
                const classe = getClasseData(codeId);
                if (!classe) return null;

                return (
                  <Card key={codeId} className="shadow-xl border-2 border-blue-200">
                    <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-3xl font-bold mb-2">{classe.codeId}</div>
                          <div className="text-lg font-medium text-blue-100">{classe.code}</div>
                        </div>
                        <button
                          onClick={() => removeClasse(codeId)}
                          className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      {/* Descrizione */}
                      {classe.description && (
                        <div>
                          <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            Descrizione
                          </h3>
                          <p className="text-sm text-gray-700 leading-relaxed">{classe.description}</p>
                        </div>
                      )}

                      {/* Titoli Richiesti */}
                      <div>
                        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 text-amber-600" />
                          Titoli di Accesso
                        </h3>
                        {classe.required_titles && classe.required_titles.length > 0 ? (
                          <ul className="space-y-2">
                            {classe.required_titles.slice(0, 3).map((titleObj, idx) => (
                              <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                <span className="text-blue-600 font-bold mt-0.5">•</span>
                                <span className="flex-1">{titleObj.title}</span>
                              </li>
                            ))}
                            {classe.required_titles.length > 3 && (
                              <li className="text-sm text-gray-500 italic">
                                + altri {classe.required_titles.length - 3} titoli...
                              </li>
                            )}
                          </ul>
                        ) : (
                          <p className="text-sm text-gray-500 italic">Nessun titolo specificato</p>
                        )}
                      </div>

                      {/* Note Aggiuntive */}
                      {classe.notes && (
                        <div>
                          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-amber-600" />
                            Note
                          </h3>
                          <p className="text-sm text-gray-700 leading-relaxed">{classe.notes}</p>
                        </div>
                      )}

                      {/* Link Dettagli */}
                      <Link href={`/classe/${classe.codeId}`}>
                        <Button variant="outline" className="w-full">
                          Vedi Tutti i Dettagli
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* CTA Calcola GPS */}
            {selectedClassi.length > 0 && (
              <Card className="mt-12 shadow-xl border-2 border-green-300 bg-gradient-to-br from-green-50 to-emerald-50">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Hai scelto la tua classe di concorso?
                  </h3>
                  <p className="text-gray-700 mb-6">
                    Calcola il tuo punteggio GPS e scopri le tue possibilità di supplenza 
                    in tutte le province italiane
                  </p>
                  <Link href="/calcola-gps">
                    <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                      Calcola il Tuo Punteggio GPS
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto text-center py-12">
            <div className="bg-white rounded-2xl shadow-lg p-12 border-2 border-gray-200">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Inizia a Confrontare
              </h3>
              <p className="text-gray-600 mb-8">
                Cerca e seleziona fino a 3 classi di concorso per confrontare 
                titoli di accesso, requisiti CFU e opportunità
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => addClasse("A-22")}
                  className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium text-blue-700"
                >
                  Prova: A-22 (Italiano)
                </button>
                <button
                  onClick={() => addClasse("A-28")}
                  className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium text-blue-700"
                >
                  Prova: A-28 (Matematica)
                </button>
                <button
                  onClick={() => addClasse("A-11")}
                  className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium text-blue-700"
                >
                  Prova: A-11 (Inglese)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
