import type { Request, Response, NextFunction } from "express";

/**
 * Middleware per verificare che l'utente sia autenticato e abbia ruolo admin
 */
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  // Verifica se l'utente è autenticato
  if (!req.user) {
    return res.status(401).json({ 
      error: "Autenticazione richiesta",
      message: "Devi effettuare il login per accedere a questa risorsa"
    });
  }

  // Verifica se l'utente ha ruolo admin
  if (req.user.role !== "admin") {
    return res.status(403).json({ 
      error: "Accesso negato",
      message: "Solo gli amministratori possono accedere a questa risorsa"
    });
  }

  // Utente autenticato e admin, procedi
  next();
}
