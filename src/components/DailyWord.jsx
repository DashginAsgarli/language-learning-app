import React from 'react';
import { Sparkles, Volume2, Lightbulb, ArrowRight } from 'lucide-react';

function DailyWord() {
    return (
        <div className="mt-6 relative overflow-hidden p-6 rounded-[24px] bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-2xl border border-slate-700">

            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full">
                    <Sparkles size={14} className="text-blue-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-100">Günün Sözü</span>
                </div>

            </div>

            <div className="mb-6">
                <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-1">Persistent</h2>
                <p className="text-lg text-blue-400 font-bold italic">Davamlı, əzmkar</p>
            </div>

            <div className="p-4 bg-slate-700/30 border border-slate-600/50 rounded-2xl backdrop-blur-sm">
                <div className="flex items-start gap-3">
                    <Lightbulb size={18} className="text-amber-400 shrink-0 mt-1" />
                    <div>
                        <p className="text-sm text-slate-200 leading-relaxed font-medium">"He is persistent in his efforts to learn English."</p>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default DailyWord;