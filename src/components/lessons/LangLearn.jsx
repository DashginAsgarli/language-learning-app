import { useState } from "react";
import { BookText, Clock, Star } from 'lucide-react';
import LangLearnView from "./LangLearnView";
import langData from "../../data/languages.json";

function LangLearn() {
    const [lessons] = useState(langData.grammarLessons);
    const [activeLesson, setActiveLesson] = useState(null);

    if (activeLesson) {
        return (
            <LangLearnView lesson={activeLesson} onBack={() => setActiveLesson(null)} />
        );
    }

    return (
        <div className=" px-8 md:px-16 lg:px-20 my-8 p-10 bg-[#f4f7ff] border border-blue-100 shadow-[0_15px_40px_rgba(28,63,170,0.08)] rounded-[25px] relative overflow-hidden">
            <div className="text-center mb-12 relative z-10">
                <h2 className="text-[1.7rem] md:text-[2.8rem] font-bold text-[#1e293b] flex items-center justify-center gap-4 mb-3">
                    <BookText className="text-slate-800 w-7 h-7 md:w-10 md:h-10" /> İngilis Qrammatikası
                </h2>
                <p className="text-[#475569] text-[0.8rem] md:text-[1.2rem] font-medium max-w-[600px] mx-auto leading-relaxed">
                    Təməl qrammatika qaydalarını interaktiv şəkildə öyrənin
                </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.8rem] mb-12">
                {lessons.map((lesson) => (
                    <div key={lesson.id} onClick={() => setActiveLesson(lesson)} className="group relative flex flex-col min-h-[280px] p-[1.8rem] bg-white border border-slate-200 rounded-[18px] cursor-pointer transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:-translate-y-2 hover:border-[#1c4ed8]/40 hover:shadow-[0_20px_40px_rgba(28,63,170,0.12)] overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-800 to-[#3b82f6] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />

                        <div className="flex justify-between items-start mb-6">
                            <div className="flex gap-[0.6rem] flex-wrap">
                                <span className="bg-[#eff6ff] text-[#1e40af] border border-[#dbeafe] px-[0.8rem] py-[0.3rem] rounded-[15px] text-[0.8rem] font-bold uppercase tracking-wider">
                                    {lesson.level}
                                </span>
                                <span className="bg-[#f0fdf4] text-[#166534] border border-[#dcfce7] px-[0.8rem] py-[0.3rem] rounded-[15px] text-[0.8rem] font-bold">
                                    {lesson.category}
                                </span>
                            </div>
                        </div>

                        <div className="flex-1 mb-6">
                            <h3 className="text-[#0f172a] text-[1.5rem] font-bold leading-[1.3] mb-4 min-h-[3.5rem] group-hover:text-slate-800 transition-colors">
                                {lesson.title}
                            </h3>
                            <p className="text-[#64748b] text-[0.95rem] leading-[1.6] line-clamp-3 mb-5 font-normal">
                                {lesson.content.description.slice(0, 80)}...
                            </p>

                            <div className="flex gap-[1.2rem] text-[#64748b] text-[0.9rem] mt-auto font-bold">
                                <span className="flex items-center gap-[0.4rem]">
                                    <Clock size={16} className="text-[#2563eb]" /> {lesson.duration} dəq
                                </span>
                                <span className="flex items-center gap-[0.4rem]">
                                    <Star size={16} className="text-[#d97706] fill-[#f59e0b]" /> {lesson.points} XP
                                </span>
                            </div>
                        </div>

                        <div className="text-center mt-auto">
                            <button onClick={(e) => { setActiveLesson(lesson); }} className="relative z-20 w-full py-[0.8rem] px-8 bg-slate-800 text-white rounded-[15px] font-bold text-[0.95rem] overflow-hidden transition-all duration-300 hover:bg-[#1c39bb] hover:-translate-y-[2px] hover:shadow-lg hover:shadow-blue-700/20 active:scale-95 group/btn">
                                Dərsə Başla
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LangLearn;