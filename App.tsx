import React, { useState, useEffect } from 'react';
import { AladhanResponse, Timings, GregorianDate } from './types';
import { PRAYER_TIMES_DATA, HIJRI_MONTH_MAP, GREGORIAN_DAY_MAP, GREGORIAN_MONTH_MAP, ApiPrayerName } from './constants';
import PrayerTimeRow from './components/PrayerTimeRow';
import { ClockLoader } from './components/Loader';
import RealTimeClock from './components/RealTimeClock';

const App: React.FC = () => {
    const [prayerData, setPrayerData] = useState<Timings | null>(null);
    const [hijriDate, setHijriDate] = useState<string>('');
    const [gregorianDate, setGregorianDate] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [nextPrayer, setNextPrayer] = useState<ApiPrayerName | null>(null);
    const [expandedPrayer, setExpandedPrayer] = useState<ApiPrayerName | null>(null);

    const handlePrayerClick = (prayerKey: ApiPrayerName) => {
        setExpandedPrayer(current => (current === prayerKey ? null : prayerKey));
    };

    const formatGregorianDate = (gregorian: GregorianDate): string => {
        // Create date object in UTC to avoid local timezone shifts
        const date = new Date(Date.UTC(Number(gregorian.year), gregorian.month.number - 1, Number(gregorian.day)));
        
        const dayName = GREGORIAN_DAY_MAP[date.getUTCDay()];
        const dayOfMonth = date.getUTCDate();
        const monthName = GREGORIAN_MONTH_MAP[date.getUTCMonth()];
        const year = date.getUTCFullYear();
        return `${dayName}, ${dayOfMonth} ${monthName} ${year}`;
    };

    // Update current time every second to act as a ticker
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Determine the next prayer, now timezone-aware
    useEffect(() => {
        if (!prayerData) return;

        // Get the current time as "HH:mm" string in the target timezone
        const now = new Date();
        const jakartaTimeString = now.toLocaleTimeString('en-GB', {
            timeZone: 'Asia/Jakarta',
            hour: '2-digit',
            minute: '2-digit',
        });

        const prayerOrder = PRAYER_TIMES_DATA.map(p => p.key);
        let nextPrayerFound: ApiPrayerName | null = null;

        // Find the next prayer for today by comparing time strings
        for (const prayerName of prayerOrder) {
            const prayerTimeStr = prayerData[prayerName];
            if (!prayerTimeStr) continue;
            
            if (prayerTimeStr > jakartaTimeString) {
                nextPrayerFound = prayerName;
                break;
            }
        }
        
        // If all prayers for today have passed, the next prayer is the first one of the day
        if (!nextPrayerFound) {
            nextPrayerFound = prayerOrder[0];
        }
        
        setNextPrayer(nextPrayerFound);

    }, [currentTime, prayerData]);


    useEffect(() => {
        const fetchPrayerTimes = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch using Kemenag method (Fajr: 20°, Isha: 18°) for Indonesian accuracy
                const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=Semarang&country=Indonesia&method=99&methodSettings=20,null,18`);
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                const data: AladhanResponse = await response.json();

                if (data.code === 200) {
                    setPrayerData(data.data.timings);

                    const hijri = data.data.date.hijri;
                    const hijriMonthIndo = HIJRI_MONTH_MAP[hijri.month.en.replace("'", "")] || hijri.month.en;
                    setHijriDate(`${hijri.day} ${hijriMonthIndo} ${hijri.year} H`);
                    
                    const gregorian = data.data.date.gregorian;
                    setGregorianDate(formatGregorianDate(gregorian));

                } else {
                    throw new Error(data.status);
                }
            } catch (e) {
                if (e instanceof Error) {
                    setError(`Failed to fetch data: ${e.message}`);
                } else {
                    setError('An unknown error occurred.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPrayerTimes();
    }, []);

    const renderContent = () => {
        if (loading) {
            return <div className="flex flex-col items-center justify-center h-64"><ClockLoader /><p className="mt-4 text-lg text-gray-300">Memuat data...</p></div>;
        }

        if (error) {
            return <div className="text-center p-8 bg-red-900/50 rounded-lg"><p className="text-red-300">{error}</p></div>;
        }

        if (prayerData) {
            return (
                 <div className="bg-gray-900/50 p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-700 backdrop-blur-sm">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {PRAYER_TIMES_DATA.map(prayer => (
                            <PrayerTimeRow
                                key={prayer.key}
                                icon={prayer.icon}
                                name={prayer.displayName}
                                time={prayerData[prayer.key as keyof Timings]}
                                isNext={nextPrayer === prayer.key}
                                isExpanded={expandedPrayer === prayer.key}
                                onClick={() => handlePrayerClick(prayer.key)}
                                description={prayer.description}
                                details={prayer.details}
                            />
                        ))}
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen text-white font-sans p-4 sm:p-6 md:p-8">
            <main className="max-w-4xl mx-auto flex flex-col min-h-[95vh]">
                <header className="text-center mb-8">
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-wider text-green-300">Jadwal Sholat</h1>
                    <p className="text-md sm:text-lg text-gray-300 mt-2">Semarang, Indonesia — {gregorianDate}</p>
                    <p className="text-md sm:text-lg text-green-400 font-semibold mt-1">{hijriDate}</p>
                    <RealTimeClock />
                </header>

                <section className="flex-grow">
                    {renderContent()}
                </section>

                <footer className="mt-12 text-center text-gray-400">
                    <div className="w-full overflow-hidden bg-black/30 rounded-full">
                        <div className="whitespace-nowrap animate-marquee">
                           <p className="py-2 text-sm">"Sholat berjamaah lebih utama daripada sholat sendirian sebanyak 27 derajat. HR. Bukhari no. 645, Muslim no. 650"</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-4 opacity-60">
                         <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Masjid_Agung_Jawa_Tengah_-_Semarang.jpg/320px-Masjid_Agung_Jawa_Tengah_-_Semarang.jpg" alt="Masjid Agung Jawa Tengah" className="w-6 h-6 rounded-full object-cover" />
                         <p className="text-xs">Prayer Times Project</p>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default App;