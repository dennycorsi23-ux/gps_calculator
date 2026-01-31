import { Router } from "express";

const router = Router();

// Endpoint per inviare email di contatto
router.post("/send", async (req, res) => {
  try {
    const { nome, email, telefono, messaggio } = req.body;

    // Validazione base
    if (!nome || !email || !messaggio) {
      return res.status(400).json({ error: "Campi obbligatori mancanti" });
    }

    // Email destinatario
    const destinatario = "contattaci@infogps2026.it";

    // Corpo email in formato HTML
    const emailBody = `
      <h2>Nuova Richiesta Info GPS</h2>
      <p><strong>Da:</strong> ${nome}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${telefono ? `<p><strong>Telefono:</strong> ${telefono}</p>` : ''}
      <hr>
      <h3>Messaggio:</h3>
      <p>${messaggio.replace(/\n/g, '<br>')}</p>
      <hr>
      <p style="color: #666; font-size: 12px;">Inviato tramite GPS Calculator - ${new Date().toLocaleString('it-IT')}</p>
    `;

    // Invia email usando il servizio di notifiche integrato di Manus
    const notificationResponse = await fetch(`${process.env.VITE_FRONTEND_FORGE_API_URL}/notification/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.BUILT_IN_FORGE_API_KEY}`
      },
      body: JSON.stringify({
        to: destinatario,
        subject: `GPS Calculator - Richiesta Info da ${nome}`,
        html: emailBody,
        from: 'noreply@gps-calculator.manus.space'
      })
    });

    if (!notificationResponse.ok) {
      console.error('Errore invio email:', await notificationResponse.text());
      return res.status(500).json({ error: "Errore nell'invio dell'email" });
    }

    res.json({ success: true, message: "Email inviata con successo" });
  } catch (error) {
    console.error('Errore nel processare la richiesta di contatto:', error);
    res.status(500).json({ error: "Errore interno del server" });
  }
});

export default router;
