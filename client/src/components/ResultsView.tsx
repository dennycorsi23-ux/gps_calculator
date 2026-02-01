import { CalculationResult, ProvinceAnalysis } from "@/lib/gpsAlgorithm";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { 
  MapPin, TrendingUp, TrendingDown, Minus, ArrowLeft, 
  CheckCircle, AlertCircle, XCircle, Search, Filter,
  GraduationCap, Award, BookOpen, Monitor, Briefcase, Music,
  Users, Target, BarChart3, Info, Trophy, Hash, Percent,
  ArrowUpRight, ArrowDownRight, Sparkles
} from "lucide-react";
import { useState, useMemo } from "react";

interface ResultsViewProps {
  result: CalculationResult;
  onBack: () => void;
}

export function ResultsView({ result, onBack }: ResultsViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [probFilter, setProbFilter] = useState("all");
  const [showOnlyWithPosition, setShowOnlyWithPosition] = useState(false);

  // Extract unique regions for filter
  const regions = useMemo(() => {
    const uniqueRegions = new Set(result.provincesAnalysis.map(p => p.region));
    return Array.from(uniqueRegions).sort();
  }, [result.provincesAnalysis]);

  // Filter provinces
  const filteredProvinces = useMemo(() => {
    return result.provincesAnalysis.filter(province => {
      const matchesSearch = province.provinceName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = regionFilter === "all" || province.region === regionFilter;
      const matchesProb = probFilter === "all" || 
                          (probFilter === "data" && province.hasData) ||
                          (probFilter === "nodata" && !province.hasData) ||
                          province.probability === probFilter;
      const matchesPosition = !showOnlyWithPosition || province.posizioneStimata !== null;
      
      return matchesSearch && matchesRegion && matchesProb && matchesPosition;
    });
  }, [result.provincesAnalysis, searchTerm, regionFilter, probFilter, showOnlyWithPosition]);

  // Conta province per probabilità
  const probCounts = useMemo(() => {
    const counts = { Alta: 0, Media: 0, Bassa: 0, "N/D": 0 };
    result.provincesAnalysis.forEach(p => {
      counts[p.probability]++;
    });
    return counts;
  }, [result.provincesAnalysis]);

  // Trova la migliore provincia
  const miglioreProvincia = useMemo(() => {
    return result.provincesAnalysis.find(p => p.hasData) || result.provincesAnalysis[0];
  }, [result.provincesAnalysis]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header con Punteggio Totale */}
      <div className="bg-gradient-to-br from-emerald-600/20 to-blue-600/20 rounded-2xl p-6 md:p-8 border border-white/10">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div>
            <h2 className="text-white/60 text-sm uppercase tracking-wider font-semibold mb-1">
              Risultato Calcolo GPS
            </h2>
            <p className="text-white/80 text-sm">
              Graduatorie Provinciali per le Supplenze 2024/2026
            </p>
          </div>
          
          <div className="text-center md:text-right">
            <div className="text-white/60 text-xs uppercase tracking-wider mb-1">
              Punteggio Totale Stimato
            </div>
            <div className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
              {result.totalScore.toFixed(2)}
            </div>
            <div className="text-white/50 text-sm mt-1">punti</div>
          </div>
        </div>
      </div>

      {/* Breakdown Dettagliato del Punteggio */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-white/90 font-semibold text-lg">
          <BarChart3 className="w-5 h-5 text-secondary" />
          Dettaglio Punteggio
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Titolo di Accesso (Laurea/Diploma) */}
          <Card className="glass-panel border-0 bg-gradient-to-br from-blue-500/10 to-blue-600/5 hover:from-blue-500/20 hover:to-blue-600/10 transition-all">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <GraduationCap className="w-5 h-5 text-blue-300" />
                </div>
                <span className="text-3xl font-bold text-white">{result.breakdown.laurea.toFixed(2)}</span>
              </div>
              <div className="text-white/90 font-medium text-sm">Titolo di Accesso</div>
              <div className="text-white/50 text-xs mt-1">Laurea o Diploma (base 12 + voto)</div>
            </CardContent>
          </Card>

          {/* Titoli Culturali */}
          <Card className="glass-panel border-0 bg-gradient-to-br from-purple-500/10 to-purple-600/5 hover:from-purple-500/20 hover:to-purple-600/10 transition-all">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="bg-purple-500/20 p-2 rounded-lg">
                  <BookOpen className="w-5 h-5 text-purple-300" />
                </div>
                <span className="text-3xl font-bold text-white">{result.breakdown.titoliCulturali.toFixed(2)}</span>
              </div>
              <div className="text-white/90 font-medium text-sm">Titoli Culturali</div>
              <div className="text-white/50 text-xs mt-1">C2, CLIL, Perfezionamenti, Master L2</div>
            </CardContent>
          </Card>

          {/* Certificazioni Informatiche */}
          <Card className="glass-panel border-0 bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 hover:from-cyan-500/20 hover:to-cyan-600/10 transition-all">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="bg-cyan-500/20 p-2 rounded-lg">
                  <Monitor className="w-5 h-5 text-cyan-300" />
                </div>
                <span className="text-3xl font-bold text-white">{result.breakdown.informatica.toFixed(2)}</span>
              </div>
              <div className="text-white/90 font-medium text-sm">Certificazioni Informatiche</div>
              <div className="text-white/50 text-xs mt-1">DigComp 2.2, DigComp Edu (max 2 pt)</div>
            </CardContent>
          </Card>

          {/* Titoli GPS Aggiuntivi */}
          {(result.breakdown.titoliGPSAggiuntivi ?? 0) > 0 && (
            <Card className="glass-panel border-0 bg-gradient-to-br from-amber-500/10 to-amber-600/5 hover:from-amber-500/20 hover:to-amber-600/10 transition-all">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="bg-amber-500/20 p-2 rounded-lg">
                    <Award className="w-5 h-5 text-amber-300" />
                  </div>
                  <span className="text-3xl font-bold text-white">{(result.breakdown.titoliGPSAggiuntivi || 0).toFixed(2)}</span>
                </div>
                <div className="text-white/90 font-medium text-sm">Titoli GPS Aggiuntivi</div>
                <div className="text-white/50 text-xs mt-1">Allegato A - Altri titoli valutabili</div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Dettaglio Titoli GPS Aggiuntivi */}
        {(result.breakdown.titoliGPSAggiuntivi ?? 0) > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {(result.breakdown.abilitazioni ?? 0) > 0 && (
              <div className="bg-white/5 rounded-lg p-3 flex items-center gap-3">
                <Award className="w-4 h-4 text-green-400" />
                <div>
                  <div className="text-white/60 text-xs">Abilitazioni</div>
                  <div className="text-white font-semibold">{result.breakdown.abilitazioni} pt</div>
                </div>
              </div>
            )}
            {(result.breakdown.accademici ?? 0) > 0 && (
              <div className="bg-white/5 rounded-lg p-3 flex items-center gap-3">
                <GraduationCap className="w-4 h-4 text-blue-400" />
                <div>
                  <div className="text-white/60 text-xs">Titoli Accademici</div>
                  <div className="text-white font-semibold">{result.breakdown.accademici} pt</div>
                </div>
              </div>
            )}
            {(result.breakdown.artistici ?? 0) > 0 && (
              <div className="bg-white/5 rounded-lg p-3 flex items-center gap-3">
                <Music className="w-4 h-4 text-pink-400" />
                <div>
                  <div className="text-white/60 text-xs">Titoli Artistici</div>
                  <div className="text-white font-semibold">{result.breakdown.artistici} pt</div>
                </div>
              </div>
            )}
            {(result.breakdown.servizio ?? 0) > 0 && (
              <div className="bg-white/5 rounded-lg p-3 flex items-center gap-3">
                <Briefcase className="w-4 h-4 text-orange-400" />
                <div>
                  <div className="text-white/60 text-xs">Servizio</div>
                  <div className="text-white font-semibold">{result.breakdown.servizio} pt</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Migliore Provincia Consigliata */}
      {miglioreProvincia && miglioreProvincia.hasData && (
        <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl p-6 border border-emerald-500/30">
          <div className="flex items-start gap-4">
            <div className="bg-emerald-500/30 p-3 rounded-xl">
              <Trophy className="w-8 h-8 text-emerald-300" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-emerald-300 font-semibold text-sm uppercase tracking-wider">
                  Provincia Consigliata
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {miglioreProvincia.provinceName}
              </h3>
              <p className="text-white/60 text-sm mb-3">{miglioreProvincia.region}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {miglioreProvincia.posizioneStimata && (
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-white/60 text-xs mb-1">
                      <Hash className="w-3 h-3" />
                      Posizione Stimata
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {miglioreProvincia.posizioneStimata}°
                    </div>
                    {miglioreProvincia.numCandidati > 0 && (
                      <div className="text-white/50 text-xs">
                        su {miglioreProvincia.numCandidati} candidati
                      </div>
                    )}
                  </div>
                )}
                
                {miglioreProvincia.percentile && (
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-white/60 text-xs mb-1">
                      <Percent className="w-3 h-3" />
                      Percentile
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {miglioreProvincia.percentile.toFixed(0)}%
                    </div>
                    <div className="text-white/50 text-xs">
                      dei candidati sotto di te
                    </div>
                  </div>
                )}
                
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-white/60 text-xs mb-1">
                    <Target className="w-3 h-3" />
                    Punteggio Minimo
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {miglioreProvincia.minScore2024?.toFixed(1) || "N/D"}
                  </div>
                  <div className="text-white/50 text-xs">
                    ultimo nominato
                  </div>
                </div>
                
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-white/60 text-xs mb-1">
                    {(miglioreProvincia.differenzaDaMinimo || 0) >= 0 ? (
                      <ArrowUpRight className="w-3 h-3 text-green-400" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 text-red-400" />
                    )}
                    Differenza
                  </div>
                  <div className={`text-2xl font-bold ${(miglioreProvincia.differenzaDaMinimo || 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {(miglioreProvincia.differenzaDaMinimo || 0) >= 0 ? '+' : ''}{miglioreProvincia.differenzaDaMinimo?.toFixed(1) || "0"}
                  </div>
                  <div className="text-white/50 text-xs">
                    punti dal minimo
                  </div>
                </div>
              </div>
              
              {miglioreProvincia.consiglioTesto && (
                <div className="mt-4 p-3 bg-white/5 rounded-lg">
                  <p className="text-white/80 text-sm">{miglioreProvincia.consiglioTesto}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Riepilogo Opportunità */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="glass-panel border-0 bg-green-500/10 border-green-500/20">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-green-300 font-semibold">Alta</span>
            </div>
            <div className="text-3xl font-bold text-white">{probCounts.Alta}</div>
            <div className="text-white/50 text-xs">province</div>
          </CardContent>
        </Card>
        
        <Card className="glass-panel border-0 bg-yellow-500/10 border-yellow-500/20">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-300 font-semibold">Media</span>
            </div>
            <div className="text-3xl font-bold text-white">{probCounts.Media}</div>
            <div className="text-white/50 text-xs">province</div>
          </CardContent>
        </Card>
        
        <Card className="glass-panel border-0 bg-red-500/10 border-red-500/20">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <XCircle className="w-5 h-5 text-red-400" />
              <span className="text-red-300 font-semibold">Bassa</span>
            </div>
            <div className="text-3xl font-bold text-white">{probCounts.Bassa}</div>
            <div className="text-white/50 text-xs">province</div>
          </CardContent>
        </Card>
      </div>

      {/* Analisi Province */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <MapPin className="w-6 h-6 text-secondary" />
              Dove Presentare Domanda
            </h3>
            <p className="text-white/70 text-sm mt-1">
              Analisi delle opportunità per provincia basata sui punteggi minimi di nomina 2024/2025
            </p>
          </div>
          <Badge variant="outline" className="text-white/60 border-white/20">
            {filteredProvinces.length} province visualizzate
          </Badge>
        </div>

        {/* Info Box */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-white/80">
            <p className="font-medium text-blue-300 mb-1">Come leggere i risultati</p>
            <ul className="space-y-1 text-white/60">
              <li><span className="text-green-400">● Alta probabilità:</span> Il tuo punteggio supera di almeno 10 punti il minimo storico</li>
              <li><span className="text-yellow-400">● Media probabilità:</span> Il tuo punteggio è vicino al minimo storico (±10 punti)</li>
              <li><span className="text-red-400">● Bassa probabilità:</span> Il tuo punteggio è inferiore al minimo storico</li>
              <li><span className="text-cyan-400">● Posizione stimata:</span> Calcolo basato sulla distribuzione dei punteggi nella graduatoria</li>
            </ul>
          </div>
        </div>

        {/* Filtri */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
            <Input 
              placeholder="Cerca provincia..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass-input pl-9"
            />
          </div>
          
          <Select value={regionFilter} onValueChange={setRegionFilter}>
            <SelectTrigger className="glass-input">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 opacity-50" />
                <SelectValue placeholder="Tutte le regioni" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700 text-white max-h-[300px]">
              <SelectItem value="all">Tutte le regioni</SelectItem>
              {regions.map(region => (
                <SelectItem key={region} value={region}>{region}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={probFilter} onValueChange={setProbFilter}>
            <SelectTrigger className="glass-input">
              <SelectValue placeholder="Tutte le probabilità" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700 text-white">
              <SelectItem value="all">Tutti i risultati</SelectItem>
              <SelectItem value="data">Solo con dati storici</SelectItem>
              <SelectItem value="Alta">Alta Probabilità</SelectItem>
              <SelectItem value="Media">Media Probabilità</SelectItem>
              <SelectItem value="Bassa">Bassa Probabilità</SelectItem>
              <SelectItem value="nodata">Dati stimati</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant={showOnlyWithPosition ? "default" : "outline"}
            onClick={() => setShowOnlyWithPosition(!showOnlyWithPosition)}
            className={showOnlyWithPosition ? "bg-cyan-600 hover:bg-cyan-700" : "glass-input"}
          >
            <Hash className="w-4 h-4 mr-2" />
            Con posizione
          </Button>
        </div>

        {/* Lista Province */}
        <div className="grid grid-cols-1 gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {filteredProvinces.length > 0 ? (
            filteredProvinces.map((province, index) => (
              <ProvinceCard key={province.provinceId} province={province} index={index} userScore={result.totalScore} />
            ))
          ) : (
            <div className="text-center py-12 text-white/50">
              Nessuna provincia trovata con i filtri selezionati.
            </div>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-white/5 rounded-xl p-4 text-center">
        <p className="text-white/50 text-xs">
          <strong>Disclaimer:</strong> I dati mostrati sono basati sui bollettini ufficiali del primo turno di nomina 2024/2025 
          pubblicati dagli USP provinciali. Le probabilità e le posizioni sono stime indicative e non garantiscono l'effettiva nomina. 
          I punteggi minimi possono variare in base al numero di candidati e alle disponibilità di cattedre.
        </p>
      </div>
    </motion.div>
  );
}

function ProvinceCard({ province, index, userScore }: { province: ProvinceAnalysis; index: number; userScore: number }) {
  const getProbabilityColor = (prob: string) => {
    switch (prob) {
      case "Alta": return "bg-green-500/20 text-green-200 border-green-500/30";
      case "Media": return "bg-yellow-500/20 text-yellow-200 border-yellow-500/30";
      case "Bassa": return "bg-red-500/20 text-red-200 border-red-500/30";
      default: return "bg-slate-500/20 text-slate-200 border-slate-500/30";
    }
  };

  const getProbabilityIcon = (prob: string) => {
    switch (prob) {
      case "Alta": return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "Media": return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      case "Bassa": return <XCircle className="w-5 h-5 text-red-400" />;
      default: return <Minus className="w-5 h-5 text-slate-400" />;
    }
  };

  const getBgColor = (prob: string) => {
    switch (prob) {
      case "Alta": return "hover:bg-green-500/10";
      case "Media": return "hover:bg-yellow-500/10";
      case "Bassa": return "hover:bg-red-500/10";
      default: return "hover:bg-white/10";
    }
  };

  // Calcola la differenza dal punteggio minimo
  const referenceScore = province.minScore2024 || province.minScore2023 || 45;
  const diff = userScore - referenceScore;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3) }}
    >
      <Card className={`glass-panel border-0 overflow-hidden transition-colors ${getBgColor(province.probability)}`}>
        <CardContent className="p-5">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            
            {/* Posizione nel ranking */}
            <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white/60 font-bold text-sm flex-shrink-0">
              {index + 1}
            </div>

            {/* Info Provincia */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h4 className="text-lg font-bold text-white">{province.provinceName}</h4>
                <Badge variant="outline" className="text-white/60 border-white/20 text-xs">
                  {province.region}
                </Badge>
              </div>
              
              {province.hasData ? (
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70 mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-white/50">Punteggio Minimo:</span>
                    <span className="font-mono font-bold text-white text-base">
                      {province.minScore2024 ? province.minScore2024.toFixed(1) : (province.minScore2023 ? province.minScore2023.toFixed(1) : "N/D")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white/50">Differenza:</span>
                    <span className={`font-mono font-bold text-base ${diff >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {diff >= 0 ? '+' : ''}{diff.toFixed(1)}
                    </span>
                  </div>
                  {province.avgScore && (
                    <div className="flex items-center gap-2">
                      <span className="text-white/50">Media:</span>
                      <span className="font-mono text-white/80">
                        {province.avgScore.toFixed(1)}
                      </span>
                    </div>
                  )}
                  {province.numCandidati > 0 && (
                    <div className="flex items-center gap-2">
                      <Users className="w-3 h-3 text-white/50" />
                      <span className="text-white/60">
                        {province.numCandidati} candidati
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-sm text-white/50 mt-2 flex items-center gap-2">
                  <span className="text-white/40">Punteggio stimato:</span>
                  <span className="font-mono font-semibold text-white/70">~45 punti</span>
                  <span className="text-xs text-white/40">(media nazionale)</span>
                </div>
              )}
            </div>

            {/* Posizione Stimata */}
            {province.posizioneStimata && (
              <div className="flex flex-col items-center bg-cyan-500/10 rounded-xl px-4 py-2 border border-cyan-500/20">
                <div className="text-cyan-300 text-xs uppercase tracking-wider mb-1">Posizione</div>
                <div className="text-2xl font-bold text-white">{province.posizioneStimata}°</div>
                {province.percentile && (
                  <div className="text-cyan-400/70 text-xs">
                    Top {(100 - province.percentile).toFixed(0)}%
                  </div>
                )}
              </div>
            )}

            {/* Probabilità */}
            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
              <div className={`px-4 py-2 rounded-full border flex items-center gap-2 ${getProbabilityColor(province.probability)}`}>
                {getProbabilityIcon(province.probability)}
                <span className="font-bold uppercase tracking-wide text-sm">
                  {province.probability === "N/D" ? "Stimata" : province.probability}
                </span>
              </div>
              {!province.hasData && (
                <span className="text-xs text-white/40 italic">*</span>
              )}
            </div>

          </div>

          {/* Consiglio */}
          {province.consiglioTesto && province.hasData && (
            <div className="mt-3 pt-3 border-t border-white/10">
              <p className="text-white/60 text-sm">{province.consiglioTesto}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
