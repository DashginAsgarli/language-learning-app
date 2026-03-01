import { useState } from "react";
import {
    ArrowLeft, Lightbulb, AlertTriangle,
    PenTool, BookOpen, XCircle, ChevronRight, ChevronLeft,
    Clock, Star, CheckCircle2, ListChecks, Info, RotateCcw
} from 'lucide-react';

function LangLearnView({ lesson, onBack, onComplete, isCompleted }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);

    if (!lesson) return null;

    const practice = lesson.content.practice;
    const isLastQuestion = currentQuestionIndex === practice.length - 1;

    const handleAnswer = (value) => {
        if (showResult) return;
        setAnswers({ ...answers, [currentQuestionIndex]: value });
    };

    const nextQuestion = () => {
        if (!isLastQuestion) setCurrentQuestionIndex(prev => prev + 1);
    };

    const prevQuestion = () => {
        if (currentQuestionIndex > 0) setCurrentQuestionIndex(prev => prev - 1);
    };

    const checkFinalScore = () => {
        let correctCount = 0;
        practice.forEach((q, idx) => {
            if (answers[idx] === q.correct) correctCount++;
        });
        setScore(correctCount);
        setShowResult(true);

        if (!isCompleted && correctCount === practice.length) {
            onComplete?.(lesson.id);
        }
    };

    const resetQuiz = () => {
        setAnswers({});
        setCurrentQuestionIndex(0);
        setShowResult(false);
        setScore(0);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900 font-sans p-3 md:p-15">
            <div className=" mx-auto">
                <button onClick={onBack} className="group mb-4 md:mb-8 flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-800 hover:text-white text-slate-700 border border-slate-200 rounded-xl transition-all duration-300 font-bold text-xs md:text-sm shadow-sm">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    DƏRSLƏRƏ QAYIT
                </button>

                <div className="flex flex-col gap-4 md:gap-8">
                    <div className="relative overflow-hidden p-5 md:p-10 rounded-[24px] md:rounded-[32px] bg-white border border-slate-200 shadow-xl">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-slate-800 to-[#3b82f6]"></div>

                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="px-2 py-0.5 rounded-md bg-slate-800 text-white text-[9px] font-black uppercase tracking-widest">
                                {lesson.category}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-blue-50 text-[#3b82f6] border border-blue-100 text-[9px] font-black uppercase tracking-widest">
                                {lesson.level}
                            </span>
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-600 border border-amber-100 text-[9px] font-black uppercase">
                                <Clock size={10} /> {lesson.duration}
                            </span>
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-50 text-purple-600 border border-purple-100 text-[9px] font-black uppercase">
                                <Star size={10} /> {lesson.points} XP
                            </span>
                        </div>

                        <h1 className="text-2xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 leading-tight">
                            {lesson.title}
                        </h1>

                        <div className="flex items-start gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <Info className="text-blue-500 shrink-0 mt-0.5" size={16} />
                            <p className="text-sm md:text-lg leading-relaxed text-slate-600 italic">
                                {lesson.content.description}
                            </p>
                        </div>
                    </div>

                    {!showResult && (
                        <>
                            <section className="p-5 md:p-8 rounded-[20px] md:rounded-[24px] bg-slate-800 text-white shadow-xl">
                                <h3 className="flex items-center gap-2 text-sm md:text-lg font-bold mb-4 opacity-90">
                                    <Lightbulb size={18} className="text-amber-400" /> Formula
                                </h3>
                                <div className="p-4 bg-slate-700/50 rounded-xl border border-slate-600">
                                    <code className="text-base md:text-2xl font-mono text-blue-300 font-bold block break-words">
                                        {lesson.content.formula}
                                    </code>
                                </div>
                            </section>

                            <section className="p-5 md:p-8 rounded-[20px] bg-white border border-slate-200 shadow-sm">
                                <h3 className="flex items-center gap-2 text-lg font-bold mb-4 text-slate-800">
                                    <ListChecks size={20} className="text-green-500" /> Əsas Qaydalar
                                </h3>
                                <div className="grid gap-2">
                                    {lesson.content.rules?.map((rule, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-3 bg-green-50/50 rounded-xl border border-green-100 text-slate-700 text-sm md:text-base">
                                            <div className="h-1.5 w-1.5 rounded-full bg-green-400 shrink-0" />
                                            <span className="font-medium">{rule}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="p-5 md:p-8 rounded-[20px] bg-white border border-slate-200 shadow-sm">
                                <h3 className="flex items-center gap-2 text-lg font-bold mb-4 text-slate-800">
                                    <BookOpen size={20} className="text-[#3b82f6]" /> Praktik Nümunələr
                                </h3>
                                <ul className="grid gap-2">
                                    {lesson.content.examples.map((ex, idx) => (
                                        <li key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-sm md:text-base">
                                            <CheckCircle2 size={16} className="text-[#3b82f6] mt-0.5 shrink-0" />
                                            <span className="font-medium">{ex}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            <section className="p-5 md:p-8 rounded-[20px] bg-red-50/50 border border-red-100">
                                <h3 className="flex items-center gap-2 text-lg font-bold mb-4 text-red-700">
                                    <AlertTriangle size={20} /> Diqqət yetirin
                                </h3>
                                <div className="space-y-2">
                                    {lesson.content.commonMistakes.map((m, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-red-200 text-sm">
                                            <XCircle size={16} className="text-red-500 shrink-0" />
                                            <span className="text-slate-700 font-medium">{m}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </>
                    )}

                    <section className="p-5 md:p-8 rounded-[24px]  bg-white border border-slate-200  mb-8">
                        {!showResult ? (
                            <>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="flex items-center gap-2 text-xl md:text-2xl font-black text-slate-800 uppercase italic">
                                        <PenTool size={20} className="text-[#3b82f6]" /> Məşq
                                    </h3>
                                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-full uppercase tracking-tighter">
                                        Sual {currentQuestionIndex + 1}/{practice.length}
                                    </span>
                                </div>

                                <div className="mb-6">
                                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-slate-800 to-[#3b82f6] transition-all duration-500"
                                            style={{ width: `${((currentQuestionIndex + 1) / practice.length) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="min-h-[180px] md:min-h-[250px]">
                                    <p className="text-lg md:text-xl font-bold text-slate-800 mb-6 leading-snug">
                                        {practice[currentQuestionIndex].question}
                                    </p>

                                    <div className="grid gap-2 md:gap-3">
                                        {practice[currentQuestionIndex].options.map((opt, oIdx) => {
                                            const isSelected = answers[currentQuestionIndex] === opt;
                                            return (
                                                <button
                                                    key={oIdx}
                                                    onClick={() => handleAnswer(opt)}
                                                    className={`w-full text-left p-4 rounded-xl border-2 transition-all text-sm md:text-base font-bold ${isSelected
                                                        ? "bg-slate-800 border-slate-800 text-white shadow-md transform -translate-y-0.5"
                                                        : "bg-slate-50 border-slate-200 text-slate-600 active:bg-blue-50"
                                                        }`}
                                                >
                                                    {opt}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-8 pt-6 border-t border-slate-100">
                                    <button
                                        onClick={prevQuestion}
                                        disabled={currentQuestionIndex === 0}
                                        className="flex-1 flex items-center justify-center gap-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold text-xs disabled:opacity-30 transition-all"
                                    >
                                        <ChevronLeft size={16} /> GERİ
                                    </button>

                                    {!isLastQuestion ? (
                                        <button
                                            onClick={nextQuestion}
                                            disabled={!answers[currentQuestionIndex]}
                                            className="flex-[2] flex items-center justify-center gap-1 py-3 bg-slate-800 text-white rounded-xl font-bold text-xs disabled:opacity-50 transition-all"
                                        >
                                            NÖVBƏTİ <ChevronRight size={16} />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={checkFinalScore}
                                            disabled={!answers[currentQuestionIndex]}
                                            className="flex-[2] py-3 bg-gradient-to-r from-slate-800 to-[#3b82f6] text-white rounded-xl font-black text-xs tracking-widest shadow-lg"
                                        >
                                            BİTİR
                                        </button>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="p-1 md:p-6 text-center">
                                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100">
                                    <Star className="text-[#3b82f6] fill-[#3b82f6]" size={30} />
                                </div>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">DƏRS TAMAMLANDI</p>
                                <div className="text-5xl font-black text-slate-800 mb-6">
                                    {score}<span className="text-xl text-slate-300">/{practice.length}</span>
                                </div>

                                <div className="text-left space-y-3 mb-8">
                                    <h4 className="text-base font-bold text-slate-800 flex items-center gap-2 mb-2">
                                        <ListChecks className="text-blue-500" size={18} /> Təhlil
                                    </h4>

                                    {practice.map((q, idx) => {
                                        const isCorrect = answers[idx] === q.correct;
                                        return (
                                            <div key={idx} className={`p-4 rounded-xl border transition-all ${isCorrect ? 'border-green-100 bg-green-50/20' : 'border-red-100 bg-red-50/20'
                                                }`}>
                                                <div className="flex gap-3">
                                                    <div className="mt-0.5">
                                                        {isCorrect ?
                                                            <CheckCircle2 size={16} className="text-green-500" /> :
                                                            <XCircle size={16} className="text-red-500" />
                                                        }
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-bold text-slate-800 text-sm leading-snug mb-1">{q.question}</p>
                                                        <div className="text-[11px] space-y-0.5">
                                                            <p>
                                                                <span className="text-slate-400">Sizin: </span>
                                                                <span className={isCorrect ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                                                                    {answers[idx] || "—"}
                                                                </span>
                                                            </p>
                                                            {!isCorrect && (
                                                                <p>
                                                                    <span className="text-slate-400">Düzgün: </span>
                                                                    <span className="text-green-600 font-bold">{q.correct}</span>
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <button onClick={resetQuiz} className="flex items-center justify-center gap-2 py-3.5 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm transition-all">
                                        <RotateCcw size={16} /> TƏKRARLA
                                    </button>
                                    <button onClick={onBack} className="flex items-center justify-center gap-2 py-3.5 bg-slate-800 text-white rounded-xl font-black text-sm shadow-lg">
                                        NÖVBƏTİ MƏRHƏLƏ <ChevronRight size={18} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
}

export default LangLearnView;