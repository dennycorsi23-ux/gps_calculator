import { Router } from "express";
import { 
  insertRichiestaInfoCorso,
  getAllRichiesteInfoCorsi,
  updateRichiestaInfoCorso,
  getCorsiAttivi,
  getCorsoById,
  insertCorso,
  updateCorso,
  deleteCorso
} from "../db";
import { requireAdmin } from "../middleware/requireAdmin";
import { sendRichiestaInfoNotification, sendRichiestaInfoConfirmation } from "../lib/emailNotifications";

const router = Router();

/**
 * POST /api/richieste-info
 * Salva una richiesta info da un utente per un corso
 */
router.post("/richieste-info", async (req, res) => {
  try {
    const { corsoId, nome, email, telefono, messaggio } = req.body;

    // Validazione base
    if (!corsoId || !nome || !email || !telefono) {
      return res.status(400).json({ 
        error: "Campi obbligatori mancanti: corsoId, nome, email, telefono" 
      });
    }

    // Validazione email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Email non valida" });
    }

    // Ottieni IP e User Agent
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];

    // Inserisci nel database
    const result = await insertRichiestaInfoCorso({
      corsoId: parseInt(corsoId),
      nome,
      email,
      telefono,
      messaggio: messaggio || null,
      stato: "nuova",
      privacyConsent: 1,
      ipAddress: typeof ipAddress === 'string' ? ipAddress : ipAddress?.[0],
      userAgent: userAgent || null,
    });

    // Ottieni info corso per email
    const corso = await getCorsoById(parseInt(corsoId));
    const corsoTitolo = corso?.titolo || `Corso #${corsoId}`;

    // Invia notifiche email (non bloccanti)
    Promise.all([
      sendRichiestaInfoNotification({
        nome,
        email,
        telefono,
        corso: corsoTitolo,
        messaggio: messaggio || undefined
      }),
      sendRichiestaInfoConfirmation({
        nome,
        email,
        telefono,
        corso: corsoTitolo
      })
    ]).catch(error => {
      console.error("Errore invio email notifiche:", error);
      // Non bloccare la risposta se le email falliscono
    });

    res.status(201).json({
      success: true,
      message: "Richiesta inviata con successo. Ti contatteremo presto!",
      id: result[0].insertId
    });

  } catch (error) {
    console.error("Errore salvataggio richiesta info:", error);
    res.status(500).json({ 
      error: "Errore durante l'invio della richiesta. Riprova più tardi." 
    });
  }
});

/**
 * GET /api/corsi
 * Ottiene l'elenco dei corsi attivi (pubblico)
 */
router.get("/corsi", async (req, res) => {
  try {
    const corsi = await getCorsiAttivi();
    res.json(corsi);
  } catch (error) {
    console.error("Errore recupero corsi:", error);
    res.status(500).json({ error: "Errore durante il recupero dei corsi" });
  }
});

/**
 * GET /api/corsi/:id
 * Ottiene i dettagli di un singolo corso (pubblico)
 */
router.get("/corsi/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    const corso = await getCorsoById(parseInt(id));

    if (!corso) {
      return res.status(404).json({ error: "Corso non trovato" });
    }

    res.json(corso);
  } catch (error) {
    console.error("Errore recupero corso:", error);
    res.status(500).json({ error: "Errore durante il recupero del corso" });
  }
});

// ============================================
// ADMIN ROUTES (protette - richiedono autenticazione)
// ============================================

/**
 * GET /api/admin/richieste-info
 * Ottiene tutte le richieste info (solo admin)
 */
router.get("/admin/richieste-info", requireAdmin, async (req, res) => {
  try {

    const richieste = await getAllRichiesteInfoCorsi();
    res.json(richieste);
  } catch (error) {
    console.error("Errore recupero richieste:", error);
    res.status(500).json({ error: "Errore durante il recupero delle richieste" });
  }
});

/**
 * PATCH /api/admin/richieste-info/:id
 * Aggiorna lo stato di una richiesta (solo admin)
 */
router.patch("/admin/richieste-info/:id", requireAdmin, async (req, res) => {
  try {

    const { id } = req.params;
    const { stato, note } = req.body;

    const validStati = ["nuova", "contattato", "interessato", "iscritto", "non_interessato"];
    if (stato && !validStati.includes(stato)) {
      return res.status(400).json({ error: "Stato non valido" });
    }

    await updateRichiestaInfoCorso(parseInt(id), { stato, note });

    res.json({ success: true, message: "Richiesta aggiornata" });
  } catch (error) {
    console.error("Errore aggiornamento richiesta:", error);
    res.status(500).json({ error: "Errore durante l'aggiornamento" });
  }
});

/**
 * POST /api/admin/corsi
 * Crea un nuovo corso (solo admin)
 */
router.post("/admin/corsi", requireAdmin, async (req, res) => {
  try {

    const corso = req.body;
    
    const result = await insertCorso(corso);

    res.status(201).json({
      success: true,
      id: result[0].insertId
    });
  } catch (error) {
    console.error("Errore creazione corso:", error);
    res.status(500).json({ error: "Errore durante la creazione del corso" });
  }
});

/**
 * PATCH /api/admin/corsi/:id
 * Aggiorna un corso esistente (solo admin)
 */
router.patch("/admin/corsi/:id", requireAdmin, async (req, res) => {
  try {

    const { id } = req.params;
    const updates = req.body;

    await updateCorso(parseInt(id), updates);

    res.json({ success: true, message: "Corso aggiornato" });
  } catch (error) {
    console.error("Errore aggiornamento corso:", error);
    res.status(500).json({ error: "Errore durante l'aggiornamento" });
  }
});

/**
 * DELETE /api/admin/corsi/:id
 * Elimina un corso (solo admin)
 */
router.delete("/admin/corsi/:id", requireAdmin, async (req, res) => {
  try {

    const { id } = req.params;

    await deleteCorso(parseInt(id));

    res.json({ success: true, message: "Corso eliminato" });
  } catch (error) {
    console.error("Errore eliminazione corso:", error);
    res.status(500).json({ error: "Errore durante l'eliminazione" });
  }
});

export default router;
