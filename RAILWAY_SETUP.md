# Configurazione Railway per GPS Calculator

## Variabili d'ambiente richieste

Configura queste variabili d'ambiente nel pannello Railway:

### Database
```
DATABASE_URL=mysql://utente:password@host:porta/database
```

### Server
```
NODE_ENV=production
PORT=3000
```

### OAuth (opzionale, per autenticazione Manus)
```
OAUTH_SERVER_URL=https://oauth.manus.computer
JWT_SECRET=<genera_una_chiave_segreta>
VITE_APP_ID=<il_tuo_app_id>
OWNER_OPEN_ID=<il_tuo_open_id>
```

## Comandi di build

Railway dovrebbe rilevare automaticamente i comandi dal `package.json`:
- **Build**: `pnpm build`
- **Start**: `pnpm start`

## Migrazioni Database

Dopo aver configurato `DATABASE_URL`, esegui le migrazioni:
```bash
pnpm db:push
```

Oppure esegui manualmente le query SQL nella cartella `drizzle/`.
