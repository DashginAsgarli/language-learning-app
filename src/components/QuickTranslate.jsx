import React, { useState } from 'react';
import { ArrowRight, Loader2, Copy, RotateCcw, PenTool, ArrowLeftRight } from 'lucide-react';

function QuickTranslate() {
    const [text, setText] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [isEnToAz, setIsEnToAz] = useState(true);

    function handleTranslate() {
        if (!text.trim()) return;
        setLoading(true);
        const langPair = isEnToAz ? "en|az" : "az|en";

        fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langPair}`)
            .then(res => res.json())
            .then(data => {
                if (data.responseData) setResult(data.responseData.translatedText);
            })
            .catch(() => setResult("Xəta baş verdi!"))
            .finally(() => setLoading(false));
    };

    function toggleDirection() {
        setIsEnToAz(!isEnToAz);
        setText("");
        setResult("");
    };

    return (
        <div className="mt-8 relative overflow-hidden p-5 md:p-8 rounded-[24px] md:rounded-[32px] bg-white border border-slate-200 shadow-xl">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-slate-800 to-[#3b82f6]"></div>

            <div className="flex items-center justify-between mb-6">
                <h3 className="flex items-center gap-2 text-xl md:text-2xl font-black text-slate-800 uppercase italic">
                    <PenTool size={20} className="text-[#3b82f6]" /> Tərcüməçi
                </h3>

                <div className="flex items-center gap-3">
                    <button onClick={toggleDirection} className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-800 hover:text-white rounded-full transition-all duration-300 text-[10px] font-black uppercase tracking-tighter">
                        {isEnToAz ? "EN" : "AZ"} <ArrowLeftRight size={12} /> {isEnToAz ? "AZ" : "EN"}
                    </button>
                    {text && (
                        <button onClick={() => {
                            setText("");
                            setResult("");
                        }} className="text-slate-400 hover:text-rose-500 transition-colors">
                            <RotateCcw size={16} />
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                    <div className="absolute -top-2 left-4 px-2 bg-white text-[9px] font-black text-slate-400 uppercase tracking-widest z-10">
                        {isEnToAz ? "İngiliscə" : "Azərbaycanca"}
                    </div>
                    <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Mətni yazın..." className="w-full p-4 text-sm md:text-base border-2 border-slate-100 bg-slate-50 rounded-2xl focus:border-slate-800 outline-none resize-none h-32 transition-all font-bold text-slate-700 shadow-inner" />
                    <button onClick={handleTranslate} disabled={loading || !text.trim()} className="absolute bottom-3 right-3 p-3 bg-slate-800 hover:bg-[#3b82f6] text-white rounded-xl shadow-lg active:scale-95 disabled:opacity-20">
                        {loading ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} />}
                    </button>
                </div>

                <div className="relative">
                    <div className="absolute -top-2 left-4 px-2 bg-white text-[9px] font-black text-[#3b82f6] uppercase tracking-widest z-10">
                        {isEnToAz ? "Azərbaycanca" : "İngiliscə"}
                    </div>
                    <div className={`w-full p-4 rounded-2xl border-2 h-32 overflow-y-auto transition-all ${result ? 'bg-blue-50/30 border-blue-100' : 'bg-slate-50 border-dashed border-slate-200'}`}>
                        {result ? (
                            <div className="relative animate-in fade-in zoom-in-95">
                                <p className="text-sm md:text-base text-slate-800 font-bold leading-relaxed pr-6">{result}</p>
                                <button onClick={() => navigator.clipboard.writeText(result)} className="absolute top-0 right-0 text-slate-300 hover:text-[#3b82f6]">
                                    <Copy size={14} />
                                </button>
                            </div>
                        ) : (
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 flex items-center justify-center h-full">Tərcümə gözlənilir</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickTranslate;