import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Home, Calculator, Info, Sparkles, Mail, GraduationCap, TrendingUp, GitCompare, HelpCircle, BookOpen } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const menuItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/calcola-gps", label: "Calcola GPS", icon: Calculator },
    { path: "/info-gps", label: "Info Calcolo Punteggio GPS", icon: Info },
    { path: "/guida-aumentare-punteggio", label: "Come Aumentare Punteggio", icon: TrendingUp },
    { path: "/novita-gps-2026", label: "Novità GPS 2026", icon: Sparkles },
    { path: "/trova-classe", label: "Trova Classe di Concorso", icon: GraduationCap },
    { path: "/confronta-classi", label: "Confronta Classi", icon: GitCompare },
    { path: "/faq-gps", label: "FAQ GPS 2026", icon: HelpCircle },
    { path: "/corsi", label: "Corsi", icon: BookOpen },
    { path: "/contatti", label: "Contatti", icon: Mail },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Desktop Navigation - White Background */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-40 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <GraduationCap className="w-8 h-8 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">
                  MONDO <span className="text-blue-600">SCUOLA</span>
                </h2>
              </div>
            </Link>

            {/* Desktop Menu Items */}
            <div className="flex items-center gap-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.path;
                
                return (
                  <Link key={item.path} href={item.path}>
                    <div
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-blue-50 border border-blue-200 text-blue-600 font-semibold"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="fixed top-6 right-6 z-50 p-3 rounded-xl bg-white shadow-lg border border-gray-200 hover:bg-gray-50 transition-all duration-300"
          aria-label="Menu"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-gray-900" />
          ) : (
            <Menu className="w-6 h-6 text-gray-900" />
          )}
        </button>

        {/* Menu Overlay */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={closeMenu}
            />

            {/* Menu Panel */}
            <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white border-l border-gray-200 z-40 shadow-2xl">
              <div className="flex flex-col h-full p-8 pt-24">
                {/* Logo/Title */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="w-8 h-8 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      MONDO <span className="text-blue-600">SCUOLA</span>
                    </h2>
                  </div>
                  <p className="text-gray-600 text-sm">Il tuo portale per il mondo della scuola</p>
                </div>

                {/* Menu Items */}
                <nav className="flex-1 space-y-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location === item.path;
                    
                    return (
                      <Link key={item.path} href={item.path} onClick={closeMenu}>
                        <div
                          className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                            isActive
                              ? "bg-blue-50 border border-blue-200 text-blue-600 font-semibold"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span>{item.label}</span>
                        </div>
                      </Link>
                    );
                  })}
                </nav>

                {/* Footer */}
                <div className="pt-6 border-t border-gray-200">
                  <p className="text-gray-400 text-xs text-center">
                    © 2025 Mondo Scuola
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
