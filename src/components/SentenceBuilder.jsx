import React, { useState, useEffect } from 'react';
import { PenTool,Sparkles, ArrowRight, Trophy, AlertCircle, Lightbulb } from 'lucide-react';

const SENTENCES = [
    { en: "I love learning English with this app", az: "Mən bu proqramla ingilis dili öyrənməyi sevirəm" },
    { en: "The weather is very beautiful today", az: "Bu gün hava çox gözəldir" },
    { en: "She is working on a new project", az: "O, yeni bir layihə üzərində işləyir" },
    { en: "We should go to the park together", az: "Biz parka birlikdə getməliyik" },
    { en: "Learning a new language is fun", az: "Yeni dil öyrənmək əyləncəlidir" },
    { en: "He wants to become a software developer", az: "O, proqram təminatı tərtibatçısı olmaq istəyir" },
    { en: "Can you help me with my homework", az: "Ev tapşırığımda mənə kömək edə bilərsən" },
    { en: "They have been living here for years", az: "Onlar illərdir burada yaşayırlar" },
    { en: "I will call you as soon as possible", az: "Sənə mümkün qədər tez zəng edəcəyəm" },
    { en: "Success requires hard work and patience", az: "Uğur çox çalışmaq və səbir tələb edir" }
];

const SentencePractice = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [shuffledWords, setShuffledWords] = useState([]);
    const [selectedWords, setSelectedWords] = useState([]);
    const [status, setStatus] = useState('idle'); 
    const [isCorrect, setIsCorrect] = useState(null);

    const initLevel = (index) => {
        if (index >= SENTENCES.length) {
            setStatus('finished');
            return;
        }
        const words = SENTENCES[index].en.split(" ");
        setShuffledWords([...words].sort(() => Math.random() - 0.5));
        setSelectedWords([]);
        setStatus('idle');
        setIsCorrect(null);
    };

    useEffect(() => { initLevel(0); }, []);

    const handleWordClick = (word, index) => {
        if (status === 'checked') return;
        setSelectedWords([...selectedWords, word]);
        setShuffledWords(shuffledWords.filter((_, i) => i !== index));
    };

    const handleRemoveClick = (word, index) => {
        if (status === 'checked') return;
        setShuffledWords([...shuffledWords, word]);
        setSelectedWords(selectedWords.filter((_, i) => i !== index));
    };

    const checkResult = () => {
        const result = selectedWords.join(" ");
        setIsCorrect(result === SENTENCES[currentIndex].en);
        setStatus('checked');
    };

    const nextLevel = () => {
        const nextIdx = currentIndex + 1;
        setCurrentIndex(nextIdx);
        initLevel(nextIdx);
    };

    if (status === 'finished') {
        return (
            <div className="mt-8 p-10 rounded-[32px] bg-slate-900 text-white text-center shadow-2xl animate-in zoom-in-95">
                <Trophy size={60} className="mx-auto text-yellow-400 mb-4" />
                <h2 className="text-3xl font-black uppercase italic mb-2">MƏŞQ BİTDİ!</h2>
                <p className="text-slate-400 mb-6 font-bold">10 cümlənin hamısını nəzərdən keçirdin.</p>
                <button onClick={() => {setCurrentIndex(0); initLevel(0);}} className="px-8 py-4 bg-[#3b82f6] rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all">Yenidən Başla</button>
            </div>
        );
    }

    return (
        <div className="mt-8 relative overflow-hidden p-6 md:p-8 rounded-[24px] md:rounded-[32px] bg-white border border-slate-200 shadow-xl text-left">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-slate-800 to-[#3b82f6]" />

            <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col">
                    <h3 className="flex items-center gap-2 text-xl font-black text-slate-800 uppercase italic">
                        <PenTool size={20} className="text-[#3b82f6]" /> Cümlə Qurucu
                    </h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tərəqqi: {currentIndex + 1} / 10</p>
                </div>
                <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#3b82f6] transition-all duration-500" style={{ width: `${(currentIndex + 1) * 10}%` }} />
                </div>
            </div>

            <div className="mb-6 p-4 bg-blue-50/50 border border-blue-100 rounded-2xl flex items-center gap-3">
                <Lightbulb size={18} className="text-blue-500 shrink-0" />
                <p className="text-sm font-bold text-blue-700 italic leading-snug">"{SENTENCES[currentIndex].az}"</p>
            </div>

            <div className={`min-h-[110px] p-5 mb-5 rounded-2xl border-2 transition-all duration-300 flex flex-wrap gap-2 items-center justify-center ${
                status === 'checked' && isCorrect ? 'bg-green-50 border-green-200' : 
                status === 'checked' && !isCorrect ? 'bg-rose-50 border-rose-200' : 'bg-slate-50 border-dashed border-slate-200 shadow-inner'
            }`}>
                {selectedWords.map((word, idx) => (
                    <button key={idx} onClick={() => handleRemoveClick(word, idx)} className="px-4 py-2 bg-slate-800 text-white rounded-xl font-bold text-sm shadow-md transition-all active:scale-95">
                        {word}
                    </button>
                ))}
            </div>

            <div className="flex flex-wrap gap-2 justify-center mb-8 min-h-[60px]">
                {status === 'idle' && shuffledWords.map((word, idx) => (
                    <button key={idx} onClick={() => handleWordClick(word, idx)} className="px-4 py-2 bg-white border-2 border-slate-100 text-slate-700 rounded-xl font-bold text-sm hover:border-[#3b82f6] transition-all shadow-sm">
                        {word}
                    </button>
                ))}
            </div>

            {status === 'checked' && !isCorrect && (
                <div className="mb-6 p-4 bg-rose-500 rounded-2xl border-b-4 border-rose-700 animate-in slide-in-from-top-2">
                    <div className="flex items-center gap-2 mb-1 text-white/80 font-black text-[10px] uppercase tracking-widest">
                        <AlertCircle size={14} /> Doğru Variant:
                    </div>
                    <p className="text-white font-bold text-sm italic">{SENTENCES[currentIndex].en}</p>
                </div>
            )}

            <div className="flex gap-3">
                {status === 'idle' ? (
                    <button 
                        onClick={checkResult} 
                        disabled={selectedWords.length === 0} 
                        className="w-full py-4 bg-slate-800 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl disabled:opacity-20 flex items-center justify-center gap-2"
                    >
                        Yoxla <Sparkles size={16} />
                    </button>
                ) : (
                    <button 
                        onClick={nextLevel} 
                        className="w-full py-4 bg-[#3b82f6] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 animate-in zoom-in-95"
                    >
                        Növbəti Cümlə <ArrowRight size={18} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default SentencePractice;