import React from 'react';
import { Trophy, Clock, CheckCircle2, Circle, Gem, Zap, Gift, ChevronRight } from 'lucide-react';

function DailyChallenge() {
    const challenges = [
        { id: 1, title: "10 yeni söz", xp: 50, completed: true },
        { id: 2, title: "25 Cümlə Tərcümələri", xp: 75, completed: true },
        { id: 3, title: "Dinləmə Məşqi", xp: 100, completed: false },
        { id: 4, title: "Danışıq Təcrübəsi", xp: 150, completed: false },
    ];

    const rewards = [
        { day: "Gün 1", label: "10 Almas", icon: <Gem size={20} />, active: true },
        { day: "Gün 2", label: "2x XP", icon: <Zap size={20} />, active: false },
        { day: "Gün 3", label: "Premium", icon: <Gift size={20} />, active: false },
    ];

    return (
        <div className=" mx-auto md:p-10 my-6 bg-white shadow-xl shadow-slate-200/60 overflow-hidden font-sans">
            <div className="p-6 pb-4">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-amber-100 rounded-2xl text-amber-600">
                            <Trophy size={24} fill="currentColor" fillOpacity={0.2} />
                        </div>
                        <h3 className="text-xl font-black text-slate-800 tracking-tight">
                            Günlük Mücadilə
                        </h3>
                    </div>
                </div>
                <div className="space-y-2 mb-6">
                    <div className="flex justify-between items-end">
                        <span className="text-sm font-bold text-slate-500 ">Sənin tərəqqin</span>
                        <span className="text-lg font-black text-blue-600">48%</span>
                    </div>
                    <div className="h-2 md:h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-1000" style={{ width: '48%' }}></div>
                    </div>
                </div>
            </div>

            <div className="px-6 space-y-3">
                {challenges.map((item) => (
                    <div key={item.id} className={`flex items-center p-4 rounded-2xl border transition-all duration-200 ${item.completed ? "bg-emerald-50/50 border-emerald-100" : "bg-slate-50 border-slate-100 hover:border-blue-200"}`}>
                        <div className="shrink-0">
                            {item.completed ? (
                                <CheckCircle2 className="text-emerald-500" size={26} fill="currentColor" fillOpacity={0.1} />
                            ) : (
                                <Circle className="text-slate-300" size={26} />
                            )}
                        </div>
                        <div className="ml-4 flex-1">
                            <h5 className={`font-bold text-sm md:text-base ${item.completed ? "text-slate-700" : "text-slate-600"}`}>
                                {item.title}
                            </h5>
                            <span className="text-xs font-black text-amber-500 uppercase tracking-widest">
                                +{item.xp} XP
                            </span>
                        </div>
                        {!item.completed && <ChevronRight size={18} className="text-slate-300" />}
                    </div>
                ))}
            </div>

            <div className="p-6 mt-4">
                <div className="bg-slate-50 rounded-[1rem] p-5 border border-slate-100">
                    <h5 className="text-center text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                        Gündəlik Hədiyyələr
                    </h5>
                    <div className="grid grid-cols-3 gap-3">
                        {rewards.map((reward, idx) => (
                            <div key={idx} className={`flex flex-col items-center p-2 md:p-3 rounded-xl md:rounded-2xl transition-all ${reward.active ? "bg-white border-2 border-blue-500 shadow-md shadow-blue-100 scale-105" : "bg-slate-100/50 border border-transparent opacity-60"}`}>
                                <span className={`text-[8px] md:text-[10px] font-bold mb-2 ${reward.active ? "text-blue-600" : "text-slate-400"}`}>
                                    {reward.day}
                                </span>
                                <div className={`${reward.active ? "text-blue-500" : "text-slate-400"} mb-1`}>
                                    {reward.icon}
                                </div>
                                <span className="text-[8px] md:text-[10px] font-black text-slate-700 whitespace-nowrap">
                                    {reward.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DailyChallenge;