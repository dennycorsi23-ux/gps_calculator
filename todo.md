# TODO - MONDO SCUOLA GPS Calculator

## Sezione Corsi eCampus + Pannello Admin - PRIORITÀ ALTA

- [x] Ricerca informazioni ufficiali MIM su 30/36/60 CFU (normativa, requisiti, a cosa servono)
- [x] Ricerca offerta corsi eCampus (dettagli, costi, durata, modalità)
- [x] Creare schema database per corsi eCampus
- [x] Creare schema database per richieste info corsi
- [x] Creare pagina pubblica "Corsi" con informazioni dettagliate:
  * Certificazioni C2 British Institutes (dettagli completi, 6 punti GPS)
  * CLIL eCampus (metodologia, requisiti, punteggio GPS)
  * Certificazioni informatiche (EIPASS, PEKIT, ecc.)
  * Master L2 (didattica italiano L2, requisiti, sbocchi)
  * CFU 30/36/60 (cosa sono, normativa MIM, a cosa servono, come ottenerli)
- [x] Implementare form "Richiedi Info" per ogni corso con campi: nome, email, telefono, corso interesse, messaggio
- [x] Creare API POST /api/admin/corsi per gestione corsi (solo admin)
- [x] Creare API GET /api/corsi per elenco corsi pubblico
- [x] Creare API POST /api/richieste-info per salvare richieste utenti
- [x] Creare API GET /api/admin/richieste-info per visualizzare lead (solo admin)
- [x] Creare pannello admin protetto /admin/corsi per gestione corsi e lead
- [x] Aggiungere link "Corsi" nel menu principale
- [x] Menzionare eCampus e British Institutes senza enfatizzare
- [x] Testare tutto il flusso end-to-end
- [ ] Creare checkpoint v6.0

## Checkpoint Precedenti

- [x] v5.5 - 3 Miglioramenti Navigazione e Contenuti (Confronta Classi, Breadcrumb, FAQ)
- [x] v5.4.1 - Rimozione Script Popup PopAds
- [x] v5.4 - 4 Miglioramenti UX (Guida Punteggio, Animazioni, Confronto, Tooltip)
- [x] v5.3.1 - Fix Scroll Automatico
- [x] v5.3 - Fix Problema N/D Risultati GPS
- [x] v5.2 - Ottimizzazione Mobile e UX Trova Classe
- [x] v5.1.1 - Pulizia Progetto (rimozione script Python)
- [x] v5.1 - Integrazione Sistema Completo 40+ Titoli GPS


## Miglioramenti Post v6.0 - Richiesta Utente

- [x] Popolare database corsi iniziale con script SQL (10 corsi inseriti)
- [x] Implementare middleware autenticazione admin per proteggere /admin/corsi
- [x] Implementare notifiche email automatiche per nuove richieste info
- [x] Testare autenticazione e notifiche (11 test passati)
- [ ] Creare checkpoint v6.1


## Sistema Login Admin - v6.2

- [x] Creare pagina /login con form email/password
- [x] Implementare API autenticazione (login, logout, me)
- [x] Creare hook useAuth per gestione autenticazione frontend
- [x] Proteggere pannello admin con redirect a /login se non autenticato
- [x] Aggiungere pulsante Logout nel pannello admin con info utente
- [x] Testare flusso completo login -> admin -> logout (19 test passati)
- [ ] Creare checkpoint v6.2
