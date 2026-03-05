import { useState } from "react";
import { BookOpenCheck, Menu, X, Bell, ChevronRight } from "lucide-react";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeNav, setActiveNav] = useState("Ana Səhifə");

    const navItems = [
        { label: "Ana Səhifə" },
        { label: "Dərslər", badge: "9+" },
        { label: "Oyunlar" },
        { label: "Liderboard" },
    ];

    return (
        <>
            <header className="w-full bg-white border-b border-slate-100 shadow-[0_2px_20px_rgba(28,63,170,0.06)] sticky top-0 z-50 font-sans">

                <div className="px-8 md:px-16 lg:px-20">
                    <div className="flex items-center justify-between h-18 lg:h-24 gap-2">
                        <div className="flex items-center gap-2 select-none shrink-0">
                            <div className="w-8 h-8 lg:w-11 lg:h-11 rounded-lg lg:rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-200/50">
                                <BookOpenCheck className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
                            </div>
                            <span className="text-base lg:text-xl font-black text-slate-800 tracking-tight">
                                Lang<span className="text-blue-500">Learn</span>
                            </span>
                        </div>

                        <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 mx-2">
                            {navItems.map((item) => (
                                <button key={item.label} onClick={() => setActiveNav(item.label)} className={`px-3 lg:px-5 py-2 rounded-xl text-[11px] lg:text-sm font-bold transition-all whitespace-nowrap ${activeNav === item.label ? "bg-blue-50 text-blue-600" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"}`}>
                                    {item.label}
                                    {item.badge && (
                                        <span className="ml-1 text-[9px] bg-blue-500 text-white px-1.5 py-0.5 rounded-full font-black">
                                            {item.badge}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </nav>

                        <div className="flex items-center gap-2 lg:gap-3 shrink-0">

                            <div className="hidden md:flex items-center gap-3 lg:gap-4 pl-4 lg:pl-6">
                                <button className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-500 transition-all relative">
                                    <Bell size={18} />
                                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                                </button>
                                <div className="w-9 h-9 lg:w-11 lg:h-11 rounded-xl bg-slate-900 flex items-center justify-center text-white text-xs font-black shadow-md cursor-pointer hover:scale-105 transition-transform">
                                    AB
                                </div>
                            </div>

                            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 transition-all active:scale-90">
                                {menuOpen ? <X size={22} /> : <Menu size={22} />}
                            </button>
                        </div>
                    </div>
                </div>

                {menuOpen && (
                    <div className="md:hidden bg-white border-t border-slate-100 absolute w-full left-0 shadow-2xl z-[60] animate-in slide-in-from-top duration-300">
                        <div className="p-5 space-y-6">
                            <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-xs">AB</div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-800 leading-none">Anar Bağırov</h4>
                                        <span className="text-[10px] text-blue-500 font-black uppercase mt-1 inline-block tracking-widest">Tələbə</span>
                                    </div>
                                </div>
                                <button className="relative w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500">
                                    <Bell size={18} />
                                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                                </button>
                            </div>

                            <div className="space-y-1 pb-4">
                                {navItems.map((item) => (
                                    <button key={item.label} onClick={() => { setActiveNav(item.label); setMenuOpen(false); }} className={`w-full flex items-center justify-between px-4 py-4 rounded-2xl text-sm font-bold transition-all ${activeNav === item.label ? "bg-blue-600 text-white shadow-lg shadow-blue-100" : "text-slate-600 hover:bg-slate-50"}`}>
                                        <span>{item.label}</span>
                                        <ChevronRight size={18} className={activeNav === item.label ? "text-white/70" : "text-slate-300"} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
}

export default Header;