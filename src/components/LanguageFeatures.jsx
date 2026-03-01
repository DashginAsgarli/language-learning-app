import React from 'react';
import { Gamepad2, Coins, TrendingUp } from 'lucide-react';
import "../index.css";

function LanguageFeatures() {
    const features = [
        {
            icon: <Gamepad2 className="w-8 h-8 md:w-10 md:h-10" />,
            title: "Oyunlaşdırılmış",
            desc: "Dərsləri oyun oynayırmış kimi əyləncəli öyrənin.",
            color: "bg-gradient-to-br from-cyan-400 to-blue-500 shadow-cyan-200/50",
        },
        {
            icon: <Coins className="w-8 h-8 md:w-10 md:h-10" />,
            title: "Tamamilə Pulsuz",
            desc: "Heç bir gizli ödəniş yoxdur, hər kəs üçün əlçatandır.",
            color: "bg-gradient-to-br from-rose-400 to-red-500 shadow-rose-200/50",
        },
        {
            icon: <TrendingUp className="w-8 h-8 md:w-10 md:h-10" />,
            title: "Effektiv İnkişaf",
            desc: "Gündəlik statistikalarla irəliləyişinizi izləyin.",
            color: "bg-gradient-to-br from-emerald-400 to-teal-500 shadow-emerald-200/50",
        }
    ];

    return (
        <>
            <section className="relative py-16 md:py-24 px-6 flex flex-col items-center overflow-hidden ">
                <div className="text-center max-w-3xl mb-12 md:mb-20">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 mb-6 leading-tight">
                        Dil öyrənmək üçün <span className="text-blue-500">pulsuz, <span className='text-red-700'>əyləncəli</span></span> və <span className="text-emerald-600">effektiv</span> yol!
                    </h2>
                    <p className="text-slate-600 text-lg hidden md:block">
                        Müasir metodologiya ilə dili daha sürətli və yorulmadan mənimsəyin.
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-4 md:gap-16 relative z-10 w-full max-w-5xl">
                    {features.map((item, index) => (
                        <div key={index} className={`flex flex-col items-center text-center group transition-all duration-300 transform hover:-translate-y-2`}>
                            <div className={`w-18 h-18 md:w-24 md:h-24 ${item.color} text-white rounded-2xl md:rounded-3xl flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 mb-4 md:mb-6 animate-pulse-slow`}>
                                {item.icon}
                            </div>

                            <h3 className="text-sm md:text-xl font-bold text-slate-800 mb-2 hidden md:block">{item.title}</h3>
                            <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-[200px] hidden md:block">
                                {item.desc}
                            </p>
                        </div>
                    ))}

                </div>
            </section>
        </>
    );
}

export default LanguageFeatures;