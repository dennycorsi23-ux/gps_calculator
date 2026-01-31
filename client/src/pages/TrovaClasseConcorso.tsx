import { useState, useMemo, useRef } from "react";
import { Link } from "wouter";
import { Search, BookOpen, GraduationCap, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { classiConcorsoData } from "@/data/classiConcorsoData";

// Estrai lista unica di tutte le lauree da tutte le classi
const getAllLauree = () => {
  const laureSet = new Set<string>();
  classiConcorsoData.forEach(classe => {
    classe.required_titles?.forEach(title => {
      const cleanTitle = title.title.replace(/Nota \d+/g, '').trim();
      if (cleanTitle) {
        laureSet.add(cleanTitle);
      }
    });
  });
  return Array.from(laureSet).sort();
};

export default function TrovaClasseConcorso() {
  const [activeTab, setActiveTab] = useState<"classe" | "laurea">("classe");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClasse, setSelectedClasse] = useState<string | null>(null);
  const [selectedLaurea, setSelectedLaurea] = useState<string | null>(null);
  const [expandedClasse, setExpandedClasse] = useState<string | null>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  const allLauree = useMemo(() => getAllLauree(), []);

  // Filtra classi per ricerca full-text (codice, descrizione, materie, titoli)
  const filteredClassi = useMemo(() => {
    if (!searchTerm) return classiConcorsoData;
    const term = searchTerm.toLowerCase();
    return classiConcorsoData.filter((c) => {
      // Cerca in codice e descrizione
      if (c.code.toLowerCase().includes(term) || c.description.toLowerCase().includes(term)) {
        return true;
      }
      // Cerca in codeId
      if (c.codeId?.toLowerCase().includes(term)) {
        return true;
      }
      // Cerca nei titoli di accesso
      if (c.required_titles?.some(title => title.title.toLowerCase().includes(term))) {
        return true;
      }
      // Cerca nelle note
      if (c.notes?.toLowerCase().includes(term)) {
        return true;
      }
      return false;
    });
  }, [searchTerm]);

  // Filtra lauree per ricerca
  const filteredLauree = useMemo(() => {
    if (!searchTerm) return allLauree;
    const term = searchTerm.toLowerCase();
    return allLauree.filter((l) => l.toLowerCase().includes(term));
  }, [searchTerm, allLauree]);

  // Trova classi accessibili con una laurea
  const getClassiByLaurea = (laurea: string) => {
    return classiConcorsoData.filter(classe =>
      classe.required_titles?.some(title => {
        const cleanTitle = title.title.replace(/Nota \d+/g, '').trim();
        return cleanTitle === laurea;
      })
    );
  };

  const selectedClasseData = classiConcorsoData.find((c) => c.code === selectedClasse);
  const selectedLaureaClassi = selectedLaurea ? getClassiByLaurea(selectedLaurea) : [];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Trova Classe di Concorso
          </h1>
          <p className="text-lg text-gray-600">
            Scopri quali classi puoi insegnare con la tua laurea o quali titoli servono per una specifica classe
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Tab Selector */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
          <div className="flex">
            <button
              onClick={() => {
                setActiveTab("classe");
                setSearchTerm("");
                setSelectedLaurea(null);
              }}
              className={`flex-1 px-6 py-4 font-semibold text-lg transition-all flex items-center justify-center gap-2 ${
                activeTab === "classe"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              <BookOpen className="w-5 h-5" />
              Cerca per Classe
            </button>
            <button
              onClick={() => {
                setActiveTab("laurea");
                setSearchTerm("");
                setSelectedClasse(null);
              }}
              className={`flex-1 px-6 py-4 font-semibold text-lg transition-all flex items-center justify-center gap-2 ${
                activeTab === "laurea"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              <GraduationCap className="w-5 h-5" />
              Cerca per Laurea
            </button>
          </div>
        </div>

        {/* Search Box */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={
                activeTab === "classe"
                  ? "Cerca classe di concorso (es. A-01, Matematica, Italiano...)"
                  : "Cerca laurea magistrale (es. LM-18, Informatica, Lettere...)"
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            />
          </div>
        </div>

        {/* Content Area */}
        {activeTab === "classe" ? (
          <div className="flex flex-col md:grid md:grid-cols-2 gap-6">
            {/* Lista Classi */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Classi di Concorso ({filteredClassi.length})
              </h2>
              <div className="space-y-2 max-h-[400px] md:max-h-[600px] overflow-y-auto">
                {filteredClassi.map((classe) => (
                  <button
                    key={classe.code}
                    onClick={() => {
                      setSelectedClasse(classe.code);
                      // Scroll in alto per mostrare i dettagli
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }, 150);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                      selectedClasse === classe.code
                        ? "bg-blue-100 border-2 border-blue-500 shadow-lg scale-[1.02] animate-in fade-in zoom-in duration-200"
                        : "bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:shadow-md hover:scale-[1.01]"
                    }`}
                  >
                    <div className="font-bold text-blue-600 mb-1">{classe.codeId}</div>
                    <div className="text-sm text-gray-900 font-medium">{classe.code}</div>
                    {classe.description && (
                      <div className="text-xs text-gray-500 mt-1 line-clamp-1">
                        {classe.description}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Dettaglio Classe Selezionata */}
            <div ref={detailsRef} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {selectedClasseData ? (
                <>
                  <div className="mb-6 pb-4 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="text-3xl font-bold text-blue-600 mb-2">
                          {selectedClasseData.codeId}
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                          {selectedClasseData.code}
                        </h2>
                        {selectedClasseData.description && (
                          <p className="text-sm text-gray-600 bg-blue-50 px-3 py-2 rounded">
                            {selectedClasseData.description}
                          </p>
                        )}
                      </div>
                      <Link href={`/classe/${selectedClasseData.codeId}`}>
                        <a className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors w-full md:w-auto md:whitespace-nowrap">
                          Vedi Dettagli
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Link>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Titoli di Accesso ({selectedClasseData.required_titles?.length || 0})
                  </h3>

                  <div className="space-y-3 max-h-[400px] md:max-h-[480px] overflow-y-auto">
                    {selectedClasseData.required_titles?.map((title, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                      >
                        <div className="font-semibold text-gray-900 mb-2">
                          {title.title.replace(/Nota \d+/g, '').trim()}
                        </div>
                        {title.requirements && (
                          <div className="text-sm text-gray-600 bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                            <strong>Requisiti CFU:</strong> {title.requirements}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>Seleziona una classe di concorso per vedere i titoli di accesso</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:grid md:grid-cols-2 gap-6">
            {/* Lista Lauree */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Lauree Magistrali ({filteredLauree.length})
              </h2>
              <div className="space-y-2 max-h-[400px] md:max-h-[600px] overflow-y-auto">
                {filteredLauree.map((laurea) => (
                  <button
                    key={laurea}
                    onClick={() => setSelectedLaurea(laurea)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      selectedLaurea === laurea
                        ? "bg-blue-100 border-2 border-blue-500"
                        : "bg-gray-50 border border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    <div className="text-sm text-gray-900">{laurea}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Classi Accessibili con Laurea Selezionata */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {selectedLaurea ? (
                <>
                  <div className="mb-6 pb-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      {selectedLaurea}
                    </h2>
                    <p className="text-gray-600">
                      Classi di concorso accessibili: {selectedLaureaClassi.length}
                    </p>
                  </div>

                  <div className="space-y-3 max-h-[520px] overflow-y-auto">
                    {selectedLaureaClassi.length > 0 ? (
                      selectedLaureaClassi.map((classe) => (
                      <div
                        key={classe.code}
                        className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                      >
                        <div className="font-bold text-blue-600 mb-1">
                          {classe.codeId}
                        </div>
                        <div className="font-medium text-gray-900 mb-1">
                          {classe.code}
                        </div>
                        {classe.description && (
                          <div className="text-xs text-gray-500">
                            {classe.description}
                          </div>
                        )}
                      </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <p>Nessuna classe di concorso trovata per questa laurea</p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <GraduationCap className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>Seleziona una laurea per vedere le classi di concorso accessibili</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
