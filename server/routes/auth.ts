import { Router } from "express";
import type { Request, Response } from "express";

const router = Router();

/**
 * POST /api/auth/login
 * Autentica un utente admin
 */
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validazione input
    if (!email || !password) {
      return res.status(400).json({ error: "Email e password sono obbligatori" });
    }

    // Per ora, usiamo credenziali hardcoded per l'admin
    // TODO: In produzione, usare database con password hashate
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@infogps2026.it";
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: "Credenziali non valide" });
    }

    // Crea sessione utente
    // Il sistema OAuth di Manus gestisce automaticamente le sessioni
    const user = {
      id: 1,
      email: ADMIN_EMAIL,
      role: "admin",
      name: "Amministratore"
    };

    // Salva user nella sessione (req.user viene popolato dal middleware OAuth)
    // @ts-ignore - req.session è aggiunto dal middleware express-session
    if (req.session) {
      // @ts-ignore
      req.session.user = user;
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name
      }
    });

  } catch (error) {
    console.error("Errore login:", error);
    return res.status(500).json({ error: "Errore interno del server" });
  }
});

/**
 * POST /api/auth/logout
 * Termina la sessione dell'utente
 */
router.post("/logout", (req: Request, res: Response) => {
  try {
    // @ts-ignore
    if (req.session) {
      // @ts-ignore
      req.session.destroy((err: any) => {
        if (err) {
          console.error("Errore logout:", err);
          return res.status(500).json({ error: "Errore durante il logout" });
        }
        
        res.clearCookie("connect.sid"); // Nome cookie di default express-session
        return res.status(200).json({ success: true, message: "Logout effettuato" });
      });
    } else {
      return res.status(200).json({ success: true, message: "Nessuna sessione attiva" });
    }
  } catch (error) {
    console.error("Errore logout:", error);
    return res.status(500).json({ error: "Errore interno del server" });
  }
});

/**
 * GET /api/auth/me
 * Restituisce l'utente corrente dalla sessione
 */
router.get("/me", (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const user = req.session?.user || req.user;

    if (!user) {
      return res.status(401).json({ error: "Non autenticato" });
    }

    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name || user.email
      }
    });
  } catch (error) {
    console.error("Errore get user:", error);
    return res.status(500).json({ error: "Errore interno del server" });
  }
});

export default router;
