import { useState, useMemo } from 'react';
import { Search, BookOpen, ChevronDown, ChevronUp, GraduationCap, FileText } from 'lucide-react';
import { classiConcorsoData, type ClasseConcorso } from '@/data/classiConcorsoData';

export default function FindClass() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedClass, setExpandedClass] = useState<string | null>(null);

  // Filtra classi in base alla ricerca
  const filteredClasses = useMemo(() => {
    if (!searchTerm.trim()) return classiConcorsoData;
    
    const term = searchTerm.toLowerCase();
    return classiConcorsoData.filter((classe) =>
      classe.code.toLowerCase().includes(term) ||
      classe.description.toLowerCase().includes(term) ||
      classe.notes.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  // Raggruppa per area disciplinare
  const getArea = (code: string): string => {
    if (code.startsWith('A-')) return 'Materie Comuni';
    if (code.startsWith('B-')) return 'Laboratori';
    if (code.includes('Sostegno')) return 'Sostegno';
    if (code.includes('Infanzia') || code.includes('Primaria')) return 'Infanzia e Primaria';
    return 'Altre Classi';
  };

  const groupedClasses = useMemo(() => {
    const groups: Record<string, ClasseConcorso[]> = {};
    filteredClasses.forEach((classe) => {
      const area = getArea(classe.code);
      if (!groups[area]) groups[area] = [];
      groups[area].push(classe);
    });
    return groups;
  }, [filteredClasses]);

  const toggleExpand = (code: string) => {
    setExpandedClass(expandedClass === code ? null : code);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-white/10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
        
        <div className="container relative py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/20 rounded-full px-4 py-2 mb-6">
              <GraduationCap className="w-5 h-5 text-blue-400" />
              <span className="text-blue-300 text-sm font-medium">154 Classi di Concorso</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Trova la tua Classe di Concorso
            </h1>
            
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Scopri per quali classi di concorso puoi insegnare e quali titoli di studio sono richiesti
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Cerca per codice classe o materia (es: A-48, Matematica, Inglese...)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all"
                />
              </div>
              
              <p className="text-white/50 text-sm mt-3">
                {filteredClasses.length} {filteredClasses.length === 1 ? 'classe trovata' : 'classi trovate'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {Object.entries(groupedClasses).map(([area, classi]) => (
            <div key={area} className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-blue-400" />
                {area}
                <span className="text-sm font-normal text-white/50">({classi.length})</span>
              </h2>

              <div className="grid gap-4">
                {classi.map((classe) => {
                  const isExpanded = expandedClass === classe.code;
                  const hasTitles = classe.required_titles && classe.required_titles.length > 0;

                  return (
                    <div
                      key={classe.code}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-blue-400/30 transition-all"
                    >
                      {/* Header */}
                      <div
                        className={`p-6 cursor-pointer ${hasTitles ? 'hover:bg-white/5' : ''}`}
                        onClick={() => hasTitles && toggleExpand(classe.code)}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="inline-block px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-lg text-blue-300 font-mono text-sm font-bold">
                                {classe.code}
                              </span>
                              {hasTitles && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/10 border border-green-400/20 rounded text-green-300 text-xs">
                                  <FileText className="w-3 h-3" />
                                  {classe.required_titles?.length || 0} {(classe.required_titles?.length || 0) === 1 ? 'titolo' : 'titoli'}
                                </span>
                              )}
                            </div>
                            
                            <h3 className="text-lg font-semibold text-white mb-1">
                              {classe.description}
                            </h3>
                            
                            {classe.notes && (
                              <p className="text-white/60 text-sm">
                                {classe.notes}
                              </p>
                            )}
                          </div>

                          {hasTitles && (
                            <button
                              className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/10 hover:border-blue-400/30 hover:text-blue-300 transition-all"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleExpand(classe.code);
                              }}
                            >
                              {isExpanded ? (
                                <ChevronUp className="w-5 h-5" />
                              ) : (
                                <ChevronDown className="w-5 h-5" />
                              )}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Expanded Content */}
                      {isExpanded && hasTitles && (
                        <div className="border-t border-white/10 bg-white/[0.02] p-6">
                          <h4 className="text-sm font-semibold text-blue-300 mb-4 uppercase tracking-wide">
                            Titoli di Studio Richiesti
                          </h4>
                          
                          <div className="space-y-3">
                                  {classe.required_titles?.map((title, idx) => (
                              <div
                                key={idx}
                                className="bg-white/5 border border-white/10 rounded-lg p-4 hover:border-blue-400/20 transition-all"
                              >
                                <p className="text-white font-medium mb-1">
                                  {title.title}
                                </p>
                                {title.requirements && (
                                  <p className="text-white/60 text-sm">
                                    {title.requirements}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* No Titles Available */}
                      {!hasTitles && (
                        <div className="border-t border-white/10 bg-white/[0.02] p-4">
                          <p className="text-white/50 text-sm text-center">
                            Dati sui titoli richiesti non disponibili per questa classe
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {filteredClasses.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-4">
                <Search className="w-8 h-8 text-white/40" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Nessuna classe trovata
              </h3>
              <p className="text-white/60">
                Prova a modificare i termini di ricerca
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
