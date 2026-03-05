import React, { useRef } from 'react';
import { Users, BookOpenCheck, Mic2, MessageSquare, Sparkles, Compass, ChevronLeft, ChevronRight } from 'lucide-react';

function TopLanguages() {
    const scrollRef = useRef(null);

    const topLang = [
        {
            id: 1,
            name: "İngilis dili",
            students: "8.53 mln",
            rank: 1,
            icon: <BookOpenCheck className="w-6 h-6 text-white" />,
            color: "from-cyan-400 to-blue-500 shadow-cyan-200/50"
        },
        {
            id: 2,
            name: "Alman dili",
            students: "1.82 mln",
            rank: 2,
            icon: <Mic2 className="w-6 h-6 text-white" />,
            color: "from-amber-400 to-orange-500 shadow-orange-200/50"
        },
        {
            id: 3,
            name: "Rus dili",
            students: "979 min",
            rank: 3,
            icon: <MessageSquare className="w-6 h-6 text-white" />,
            color: "from-emerald-400 to-teal-500 shadow-emerald-200/50"
        },
        {
            id: 4,
            name: "İspan dili",
            students: "304 min",
            rank: 4,
            icon: <Sparkles className="w-6 h-6 text-white" />,
            color: "from-rose-400 to-red-500 shadow-rose-200/50"
        }
    ];

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <>
            <section className="py-16 md:py-24">
                <div className="px-8 md:px-16 lg:px-20">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-500 rounded-full text-sm font-bold uppercase">
                                <Compass size={16} />
                                <span>Qlobal Statistika</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-800 ">
                                Ən çox <span className="text-blue-500 ">tərcih</span> edilənlər
                            </h2>
                        </div>
                    </div>

                    <div ref={scrollRef} className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {topLang.map((lang) => (
                            <div key={lang.id} className="min-w-[85%] sm:min-w-[45%] md:min-w-full snap-center group">
                                <div className="h-full p-8 rounded-[1rem] bg-white border border-slate-100 transition-all duration-500 relative overflow-hidden">

                                    <div className="absolute top-6 right-8 text-6xl font-black text-slate-50 transition-colors pointer-events-none">
                                        {lang.rank}
                                    </div>

                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${lang.color} flex items-center justify-center mb-8 shadow-md transition-all`}>
                                        {lang.icon}
                                    </div>

                                    <div className="space-y-3 relative z-10">
                                        <h3 className="text-2xl font-bold text-slate-800">{lang.name}</h3>
                                        <div className="flex items-center gap-2 py-1.5 px-3 bg-slate-50 rounded-xl w-fit">
                                            <Users size={14} className="text-blue-500" />
                                            <span className="text-slate-600 font-bold text-sm">
                                                {lang.students}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-8 h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                                        <div className={`h-full w-0 group-hover:w-full transition-all duration-700 bg-gradient-to-r ${lang.color}`}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );



}

export default TopLanguages;