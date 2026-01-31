// Dati GPS Province Italiane - Punteggi minimi per nomine
// Fonte: Bollettini ufficiali primo turno 2024/2025 e 2025/2026

export interface ProvinceData {
  id: string;
  name: string;
  region: string;
  minScores2024: Record<string, number>;
  minScores2025: Record<string, number>;
  sourceUrl?: string;
}

export const provinces: ProvinceData[] = [

  // ABRUZZO
  {
    id: "CH",
    name: "Chieti",
    region: "Abruzzo",
    minScores2024: {"A-12": 55, "A-22": 44, "A-26": 53, "A-27": 53, "A-28": 50, "A-40": 43, "A-41": 46, "A-42": 44, "A-50": 45},
    minScores2025: {"A-11": 49, "A-24": 42, "A-25": 46, "A-37": 47, "A-45": 50, "A-46": 57, "AAAA": 41, "ADAA": 17, "ADEE": 19, "ADMM": 31, "ADSS": 24, "EEEE": 34},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "AQ",
    name: "L'Aquila",
    region: "Abruzzo",
    minScores2024: {"A-22": 52, "A-24": 38, "A-25": 46, "A-26": 58, "A-40": 43, "A-41": 42, "A-46": 61, "A-50": 46, "ADEE": 17, "ADSS": 30},
    minScores2025: {"A-11": 54, "A-12": 49, "A-27": 54, "A-28": 57, "A-37": 48, "A-42": 45, "A-45": 46, "AAAA": 41, "ADAA": 20, "ADMM": 21, "EEEE": 41},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "PE",
    name: "Pescara",
    region: "Abruzzo",
    minScores2024: {"A-11": 56, "A-26": 56, "A-40": 46, "A-41": 46, "A-42": 37, "A-46": 62, "A-50": 51, "ADSS": 31},
    minScores2025: {"A-12": 48, "A-22": 49, "A-24": 42, "A-25": 41, "A-27": 58, "A-28": 60, "A-37": 40, "A-45": 53, "AAAA": 43, "ADAA": 25, "ADEE": 18, "ADMM": 26, "EEEE": 39},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "TE",
    name: "Teramo",
    region: "Abruzzo",
    minScores2024: {"A-11": 52, "A-12": 49, "A-25": 37, "A-26": 63, "A-28": 54, "A-41": 42, "A-42": 38, "A-50": 49, "ADAA": 23, "ADEE": 17, "ADSS": 27, "EEEE": 39},
    minScores2025: {"A-22": 53, "A-24": 35, "A-27": 58, "A-37": 47, "A-40": 37, "A-45": 48, "A-46": 66, "AAAA": 37, "ADMM": 31},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },

  // BASILICATA
  {
    id: "MT",
    name: "Matera",
    region: "Basilicata",
    minScores2024: {"A-22": 35, "A-24": 26, "A-25": 30, "A-37": 36, "A-40": 33, "A-42": 28, "A-45": 34, "A-50": 35, "ADMM": 16, "EEEE": 29},
    minScores2025: {"A-11": 35, "A-12": 33, "A-26": 48, "A-27": 44, "A-28": 44, "A-41": 30, "A-46": 43, "AAAA": 33, "ADAA": 10, "ADEE": 12, "ADSS": 19},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "PZ",
    name: "Potenza",
    region: "Basilicata",
    minScores2024: {"A-12": 43, "A-24": 29, "A-25": 31, "A-27": 43, "A-28": 47, "A-40": 38, "A-42": 26, "ADMM": 11},
    minScores2025: {"A-11": 39, "A-22": 30, "A-26": 47, "A-37": 34, "A-41": 27, "A-45": 34, "A-46": 43, "A-50": 36, "AAAA": 29, "ADAA": 16, "ADEE": 11, "ADSS": 23, "EEEE": 31},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },

  // CALABRIA
  {
    id: "CZ",
    name: "Catanzaro",
    region: "Calabria",
    minScores2024: {"A-11": 35, "A-12": 34, "A-22": 33, "A-25": 28, "A-27": 48, "A-28": 39, "A-37": 34, "A-41": 31, "A-45": 39, "A-46": 44, "A-50": 33, "ADSS": 13},
    minScores2025: {"A-24": 26, "A-26": 49, "A-40": 33, "A-42": 29, "AAAA": 26, "ADAA": 10, "ADEE": 18, "ADMM": 20, "EEEE": 24},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "CS",
    name: "Cosenza",
    region: "Calabria",
    minScores2024: {"A-22": 38, "A-28": 46, "A-37": 32, "A-40": 28, "A-42": 34, "A-45": 41, "A-50": 37, "AAAA": 32, "ADMM": 21, "ADSS": 21, "EEEE": 27},
    minScores2025: {"A-11": 37, "A-12": 43, "A-24": 27, "A-25": 31, "A-26": 50, "A-27": 39, "A-41": 27, "A-46": 51, "ADAA": 10, "ADEE": 19},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "KR",
    name: "Crotone",
    region: "Calabria",
    minScores2024: {"A-11": 39, "A-22": 32, "A-27": 45, "A-37": 34, "A-40": 29, "A-42": 27, "A-46": 46, "ADEE": 16},
    minScores2025: {"A-12": 35, "A-24": 34, "A-25": 27, "A-26": 42, "A-28": 45, "A-41": 37, "A-45": 43, "A-50": 40, "AAAA": 28, "ADAA": 17, "ADMM": 16, "ADSS": 16, "EEEE": 22},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "RC",
    name: "Reggio Calabria",
    region: "Calabria",
    minScores2024: {"A-12": 42, "A-25": 33, "A-28": 38, "A-37": 38, "A-42": 34, "A-45": 34, "A-46": 45, "AAAA": 30, "ADEE": 12},
    minScores2025: {"A-11": 44, "A-22": 38, "A-24": 25, "A-26": 47, "A-27": 45, "A-40": 28, "A-41": 29, "A-50": 33, "ADAA": 11, "ADMM": 21, "ADSS": 19, "EEEE": 30},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "VV",
    name: "Vibo Valentia",
    region: "Calabria",
    minScores2024: {"A-11": 45, "A-22": 39, "A-27": 39, "A-28": 38, "A-37": 38, "A-40": 36, "A-41": 33, "A-46": 45, "ADSS": 14, "EEEE": 31},
    minScores2025: {"A-12": 39, "A-24": 31, "A-25": 37, "A-26": 48, "A-42": 34, "A-45": 34, "A-50": 35, "AAAA": 27, "ADAA": 10, "ADEE": 12, "ADMM": 14},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },

  // CAMPANIA
  {
    id: "AV",
    name: "Avellino",
    region: "Campania",
    minScores2024: {"A-27": 48, "A-40": 28, "A-41": 30, "A-45": 34, "A-46": 44, "A-50": 40, "AAAA": 30, "ADAA": 11, "ADMM": 13},
    minScores2025: {"A-11": 40, "A-12": 36, "A-22": 33, "A-24": 29, "A-25": 33, "A-26": 43, "A-28": 42, "A-37": 29, "A-42": 28, "ADEE": 10, "ADSS": 22, "EEEE": 31},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "BN",
    name: "Benevento",
    region: "Campania",
    minScores2024: {"A-11": 36, "A-12": 41, "A-22": 31, "A-25": 37, "A-27": 40, "A-42": 34, "AAAA": 26, "ADAA": 12, "EEEE": 26},
    minScores2025: {"A-24": 32, "A-26": 43, "A-28": 40, "A-37": 30, "A-40": 31, "A-41": 37, "A-45": 41, "A-46": 44, "A-50": 37, "ADEE": 19, "ADMM": 18, "ADSS": 21},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "CE",
    name: "Caserta",
    region: "Campania",
    minScores2024: {"A-26": 44, "A-27": 43, "A-28": 46, "A-40": 34, "A-41": 34, "A-45": 36, "A-46": 45, "ADAA": 12, "ADEE": 10, "ADSS": 22},
    minScores2025: {"A-11": 44, "A-12": 35, "A-22": 40, "A-24": 25, "A-25": 27, "A-37": 32, "A-42": 27, "A-50": 31, "AAAA": 27, "ADMM": 19, "EEEE": 21},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "NA",
    name: "Napoli",
    region: "Campania",
    minScores2024: {"A-11": 36, "A-25": 27, "A-26": 40, "A-27": 43, "A-37": 34, "A-42": 34, "A-45": 42, "A-46": 52, "AAAA": 24, "ADAA": 16, "ADMM": 14, "EEEE": 23},
    minScores2025: {"A-12": 38, "A-22": 39, "A-24": 33, "A-28": 43, "A-40": 32, "A-41": 32, "A-50": 30, "ADEE": 18, "ADSS": 22},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "SA",
    name: "Salerno",
    region: "Campania",
    minScores2024: {"A-11": 39, "A-25": 28, "A-26": 45, "A-27": 48, "A-28": 40, "A-37": 32, "A-40": 35, "A-41": 34, "A-42": 30, "A-50": 39, "ADAA": 13, "ADEE": 10, "EEEE": 22},
    minScores2025: {"A-12": 43, "A-22": 30, "A-24": 28, "A-45": 39, "A-46": 50, "AAAA": 32, "ADMM": 21, "ADSS": 16},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },

  // EMILIA-ROMAGNA
  {
    id: "BO",
    name: "Bologna",
    region: "Emilia-Romagna",
    minScores2024: {"A-11": 59, "A-12": 55, "A-25": 52, "A-27": 67, "A-37": 54, "A-41": 51, "A-42": 46, "A-45": 59, "A-46": 67, "AAAA": 46, "ADMM": 37, "ADSS": 33, "EEEE": 39},
    minScores2025: {"A-22": 60, "A-24": 44, "A-26": 70, "A-28": 65, "A-40": 51, "A-50": 49, "ADAA": 21, "ADEE": 23},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "FE",
    name: "Ferrara",
    region: "Emilia-Romagna",
    minScores2024: {"A-12": 54, "A-22": 59, "A-27": 65, "A-41": 42, "A-46": 66, "EEEE": 46},
    minScores2025: {"A-11": 55, "A-24": 48, "A-25": 44, "A-26": 65, "A-28": 58, "A-37": 55, "A-40": 48, "A-42": 47, "A-45": 50, "A-50": 53, "AAAA": 41, "ADAA": 22, "ADEE": 32, "ADMM": 29, "ADSS": 38},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "FC",
    name: "Forlì-Cesena",
    region: "Emilia-Romagna",
    minScores2024: {"A-11": 57, "A-12": 60, "A-22": 51, "A-25": 45, "A-26": 64, "A-28": 62, "A-37": 48, "A-41": 43, "A-42": 41, "A-50": 52, "ADAA": 28, "ADSS": 38, "EEEE": 42},
    minScores2025: {"A-24": 49, "A-27": 62, "A-40": 48, "A-45": 60, "A-46": 75, "AAAA": 42, "ADEE": 26, "ADMM": 37},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "MO",
    name: "Modena",
    region: "Emilia-Romagna",
    minScores2024: {"A-11": 58, "A-22": 51, "A-45": 52, "A-46": 75, "A-50": 52, "AAAA": 46, "ADMM": 35},
    minScores2025: {"A-12": 60, "A-24": 46, "A-25": 44, "A-26": 61, "A-27": 64, "A-28": 58, "A-37": 48, "A-40": 44, "A-41": 45, "A-42": 41, "ADAA": 23, "ADEE": 32, "ADSS": 34, "EEEE": 42},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "PR",
    name: "Parma",
    region: "Emilia-Romagna",
    minScores2024: {"A-11": 58, "A-22": 51, "A-25": 45, "A-28": 58, "A-37": 51, "A-40": 48, "A-41": 49, "A-45": 50, "AAAA": 48, "ADEE": 25, "ADMM": 27, "EEEE": 45},
    minScores2025: {"A-12": 53, "A-24": 45, "A-26": 70, "A-27": 59, "A-42": 43, "A-46": 74, "A-50": 55, "ADAA": 29, "ADSS": 32},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "PC",
    name: "Piacenza",
    region: "Emilia-Romagna",
    minScores2024: {"A-12": 62, "A-22": 58, "A-24": 50, "A-27": 59, "A-28": 63, "A-40": 47, "A-41": 47, "A-42": 47, "ADAA": 25, "ADEE": 23},
    minScores2025: {"A-11": 65, "A-25": 49, "A-26": 64, "A-37": 46, "A-45": 54, "A-46": 75, "A-50": 48, "AAAA": 45, "ADMM": 29, "ADSS": 32, "EEEE": 39},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "RA",
    name: "Ravenna",
    region: "Emilia-Romagna",
    minScores2024: {"A-11": 59, "A-12": 53, "A-22": 51, "A-26": 67, "A-27": 63, "A-28": 64, "A-40": 44, "A-42": 48, "A-50": 47, "ADMM": 27, "EEEE": 42},
    minScores2025: {"A-24": 40, "A-25": 45, "A-37": 51, "A-41": 52, "A-45": 55, "A-46": 75, "AAAA": 48, "ADAA": 26, "ADEE": 32, "ADSS": 31},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "RE",
    name: "Reggio Emilia",
    region: "Emilia-Romagna",
    minScores2024: {"A-11": 55, "A-12": 55, "A-37": 46, "A-41": 43, "A-45": 54, "A-50": 56, "ADAA": 28, "ADSS": 40},
    minScores2025: {"A-22": 55, "A-24": 41, "A-25": 51, "A-26": 60, "A-27": 59, "A-28": 66, "A-40": 48, "A-42": 47, "A-46": 66, "AAAA": 44, "ADEE": 27, "ADMM": 31, "EEEE": 38},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "RN",
    name: "Rimini",
    region: "Emilia-Romagna",
    minScores2024: {"A-12": 54, "A-22": 58, "A-24": 43, "A-27": 59, "A-28": 63, "A-37": 49, "A-42": 43, "A-46": 71, "A-50": 55, "AAAA": 48, "ADEE": 23, "ADSS": 37, "EEEE": 40},
    minScores2025: {"A-11": 59, "A-25": 46, "A-26": 63, "A-40": 52, "A-41": 42, "A-45": 55, "ADAA": 21, "ADMM": 36},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },

  // FRIULI-VENEZIA GIULIA
  {
    id: "GO",
    name: "Gorizia",
    region: "Friuli-Venezia Giulia",
    minScores2024: {"A-12": 55, "A-22": 50, "A-24": 47, "A-25": 46, "A-26": 62, "A-27": 65, "A-41": 48, "A-45": 57, "A-46": 66, "A-50": 56, "ADAA": 21, "ADEE": 23, "ADMM": 37},
    minScores2025: {"A-11": 63, "A-28": 67, "A-37": 46, "A-40": 50, "A-42": 50, "AAAA": 47, "ADSS": 37, "EEEE": 46},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "PN",
    name: "Pordenone",
    region: "Friuli-Venezia Giulia",
    minScores2024: {"A-11": 61, "A-12": 54, "A-22": 51, "A-24": 43, "A-27": 64, "A-28": 57, "A-45": 59, "A-50": 56, "AAAA": 45, "ADEE": 25, "ADSS": 32},
    minScores2025: {"A-25": 49, "A-26": 60, "A-37": 55, "A-40": 47, "A-41": 46, "A-42": 41, "A-46": 75, "ADAA": 25, "ADMM": 31, "EEEE": 43},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "TS",
    name: "Trieste",
    region: "Friuli-Venezia Giulia",
    minScores2024: {"A-12": 56, "A-22": 52, "A-25": 49, "A-26": 62, "A-27": 60, "A-41": 50, "A-45": 56, "A-50": 50, "ADAA": 21, "ADEE": 25, "ADSS": 40, "EEEE": 44},
    minScores2025: {"A-11": 63, "A-24": 48, "A-28": 61, "A-37": 51, "A-40": 43, "A-42": 48, "A-46": 72, "AAAA": 48, "ADMM": 31},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "UD",
    name: "Udine",
    region: "Friuli-Venezia Giulia",
    minScores2024: {"A-11": 60, "A-26": 64, "A-28": 57, "A-41": 43, "A-46": 72, "A-50": 48, "EEEE": 38},
    minScores2025: {"A-12": 58, "A-22": 54, "A-24": 43, "A-25": 52, "A-27": 66, "A-37": 47, "A-40": 46, "A-42": 47, "A-45": 50, "AAAA": 45, "ADAA": 30, "ADEE": 31, "ADMM": 29, "ADSS": 37},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },

  // LAZIO
  {
    id: "FR",
    name: "Frosinone",
    region: "Lazio",
    minScores2024: {"A-11": 57, "A-26": 60, "A-28": 59, "A-37": 48, "A-40": 46, "A-42": 39, "A-46": 60, "A-50": 42, "AAAA": 35, "ADEE": 23, "EEEE": 37},
    minScores2025: {"A-12": 50, "A-22": 53, "A-24": 38, "A-25": 45, "A-27": 56, "A-41": 38, "A-45": 49, "ADAA": 23, "ADMM": 24, "ADSS": 25},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "LT",
    name: "Latina",
    region: "Lazio",
    minScores2024: {"A-11": 55, "A-22": 46, "A-41": 39, "A-45": 46, "A-46": 67, "A-50": 43, "ADSS": 24},
    minScores2025: {"A-12": 45, "A-24": 36, "A-25": 43, "A-26": 57, "A-27": 61, "A-28": 60, "A-37": 41, "A-40": 42, "A-42": 41, "AAAA": 33, "ADAA": 18, "ADEE": 22, "ADMM": 26, "EEEE": 41},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "RI",
    name: "Rieti",
    region: "Lazio",
    minScores2024: {"A-11": 53, "A-12": 55, "A-22": 51, "A-24": 44, "A-27": 58, "A-28": 60, "A-40": 42, "A-41": 42, "A-46": 63, "A-50": 49, "ADEE": 22, "ADSS": 30},
    minScores2025: {"A-25": 40, "A-26": 58, "A-37": 39, "A-42": 39, "A-45": 53, "AAAA": 41, "ADAA": 18, "ADMM": 31, "EEEE": 39},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "RM",
    name: "Roma",
    region: "Lazio",
    minScores2024: {"A-22": 48, "A-25": 40, "A-26": 53, "A-28": 53, "A-40": 42, "A-42": 38, "A-45": 44, "A-50": 51, "AAAA": 41, "ADEE": 21, "ADMM": 31},
    minScores2025: {"A-11": 47, "A-12": 48, "A-24": 36, "A-27": 61, "A-37": 39, "A-41": 43, "A-46": 65, "ADAA": 16, "ADSS": 29, "EEEE": 31},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "VT",
    name: "Viterbo",
    region: "Lazio",
    minScores2024: {"A-24": 38, "A-25": 40, "A-26": 59, "A-27": 54, "A-28": 56, "A-37": 39, "A-40": 41, "A-42": 45, "A-50": 44, "AAAA": 36, "ADAA": 21},
    minScores2025: {"A-11": 48, "A-12": 45, "A-22": 51, "A-41": 46, "A-45": 44, "A-46": 67, "ADEE": 23, "ADMM": 31, "ADSS": 31, "EEEE": 32},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },

  // LIGURIA
  {
    id: "GE",
    name: "Genova",
    region: "Liguria",
    minScores2024: {"A-11": 57, "A-12": 61, "A-22": 55, "A-26": 70, "A-27": 61, "A-28": 60, "A-45": 50, "AAAA": 50, "ADAA": 25, "ADEE": 29, "EEEE": 39},
    minScores2025: {"A-24": 45, "A-25": 49, "A-37": 53, "A-40": 53, "A-41": 51, "A-42": 42, "A-46": 68, "A-50": 52, "ADMM": 34, "ADSS": 31},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "SP",
    name: "La Spezia",
    region: "Liguria",
    minScores2024: {"A-25": 51, "A-28": 63, "A-37": 50, "A-40": 51, "A-42": 45, "A-45": 56, "A-46": 66, "A-50": 51, "AAAA": 42, "ADEE": 28, "ADMM": 32, "ADSS": 31, "EEEE": 43},
    minScores2025: {"A-11": 55, "A-12": 61, "A-22": 51, "A-24": 41, "A-26": 66, "A-27": 58, "A-41": 48, "ADAA": 20},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "SV",
    name: "Savona",
    region: "Liguria",
    minScores2024: {"A-26": 68, "A-40": 45, "A-41": 52, "A-42": 47, "A-45": 51, "A-46": 75, "AAAA": 45, "ADAA": 23, "ADEE": 29, "ADMM": 29, "EEEE": 39},
    minScores2025: {"A-11": 60, "A-12": 62, "A-22": 58, "A-24": 49, "A-25": 44, "A-27": 62, "A-28": 65, "A-37": 50, "A-50": 48, "ADSS": 30},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },

  // LOMBARDIA
  {
    id: "BG",
    name: "Bergamo",
    region: "Lombardia",
    minScores2024: {"A-12": 62, "A-22": 51, "A-25": 47, "A-26": 66, "A-27": 61, "A-28": 67, "A-37": 50, "A-40": 52, "A-42": 46, "A-46": 70, "A-50": 54, "AAAA": 43, "ADEE": 33, "ADMM": 32},
    minScores2025: {"A-11": 59, "A-24": 42, "A-41": 51, "A-45": 50, "ADAA": 30, "ADSS": 34, "EEEE": 45},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "BS",
    name: "Brescia",
    region: "Lombardia",
    minScores2024: {"A-11": 62, "A-12": 60, "A-22": 58, "A-26": 70, "A-27": 58, "A-28": 63, "A-37": 52, "A-45": 58, "ADAA": 26, "ADEE": 27, "ADMM": 27, "ADSS": 40},
    minScores2025: {"A-24": 40, "A-25": 47, "A-40": 51, "A-41": 46, "A-42": 42, "A-46": 72, "A-50": 48, "AAAA": 45, "EEEE": 39},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "CO",
    name: "Como",
    region: "Lombardia",
    minScores2024: {"A-22": 50, "A-41": 50, "AAAA": 49, "ADMM": 29, "ADSS": 37, "EEEE": 43},
    minScores2025: {"A-11": 60, "A-12": 58, "A-24": 41, "A-25": 43, "A-26": 60, "A-27": 65, "A-28": 64, "A-37": 54, "A-40": 53, "A-42": 50, "A-45": 52, "A-46": 70, "A-50": 52, "ADAA": 21, "ADEE": 33},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "CR",
    name: "Cremona",
    region: "Lombardia",
    minScores2024: {"A-11": 60, "A-22": 60, "A-25": 52, "A-26": 69, "A-27": 58, "A-28": 57, "A-40": 43, "A-41": 44, "A-42": 50, "AAAA": 41, "ADAA": 27},
    minScores2025: {"A-12": 55, "A-24": 44, "A-37": 49, "A-45": 52, "A-46": 71, "A-50": 53, "ADEE": 25, "ADMM": 36, "ADSS": 32, "EEEE": 47},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "LC",
    name: "Lecco",
    region: "Lombardia",
    minScores2024: {"A-11": 55, "A-12": 58, "A-24": 41, "A-27": 63, "A-40": 48, "A-41": 46, "A-42": 48, "A-45": 59, "A-46": 66, "AAAA": 48, "ADAA": 30, "ADSS": 34, "EEEE": 39},
    minScores2025: {"A-22": 52, "A-25": 51, "A-26": 64, "A-28": 61, "A-37": 52, "A-50": 57, "ADEE": 31, "ADMM": 27},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "LO",
    name: "Lodi",
    region: "Lombardia",
    minScores2024: {"A-11": 65, "A-24": 50, "A-27": 66, "A-28": 65, "A-37": 51, "A-40": 44, "A-41": 46, "A-42": 44, "A-50": 56, "ADMM": 29},
    minScores2025: {"A-12": 63, "A-22": 52, "A-25": 45, "A-26": 69, "A-45": 56, "A-46": 71, "AAAA": 49, "ADAA": 30, "ADEE": 29, "ADSS": 39, "EEEE": 43},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "MN",
    name: "Mantova",
    region: "Lombardia",
    minScores2024: {"A-11": 58, "A-27": 59, "A-37": 51, "A-40": 52, "A-41": 46, "A-45": 58, "A-50": 51, "AAAA": 48, "ADSS": 38, "EEEE": 43},
    minScores2025: {"A-12": 53, "A-22": 54, "A-24": 47, "A-25": 53, "A-26": 66, "A-28": 63, "A-42": 47, "A-46": 74, "ADAA": 24, "ADEE": 23, "ADMM": 35},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "MI",
    name: "Milano",
    region: "Lombardia",
    minScores2024: {"A-12": 54, "A-22": 60, "A-24": 45, "A-26": 62, "A-28": 57, "A-42": 51, "A-45": 53, "A-50": 56, "ADAA": 22, "ADEE": 26, "ADSS": 32},
    minScores2025: {"A-11": 63, "A-25": 46, "A-27": 61, "A-37": 45, "A-40": 53, "A-41": 48, "A-46": 68, "AAAA": 40, "ADMM": 33, "EEEE": 45},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "MB",
    name: "Monza e Brianza",
    region: "Lombardia",
    minScores2024: {"A-22": 59, "A-37": 55, "A-40": 50, "A-42": 51, "A-50": 51, "ADAA": 24, "ADSS": 31},
    minScores2025: {"A-11": 61, "A-12": 54, "A-24": 40, "A-25": 43, "A-26": 65, "A-27": 65, "A-28": 60, "A-41": 49, "A-45": 55, "A-46": 73, "AAAA": 45, "ADEE": 23, "ADMM": 31, "EEEE": 41},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "PV",
    name: "Pavia",
    region: "Lombardia",
    minScores2024: {"A-12": 62, "A-22": 54, "A-24": 44, "A-26": 64, "A-28": 57, "A-40": 43, "A-45": 59, "A-50": 47, "ADAA": 22, "ADEE": 33},
    minScores2025: {"A-11": 60, "A-25": 44, "A-27": 66, "A-37": 54, "A-41": 46, "A-42": 49, "A-46": 66, "AAAA": 45, "ADMM": 35, "ADSS": 33, "EEEE": 43},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "SO",
    name: "Sondrio",
    region: "Lombardia",
    minScores2024: {"A-11": 64, "A-12": 55, "A-24": 50, "A-26": 67, "A-40": 52, "A-42": 43, "A-46": 67, "A-50": 47, "ADAA": 29, "ADEE": 30, "ADSS": 31, "EEEE": 40},
    minScores2025: {"A-22": 51, "A-25": 52, "A-27": 68, "A-28": 67, "A-37": 47, "A-41": 50, "A-45": 58, "AAAA": 42, "ADMM": 36},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "VA",
    name: "Varese",
    region: "Lombardia",
    minScores2024: {"A-22": 53, "A-25": 52, "A-27": 58, "A-37": 45, "A-41": 50, "A-42": 51, "A-45": 56, "A-50": 54, "AAAA": 45, "ADEE": 27, "ADMM": 32, "EEEE": 38},
    minScores2025: {"A-11": 56, "A-12": 61, "A-24": 49, "A-26": 68, "A-28": 67, "A-40": 46, "A-46": 67, "ADAA": 30, "ADSS": 39},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },

  // MARCHE
  {
    id: "AN",
    name: "Ancona",
    region: "Marche",
    minScores2024: {"A-24": 41, "A-26": 63, "A-27": 53, "A-40": 43, "A-41": 38, "A-45": 51, "AAAA": 38, "EEEE": 41},
    minScores2025: {"A-11": 57, "A-12": 51, "A-22": 47, "A-25": 38, "A-28": 58, "A-37": 43, "A-42": 41, "A-46": 66, "A-50": 51, "ADAA": 19, "ADEE": 19, "ADMM": 26, "ADSS": 31},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "AP",
    name: "Ascoli Piceno",
    region: "Marche",
    minScores2024: {"A-11": 49, "A-12": 45, "A-24": 45, "A-26": 54, "A-27": 51, "A-37": 40, "A-40": 41, "A-42": 43, "A-46": 64, "AAAA": 37, "ADEE": 20, "ADMM": 29},
    minScores2025: {"A-22": 43, "A-25": 41, "A-28": 50, "A-41": 39, "A-45": 45, "A-50": 50, "ADAA": 17, "ADSS": 31, "EEEE": 36},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "FM",
    name: "Fermo",
    region: "Marche",
    minScores2024: {"A-11": 56, "A-12": 54, "A-24": 35, "A-28": 55, "A-37": 48, "A-40": 47, "A-41": 41, "A-45": 51, "A-50": 46, "ADAA": 24, "EEEE": 37},
    minScores2025: {"A-22": 46, "A-25": 42, "A-26": 61, "A-27": 56, "A-42": 44, "A-46": 64, "AAAA": 34, "ADEE": 23, "ADMM": 29, "ADSS": 24},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "MC",
    name: "Macerata",
    region: "Marche",
    minScores2024: {"A-22": 45, "A-24": 38, "A-25": 45, "A-37": 48, "A-41": 44, "A-42": 39, "A-46": 59, "A-50": 44, "ADEE": 24, "ADSS": 32},
    minScores2025: {"A-11": 49, "A-12": 53, "A-26": 57, "A-27": 61, "A-28": 50, "A-40": 37, "A-45": 50, "AAAA": 36, "ADAA": 15, "ADMM": 29, "EEEE": 39},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "PU",
    name: "Pesaro e Urbino",
    region: "Marche",
    minScores2024: {"A-11": 47, "A-25": 42, "A-26": 60, "A-27": 61, "A-41": 37, "A-42": 42, "ADEE": 22, "ADMM": 22, "ADSS": 31},
    minScores2025: {"A-12": 51, "A-22": 44, "A-24": 38, "A-28": 56, "A-37": 44, "A-40": 42, "A-45": 44, "A-46": 61, "A-50": 51, "AAAA": 43, "ADAA": 23, "EEEE": 40},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },

  // MOLISE
  {
    id: "CB",
    name: "Campobasso",
    region: "Molise",
    minScores2024: {"A-24": 35, "A-27": 44, "A-42": 34, "A-46": 53, "ADAA": 17, "ADMM": 12, "ADSS": 16, "EEEE": 30},
    minScores2025: {"A-11": 41, "A-12": 34, "A-22": 35, "A-25": 34, "A-26": 45, "A-28": 44, "A-37": 32, "A-40": 31, "A-41": 31, "A-45": 36, "A-50": 37, "AAAA": 23, "ADEE": 15},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "IS",
    name: "Isernia",
    region: "Molise",
    minScores2024: {"A-22": 38, "A-24": 26, "A-26": 44, "A-27": 43, "A-28": 44, "A-37": 36, "A-41": 31, "A-42": 34, "A-45": 36, "A-46": 47, "ADAA": 11, "ADMM": 15, "ADSS": 19, "EEEE": 24},
    minScores2025: {"A-11": 36, "A-12": 37, "A-25": 36, "A-40": 31, "A-50": 30, "AAAA": 28, "ADEE": 17},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },

  // PIEMONTE
  {
    id: "AL",
    name: "Alessandria",
    region: "Piemonte",
    minScores2024: {"A-12": 62, "A-25": 44, "A-26": 62, "A-27": 65, "A-40": 50, "A-41": 48, "A-42": 42, "A-45": 59, "A-50": 53, "ADAA": 20, "ADEE": 27, "ADMM": 31},
    minScores2025: {"A-11": 65, "A-22": 55, "A-24": 43, "A-28": 60, "A-37": 51, "A-46": 67, "AAAA": 48, "ADSS": 32, "EEEE": 43},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "AT",
    name: "Asti",
    region: "Piemonte",
    minScores2024: {"A-27": 61, "A-37": 54, "A-45": 54, "ADAA": 26, "ADEE": 28, "ADMM": 36, "ADSS": 39},
    minScores2025: {"A-11": 63, "A-12": 53, "A-22": 53, "A-24": 43, "A-25": 47, "A-26": 64, "A-28": 59, "A-40": 46, "A-41": 46, "A-42": 44, "A-46": 66, "A-50": 50, "AAAA": 48, "EEEE": 38},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "BI",
    name: "Biella",
    region: "Piemonte",
    minScores2024: {"A-11": 64, "A-12": 59, "A-24": 48, "A-27": 63, "A-28": 59, "A-50": 57, "ADMM": 35, "EEEE": 41},
    minScores2025: {"A-22": 54, "A-25": 47, "A-26": 65, "A-37": 52, "A-40": 51, "A-41": 46, "A-42": 48, "A-45": 58, "A-46": 66, "AAAA": 44, "ADAA": 25, "ADEE": 23, "ADSS": 40},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "CN",
    name: "Cuneo",
    region: "Piemonte",
    minScores2024: {"A-12": 59, "A-24": 48, "A-27": 60, "A-37": 51, "A-46": 67, "A-50": 53, "AAAA": 47, "ADEE": 30},
    minScores2025: {"A-11": 62, "A-22": 60, "A-25": 46, "A-26": 61, "A-28": 64, "A-40": 50, "A-41": 50, "A-42": 42, "A-45": 53, "ADAA": 29, "ADMM": 34, "ADSS": 39, "EEEE": 40},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "NO",
    name: "Novara",
    region: "Piemonte",
    minScores2024: {"A-11": 55, "A-27": 58, "A-40": 48, "A-41": 45, "A-42": 42, "A-45": 55, "A-46": 69, "A-50": 52, "AAAA": 50, "ADAA": 20, "ADEE": 33, "ADMM": 32, "ADSS": 36, "EEEE": 42},
    minScores2025: {"A-12": 59, "A-22": 53, "A-24": 40, "A-25": 53, "A-26": 64, "A-28": 60, "A-37": 51},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "TO",
    name: "Torino",
    region: "Piemonte",
    minScores2024: {"A-12": 53, "A-22": 53, "A-26": 68, "A-27": 67, "A-28": 62, "A-37": 50, "A-40": 47, "A-41": 50, "A-42": 48, "A-45": 58, "A-46": 65, "A-50": 48, "AAAA": 48, "ADAA": 28, "ADEE": 24, "ADMM": 35},
    minScores2025: {"A-11": 56, "A-24": 49, "A-25": 46, "ADSS": 39, "EEEE": 39},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "VB",
    name: "Verbano-Cusio-Ossola",
    region: "Piemonte",
    minScores2024: {"A-24": 44, "A-25": 50, "A-26": 68, "A-27": 59, "A-28": 66, "A-40": 47, "A-41": 46, "A-42": 45, "A-45": 57, "A-46": 73, "ADAA": 29, "ADMM": 27, "ADSS": 35},
    minScores2025: {"A-11": 65, "A-12": 53, "A-22": 52, "A-37": 55, "A-50": 49, "AAAA": 40, "ADEE": 25, "EEEE": 40},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "VC",
    name: "Vercelli",
    region: "Piemonte",
    minScores2024: {"A-25": 50, "A-26": 68, "A-27": 66, "A-37": 54, "A-40": 51, "A-41": 51, "A-46": 74, "AAAA": 45, "ADAA": 24, "EEEE": 44},
    minScores2025: {"A-11": 55, "A-12": 61, "A-22": 56, "A-24": 50, "A-28": 65, "A-42": 48, "A-45": 54, "A-50": 49, "ADEE": 30, "ADMM": 31, "ADSS": 33},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },

  // PUGLIA
  {
    id: "BA",
    name: "Bari",
    region: "Puglia",
    minScores2024: {"A-25": 29, "A-26": 42, "A-27": 47, "A-40": 37, "A-45": 35, "A-46": 43, "ADMM": 18},
    minScores2025: {"A-11": 40, "A-12": 38, "A-22": 34, "A-24": 26, "A-28": 37, "A-37": 37, "A-41": 29, "A-42": 33, "A-50": 38, "AAAA": 30, "ADAA": 15, "ADEE": 18, "ADSS": 20, "EEEE": 29},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "BT",
    name: "Barletta-Andria-Trani",
    region: "Puglia",
    minScores2024: {"A-24": 30, "A-26": 42, "A-27": 41, "A-37": 34, "A-40": 29, "A-41": 30, "A-42": 28, "A-46": 51, "AAAA": 32, "ADEE": 10, "ADSS": 19, "EEEE": 26},
    minScores2025: {"A-11": 35, "A-12": 41, "A-22": 30, "A-25": 37, "A-28": 41, "A-45": 36, "A-50": 33, "ADAA": 17, "ADMM": 17},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "BR",
    name: "Brindisi",
    region: "Puglia",
    minScores2024: {"A-26": 42, "A-28": 37, "A-41": 28, "A-42": 34, "A-46": 50, "ADEE": 16, "EEEE": 31},
    minScores2025: {"A-11": 42, "A-12": 35, "A-22": 40, "A-24": 31, "A-25": 36, "A-27": 48, "A-37": 32, "A-40": 29, "A-45": 34, "A-50": 33, "AAAA": 27, "ADAA": 12, "ADMM": 14, "ADSS": 15},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "FG",
    name: "Foggia",
    region: "Puglia",
    minScores2024: {"A-22": 37, "A-28": 43, "A-40": 31, "A-45": 41, "A-46": 48, "ADAA": 12, "ADMM": 17, "ADSS": 13, "EEEE": 26},
    minScores2025: {"A-11": 45, "A-12": 33, "A-24": 35, "A-25": 30, "A-26": 47, "A-27": 48, "A-37": 36, "A-41": 37, "A-42": 29, "A-50": 38, "AAAA": 29, "ADEE": 18},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "LE",
    name: "Lecce",
    region: "Puglia",
    minScores2024: {"A-11": 44, "A-24": 30, "A-25": 28, "A-27": 38, "A-28": 47, "A-37": 33, "A-41": 34, "A-50": 31, "ADAA": 17, "ADMM": 13, "ADSS": 22, "EEEE": 23},
    minScores2025: {"A-12": 36, "A-22": 38, "A-26": 50, "A-40": 31, "A-42": 36, "A-45": 43, "A-46": 51, "AAAA": 25, "ADEE": 10},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "TA",
    name: "Taranto",
    region: "Puglia",
    minScores2024: {"A-11": 35, "A-12": 43, "A-27": 47, "A-42": 35, "A-45": 35, "A-50": 34, "AAAA": 31, "ADAA": 10, "ADMM": 11, "ADSS": 22},
    minScores2025: {"A-22": 39, "A-24": 35, "A-25": 33, "A-26": 47, "A-28": 46, "A-37": 33, "A-40": 29, "A-41": 33, "A-46": 45, "ADEE": 10, "EEEE": 22},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },

  // SARDEGNA
  {
    id: "CA",
    name: "Cagliari",
    region: "Sardegna",
    minScores2024: {"A-12": 27, "A-22": 34, "A-24": 30, "A-26": 43, "A-28": 34, "A-40": 28, "A-42": 32, "AAAA": 27, "ADEE": 12, "ADSS": 10},
    minScores2025: {"A-11": 32, "A-25": 28, "A-27": 40, "A-37": 31, "A-41": 31, "A-45": 36, "A-46": 39, "A-50": 29, "ADAA": 10, "ADMM": 12, "EEEE": 24},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "NU",
    name: "Nuoro",
    region: "Sardegna",
    minScores2024: {"A-11": 30, "A-24": 24, "A-28": 37, "A-37": 30, "A-40": 27, "A-41": 25, "A-42": 26, "A-45": 35, "ADAA": 10, "ADMM": 12, "ADSS": 19, "EEEE": 17},
    minScores2025: {"A-12": 32, "A-22": 35, "A-25": 25, "A-26": 45, "A-27": 37, "A-46": 38, "A-50": 28, "AAAA": 28, "ADEE": 15},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "SS",
    name: "Sassari",
    region: "Sardegna",
    minScores2024: {"A-12": 32, "A-22": 33, "A-25": 32, "A-27": 37, "A-37": 33, "A-40": 31, "A-45": 38, "A-46": 47, "A-50": 33, "AAAA": 25, "ADAA": 10, "ADSS": 16, "EEEE": 20},
    minScores2025: {"A-11": 37, "A-24": 24, "A-26": 44, "A-28": 36, "A-41": 33, "A-42": 27, "ADEE": 10, "ADMM": 10},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },

  // SICILIA
  {
    id: "AG",
    name: "Agrigento",
    region: "Sicilia",
    minScores2024: {"A-11": 37, "A-26": 38, "A-27": 38, "A-28": 41, "A-40": 26, "A-41": 28, "A-42": 29, "ADEE": 11, "ADMM": 10, "EEEE": 17},
    minScores2025: {"A-12": 37, "A-22": 25, "A-24": 21, "A-25": 31, "A-37": 35, "A-45": 37, "A-46": 46, "A-50": 29, "AAAA": 23, "ADAA": 10, "ADSS": 19},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "CL",
    name: "Caltanissetta",
    region: "Sicilia",
    minScores2024: {"A-22": 31, "A-27": 40, "A-28": 35, "A-41": 33, "A-45": 31, "A-46": 43, "ADAA": 10, "ADEE": 15, "ADMM": 12, "EEEE": 18},
    minScores2025: {"A-11": 33, "A-12": 36, "A-24": 30, "A-25": 24, "A-26": 38, "A-37": 26, "A-40": 33, "A-42": 32, "A-50": 25, "AAAA": 19, "ADSS": 12},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "CT",
    name: "Catania",
    region: "Sicilia",
    minScores2024: {"A-11": 37, "A-12": 29, "A-25": 31, "A-27": 34, "A-28": 37, "A-41": 28, "A-50": 26, "ADAA": 10, "ADEE": 10, "EEEE": 21},
    minScores2025: {"A-22": 26, "A-24": 29, "A-26": 41, "A-37": 27, "A-40": 31, "A-42": 31, "A-45": 33, "A-46": 41, "AAAA": 20, "ADMM": 13, "ADSS": 12},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "EN",
    name: "Enna",
    region: "Sicilia",
    minScores2024: {"A-11": 32, "A-25": 28, "A-26": 36, "A-41": 33, "A-42": 30, "A-50": 27, "AAAA": 26, "ADAA": 14},
    minScores2025: {"A-12": 29, "A-22": 27, "A-24": 30, "A-27": 42, "A-28": 36, "A-37": 30, "A-40": 26, "A-45": 34, "A-46": 37, "ADEE": 15, "ADMM": 13, "ADSS": 12, "EEEE": 20},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "ME",
    name: "Messina",
    region: "Sicilia",
    minScores2024: {"A-11": 30, "A-12": 27, "A-22": 30, "A-27": 44, "A-28": 40, "A-37": 34, "A-40": 28, "A-45": 32, "A-46": 40, "ADMM": 13, "EEEE": 17},
    minScores2025: {"A-24": 25, "A-25": 28, "A-26": 37, "A-41": 30, "A-42": 24, "A-50": 35, "AAAA": 23, "ADAA": 10, "ADEE": 16, "ADSS": 18},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "PA",
    name: "Palermo",
    region: "Sicilia",
    minScores2024: {"A-12": 27, "A-22": 26, "A-24": 21, "A-25": 30, "A-27": 34, "A-41": 33, "A-42": 30, "A-46": 38, "ADAA": 14, "ADEE": 10, "ADMM": 10, "ADSS": 19, "EEEE": 17},
    minScores2025: {"A-11": 40, "A-26": 42, "A-28": 42, "A-37": 33, "A-40": 24, "A-45": 35, "A-50": 28, "AAAA": 23},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "RG",
    name: "Ragusa",
    region: "Sicilia",
    minScores2024: {"A-22": 30, "A-25": 31, "A-27": 40, "A-28": 41, "A-40": 26, "A-41": 30, "A-42": 31, "A-45": 33, "A-46": 44, "ADMM": 13},
    minScores2025: {"A-11": 40, "A-12": 27, "A-24": 23, "A-26": 35, "A-37": 31, "A-50": 32, "AAAA": 26, "ADAA": 12, "ADEE": 14, "ADSS": 14, "EEEE": 25},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "SR",
    name: "Siracusa",
    region: "Sicilia",
    minScores2024: {"A-11": 30, "A-25": 29, "A-37": 34, "A-45": 30, "A-46": 45, "A-50": 30, "ADEE": 16},
    minScores2025: {"A-12": 31, "A-22": 33, "A-24": 30, "A-26": 42, "A-27": 42, "A-28": 42, "A-40": 29, "A-41": 24, "A-42": 24, "AAAA": 28, "ADAA": 13, "ADMM": 10, "ADSS": 16, "EEEE": 26},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "TP",
    name: "Trapani",
    region: "Sicilia",
    minScores2024: {"A-11": 32, "A-22": 33, "A-27": 38, "A-37": 35, "A-41": 27, "A-42": 25, "A-45": 28, "A-46": 41, "AAAA": 19, "ADEE": 10},
    minScores2025: {"A-12": 30, "A-24": 23, "A-25": 24, "A-26": 42, "A-28": 41, "A-40": 32, "A-50": 28, "ADAA": 10, "ADMM": 10, "ADSS": 17, "EEEE": 19},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },

  // TOSCANA
  {
    id: "AR",
    name: "Arezzo",
    region: "Toscana",
    minScores2024: {"A-11": 54, "A-22": 48, "A-24": 39, "A-25": 45, "A-27": 56, "A-40": 40, "A-46": 64, "AAAA": 37, "ADEE": 26, "EEEE": 31},
    minScores2025: {"A-12": 54, "A-26": 60, "A-28": 53, "A-37": 45, "A-41": 46, "A-42": 38, "A-45": 45, "A-50": 49, "ADAA": 20, "ADMM": 30, "ADSS": 31},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "FI",
    name: "Firenze",
    region: "Toscana",
    minScores2024: {"A-25": 37, "A-26": 59, "A-27": 58, "A-37": 44, "A-50": 45, "AAAA": 39, "ADEE": 18, "ADMM": 31, "EEEE": 33},
    minScores2025: {"A-11": 57, "A-12": 55, "A-22": 51, "A-24": 42, "A-28": 55, "A-40": 43, "A-41": 38, "A-42": 43, "A-45": 51, "A-46": 63, "ADAA": 21, "ADSS": 27},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "GR",
    name: "Grosseto",
    region: "Toscana",
    minScores2024: {"A-11": 54, "A-12": 53, "A-22": 51, "A-24": 43, "A-26": 62, "A-37": 49, "A-41": 38, "A-42": 40, "A-46": 65, "AAAA": 33, "ADEE": 25, "ADSS": 23},
    minScores2025: {"A-25": 40, "A-27": 52, "A-28": 56, "A-40": 39, "A-45": 46, "A-50": 47, "ADAA": 24, "ADMM": 25, "EEEE": 32},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "LI",
    name: "Livorno",
    region: "Toscana",
    minScores2024: {"A-24": 38, "A-27": 55, "A-40": 40, "A-42": 38, "ADAA": 20, "ADEE": 25, "ADMM": 31},
    minScores2025: {"A-11": 50, "A-12": 53, "A-22": 44, "A-25": 45, "A-26": 59, "A-28": 60, "A-37": 40, "A-41": 41, "A-45": 45, "A-46": 60, "A-50": 45, "AAAA": 36, "ADSS": 24, "EEEE": 34},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "LU",
    name: "Lucca",
    region: "Toscana",
    minScores2024: {"A-24": 44, "A-25": 44, "A-26": 55, "A-41": 46, "A-45": 49, "A-50": 46, "ADAA": 22, "ADEE": 23, "ADSS": 25, "EEEE": 38},
    minScores2025: {"A-11": 55, "A-12": 45, "A-22": 47, "A-27": 54, "A-28": 56, "A-37": 49, "A-40": 47, "A-42": 44, "A-46": 58, "AAAA": 33, "ADMM": 29},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "MS",
    name: "Massa-Carrara",
    region: "Toscana",
    minScores2024: {"A-11": 48, "A-25": 38, "A-26": 55, "A-37": 39, "A-42": 39, "A-46": 60, "ADAA": 19, "ADEE": 26},
    minScores2025: {"A-12": 54, "A-22": 45, "A-24": 44, "A-27": 59, "A-28": 53, "A-40": 43, "A-41": 45, "A-45": 48, "A-50": 50, "AAAA": 33, "ADMM": 31, "ADSS": 25, "EEEE": 41},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "PI",
    name: "Pisa",
    region: "Toscana",
    minScores2024: {"A-11": 57, "A-12": 50, "A-24": 38, "A-26": 58, "A-27": 52, "A-37": 43, "A-40": 45, "A-41": 42, "A-42": 42, "A-45": 49, "A-46": 60, "AAAA": 42, "ADAA": 19, "ADMM": 31, "ADSS": 31, "EEEE": 38},
    minScores2025: {"A-22": 44, "A-25": 41, "A-28": 58, "A-50": 48, "ADEE": 19},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "PT",
    name: "Pistoia",
    region: "Toscana",
    minScores2024: {"A-11": 52, "A-22": 49, "A-24": 45, "A-26": 56, "A-27": 58, "A-28": 54, "A-42": 37, "A-45": 49, "ADEE": 21, "ADSS": 24, "EEEE": 33},
    minScores2025: {"A-12": 48, "A-25": 46, "A-37": 48, "A-40": 38, "A-41": 44, "A-46": 66, "A-50": 47, "AAAA": 36, "ADAA": 24, "ADMM": 22},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "PO",
    name: "Prato",
    region: "Toscana",
    minScores2024: {"A-12": 47, "A-25": 38, "A-26": 56, "A-45": 45, "A-46": 63, "AAAA": 33, "ADAA": 20, "ADEE": 17, "ADMM": 26, "ADSS": 28},
    minScores2025: {"A-11": 47, "A-22": 44, "A-24": 39, "A-27": 58, "A-28": 51, "A-37": 42, "A-40": 41, "A-41": 43, "A-42": 43, "A-50": 42, "EEEE": 40},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "SI",
    name: "Siena",
    region: "Toscana",
    minScores2024: {"A-11": 56, "A-26": 59, "A-37": 46, "A-45": 51, "A-46": 67, "A-50": 47},
    minScores2025: {"A-12": 50, "A-22": 50, "A-24": 40, "A-25": 39, "A-27": 53, "A-28": 60, "A-40": 39, "A-41": 36, "A-42": 35, "AAAA": 42, "ADAA": 19, "ADEE": 22, "ADMM": 25, "ADSS": 26, "EEEE": 35},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },

  // TRENTINO-ALTO ADIGE
  {
    id: "TN",
    name: "Trento",
    region: "Trentino-Alto Adige",
    minScores2024: {"A-12": 58, "A-22": 58, "A-24": 50, "A-26": 69, "A-27": 60, "A-28": 60, "A-37": 48, "A-40": 46, "AAAA": 41, "ADEE": 31},
    minScores2025: {"A-11": 63, "A-25": 44, "A-41": 45, "A-42": 47, "A-45": 59, "A-46": 66, "A-50": 49, "ADAA": 21, "ADMM": 37, "ADSS": 37, "EEEE": 47},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "BZ",
    name: "Bolzano",
    region: "Trentino-Alto Adige",
    minScores2024: {"A-11": 64, "A-24": 42, "A-25": 48, "A-27": 67, "A-37": 48, "A-45": 50, "A-50": 48, "ADAA": 23, "ADEE": 26, "ADMM": 27},
    minScores2025: {"A-12": 57, "A-22": 50, "A-26": 64, "A-28": 60, "A-40": 43, "A-41": 48, "A-42": 41, "A-46": 71, "AAAA": 46, "ADSS": 39, "EEEE": 43},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },

  // UMBRIA
  {
    id: "PG",
    name: "Perugia",
    region: "Umbria",
    minScores2024: {"A-24": 40, "A-28": 51, "A-37": 39, "A-40": 40, "A-42": 37, "A-46": 60, "A-50": 49, "ADMM": 25, "ADSS": 29},
    minScores2025: {"A-11": 47, "A-12": 50, "A-22": 47, "A-25": 46, "A-26": 58, "A-27": 59, "A-41": 44, "A-45": 45, "AAAA": 33, "ADAA": 21, "ADEE": 24, "EEEE": 32},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "TR",
    name: "Terni",
    region: "Umbria",
    minScores2024: {"A-11": 50, "A-12": 47, "A-22": 45, "A-25": 41, "A-27": 56, "A-42": 42, "A-45": 51, "A-46": 66, "ADEE": 18, "ADMM": 23},
    minScores2025: {"A-24": 43, "A-26": 62, "A-28": 51, "A-37": 47, "A-40": 39, "A-41": 45, "A-50": 50, "AAAA": 40, "ADAA": 16, "ADSS": 25, "EEEE": 38},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },

  // VALLE D'AOSTA
  {
    id: "AO",
    name: "Aosta",
    region: "Valle d'Aosta",
    minScores2024: {"A-12": 61, "A-24": 42, "A-26": 65, "A-27": 61, "A-37": 47, "A-40": 53, "A-42": 51, "A-45": 52, "A-50": 51, "AAAA": 50, "ADAA": 24, "ADSS": 38, "EEEE": 40},
    minScores2025: {"A-11": 59, "A-22": 59, "A-25": 53, "A-28": 58, "A-41": 42, "A-46": 69, "ADEE": 24, "ADMM": 29},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },

  // VENETO
  {
    id: "BL",
    name: "Belluno",
    region: "Veneto",
    minScores2024: {"A-11": 58, "A-12": 59, "A-22": 54, "A-25": 53, "A-26": 70, "A-28": 67, "A-37": 45, "A-42": 47, "A-45": 50, "A-46": 72, "A-50": 48, "AAAA": 50, "ADAA": 29, "ADEE": 30, "EEEE": 43},
    minScores2025: {"A-24": 47, "A-27": 58, "A-40": 52, "A-41": 47, "ADMM": 33, "ADSS": 34},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "PD",
    name: "Padova",
    region: "Veneto",
    minScores2024: {"A-11": 65, "A-22": 52, "A-26": 69, "A-28": 65, "A-40": 50, "A-46": 74, "A-50": 53, "AAAA": 43, "ADAA": 28, "ADEE": 28, "EEEE": 37},
    minScores2025: {"A-12": 53, "A-24": 48, "A-25": 47, "A-27": 65, "A-37": 51, "A-41": 52, "A-42": 47, "A-45": 56, "ADMM": 32, "ADSS": 31},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "RO",
    name: "Rovigo",
    region: "Veneto",
    minScores2024: {"A-11": 55, "A-22": 50, "A-24": 46, "A-27": 60, "A-37": 49, "A-41": 49, "A-50": 55, "AAAA": 42, "ADAA": 30, "ADMM": 31, "ADSS": 40, "EEEE": 38},
    minScores2025: {"A-12": 53, "A-25": 52, "A-26": 70, "A-28": 65, "A-40": 45, "A-42": 48, "A-45": 51, "A-46": 65, "ADEE": 25},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "TV",
    name: "Treviso",
    region: "Veneto",
    minScores2024: {"A-12": 56, "A-22": 57, "A-26": 62, "A-28": 59, "A-40": 47, "A-41": 44, "A-42": 43, "A-46": 74, "A-50": 47, "ADEE": 26, "ADMM": 35, "ADSS": 36},
    minScores2025: {"A-11": 63, "A-24": 47, "A-25": 52, "A-27": 67, "A-37": 54, "A-45": 60, "AAAA": 43, "ADAA": 27, "EEEE": 38},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "VE",
    name: "Venezia",
    region: "Veneto",
    minScores2024: {"A-11": 64, "A-25": 49, "A-26": 70, "A-27": 64, "A-28": 62, "A-37": 54, "A-40": 43, "A-41": 49, "A-42": 45, "AAAA": 43, "EEEE": 40},
    minScores2025: {"A-12": 59, "A-22": 54, "A-24": 47, "A-45": 55, "A-46": 67, "A-50": 52, "ADAA": 23, "ADEE": 33, "ADMM": 30, "ADSS": 36},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "VR",
    name: "Verona",
    region: "Veneto",
    minScores2024: {"A-27": 61, "A-28": 60, "A-37": 45, "A-40": 44, "A-41": 43, "A-42": 50, "A-50": 50, "ADSS": 39},
    minScores2025: {"A-11": 58, "A-12": 57, "A-22": 59, "A-24": 42, "A-25": 43, "A-26": 70, "A-45": 60, "A-46": 71, "AAAA": 46, "ADAA": 20, "ADEE": 33, "ADMM": 28, "EEEE": 44},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
  {
    id: "VI",
    name: "Vicenza",
    region: "Veneto",
    minScores2024: {"A-11": 63, "A-24": 43, "A-25": 50, "A-40": 47, "A-45": 50, "A-46": 75, "A-50": 55, "ADSS": 38, "EEEE": 47},
    minScores2025: {"A-12": 53, "A-22": 57, "A-26": 62, "A-27": 65, "A-28": 58, "A-37": 51, "A-41": 49, "A-42": 47, "AAAA": 47, "ADAA": 26, "ADEE": 32, "ADMM": 37},
    sourceUrl: "https://www.voglioinsegnare.it/graduatorie-gps"
  },
];
