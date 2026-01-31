import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface RichiestaInfoEmail {
  nome: string;
  email: string;
  telefono: string;
  corso: string;
  messaggio?: string;
}

/**
 * Invia email di notifica agli admin quando arriva una nuova richiesta info corso
 */
export async function sendRichiestaInfoNotification(data: RichiestaInfoEmail) {
  try {
    const { nome, email, telefono, corso, messaggio } = data;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .info-row { margin: 15px 0; padding: 12px; background: white; border-left: 4px solid #667eea; border-radius: 4px; }
          .label { font-weight: bold; color: #667eea; display: inline-block; min-width: 100px; }
          .value { color: #333; }
          .message-box { background: white; padding: 15px; border-radius: 4px; margin-top: 15px; border: 1px solid #e5e7eb; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #6b7280; }
          .cta { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">🎓 Nuova Richiesta Info Corso</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">MONDO SCUOLA</p>
          </div>
          
          <div class="content">
            <p style="font-size: 16px; margin-top: 0;">
              È arrivata una nuova richiesta di informazioni per un corso. Ecco i dettagli:
            </p>
            
            <div class="info-row">
              <span class="label">👤 Nome:</span>
              <span class="value">${nome}</span>
            </div>
            
            <div class="info-row">
              <span class="label">📧 Email:</span>
              <span class="value"><a href="mailto:${email}">${email}</a></span>
            </div>
            
            <div class="info-row">
              <span class="label">📱 Telefono:</span>
              <span class="value"><a href="tel:${telefono}">${telefono}</a></span>
            </div>
            
            <div class="info-row">
              <span class="label">📚 Corso:</span>
              <span class="value">${corso}</span>
            </div>
            
            ${messaggio ? `
            <div class="message-box">
              <p style="margin: 0 0 8px 0; font-weight: bold; color: #667eea;">💬 Messaggio:</p>
              <p style="margin: 0; color: #4b5563;">${messaggio}</p>
            </div>
            ` : ''}
            
            <div style="text-align: center;">
              <a href="https://infogps2026.it/admin/corsi" class="cta">
                Visualizza nel Pannello Admin
              </a>
            </div>
            
            <div class="footer">
              <p>Questa è una notifica automatica da MONDO SCUOLA.</p>
              <p>Per gestire le richieste, accedi al <a href="https://infogps2026.it/admin/corsi">pannello admin</a>.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const textContent = `
Nuova Richiesta Info Corso - MONDO SCUOLA

Nome: ${nome}
Email: ${email}
Telefono: ${telefono}
Corso: ${corso}
${messaggio ? `\nMessaggio:\n${messaggio}` : ''}

Visualizza nel pannello admin: https://infogps2026.it/admin/corsi
    `;

    // Invia email all'admin
    const result = await resend.emails.send({
      from: "MONDO SCUOLA <noreply@infogps2026.it>",
      to: ["direzione@infogps2026.it"], // Email admin
      subject: `🎓 Nuova Richiesta Info: ${corso}`,
      html: htmlContent,
      text: textContent,
    });

    console.log("✅ Email notifica inviata con successo:", result);
    return result;

  } catch (error) {
    console.error("❌ Errore invio email notifica:", error);
    // Non bloccare la richiesta se l'email fallisce
    throw error;
  }
}

/**
 * Invia email di conferma all'utente che ha richiesto info
 */
export async function sendRichiestaInfoConfirmation(data: RichiestaInfoEmail) {
  try {
    const { nome, email, corso } = data;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .success-icon { font-size: 48px; text-align: center; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #6b7280; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">🎓 MONDO SCUOLA</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Richiesta Ricevuta</p>
          </div>
          
          <div class="content">
            <div class="success-icon">✅</div>
            
            <h2 style="color: #667eea; text-align: center;">Grazie ${nome}!</h2>
            
            <p style="font-size: 16px; text-align: center;">
              Abbiamo ricevuto la tua richiesta di informazioni per il corso:
            </p>
            
            <p style="font-size: 18px; font-weight: bold; text-align: center; color: #667eea; background: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
              ${corso}
            </p>
            
            <p style="font-size: 16px;">
              Il nostro team ti contatterà al più presto per fornirti tutte le informazioni necessarie e rispondere alle tue domande.
            </p>
            
            <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">
              Nel frattempo, puoi continuare a esplorare i nostri servizi:
            </p>
            
            <ul style="list-style: none; padding: 0;">
              <li style="margin: 10px 0;">📊 <a href="https://infogps2026.it/calcola-gps">Calcola il tuo punteggio GPS</a></li>
              <li style="margin: 10px 0;">🔍 <a href="https://infogps2026.it/trova-classe">Trova la tua classe di concorso</a></li>
              <li style="margin: 10px 0;">📚 <a href="https://infogps2026.it/corsi">Scopri tutti i nostri corsi</a></li>
            </ul>
            
            <div class="footer">
              <p><strong>MONDO SCUOLA</strong></p>
              <p>Il portale completo per chi vuole insegnare</p>
              <p><a href="https://infogps2026.it">infogps2026.it</a></p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const textContent = `
MONDO SCUOLA - Richiesta Ricevuta

Grazie ${nome}!

Abbiamo ricevuto la tua richiesta di informazioni per il corso:
${corso}

Il nostro team ti contatterà al più presto per fornirti tutte le informazioni necessarie.

Nel frattempo, puoi continuare a esplorare i nostri servizi:
- Calcola il tuo punteggio GPS: https://infogps2026.it/calcola-gps
- Trova la tua classe di concorso: https://infogps2026.it/trova-classe
- Scopri tutti i nostri corsi: https://infogps2026.it/corsi

MONDO SCUOLA
Il portale completo per chi vuole insegnare
https://infogps2026.it
    `;

    const result = await resend.emails.send({
      from: "MONDO SCUOLA <noreply@infogps2026.it>",
      to: [email],
      subject: "✅ Richiesta ricevuta - MONDO SCUOLA",
      html: htmlContent,
      text: textContent,
    });

    console.log("✅ Email conferma inviata all'utente:", result);
    return result;

  } catch (error) {
    console.error("❌ Errore invio email conferma:", error);
    // Non bloccare la richiesta se l'email fallisce
    throw error;
  }
}
