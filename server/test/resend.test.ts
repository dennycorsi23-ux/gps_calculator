import { describe, it, expect } from 'vitest';

describe('Resend API Key', () => {
  it('should have valid RESEND_API_KEY configured', async () => {
    const apiKey = process.env.RESEND_API_KEY;
    
    expect(apiKey).toBeDefined();
    expect(apiKey).toMatch(/^re_[a-zA-Z0-9_]+$/);
    
    // Test API key validity with a simple API call
    const response = await fetch('https://api.resend.com/domains', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    expect(response.status).toBe(200);
    
    const data = await response.json();
    expect(data.data).toBeDefined();
    expect(Array.isArray(data.data)).toBe(true);
    
    // Check if infogps2026.it domain exists
    const domain = data.data.find((d: any) => d.name === 'infogps2026.it');
    expect(domain).toBeDefined();
    expect(domain.name).toBe('infogps2026.it');
  });
});
