
export interface Timings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
  Firstthird: string;
  Lastthird: string;
}

export interface HijriMonth {
  number: number;
  en: string;
  ar: string;
}

export interface HijriDate {
  date: string;
  format: string;
  day: string;
  weekday: {
    en: string;
    ar: string;
  };
  month: HijriMonth;
  year: string;
}

export interface GregorianDate {
    date: string;
    format: string;
    day: string;
    weekday: {
        en: string;
    };
    month: {
        number: number;
        en: string;
    };
    year: string;
}

export interface Meta {
    latitude: number;
    longitude: number;
    timezone: string;
    method: {
        id: number;
        name: string;
    };
    latitudeAdjustmentMethod: string;
    midnightMode: string;
    school: string;
    offset: Record<string, number>;
}

export interface AladhanResponse {
  code: number;
  status: string;
  data: {
    timings: Timings;
    date: {
      readable: string;
      timestamp: string;
      gregorian: GregorianDate;
      hijri: HijriDate;
    };
    meta: Meta;
  };
}
