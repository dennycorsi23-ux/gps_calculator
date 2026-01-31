import { describe, it, expect } from 'vitest';
import { Resend } from 'resend';

describe('Resend Email Service', () => {
  it('should have RESEND_API_KEY configured', () => {
    expect(process.env.RESEND_API_KEY).toBeDefined();
    expect(process.env.RESEND_API_KEY).toMatch(/^re_/);
  });

  it('should initialize Resend client successfully', () => {
    expect(() => {
      new Resend(process.env.RESEND_API_KEY);
    }).not.toThrow();
  });

  it('should send test email successfully', async () => {
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'danieledelvecchio2@gmail.com',
      subject: 'Test Email - GPS Calculator',
      html: '<p>Test email from GPS Calculator contact form</p>',
    });

    expect(error).toBeNull();
    expect(data).toBeDefined();
    expect(data?.id).toBeDefined();
  });
});
