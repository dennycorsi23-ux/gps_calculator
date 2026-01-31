import { describe, it, expect, vi, beforeEach } from 'vitest';
import { appRouter } from './routers';

// Mock fetch globale
global.fetch = vi.fn();

describe('Contact Router', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Setup env vars per il test
    process.env.BUILT_IN_FORGE_API_URL = 'https://api.test.com';
    process.env.BUILT_IN_FORGE_API_KEY = 'test-key';
  });

  it('should send contact email successfully', async () => {
    // Mock della risposta fetch
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    });

    const caller = appRouter.createCaller({} as any);

    const result = await caller.contact.send({
      nome: 'Mario Rossi',
      email: 'mario.rossi@example.com',
      telefono: '+39 333 1234567',
      messaggio: 'Test messaggio'
    });

    expect(result.success).toBe(true);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/notification/send-email'),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test-key'
        }),
        body: expect.stringContaining('direzione@infogps2026.it')
      })
    );
  });

  it('should validate required fields', async () => {
    const caller = appRouter.createCaller({} as any);

    await expect(
      caller.contact.send({
        nome: '',
        email: 'invalid-email',
        messaggio: ''
      } as any)
    ).rejects.toThrow();
  });

  it('should handle email sending errors', async () => {
    // Mock di una risposta di errore
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      text: async () => 'Email service error'
    });

    const caller = appRouter.createCaller({} as any);

    await expect(
      caller.contact.send({
        nome: 'Mario Rossi',
        email: 'mario.rossi@example.com',
        messaggio: 'Test messaggio'
      })
    ).rejects.toThrow("Errore nell'invio dell'email");
  });
});
