import { Router } from "express";
import { insertGpsLead, getAllGpsLeads, countGpsLeads } from "../db";
import type { InsertGpsLead } from "../../drizzle/schema";

const router = Router();

/**
 * POST /api/gps/submit
 * Salva i dati del form GPS nel database
 */
router.post("/submit", async (req, res) => {
  try {
    const {
      nome,
      email,
      cellulare,
      classeConcorso,
      votoDiploma,
      lodeDiploma,
      votoLaurea,
      lode,
      numC2,
      numClil,
      numBiannale,
      certificazioniInformatiche,
      punteggioLaurea,
      punteggioTitoli,
      punteggioTotale
    } = req.body;

    // Validazione campi obbligatori
    // Deve avere almeno diploma O laurea
    if (!nome || !email || !cellulare || !classeConcorso) {
      return res.status(400).json({ 
        error: "Campi obbligatori mancanti" 
      });
    }
    
    if (!votoDiploma && !votoLaurea) {
      return res.status(400).json({ 
        error: "Devi inserire almeno il voto di diploma o di laurea" 
      });
    }

    // Prepara i dati per l'inserimento
    const leadData: InsertGpsLead = {
      nome,
      email,
      cellulare,
      classeConcorso,
      votoDiploma: votoDiploma ? parseInt(votoDiploma) : null,
      lodeDiploma: lodeDiploma ? 1 : 0,
      votoLaurea: votoLaurea ? parseInt(votoLaurea) : null,
      lode: lode ? 1 : 0,
      numC2: parseInt(numC2) || 0,
      numClil: parseInt(numClil) || 0,
      numBiannale: parseInt(numBiannale) || 0,
      certificazioniInformatiche: certificazioniInformatiche ? 1 : 0,
      punteggioLaurea: parseFloat(punteggioLaurea).toFixed(2),
      punteggioTitoli: parseFloat(punteggioTitoli).toFixed(2),
      punteggioTotale: parseFloat(punteggioTotale).toFixed(2),
      ipAddress: req.ip || req.connection.remoteAddress || null,
      userAgent: req.get('user-agent') || null
    };

    // Inserisci nel database
    await insertGpsLead(leadData);

    res.status(201).json({ 
      success: true,
      message: "Dati salvati con successo" 
    });

  } catch (error) {
    console.error("[API] Error saving GPS lead:", error);
    res.status(500).json({ 
      error: "Errore durante il salvataggio dei dati" 
    });
  }
});

/**
 * GET /api/gps/leads
 * Recupera tutti i lead GPS (solo per admin)
 */
router.get("/leads", async (req, res) => {
  try {
    const leads = await getAllGpsLeads();
    res.json(leads);
  } catch (error) {
    console.error("[API] Error fetching GPS leads:", error);
    res.status(500).json({ 
      error: "Errore durante il recupero dei dati" 
    });
  }
});

/**
 * GET /api/gps/count
 * Conta il numero totale di lead GPS
 */
router.get("/count", async (req, res) => {
  try {
    const count = await countGpsLeads();
    res.json({ count });
  } catch (error) {
    console.error("[API] Error counting GPS leads:", error);
    res.status(500).json({ 
      error: "Errore durante il conteggio dei dati" 
    });
  }
});

/**
 * GET /api/gps/export
 * Esporta tutti i lead GPS in formato CSV
 */
router.get("/export", async (req, res) => {
  try {
    const leads = await getAllGpsLeads();

    // Genera CSV
    const csvHeader = "ID,Nome,Email,Cellulare,Classe Concorso,Voto Laurea,Lode,Num C2,Num CLIL,Num Biannale,Cert. Informatiche,Punteggio Laurea,Punteggio Titoli,Punteggio Totale,Data Inserimento,IP,User Agent\n";
    
    const csvRows = leads.map(lead => {
      return [
        lead.id,
        `"${lead.nome}"`,
        lead.email,
        lead.cellulare,
        lead.classeConcorso,
        lead.votoLaurea,
        lead.lode ? 'Sì' : 'No',
        lead.numC2,
        lead.numClil,
        lead.numBiannale,
        lead.certificazioniInformatiche ? 'Sì' : 'No',
        lead.punteggioLaurea,
        lead.punteggioTitoli,
        lead.punteggioTotale,
        lead.createdAt ? new Date(lead.createdAt).toLocaleString('it-IT') : '',
        lead.ipAddress || '',
        `"${lead.userAgent || ''}"`
      ].join(',');
    }).join('\n');

    const csv = csvHeader + csvRows;

    // Imposta headers per download
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="gps_leads_${new Date().toISOString().split('T')[0]}.csv"`);
    
    // Aggiungi BOM per Excel UTF-8
    res.write('\uFEFF');
    res.end(csv);

  } catch (error) {
    console.error("[API] Error exporting GPS leads:", error);
    res.status(500).json({ 
      error: "Errore durante l'esportazione dei dati" 
    });
  }
});

export default router;
