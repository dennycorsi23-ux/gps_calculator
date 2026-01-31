import { Link } from "wouter";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-8 mt-16">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-gray-600 text-sm">
            © {currentYear} Mondo Scuola. Tutti i diritti riservati.
          </p>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link href="/privacy">
              <span className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
                Privacy Policy
              </span>
            </Link>
            <Link href="/cookie-policy">
              <span className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
                Cookie Policy
              </span>
            </Link>
            <Link href="/termini-condizioni">
              <span className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
                Termini e Condizioni
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
