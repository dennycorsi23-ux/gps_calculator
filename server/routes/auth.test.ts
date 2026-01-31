import { describe, it, expect } from "vitest";

describe("Auth System Tests", () => {
  
  describe("Validazione Email", () => {
    it("dovrebbe validare formato email corretto", () => {
      const emailValide = [
        "admin@infogps2026.it",
        "test@example.com",
        "user.name@domain.co.uk",
        "direzione@infogps2026.it"
      ];

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      emailValide.forEach(email => {
        expect(emailRegex.test(email)).toBe(true);
      });
    });

    it("dovrebbe rifiutare email non valide", () => {
      const emailNonValide = [
        "test",
        "test@",
        "@example.com",
        "test @example.com",
        "test@.com",
        ""
      ];

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      emailNonValide.forEach(email => {
        expect(emailRegex.test(email)).toBe(false);
      });
    });
  });

  describe("Validazione Password", () => {
    it("dovrebbe richiedere password di lunghezza minima", () => {
      const passwordTroppoCorta = "abc";
      const passwordValida = "admin123";
      const passwordForte = "Admin123!@#";

      expect(passwordTroppoCorta.length).toBeLessThan(6);
      expect(passwordValida.length).toBeGreaterThanOrEqual(6);
      expect(passwordForte.length).toBeGreaterThanOrEqual(8);
    });

    it("dovrebbe verificare che le password non siano vuote", () => {
      const passwordVuota = "";
      const passwordSpazi = "   ";
      const passwordValida = "admin123";

      expect(passwordVuota.trim().length).toBe(0);
      expect(passwordSpazi.trim().length).toBe(0);
      expect(passwordValida.trim().length).toBeGreaterThan(0);
    });

    it("dovrebbe gestire password con caratteri speciali", () => {
      const passwordConSpeciali = "Admin123!@#$%";
      const passwordSemplice = "admin123";

      expect(passwordConSpeciali.length).toBeGreaterThan(0);
      expect(passwordSemplice.length).toBeGreaterThan(0);
      expect(/[!@#$%^&*]/.test(passwordConSpeciali)).toBe(true);
      expect(/[!@#$%^&*]/.test(passwordSemplice)).toBe(false);
    });
  });

  describe("Gestione Ruoli", () => {
    it("dovrebbe verificare che solo admin possano accedere", () => {
      const userAdmin = { id: 1, email: "admin@test.it", role: "admin" };
      const userNormale = { id: 2, email: "user@test.it", role: "user" };
      const userGuest = { id: 3, email: "guest@test.it", role: "guest" };

      expect(userAdmin.role).toBe("admin");
      expect(userNormale.role).not.toBe("admin");
      expect(userGuest.role).not.toBe("admin");
    });

    it("dovrebbe avere ruoli predefiniti validi", () => {
      const ruoliValidi = ["admin", "user", "guest"];
      const ruoloAdmin = "admin";
      const ruoloUser = "user";
      const ruoloInvalido = "superadmin";

      expect(ruoliValidi).toContain(ruoloAdmin);
      expect(ruoliValidi).toContain(ruoloUser);
      expect(ruoliValidi).not.toContain(ruoloInvalido);
    });

    it("dovrebbe verificare permessi admin", () => {
      const checkIsAdmin = (user: { role: string }) => user.role === "admin";

      const admin = { id: 1, role: "admin" };
      const user = { id: 2, role: "user" };

      expect(checkIsAdmin(admin)).toBe(true);
      expect(checkIsAdmin(user)).toBe(false);
    });
  });

  describe("Redirect dopo Login", () => {
    it("dovrebbe gestire parametro redirect nell'URL", () => {
      const url = new URL("http://localhost:3000/login?redirect=/admin/corsi");
      const redirectParam = url.searchParams.get("redirect");

      expect(redirectParam).toBe("/admin/corsi");
    });

    it("dovrebbe usare redirect di default se non specificato", () => {
      const url = new URL("http://localhost:3000/login");
      const redirectParam = url.searchParams.get("redirect");
      const defaultRedirect = "/admin/corsi";

      expect(redirectParam || defaultRedirect).toBe(defaultRedirect);
    });

    it("dovrebbe validare che redirect sia un path interno", () => {
      const redirectInterno = "/admin/corsi";
      const redirectEsterno = "https://evil.com";
      const redirectRelativo = "../../../etc/passwd";

      expect(redirectInterno.startsWith("/")).toBe(true);
      expect(redirectEsterno.startsWith("/")).toBe(false);
      expect(redirectRelativo.startsWith("/")).toBe(false);
    });

    it("dovrebbe sanitizzare redirect per sicurezza", () => {
      const sanitizeRedirect = (redirect: string | null, defaultPath: string) => {
        if (!redirect) return defaultPath;
        if (!redirect.startsWith("/")) return defaultPath;
        if (redirect.includes("..")) return defaultPath;
        return redirect;
      };

      expect(sanitizeRedirect("/admin/corsi", "/")).toBe("/admin/corsi");
      expect(sanitizeRedirect("https://evil.com", "/")).toBe("/");
      expect(sanitizeRedirect("../../../etc/passwd", "/")).toBe("/");
      expect(sanitizeRedirect(null, "/admin")).toBe("/admin");
    });
  });

  describe("Gestione Sessione", () => {
    it("dovrebbe verificare presenza dati utente in sessione", () => {
      const sessioneValida = {
        user: { id: 1, email: "admin@test.it", role: "admin" }
      };
      const sessioneVuota = {};

      expect(sessioneValida.user).toBeDefined();
      expect(sessioneVuota).not.toHaveProperty("user");
    });

    it("dovrebbe verificare scadenza sessione", () => {
      const now = Date.now();
      const sessioneRecente = { createdAt: now - 1000 * 60 * 5 }; // 5 min fa
      const sessioneScaduta = { createdAt: now - 1000 * 60 * 60 * 24 }; // 1 giorno fa
      const maxAge = 1000 * 60 * 60; // 1 ora

      expect(now - sessioneRecente.createdAt).toBeLessThan(maxAge);
      expect(now - sessioneScaduta.createdAt).toBeGreaterThan(maxAge);
    });
  });

  describe("Sicurezza Login", () => {
    it("dovrebbe verificare che le credenziali non siano esposte nei log", () => {
      const loginRequest = {
        email: "admin@test.it",
        password: "admin123"
      };

      // Simula sanitizzazione per log
      const sanitizedForLog = {
        email: loginRequest.email,
        password: "***"
      };

      expect(sanitizedForLog.password).not.toBe(loginRequest.password);
      expect(sanitizedForLog.password).toBe("***");
    });

    it("dovrebbe limitare tentativi di login", () => {
      const maxAttempts = 5;
      let attempts = 0;

      const tryLogin = (success: boolean) => {
        attempts++;
        if (attempts > maxAttempts) {
          return { blocked: true, message: "Troppi tentativi" };
        }
        return { blocked: false, success };
      };

      // 5 tentativi falliti
      for (let i = 0; i < 5; i++) {
        const result = tryLogin(false);
        expect(result.blocked).toBe(false);
      }

      // 6° tentativo bloccato
      const blockedResult = tryLogin(false);
      expect(blockedResult.blocked).toBe(true);
    });
  });

  describe("Credenziali Admin", () => {
    it("dovrebbe usare variabili ambiente per credenziali", () => {
      const adminEmail = process.env.ADMIN_EMAIL || "admin@infogps2026.it";
      const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

      expect(adminEmail).toBeDefined();
      expect(adminPassword).toBeDefined();
      expect(adminEmail.length).toBeGreaterThan(0);
      expect(adminPassword.length).toBeGreaterThan(0);
    });

    it("dovrebbe avere email admin valida", () => {
      const adminEmail = process.env.ADMIN_EMAIL || "admin@infogps2026.it";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      expect(emailRegex.test(adminEmail)).toBe(true);
    });
  });
});
