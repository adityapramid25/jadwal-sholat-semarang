import React, { useState, useEffect, useRef } from 'react';
import { AladhanResponse, Timings, GregorianDate } from './types';
import { PRAYER_TIMES_DATA, GREGORIAN_DAY_MAP, GREGORIAN_MONTH_MAP, ApiPrayerName, LogoIcon } from './constants';
import PrayerTimeRow from './components/PrayerTimeRow';
import { ClockLoader } from './components/Loader';
import RealTimeClock from './components/RealTimeClock';
import PrayerDetail from './components/PrayerDetail';

const App: React.FC = () => {
    const [prayerData, setPrayerData] = useState<Timings | null>(null);
    const [gregorianDate, setGregorianDate] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [nextPrayer, setNextPrayer] = useState<ApiPrayerName | null>(null);
    const [expandedPrayer, setExpandedPrayer] = useState<ApiPrayerName | null>(null);

    const contentRef = useRef<HTMLDivElement>(null);

    const handlePrayerClick = (prayerKey: ApiPrayerName | null) => {
        // Allow toggling for mobile accordion
        setExpandedPrayer(current => (current === prayerKey ? null : prayerKey));
    };
    
    // Close details if clicked outside the content area
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
                setExpandedPrayer(null);
            }
        };

        if (expandedPrayer) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [expandedPrayer]);


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
            const expandedPrayerDetails = expandedPrayer ? PRAYER_TIMES_DATA.find(p => p.key === expandedPrayer) : null;
            
            return (
                 <div ref={contentRef} className="relative bg-gray-900/50 p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-700 backdrop-blur-sm min-h-[400px] md:flex md:items-center md:justify-center">
                    {/* --- Desktop View --- */}
                    <div className="hidden md:block">
                        {expandedPrayerDetails ? (
                            // Focus View: Show one prayer and its details
                            <div className="flex flex-row justify-center items-start gap-6">
                                <PrayerTimeRow
                                    key={expandedPrayerDetails.key}
                                    icon={expandedPrayerDetails.icon}
                                    name={expandedPrayerDetails.displayName}
                                    time={prayerData[expandedPrayerDetails.key as keyof Timings]}
                                    isNext={nextPrayer === expandedPrayerDetails.key}
                                    isExpanded={true} // Always visually "expanded" in focus view
                                    onClick={() => handlePrayerClick(expandedPrayerDetails.key)}
                                    description={expandedPrayerDetails.description}
                                    details={expandedPrayerDetails.details}
                                />
                                <PrayerDetail
                                    key={`${expandedPrayerDetails.key}-detail`}
                                    name={expandedPrayerDetails.displayName}
                                    icon={expandedPrayerDetails.icon}
                                    description={expandedPrayerDetails.description}
                                    details={expandedPrayerDetails.details}
                                />
                                <button 
                                    onClick={() => setExpandedPrayer(null)} 
                                    className="absolute top-3 right-3 w-8 h-8 bg-gray-700 rounded-full text-gray-300 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-gray-900 z-10"
                                    aria-label="Close details"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                            </div>
                        ) : (
                            // Grid View: Show all prayers
                            <div className="flex flex-row flex-wrap justify-center gap-4">
                                {PRAYER_TIMES_DATA.map(prayer => (
                                    <PrayerTimeRow
                                        key={prayer.key}
                                        icon={prayer.icon}
                                        name={prayer.displayName}
                                        time={prayerData[prayer.key as keyof Timings]}
                                        isNext={nextPrayer === prayer.key}
                                        isExpanded={false} // No item is expanded in the grid view
                                        onClick={() => handlePrayerClick(prayer.key)}
                                        description={prayer.description}
                                        details={prayer.details}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* --- Mobile View (Accordion) --- */}
                    <div className="flex flex-col gap-4 md:hidden">
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
                <header className="text-center mb-8 mt-4">
                    <h1 className="text-4xl sm:text-5xl font-bold text-green-300 font-title uppercase">Jadwal Sholat</h1>
                    <p className="text-md sm:text-lg text-gray-300 mt-2">Semarang, Indonesia — {gregorianDate}</p>
                    <RealTimeClock />
                </header>

                <section className="flex-grow">
                    {renderContent()}
                </section>

                <footer className="mt-8 text-center text-gray-400">
                    <div className="w-full overflow-hidden bg-black/30 rounded-full">
                        <div className="whitespace-nowrap animate-marquee">
                           <p className="py-2 text-lg">"Sholat berjamaah lebih utama daripada sholat sendirian sebanyak 27 derajat. HR. Bukhari no. 645, Muslim no. 650"</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-3 mt-4 opacity-70">
                         <LogoIcon />
                         <p className="text-sm">SMKN 9 SEMARANG</p>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default App;
