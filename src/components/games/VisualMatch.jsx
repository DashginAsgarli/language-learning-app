import React, { useState, useEffect } from 'react';

const DATA = [
    { id: 1, word: "Apple", emoji: "🍎" },
    { id: 2, word: "Banana", emoji: "🍌" },
    { id: 3, word: "Grapes", emoji: "🍇" },
    { id: 4, word: "Orange", emoji: "🍊" },
    { id: 5, word: "Cherry", emoji: "🍒" },
    { id: 6, word: "Strawberry", emoji: "🍓" }
];

const FruitMatch = () => {
    const [icons, setIcons] = useState([]);
    const [words, setWords] = useState([]);
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [selectedWord, setSelectedWord] = useState(null);
    const [matched, setMatched] = useState([]);
    const [finished, setFinished] = useState(false);

    const initGame = () => {
        setIcons([...DATA].sort(() => Math.random() - 0.5));
        setWords([...DATA].sort(() => Math.random() - 0.5));
        setMatched([]);
        setSelectedIcon(null);
        setSelectedWord(null);
        setFinished(false);
    };

    useEffect(() => { initGame(); }, []);

    useEffect(() => {
        if (selectedIcon && selectedWord) {
            if (selectedIcon === selectedWord) {
                setMatched(prev => [...prev, selectedIcon]);
                setSelectedIcon(null);
                setSelectedWord(null);
            } else {
                const timer = setTimeout(() => {
                    setSelectedIcon(null);
                    setSelectedWord(null);
                }, 500);
                return () => clearTimeout(timer);
            }
        }
    }, [selectedIcon, selectedWord]);

    useEffect(() => {
        if (matched.length === DATA.length) {
            setFinished(true);
        }
    }, [matched]);

    if (finished) {
        return (
            <div className="mt-6 p-10 rounded-[24px] bg-[#1e293b] text-white text-center shadow-2xl border border-slate-700 relative">
                <div className="text-5xl mb-4">🏆</div>
                <h2 className="text-xl font-black uppercase italic mb-6 tracking-widest">Möhtəşəm!</h2>
                <button 
                    onClick={initGame} 
                    className="px-8 py-3 bg-[#3b82f6] text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 transition-all shadow-lg"
                >
                    Yenidən Başla
                </button>
            </div>
        );
    }

    return (
        <div className="mt-6 relative overflow-hidden p-6 rounded-[24px] bg-white border border-slate-200 shadow-xl max-w-sm mx-auto font-sans text-left">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#0f172a] to-[#3b82f6]" />

            <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-black text-slate-800 uppercase italic">
                    🎯 Söz Uyğunluğu
                </h3>
                <span className="text-[10px] font-black text-slate-500 bg-slate-100 px-3 py-1 rounded-full uppercase">
                    {matched.length}/{DATA.length}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                    {icons.map((item) => (
                        <button
                            key={item.id}
                            disabled={matched.includes(item.id)}
                            onClick={() => setSelectedIcon(item.id)}
                            className={`w-full h-20 rounded-2xl border-2 transition-all duration-300 flex items-center justify-center text-4xl ${
                                matched.includes(item.id) ? 'opacity-0 scale-50 pointer-events-none' :
                                selectedIcon === item.id ? 'border-[#3b82f6] bg-blue-50 shadow-md scale-105' : 'border-slate-50 bg-slate-50 hover:border-slate-200'
                            }`}
                        >
                            {item.emoji}
                        </button>
                    ))}
                </div>

                <div className="space-y-3">
                    {words.map((item) => (
                        <button
                            key={item.id}
                            disabled={matched.includes(item.id)}
                            onClick={() => setSelectedWord(item.id)}
                            className={`w-full h-20 rounded-2xl border-2 font-black uppercase tracking-widest text-[10px] transition-all duration-300 flex items-center justify-center px-1 text-center ${
                                matched.includes(item.id) ? 'opacity-0 scale-50 pointer-events-none' :
                                selectedWord === item.id ? 'bg-[#0f172a] border-[#0f172a] text-white shadow-xl scale-105' : 'bg-white border-slate-100 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                            }`}
                        >
                            {item.word}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-8 flex gap-1.5 justify-center">
                {DATA.map((_, i) => (
                    <div key={i} className={`h-1.5 w-5 rounded-full transition-all duration-500 ${i < matched.length ? 'bg-[#3b82f6]' : 'bg-slate-100'}`} />
                ))}
            </div>
        </div>
    );
};

export default FruitMatch;