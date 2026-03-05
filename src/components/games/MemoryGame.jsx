import React, { useState, useEffect } from 'react';
import { Brain, RefreshCw, Star, Trophy, Sparkles } from 'lucide-react';

const WORDS_DATA = [
  { id: 1, word: "Sun", az: "Günəş" },
  { id: 2, word: "Moon", az: "Ay" },
  { id: 3, word: "Star", az: "Ulduz" },
  { id: 4, word: "Cloud", az: "Bulud" },
  { id: 5, word: "Tree", az: "Ağac" },
  { id: 6, word: "Flower", az: "Gül" },
];

const MemoryGame = () => {
  const [cards, setCards] = useState([]); 
  const [openIndices, setOpenIndices] = useState([]); 
  const [matchedIds, setMatchedIds] = useState([]); 

  const startGame = () => {
    const allCards = [...WORDS_DATA, ...WORDS_DATA]
      .sort(() => Math.random() - 0.5);
    setCards(allCards);
    setOpenIndices([]);
    setMatchedIds([]);
  };

  useEffect(() => { startGame(); }, []);

  const handleCardClick = (index) => {
    if (openIndices.length === 2 || openIndices.includes(index) || matchedIds.includes(cards[index].id)) return;

    const newOpen = [...openIndices, index];
    setOpenIndices(newOpen);

    if (newOpen.length === 2) {
      if (cards[newOpen[0]].id === cards[newOpen[1]].id) {
        setMatchedIds(prev => [...prev, cards[newOpen[0]].id]);
        setOpenIndices([]);
      } else {
        setTimeout(() => setOpenIndices([]), 800);
      }
    }
  };

  return (
    <div className="mt-6 max-w-sm mx-auto p-5 rounded-[32px] bg-gradient-to-b from-white to-slate-50 border border-slate-200 shadow-2xl relative overflow-hidden font-sans">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <Brain size={22} className="text-blue-500" /> LİNQVO
          </h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Yaddaşını yoxla</p>
        </div>
        <button 
          onClick={startGame} 
          className="p-2.5 bg-white shadow-md rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-90 border border-slate-100"
        >
          <RefreshCw size={20} />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {cards.map((card, index) => {
          const isFlipped = openIndices.includes(index) || matchedIds.includes(card.id);
          
          return (
            <div key={index} className="h-24" style={{ perspective: '1000px' }}>
              <div
                onClick={() => handleCardClick(index)}
                className="relative w-full h-full cursor-pointer transition-transform duration-700"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-white border border-slate-200 rounded-2xl shadow-sm"
                  style={{ backfaceVisibility: 'hidden', zIndex: 2 }}
                >
                  <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center">
                    <Star size={18} className="text-slate-300 fill-slate-300" />
                  </div>
                </div>

                <div 
                  className="absolute inset-0 flex flex-col items-center justify-center bg-blue-600 border-2 border-blue-400 rounded-2xl shadow-blue-200 shadow-inner"
                  style={{ 
                    backfaceVisibility: 'hidden', 
                    transform: 'rotateY(180deg)',
                    zIndex: 1
                  }}
                >
                  <Sparkles size={12} className="text-blue-300 absolute top-2 right-2 opacity-50" />
                  <p className="font-black text-white text-[11px] uppercase tracking-tighter leading-none">{card.word}</p>
                  <div className="mt-1.5 h-[1px] w-8 bg-blue-400/50" />
                  <p className="text-[9px] text-blue-100 font-medium mt-1 uppercase italic">{card.az}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {matchedIds.length === WORDS_DATA.length && (
        <div className="mt-6 p-4 bg-slate-900 rounded-[24px] text-center shadow-2xl animate-in fade-in zoom-in duration-500">
          <div className="flex justify-center mb-2">
            <Trophy size={28} className="text-yellow-400" />
          </div>
          <p className="text-white font-black text-sm uppercase tracking-widest">Möhtəşəm!</p>
          <p className="text-slate-400 text-[10px] mt-1 font-bold">BÜTÜN SÖZLƏRİ TAPDIN</p>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;