import { describe, it, expect } from 'vitest';
import { calculateScore } from './gpsAlgorithm';

describe('GPS Algorithm - Calcolo Punteggio', () => {
  it('dovrebbe calcolare correttamente il punteggio base (solo laurea)', () => {
    const result = calculateScore({
      votoLaurea: 110,
      lode: true,
      numC2: 0,
      numClil: 0,
      numBiannale: 0,
      hasMasterL2: false,
      numDigComp22: 0,
      numDigCompEdu: 0,
    });

    // 110 e lode = 12 (base) + 17 (110-76=34 * 0.5) + 4 (lode) = 33
    expect(result.totalScore).toBe(33);
    expect(result.breakdown.laurea).toBe(33);
  });

  it('dovrebbe calcolare correttamente i titoli culturali', () => {
    const result = calculateScore({
      votoLaurea: 100,
      lode: false,
      numC2: 2,
      numClil: 1,
      numBiannale: 1,
      hasMasterL2: true,
      numDigComp22: 0,
      numDigCompEdu: 0,
    });

    // Laurea: 12 + 12 = 24
    // C2: 2 * 6 = 12
    // CLIL: 1 * 3 = 3
    // Biennale: 1 * 2 = 2
    // Master L2: 3
    // Totale titoli culturali: 20
    expect(result.breakdown.titoliCulturali).toBe(20);
  });

  it('dovrebbe rispettare il limite massimo di 2 punti per informatica', () => {
    const result = calculateScore({
      votoLaurea: 100,
      lode: false,
      numC2: 0,
      numClil: 0,
      numBiannale: 0,
      hasMasterL2: false,
      numDigComp22: 4, // 4 * 0.5 = 2
      numDigCompEdu: 2, // 2 * 1 = 2 (totale 4, ma cap a 2)
    });

    // Informatica dovrebbe essere cappata a 2
    expect(result.breakdown.informatica).toBe(2);
  });

  it('dovrebbe calcolare correttamente i titoli GPS aggiuntivi - Abilitazione', () => {
    const result = calculateScore({
      votoLaurea: 100,
      lode: false,
      numC2: 0,
      numClil: 0,
      numBiannale: 0,
      hasMasterL2: false,
      numDigComp22: 0,
      numDigCompEdu: 0,
      titoliGPS: {
        'a1_abilitazione': '96-100', // 12 punti
      },
    });

    expect(result.breakdown.titoliGPSAggiuntivi).toBe(12);
    expect(result.breakdown.abilitazioni).toBe(12);
  });

  it('dovrebbe calcolare correttamente i titoli GPS aggiuntivi - Titoli Accademici', () => {
    const result = calculateScore({
      votoLaurea: 100,
      lode: false,
      numC2: 0,
      numClil: 0,
      numBiannale: 0,
      hasMasterL2: false,
      numDigComp22: 0,
      numDigCompEdu: 0,
      titoliGPS: {
        'b1_diploma_laurea_aggiuntivo': 2, // 2 * 3 = 6
        'b5_specializzazione_sostegno': true, // 9 punti
        'b7_dottorato': true, // 12 punti
        'b17_certificazioni_informatiche': 4, // 4 * 0.5 = 2
      },
    });

    // Totale accademici: 6 + 9 + 12 + 2 = 29
    expect(result.breakdown.titoliGPSAggiuntivi).toBe(29);
    expect(result.breakdown.accademici).toBe(29);
  });

  it('dovrebbe calcolare correttamente i titoli GPS aggiuntivi - Servizio', () => {
    const result = calculateScore({
      votoLaurea: 100,
      lode: false,
      numC2: 0,
      numClil: 0,
      numBiannale: 0,
      hasMasterL2: false,
      numDigComp22: 0,
      numDigCompEdu: 0,
      titoliGPS: {
        'c1_servizio_specifico': 12, // 12 mesi = 12 * 2 = 24 punti
        'c2_servizio_altra_classe': 6, // 6 mesi = 6 * 1 = 6 punti
      },
    });

    // Totale servizio: 24 + 6 = 30
    expect(result.breakdown.titoliGPSAggiuntivi).toBe(30);
    expect(result.breakdown.servizio).toBe(30);
  });

  it('dovrebbe calcolare correttamente un caso completo con tutti i titoli', () => {
    const result = calculateScore({
      votoLaurea: 110,
      lode: true,
      numC2: 1,
      numClil: 1,
      numBiannale: 1,
      hasMasterL2: true,
      numDigComp22: 2,
      numDigCompEdu: 1,
      titoliGPS: {
        'a1_abilitazione': '96-100', // 12 punti
        'b5_specializzazione_sostegno': true, // 9 punti
        'b7_dottorato': true, // 12 punti
        'b14_certificazioni_linguistiche': 'c2', // 6 punti
        'c1_servizio_specifico': 12, // 24 punti
      },
    });

    // Laurea: 33
    // Titoli culturali: 6 + 3 + 2 + 3 = 14
    // Informatica: 2 (cap)
    // Titoli GPS: 12 + 9 + 12 + 6 + 24 = 63
    // Totale: 33 + 14 + 2 + 63 = 112
    expect(result.totalScore).toBe(112);
    expect(result.breakdown.laurea).toBe(33);
    expect(result.breakdown.titoliCulturali).toBe(14);
    expect(result.breakdown.informatica).toBe(2);
    expect(result.breakdown.titoliGPSAggiuntivi).toBe(63);
  });

  it('dovrebbe gestire correttamente il caso senza titoli GPS', () => {
    const result = calculateScore({
      votoLaurea: 100,
      lode: false,
      numC2: 0,
      numClil: 0,
      numBiannale: 0,
      hasMasterL2: false,
      numDigComp22: 0,
      numDigCompEdu: 0,
    });

    expect(result.breakdown.titoliGPSAggiuntivi).toBeUndefined();
    expect(result.totalScore).toBe(24); // Solo laurea base
  });
});
