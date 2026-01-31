import { describe, it, expect } from 'vitest';
import { calculateScore } from '../client/src/lib/gpsAlgorithm';

describe('GPS Algorithm - Certificazioni Informatiche DigComp', () => {
  const baseData = {
    votoLaurea: 100,
    lode: false,
    numC2: 0,
    numClil: 0,
    numBiannale: 0,
    hasMasterL2: false,
  };

  it('dovrebbe calcolare correttamente 1 certificazione DigComp 2.2 (0.5 punti)', () => {
    const result = calculateScore({
      ...baseData,
      numDigComp22: 1,
      numDigCompEdu: 0,
    });
    
    expect(result.breakdown.informatica).toBe(0.5);
  });

  it('dovrebbe calcolare correttamente 2 certificazioni DigComp 2.2 (1 punto)', () => {
    const result = calculateScore({
      ...baseData,
      numDigComp22: 2,
      numDigCompEdu: 0,
    });
    
    expect(result.breakdown.informatica).toBe(1.0);
  });

  it('dovrebbe calcolare correttamente 4 certificazioni DigComp 2.2 (2 punti - massimo)', () => {
    const result = calculateScore({
      ...baseData,
      numDigComp22: 4,
      numDigCompEdu: 0,
    });
    
    expect(result.breakdown.informatica).toBe(2.0);
  });

  it('dovrebbe applicare il cap massimo di 2 punti con 5 certificazioni DigComp 2.2', () => {
    const result = calculateScore({
      ...baseData,
      numDigComp22: 5,
      numDigCompEdu: 0,
    });
    
    // 5 * 0.5 = 2.5, ma il massimo è 2
    expect(result.breakdown.informatica).toBe(2.0);
  });

  it('dovrebbe calcolare correttamente 1 certificazione DigComp Edu (1 punto)', () => {
    const result = calculateScore({
      ...baseData,
      numDigComp22: 0,
      numDigCompEdu: 1,
    });
    
    expect(result.breakdown.informatica).toBe(1.0);
  });

  it('dovrebbe calcolare correttamente 2 certificazioni DigComp Edu (2 punti - massimo)', () => {
    const result = calculateScore({
      ...baseData,
      numDigComp22: 0,
      numDigCompEdu: 2,
    });
    
    expect(result.breakdown.informatica).toBe(2.0);
  });

  it('dovrebbe applicare il cap massimo di 2 punti con 3 certificazioni DigComp Edu', () => {
    const result = calculateScore({
      ...baseData,
      numDigComp22: 0,
      numDigCompEdu: 3,
    });
    
    // 3 * 1 = 3, ma il massimo è 2
    expect(result.breakdown.informatica).toBe(2.0);
  });

  it('dovrebbe sommare correttamente DigComp 2.2 e DigComp Edu', () => {
    const result = calculateScore({
      ...baseData,
      numDigComp22: 1, // 0.5 punti
      numDigCompEdu: 1, // 1 punto
    });
    
    // 0.5 + 1 = 1.5
    expect(result.breakdown.informatica).toBe(1.5);
  });

  it('dovrebbe applicare il cap massimo con mix di certificazioni', () => {
    const result = calculateScore({
      ...baseData,
      numDigComp22: 2, // 1 punto
      numDigCompEdu: 2, // 2 punti
    });
    
    // 1 + 2 = 3, ma il massimo è 2
    expect(result.breakdown.informatica).toBe(2.0);
  });

  it('dovrebbe dare 0 punti senza certificazioni', () => {
    const result = calculateScore({
      ...baseData,
      numDigComp22: 0,
      numDigCompEdu: 0,
    });
    
    expect(result.breakdown.informatica).toBe(0);
  });

  it('dovrebbe calcolare correttamente il punteggio totale con certificazioni informatiche', () => {
    const result = calculateScore({
      votoLaurea: 110,
      lode: true,
      numC2: 1, // 6 punti
      numClil: 1, // 3 punti
      numBiannale: 1, // 2 punti
      hasMasterL2: false,
      numDigComp22: 2, // 1 punto
      numDigCompEdu: 1, // 1 punto
    });
    
    // Laurea: 12 + 17 + 4 = 33
    // Titoli culturali: 6 + 3 + 2 = 11
    // Informatica: 1 + 1 = 2 (cap a 2)
    // Totale: 33 + 11 + 2 = 46
    expect(result.totalScore).toBe(46);
    expect(result.breakdown.laurea).toBe(33);
    expect(result.breakdown.titoliCulturali).toBe(11);
    expect(result.breakdown.informatica).toBe(2);
  });

  it('dovrebbe calcolare correttamente il Master L2 (3 punti)', () => {
    const result = calculateScore({
      ...baseData,
      hasMasterL2: true,
      numDigComp22: 0,
      numDigCompEdu: 0,
    });
    
    expect(result.breakdown.titoliCulturali).toBe(3);
  });

  it('dovrebbe calcolare correttamente il punteggio totale con Master L2', () => {
    const result = calculateScore({
      votoLaurea: 110,
      lode: true,
      numC2: 1, // 6 punti
      numClil: 1, // 3 punti
      numBiannale: 1, // 2 punti
      hasMasterL2: true, // 3 punti
      numDigComp22: 2, // 1 punto
      numDigCompEdu: 1, // 1 punto
    });
    
    // Laurea: 12 + 17 + 4 = 33
    // Titoli culturali: 6 + 3 + 2 + 3 = 14
    // Informatica: 1 + 1 = 2 (cap a 2)
    // Totale: 33 + 14 + 2 = 49
    expect(result.totalScore).toBe(49);
    expect(result.breakdown.laurea).toBe(33);
    expect(result.breakdown.titoliCulturali).toBe(14);
    expect(result.breakdown.informatica).toBe(2);
  });
});
