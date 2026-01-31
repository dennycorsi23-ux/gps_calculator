import { CalculationResult, ProvinceAnalysis } from "@/lib/gpsAlgorithm";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { MapPin, TrendingUp, TrendingDown, Minus, ArrowLeft, CheckCircle, AlertCircle, XCircle, Search, Filter } from "lucide-react";
import { useState, useMemo } from "react";

interface ResultsViewProps {
  result: CalculationResult;
  onBack: () => void;
}

export function ResultsView({ result, onBack }: ResultsViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [probFilter, setProbFilter] = useState("all");

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
      
      return matchesSearch && matchesRegion && matchesProb;
    });
  }, [result.provincesAnalysis, searchTerm, regionFilter, probFilter]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header Risultati */}
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="text-white hover:bg-white/10 hover:text-white -ml-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Torna al calcolo
        </Button>
        
        <div className="text-center md:text-right">
          <h2 className="text-white/80 text-sm uppercase tracking-wider font-semibold">Il tuo Punteggio Totale</h2>
          <div className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
            {result.totalScore.toFixed(1)}
          </div>
        </div>
      </div>

      {/* Breakdown Punteggio */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card className="glass-panel border-0 bg-white/5">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <span className="text-white/60 text-sm mb-1">Laurea</span>
            <span className="text-2xl font-bold text-white">{result.breakdown.laurea}</span>
          </CardContent>
        </Card>
        <Card className="glass-panel border-0 bg-white/5">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <span className="text-white/60 text-sm mb-1">Titoli Culturali</span>
            <span className="text-2xl font-bold text-white">{result.breakdown.titoliCulturali}</span>
          </CardContent>
        </Card>
        <Card className="glass-panel border-0 bg-white/5">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <span className="text-white/60 text-sm mb-1">Informatica</span>
            <span className="text-2xl font-bold text-white">{result.breakdown.informatica}</span>
          </CardContent>
        </Card>
        {(result.breakdown.titoliGPSAggiuntivi ?? 0) > 0 && (
          <>
            <Card className="glass-panel border-0 bg-white/5">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <span className="text-white/60 text-sm mb-1">Abilitazioni</span>
                <span className="text-2xl font-bold text-green-300">{result.breakdown.abilitazioni || 0}</span>
              </CardContent>
            </Card>
            <Card className="glass-panel border-0 bg-white/5">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <span className="text-white/60 text-sm mb-1">Accademici</span>
                <span className="text-2xl font-bold text-green-300">{result.breakdown.accademici || 0}</span>
              </CardContent>
            </Card>
            <Card className="glass-panel border-0 bg-white/5">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <span className="text-white/60 text-sm mb-1">Artistici</span>
                <span className="text-2xl font-bold text-green-300">{result.breakdown.artistici || 0}</span>
              </CardContent>
            </Card>
            <Card className="glass-panel border-0 bg-white/5">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <span className="text-white/60 text-sm mb-1">Servizio</span>
                <span className="text-2xl font-bold text-green-300">{result.breakdown.servizio || 0}</span>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Analisi Province */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <MapPin className="w-6 h-6 text-secondary" />
              Analisi Opportunità ({filteredProvinces.length})
            </h3>
            <p className="text-white/70 text-sm mt-1">
              Confronto con i punteggi minimi di nomina (2024-2025).
            </p>
            <p className="text-white/40 text-xs mt-2 italic">
              * Probabilità stimata basata su media nazionale (45 punti) per province senza dati storici
            </p>
          </div>
        </div>

        {/* Filtri */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
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
              <SelectItem value="nodata">Dati mancanti</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Lista Province */}
        <div className="grid grid-cols-1 gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {filteredProvinces.length > 0 ? (
            filteredProvinces.map((province, index) => (
              <ProvinceCard key={province.provinceId} province={province} index={index} />
            ))
          ) : (
            <div className="text-center py-12 text-white/50">
              Nessuna provincia trovata con i filtri selezionati.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ProvinceCard({ province, index }: { province: ProvinceAnalysis; index: number }) {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.5) }}
    >
      <Card className="glass-panel border-0 overflow-hidden hover:bg-white/15 transition-colors">
        <CardContent className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          {/* Immagine Regione */}
          <div className="hidden md:block w-16 h-16 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
            <img 
              src={`/images/${province.region.toLowerCase().replace(/[^a-z]/g, '-')}.jpg`}
              alt={province.region}
              className="w-full h-full object-cover opacity-60"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
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
              <div className="flex flex-wrap gap-4 text-sm text-white/70 mt-2">
                <div className="flex items-center gap-1">
                  <span className="opacity-60">Min 2024/25:</span>
                  <span className="font-mono font-semibold text-white">
                    {province.minScore2023 ? province.minScore2023.toFixed(1) : "N/D"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="opacity-60">Min 2025/26:</span>
                  <span className="font-mono font-semibold text-white">
                    {province.minScore2024 ? province.minScore2024 : "N/D"}
                  </span>
                </div>
                {province.trend !== "unknown" && (
                  <div className="flex items-center gap-1 ml-2">
                    {province.trend === "increasing" && <TrendingUp className="w-3 h-3 text-red-400" />}
                    {province.trend === "decreasing" && <TrendingDown className="w-3 h-3 text-green-400" />}
                    {province.trend === "stable" && <Minus className="w-3 h-3 text-yellow-400" />}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-sm text-white/50 mt-1 flex items-center gap-2">
                <span className="opacity-60">Punteggio stimato:</span>
                <span className="font-mono font-semibold text-white/70">~45 punti</span>
                <span className="text-xs text-white/40">(media nazionale)</span>
              </div>
            )}
          </div>

          {/* Probabilità */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <div className={`px-3 py-1.5 rounded-full border flex items-center gap-2 ${getProbabilityColor(province.probability)}`}>
              {getProbabilityIcon(province.probability)}
              <span className="font-bold uppercase tracking-wide text-xs">
                {province.probability}
              </span>
            </div>
            {!province.hasData && (
              <span className="text-xs text-white/40 italic ml-2">*</span>
            )}
          </div>

        </CardContent>
      </Card>
    </motion.div>
  );
}
