import { useState } from "react";
import { GpsForm } from "@/components/GpsForm";
import { ResultsView } from "@/components/ResultsView";
import { CoursesBanner } from "@/components/CoursesBanner";
import { calculateScore, analyzeProvinces, CalculationResult } from "@/lib/gpsAlgorithm";
import { Calculator, ArrowLeft } from "lucide-react";

export default function CalcolaGPS() {
  const [result, setResult] = useState<CalculationResult | null>(null);

  const handleCalculate = async (data: any) => {
    const scoreResult = calculateScore(data);
    const analysis = analyzeProvinces(scoreResult.totalScore, data.classeConcorso);
    
    const result = {
      ...scoreResult,
      provincesAnalysis: analysis
    };
    
    setResult(result);

    // Salva i dati nel database (in background, non blocca l'utente)
    try {
      await fetch('/api/gps/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: data.nome,
          email: data.email,
          cellulare: data.cellulare,
          classeConcorso: data.classeConcorso,
          votoDiploma: data.votoDiploma || null,
          lodeDiploma: data.lodeDiploma || false,
          votoLaurea: data.votoLaurea || null,
          lode: data.lode || false,
          numC2: data.numC2,
          numClil: data.numClil,
          numBiannale: data.numBiannale,
          certificazioniInformatiche: data.certificazioniInformatiche,
          punteggioLaurea: scoreResult.breakdown.laurea,
          punteggioTitoli: scoreResult.breakdown.titoliCulturali + scoreResult.breakdown.informatica,
          punteggioTotale: scoreResult.totalScore
        })
      });
    } catch (error) {
      console.error('Errore durante il salvataggio dei dati:', error);
    }
  };

  const handleBack = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-[#1e3a5f] text-white">
      {/* Header */}
      <div className="bg-[#152d4a] text-white py-12 md:py-16 border-b border-white/10">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl">
                <Calculator className="w-12 h-12 md:w-16 md:h-16" />
              </div>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Calcola Punteggio GPS
            </h1>
            
            <p className="text-lg md:text-xl text-white/90">
              Scopri il tuo punteggio GPS e analizza in quali province hai maggiori possibilità di ottenere una supplenza
            </p>
          </div>
        </div>
      </div>

      <main className="container py-12">
        {!result ? (
          <div className="max-w-4xl mx-auto">
            {/* Form Section */}
            <div className="bg-[#152d4a] rounded-2xl shadow-lg p-8 md:p-10 mb-12 border border-white/10">
              <GpsForm onCalculate={handleCalculate} />
            </div>

            {/* Courses Banner */}
            <CoursesBanner />
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            {/* Back Button */}
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-blue-300 hover:text-blue-200 font-semibold mb-6 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Calcola di nuovo</span>
            </button>

            {/* Results */}
            <div className="bg-[#152d4a] rounded-2xl shadow-lg p-8 md:p-10 mb-12 border border-white/10">
              <ResultsView result={result} onBack={handleBack} />
            </div>

            {/* Courses Banner */}
            <CoursesBanner />
          </div>
        )}
      </main>
    </div>
  );
}
