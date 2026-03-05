import React, { useState } from 'react';
import { Volume2, Mic, RefreshCw, BookText, Play, Loader2, Search, UserRound } from 'lucide-react';

function AudioPractice() {
    const [wordData, setWordData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [activeWordIndex, setActiveWordIndex] = useState(-1);

    const longText = "Language is the roadmap of a culture. It tells you where its people come from and where they are going. While AI accelerates your pace, your persistence defines your reach. Each word you master is a seed planted for a forest of opportunities. Remember: greatness is not found in big steps, but in small steps taken every single day.";
    const words = longText.split(" ");

    function fetchWordDefinition(word) {
        const cleanWord = word.replace(/[.,:;]/g, "");
        setIsLoading(true); setWordData(null);
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${cleanWord}`)
            .then(res => res.json())
            .then(data => {
                if (data && !data.title) {
                    setWordData({
                        word: data[0].word, phonetic: data[0].phonetic || "/.../",
                        definition: data[0].meanings[0].definitions[0].definition,
                        partOfSpeech: data[0].meanings[0].partOfSpeech,
                        audio: data[0].phonetics.find(p => p.audio)?.audio
                    });
                } else setWordData({ error: "Söz tapılmadı" });
            }).catch(() => setWordData({ error: "Xəta!" })).finally(() => setIsLoading(false));
    }

    function handleSpeakText() {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(longText);
        utterance.lang = 'en-US'; utterance.rate = 0.85;
        utterance.onboundary = (e) => {
            if (e.name === 'word') {
                const textUpToChar = longText.substring(0, e.charIndex).trim();
                setActiveWordIndex(textUpToChar ? textUpToChar.split(/\s+/).length : 0);
            }
        };
        utterance.onend = () => setActiveWordIndex(-1);
        window.speechSynthesis.speak(utterance);
    }

    return (
        <div className="mx-auto my-4 md:my-8 p-4 md:p-8 bg-[#f8faff] border border-blue-50 shadow-xl rounded-[25px] md:rounded-[35px] font-sans">
            <h2 className="text-xl md:text-3xl font-black text-slate-800 text-center mb-6 flex justify-center gap-3">
                <BookText className="text-blue-600 w-6 h-6 md:w-8 md:h-8" /> LangLearn Reader
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-10 gap-4 md:gap-6">
                <div className="md:col-span-6 space-y-4">
                    <div className="relative p-5 md:p-7 bg-white border border-slate-100 rounded-[20px] md:rounded-[25px] shadow-sm overflow-hidden h-full">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-500" />

                        <div className="flex items-center gap-3 mb-5 p-2 bg-slate-50 rounded-xl w-fit border border-slate-100">
                            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center transition-all ${activeWordIndex !== -1 ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-400'}`}>
                                <UserRound size={18} className={activeWordIndex !== -1 ? "animate-bounce" : ""} />
                            </div>
                            <div className="pr-1 md:pr-2">
                                <p className={`text-[8px] md:text-[9px] font-black uppercase tracking-widest ${activeWordIndex !== -1 ? 'text-blue-600' : 'text-slate-400'}`}>
                                    {activeWordIndex !== -1 ? 'Oxunur...' : 'AI Voice'}
                                </p>
                                <div className="flex items-center gap-1">
                                    <div className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full ${activeWordIndex !== -1 ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`} />
                                    <span className="text-[10px] md:text-[11px] font-bold text-slate-600 tracking-tight">Assistant</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-x-1.5 gap-y-2 mb-6 min-h-[80px] md:min-h-[120px]">
                            {words.map((word, i) => (
                                <span key={i} onClick={() => fetchWordDefinition(word)}
                                    className={`text-base md:text-xl font-semibold cursor-pointer px-1 py-0.5 rounded-md transition-all ${activeWordIndex === i ? "text-white bg-gradient-to-r from-blue-500 to-blue-700 shadow-md scale-105 ring-2 ring-blue-100" : "text-slate-700 hover:text-blue-600 hover:bg-blue-50"}`}>
                                    {word}
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-2 md:gap-3 pt-4 border-t border-slate-50">
                            <button onClick={handleSpeakText} className="flex items-center gap-2 px-4 md:px-6 py-2 bg-blue-600 text-white rounded-xl font-bold text-xs md:text-sm hover:bg-blue-700 transition-all active:scale-95 shadow-md">
                                <Volume2 size={16} /> Dinlə
                            </button>
                            <button className="flex-1 py-2 px-4 rounded-xl font-bold text-xs md:text-sm bg-slate-900 text-white hover:bg-slate-800 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md">
                                <Mic size={16} /> Tələffüz
                            </button>
                            <button className="p-2 bg-slate-50 text-slate-400 rounded-xl border border-slate-100"><RefreshCw size={16} /></button>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-4 bg-white border border-slate-100 rounded-[20px] md:rounded-[25px] p-5 md:p-7 shadow-sm flex flex-col min-h-[250px]">
                    <div className="flex items-center gap-2 mb-4 md:mb-6 pb-2 md:pb-3 border-b border-slate-50">
                        <Search size={14} className="text-blue-600" />
                        <h3 className="font-black text-slate-800 text-[9px] md:text-[10px] uppercase tracking-widest">Ağıllı Lüğət</h3>
                    </div>

                    {isLoading ? (
                        <div className="flex-1 flex flex-col items-center justify-center">
                            <Loader2 size={24} className="animate-spin text-blue-600 mb-2" />
                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Axtarılır</span>
                        </div>
                    ) : wordData ? (
                        <div className="animate-in fade-in slide-in-from-right-2">
                            {wordData.error ? <p className="text-rose-500 font-bold text-center py-6 text-xs">{wordData.error}</p> : (
                                <>
                                    <div className="flex justify-between items-start mb-3 md:mb-4">
                                        <div>
                                            <h4 className="text-lg md:text-xl font-black text-slate-900 capitalize leading-tight">{wordData.word}</h4>
                                            <p className="text-blue-500 text-[10px] md:text-xs font-bold mt-1">{wordData.phonetic}</p>
                                        </div>
                                        {wordData.audio && (
                                            <button onClick={() => new Audio(wordData.audio).play()} className="p-1.5 md:p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                                                <Play size={10} fill="currentColor" />
                                            </button>
                                        )}
                                    </div>
                                    <div className="p-3 md:p-4 bg-slate-50 rounded-xl italic text-slate-600 text-xs md:text-sm border border-slate-100 shadow-inner leading-snug">
                                        "{wordData.definition}"
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center opacity-40 text-center py-8">
                            <Search size={28} className="mb-2 text-slate-200" />
                            <p className="text-[9px] font-bold px-4 text-slate-500 uppercase tracking-widest leading-loose">Sözün mənasını görmək üçün mətndən bir söz seçin</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AudioPractice;