import { Link } from "wouter";
import { Calculator, GraduationCap, Info, Sparkles, Mail, BookOpen, Award, Search } from "lucide-react";
import { CoursesBanner } from "@/components/CoursesBanner";

export default function Home() {
  const sections = [
    {
      icon: Calculator,
      title: "Calcola Punteggio GPS",
      description: "Scopri il tuo punteggio GPS e analizza in quali province hai maggiori possibilità di ottenere una supplenza, basato sui dati storici ufficiali.",
      link: "/calcola-gps",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: Search,
      title: "Trova Classe di Concorso",
      description: "Verifica per quali classi di concorso puoi insegnare con la tua laurea, o scopri quali lauree servono per una specifica classe.",
      link: "/trova-classe",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      icon: Info,
      title: "Info GPS 2026",
      description: "Tutte le informazioni essenziali sulle Graduatorie Provinciali per le Supplenze: requisiti, punteggi, scadenze e procedure.",
      link: "/info-gps",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200"
    },
    {
      icon: Sparkles,
      title: "Novità GPS 2026",
      description: "Resta aggiornato su tutte le novità, i cambiamenti normativi e le ultime notizie riguardanti le graduatorie GPS.",
      link: "/novita-gps",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    },
    {
      icon: Mail,
      title: "Contatti",
      description: "Hai domande o dubbi? Contattaci per ricevere supporto personalizzato sul tuo percorso per diventare docente.",
      link: "/contatti",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white">
        <div className="container py-20 md:py-28">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
                <GraduationCap className="w-16 h-16 md:w-20 md:h-20" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              MONDO SCUOLA
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Il portale completo per chi vuole insegnare
            </p>
            
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Tutti gli strumenti e le informazioni necessarie per il tuo percorso verso l'insegnamento
            </p>
          </div>
        </div>
      </div>

      <main className="container py-12 md:py-16">
        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            La Nostra Mission
          </h2>
          
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-lg leading-relaxed mb-4">
              <strong>MONDO SCUOLA</strong> nasce dalla volontà di supportare tutti gli aspiranti docenti nel loro percorso verso l'insegnamento. 
              Sappiamo quanto possa essere complesso orientarsi tra graduatorie, classi di concorso, punteggi e normative in continua evoluzione.
            </p>
            
            <p className="text-lg leading-relaxed mb-4">
              Per questo abbiamo creato un <strong>portale unico</strong> che raccoglie tutti gli strumenti e le informazioni necessarie in un unico luogo, 
              con dati aggiornati e strumenti pratici per aiutarti a prendere decisioni informate sul tuo futuro professionale.
            </p>
            
            <p className="text-lg leading-relaxed">
              Che tu stia cercando di calcolare il tuo punteggio GPS, scoprire per quali classi puoi insegnare, o semplicemente rimanere aggiornato sulle ultime novità, 
              <strong> MONDO SCUOLA</strong> è il tuo punto di riferimento affidabile.
            </p>
          </div>
        </div>

        {/* Sections Grid */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
            Scopri Tutte le Nostre Sezioni
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <Link key={index} href={section.link}>
                  <div className={`bg-white border-2 ${section.borderColor} rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full flex flex-col`}>
                    <div className={`${section.bgColor} p-4 rounded-xl w-fit mb-4`}>
                      <Icon className={`w-8 h-8 ${section.color}`} />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {section.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed flex-grow">
                      {section.description}
                    </p>
                    
                    <div className={`mt-4 pt-4 border-t ${section.borderColor}`}>
                      <span className={`text-sm font-semibold ${section.color}`}>
                        Scopri di più →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Courses Banner */}
        <CoursesBanner />

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-10 md:p-16 text-center shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Inizia il Tuo Percorso Oggi
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Unisciti a migliaia di aspiranti docenti che hanno già scelto MONDO SCUOLA 
            come punto di riferimento per il loro futuro nell'insegnamento.
          </p>
          <Link href="/calcola-gps">
            <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg">
              Calcola il Tuo Punteggio GPS
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
