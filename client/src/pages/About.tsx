import { Link } from "wouter";
import { ArrowLeft, Target, Heart, Lightbulb, Users, BookOpen, TrendingUp, CheckCircle, Mail, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <Link href="/">
          <motion.button
            whileHover={{ x: -4 }}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Torna alla Home
          </motion.button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          {/* Title */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Chi <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Siamo</span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Una missione per migliorare la scuola italiana, un docente alla volta
            </p>
          </div>

          {/* Mission Statement */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl p-8 mb-12">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl flex-shrink-0">
                <Target className="w-8 h-8 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">La Nostra Missione</h2>
                <p className="text-white/80 leading-relaxed text-lg mb-4">
                  <strong>Migliorare la scuola italiana</strong> significa dare opportunità concrete ai docenti che vogliono 
                  crescere professionalmente e contribuire alla qualità dell'istruzione.
                </p>
                <p className="text-white/70 leading-relaxed">
                  Crediamo che ogni insegnante meriti strumenti chiari, dati trasparenti e percorsi formativi 
                  di qualità per navigare il complesso sistema delle Graduatorie GPS e ottenere più opportunità 
                  di insegnamento. Una scuola migliore parte da docenti più preparati e valorizzati.
                </p>
              </div>
            </div>
          </div>

          {/* Our Vision */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">I Nostri Principi</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl w-fit mb-4">
                  <Heart className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Trasparenza Totale</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Utilizziamo solo <strong>dati ufficiali</strong> dai bollettini provinciali del Ministero. 
                  Nessuna promessa irrealistica, solo informazioni verificabili e aggiornate.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl w-fit mb-4">
                  <Lightbulb className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Accessibilità</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Gli strumenti di calcolo GPS sono <strong>completamente gratuiti</strong>. Crediamo che 
                  l'informazione debba essere accessibile a tutti, senza barriere economiche.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl w-fit mb-4">
                  <Sparkles className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Qualità e Rigore</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Quando suggeriamo percorsi formativi, lo facciamo solo se sono <strong>riconosciuti dal MIUR</strong> 
                  e realmente utili per aumentare il punteggio GPS.
                </p>
              </div>
            </div>
          </div>

          {/* What We Offer */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-12">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-cyan-400" />
              Cosa Offriamo
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Calcolatore GPS Gratuito</h3>
                  <p className="text-white/70 leading-relaxed">
                    Uno strumento online gratuito per calcolare il tuo punteggio GPS e confrontarlo con i 
                    <strong> punteggi minimi reali</strong> di 104 province italiane. Dati ufficiali 2024/25 e 2025/26, 
                    aggiornati costantemente.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Informazioni sui Percorsi Formativi</h3>
                  <p className="text-white/70 leading-relaxed mb-3">
                    Ti aiutiamo a orientarti tra i titoli che possono aumentare il tuo punteggio GPS:
                  </p>
                  <ul className="space-y-2 text-sm text-white/60">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                      <span><strong>Certificazioni linguistiche C1/C2</strong> (fino a 6 punti)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                      <span><strong>Certificazioni CLIL</strong> universitarie (3 punti)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                      <span><strong>Certificazioni informatiche DigComp 2.2</strong> accreditate Accredia (0.5 punti cad.)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                      <span><strong>Certificazioni DigCompEdu</strong> per docenti (1 punto cad.)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                      <span><strong>Master universitari</strong> riconosciuti MIUR (1 punto cad.)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                      <span><strong>Corsi di perfezionamento</strong> universitari (1 punto cad.)</span>
                    </li>
                  </ul>
                  <p className="text-white/60 text-sm mt-3 italic">
                    Possiamo metterti in contatto con percorsi formativi certificati e riconosciuti dal MIUR.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Consulenza Strategica</h3>
                  <p className="text-white/70 leading-relaxed">
                    Ti aiutiamo a capire quali titoli sono più strategici per la tua situazione specifica, 
                    ottimizzando tempi e investimenti per massimizzare il punteggio GPS.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Aggiornamenti Normativi</h3>
                  <p className="text-white/70 leading-relaxed">
                    Ti teniamo informato su tutte le novità GPS, scadenze e cambiamenti normativi 
                    che possono influenzare la tua carriera scolastica.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Why Trust Us */}
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8 mb-12">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Users className="w-8 h-8 text-purple-400" />
              Perché Fidarsi di Noi
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Dati Verificabili</h4>
                  <p className="text-white/60 text-sm">
                    Ogni dato pubblicato è tracciabile ai bollettini ufficiali provinciali. Puoi verificare tutto.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Nessun Conflitto di Interesse</h4>
                  <p className="text-white/60 text-sm">
                    Non siamo legati a nessun ente specifico. Ti consigliamo solo ciò che è realmente utile.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Esperienza sul Campo</h4>
                  <p className="text-white/60 text-sm">
                    Conosciamo il mondo della scuola dall'interno e sappiamo cosa serve davvero ai docenti.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Aggiornamento Costante</h4>
                  <p className="text-white/60 text-sm">
                    Monitoriamo quotidianamente le novità normative per tenerti sempre informato.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Vuoi Saperne di Più?</h2>
            <p className="text-white/70 mb-6 max-w-2xl mx-auto">
              Contattaci per ricevere informazioni personalizzate sui percorsi formativi più adatti 
              alla tua situazione e scopri come aumentare il tuo punteggio GPS.
            </p>
            <Link href="/contatti">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                Richiedi Informazioni
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
