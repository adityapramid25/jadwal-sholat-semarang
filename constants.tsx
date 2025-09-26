import React from 'react';

// --- Icons ---

const ImsakIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-300"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
);
const SubuhIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-300"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
);
const FajarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-300"><path d="M5 12h14"></path><path d="M12 5v14"></path><path d="m12 2 3 3"></path><path d="m22 12-3 3"></path><path d="m12 22-3-3"></path><path d="m2 12 3-3"></path></svg>
);
const DhuhrIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-300"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
);
const AsharIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400"><path d="M12 16.5V22"></path><path d="M12 2v4.5"></path><path d="M12 9a7.5 7.5 0 0 1 7.5 7.5H4.5A7.5 7.5 0 0 1 12 9Z"></path><path d="M2 16.5h20"></path></svg>
);
const MaghribIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400"><path d="M12 10V2"></path><path d="m4.93 10.93 1.41 1.41"></path><path d="M2 18h2"></path><path d="M20 18h2"></path><path d="m19.07 10.93-1.41 1.41"></path><path d="M22 22H2"></path><path d="m16 6-4 4-4-4"></path><path d="M16 18a4 4 0 0 0-8 0"></path></svg>
);
const IsyaIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-300"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path><path d="M19 3v4"></path><path d="M21 5h-4"></path></svg>
);
export const LogoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.2 16.2c.3-.3.6-.7.8-1.1s.3-.8.3-1.2c0-.4-.1-.8-.3-1.2s-.4-.8-.8-1.1c-.3-.3-.7-.6-1.1-.8s-.8-.3-1.2-.3c-.4 0-.8.1-1.2.3s-.8.4-1.1.8c-.3.3-.6.7-.8 1.1s-.3.8-.3 1.2c0 .4.1.8.3 1.2s.4.8.8 1.1c.3.3.7.6 1.1.8s.8.3 1.2.3c.4 0 .8-.1 1.2-.3s.8-.4 1.1-.8z"></path><path d="M10 22v-2"></path><path d="M7 19v-2"></path><path d="m11.3 5.7-.9-1.4"></path><path d="m5.2 6.8-.9-1.4"></path><path d="m8.4 12.9-.9-1.4"></path><path d="M3 10h4"></path><path d="M3 13h4"></path><path d="M5 22V10"></path></svg>
);

// --- Prayer Data ---

export type PrayerName = 'Imsak' | 'Subuh' | 'Fajar' | 'Dhuhr' | 'Ashar' | 'Maghrib' | 'Isya';
export type ApiPrayerName = 'Imsak' | 'Fajr' | 'Sunrise' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha';

interface Hadith {
  text: string;
  source: string;
}

interface PrayerDetails {
  significance: string;
  hadith?: Hadith;
}

interface PrayerInfo {
  key: ApiPrayerName;
  displayName: PrayerName;
  // FIX: Changed JSX.Element to React.ReactElement to resolve namespace error.
  icon: React.ReactElement;
  description: string;
  details: PrayerDetails;
}

export const PRAYER_TIMES_DATA: PrayerInfo[] = [
  {
    key: 'Imsak',
    displayName: 'Imsak',
    icon: <ImsakIcon />,
    description: 'Waktu penanda dimulainya periode puasa, biasanya sekitar 10 menit sebelum waktu Subuh.',
    details: {
      significance: 'Imsak adalah pengingat untuk berhati-hati dan bersiap mengakhiri sahur, memastikan puasa dimulai tepat waktu saat fajar tiba. Ini adalah bentuk kehati-hatian dalam beribadah.',
      hadith: {
        text: 'Bersahurlah kalian, karena sesungguhnya dalam sahur itu terdapat berkah.',
        source: 'HR. Bukhari no. 1923 & Muslim no. 1095'
      }
    }
  },
  {
    key: 'Fajr',
    displayName: 'Subuh',
    icon: <SubuhIcon />,
    description: 'Sholat fardhu 2 rakaat yang dilaksanakan setelah fajar shadiq hingga sebelum matahari terbit.',
    details: {
      significance: 'Sholat Subuh memiliki keutamaan besar, disaksikan oleh para malaikat malam dan siang. Mengerjakannya tepat waktu memberikan cahaya dan perlindungan sepanjang hari.',
      hadith: {
        text: 'Dua rakaat fajar (sholat sunnah qobliyah subuh) lebih baik daripada dunia dan seisinya.',
        source: 'HR. Muslim no. 725'
      }
    }
  },
  {
    key: 'Sunrise',
    displayName: 'Fajar',
    icon: <FajarIcon />,
    description: 'Waktu terbitnya matahari. Menandai berakhirnya waktu sholat Subuh dan dimulainya waktu dilarang sholat.',
    details: {
      significance: 'Terbitnya fajar menandai batas akhir waktu Subuh. Ini adalah momen pergantian dari malam ke siang, mengingatkan akan kekuasaan Allah dalam mengatur alam semesta.',
      hadith: {
        text: 'Tidak ada sholat setelah sholat Subuh hingga matahari terbit, dan tidak ada sholat setelah sholat Ashar hingga matahari terbenam.',
        source: 'HR. Bukhari no. 586 & Muslim no. 827'
      }
    }
  },
  {
    key: 'Dhuhr',
    displayName: 'Dhuhr',
    icon: <DhuhrIcon />,
    description: 'Sholat fardhu 4 rakaat yang dilaksanakan setelah matahari tergelincir dari puncaknya hingga bayangan benda sama panjang dengan bendanya.',
    details: {
      significance: 'Sholat Dhuhr dilaksanakan di tengah kesibukan hari, menjadi pengingat untuk sejenak kembali kepada Allah dan memohon petunjuk di sisa hari.',
      hadith: {
        text: 'Inilah waktu dibukakannya pintu-pintu langit. Aku suka jika amalan shalihku naik pada saat itu.',
        source: 'HR. Tirmidzi no. 478 (Terkait sholat sunnah sebelum Dhuhr)'
      }
    }
  },
  {
    key: 'Asr',
    displayName: 'Ashar',
    icon: <AsharIcon />,
    description: 'Sholat fardhu 4 rakaat yang dilaksanakan setelah waktu Dhuhr berakhir hingga matahari terbenam.',
    details: {
      significance: "Sholat Ashar disebut sebagai 'sholat wustha' (sholat pertengahan) dalam beberapa tafsir, yang memiliki penekanan khusus untuk dijaga. Meninggalkannya dapat menghapus amalan.",
      hadith: {
        text: 'Barangsiapa yang meninggalkan sholat Ashar, maka terhapuslah amalannya.',
        source: 'HR. Bukhari no. 553'
      }
    }
  },
  {
    key: 'Maghrib',
    displayName: 'Maghrib',
    icon: <MaghribIcon />,
    description: 'Sholat fardhu 3 rakaat yang dilaksanakan sesaat setelah matahari terbenam hingga hilangnya mega merah di ufuk barat.',
    details: {
      significance: 'Sholat Maghrib adalah penanda berakhirnya siang dan dimulainya malam. Waktunya yang singkat mengajarkan untuk bersegera dalam ketaatan.',
      hadith: {
        text: 'Umatku akan senantiasa berada dalam kebaikan selama mereka tidak mengakhirkan sholat Maghrib hingga bintang-bintang bermunculan.',
        source: 'HR. Abu Daud no. 418'
      }
    }
  },
  {
    key: 'Isha',
    displayName: 'Isya',
    icon: <IsyaIcon />,
    description: 'Sholat fardhu 4 rakaat yang dilaksanakan setelah waktu Maghrib berakhir hingga terbit fajar shadiq.',
    details: {
      significance: 'Sholat Isya adalah penutup sholat fardhu di hari itu. Mengerjakannya secara berjamaah dinilai seperti sholat separuh malam.',
      hadith: {
        text: 'Barangsiapa yang melaksanakan sholat Isya secara berjamaah, maka ia seperti sholat separuh malam. Dan barangsiapa sholat Subuh berjamaah, maka ia seperti sholat semalam suntuk.',
        source: 'HR. Muslim no. 656'
      }
    }
  },
];


// --- Date Mappings ---

export const GREGORIAN_DAY_MAP: string[] = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
export const GREGORIAN_MONTH_MAP: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];