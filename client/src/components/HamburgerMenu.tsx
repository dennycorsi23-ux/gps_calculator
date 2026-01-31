import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Home, Calculator, Info, Mail, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const menuItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/info-gps", label: "Info Calcolo Punteggio GPS", icon: Info },
    { path: "/contatti", label: "Contatti", icon: Mail },
    { path: "/privacy", label: "Privacy Policy", icon: Shield },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-6 right-6 z-50 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg"
        aria-label="Menu"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={closeMenu}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-l border-white/10 z-40 shadow-2xl"
            >
              <div className="flex flex-col h-full p-8 pt-24">
                {/* Logo/Title */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-1">
                    GPS <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Calculator</span>
                  </h2>
                  <p className="text-white/60 text-sm">Calcola il tuo punteggio GPS</p>
                </div>

                {/* Menu Items */}
                <nav className="flex-1 space-y-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location === item.path;
                    
                    return (
                      <Link key={item.path} href={item.path} onClick={closeMenu}>
                        <motion.div
                          whileHover={{ x: 8 }}
                          whileTap={{ scale: 0.98 }}
                          className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                            isActive
                              ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-white"
                              : "text-white/70 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{item.label}</span>
                        </motion.div>
                      </Link>
                    );
                  })}
                </nav>

                {/* Footer */}
                <div className="pt-6 border-t border-white/10">
                  <p className="text-white/40 text-xs text-center">
                    © 2025 GPS Calculator
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
