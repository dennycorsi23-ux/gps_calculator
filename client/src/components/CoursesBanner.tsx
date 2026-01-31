import { motion } from "framer-motion";
import { Link } from "wouter";
import { GraduationCap, Award, Laptop, Globe, ArrowRight } from "lucide-react";

export function CoursesBanner() {
  const courses = [
    {
      icon: Globe,
      title: "Certificazioni Linguistiche",
      description: "C1 e C2 per aumentare fino a 6 punti GPS",
      points: "+6 punti",
      bgColor: "bg-blue-500",
      hoverBg: "hover:bg-blue-600"
    },
    {
      icon: GraduationCap,
      title: "Certificazioni CLIL",
      description: "Percorsi universitari riconosciuti MIUR",
      points: "+3 punti",
      bgColor: "bg-purple-500",
      hoverBg: "hover:bg-purple-600"
    },
    {
      icon: Laptop,
      title: "Certificazioni Informatiche",
      description: "DigComp 2.2 e DigCompEdu accreditate Accredia",
      points: "+2 punti",
      bgColor: "bg-green-500",
      hoverBg: "hover:bg-green-600"
    },
    {
      icon: Award,
      title: "Master e Perfezionamenti",
      description: "Percorsi universitari riconosciuti dal MIUR",
      points: "+1 punto cad.",
      bgColor: "bg-orange-500",
      hoverBg: "hover:bg-orange-600"
    }
  ];

  return (
    <div className="my-16">
      {/* Container con sfondo bianco */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-xl p-8 md:p-10"
      >
        {/* Header semplice */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Aumenta il Tuo Punteggio GPS
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Scopri i percorsi formativi riconosciuti dal MIUR per scalare le graduatorie
          </p>
        </div>

        {/* Grid delle card colorate */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {courses.map((course, index) => {
            const Icon = course.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Link href="/contatti">
                  <motion.div
                    whileHover={{ scale: 1.03, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`${course.bgColor} ${course.hoverBg} rounded-xl p-6 cursor-pointer transition-all duration-300 shadow-lg hover:shadow-2xl h-full flex flex-col text-white`}
                  >
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg w-fit mb-4">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">
                      {course.title}
                    </h3>
                    
                    <p className="text-sm text-white/90 mb-4 flex-grow">
                      {course.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-white/20">
                      <span className="text-lg font-bold">
                        {course.points}
                      </span>
                      <div className="flex items-center gap-1 text-sm font-medium">
                        <span>Scopri</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <Link href="/contatti">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2 text-lg"
            >
              <span>Richiedi Informazioni sui Corsi</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
