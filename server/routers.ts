import { COOKIE_NAME } from "../shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { Resend } from "resend";
import { 
  getAllProvince, 
  getAllClassiConcorso, 
  getGpsDataByClasse, 
  getGpsDataByProvincia,
  analyzeOpportunities,
  getGpsStats 
} from "./gpsDb";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Contact form email endpoint
  contact: router({
    send: publicProcedure
      .input(z.object({
        nome: z.string().min(1),
        email: z.string().email(),
        telefono: z.string().optional(),
        messaggio: z.string().min(1)
      }))
      .mutation(async ({ input }) => {
        const { nome, email, telefono, messaggio } = input;
        const destinatario = "direzione@infogps2026.it";

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

        if (!process.env.RESEND_API_KEY) {
          throw new Error("RESEND_API_KEY non configurata");
        }

        try {
          const resend = new Resend(process.env.RESEND_API_KEY);
          
          const { data, error } = await resend.emails.send({
            from: 'direzione@infogps2026.it',
            to: destinatario,
            subject: `GPS Calculator - Richiesta Info da ${nome}`,
            html: emailBody,
          });

          if (error) {
            console.error('Errore invio email Resend:', error);
            throw new Error("Errore nell'invio dell'email");
          }

          console.log('Email inviata con successo:', data);
          return { success: true, message: "Email inviata con successo" };
        } catch (error) {
          console.error('Errore nel processare la richiesta di contatto:', error);
          throw new Error("Errore nell'invio dell'email");
        }
      })
  }),

  // GPS Data API
  gps: router({
    // Recupera tutte le province
    getProvince: publicProcedure.query(async () => {
      try {
        return await getAllProvince();
      } catch (error) {
        console.error('Errore nel recuperare le province:', error);
        return [];
      }
    }),

    // Recupera tutte le classi di concorso
    getClassiConcorso: publicProcedure.query(async () => {
      try {
        return await getAllClassiConcorso();
      } catch (error) {
        console.error('Errore nel recuperare le classi di concorso:', error);
        return [];
      }
    }),

    // Recupera i dati GPS per una classe di concorso
    getDataByClasse: publicProcedure
      .input(z.object({
        codiceClasse: z.string().min(1)
      }))
      .query(async ({ input }) => {
        try {
          return await getGpsDataByClasse(input.codiceClasse);
        } catch (error) {
          console.error('Errore nel recuperare i dati GPS per classe:', error);
          return [];
        }
      }),

    // Recupera i dati GPS per una provincia
    getDataByProvincia: publicProcedure
      .input(z.object({
        provinciaId: z.number()
      }))
      .query(async ({ input }) => {
        try {
          return await getGpsDataByProvincia(input.provinciaId);
        } catch (error) {
          console.error('Errore nel recuperare i dati GPS per provincia:', error);
          return [];
        }
      }),

    // Analizza le opportunità per un candidato
    analyzeOpportunities: publicProcedure
      .input(z.object({
        codiceClasse: z.string().min(1),
        punteggio: z.number(),
        fascia: z.enum(["1", "2"]).default("1")
      }))
      .query(async ({ input }) => {
        try {
          return await analyzeOpportunities(input.codiceClasse, input.punteggio, input.fascia);
        } catch (error) {
          console.error('Errore nell\'analisi delle opportunità:', error);
          return [];
        }
      }),

    // Statistiche GPS
    getStats: publicProcedure.query(async () => {
      try {
        return await getGpsStats();
      } catch (error) {
        console.error('Errore nel recuperare le statistiche GPS:', error);
        return { province: 0, classiConcorso: 0, graduatorie: 0 };
      }
    }),
  }),
});

export type AppRouter = typeof appRouter;
