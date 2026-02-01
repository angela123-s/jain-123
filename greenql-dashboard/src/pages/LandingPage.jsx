import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, server, smartphone, zap } from 'lucide-react';
import { Smartphone, Server, Zap, ShieldCheck } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            {/* Navigation */}
            <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 py-4 px-6 fixed w-full top-0 z-50">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="bg-emerald-500 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shadow-lg shadow-emerald-500/20">A</div>
                        <span className="text-xl font-extrabold tracking-tighter text-slate-900 uppercase">Green QL</span>
                    </div>
                    <Link to="/login" className="px-6 py-2 text-sm font-bold text-white bg-slate-900 rounded-full hover:bg-black transition-all hover:scale-105 shadow-md">
                        Login
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="flex-1 flex flex-col justify-center items-center pt-24 pb-12 px-6 text-center ring-1 ring-inset ring-slate-200">
                <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 font-bold text-[10px] uppercase tracking-widest rounded-full border border-emerald-100 shadow-sm">
                        Enterprise Data Efficiency
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black tracking-tight text-slate-900 leading-none">
                        Eliminate <br className="hidden md:block" />
                        <span className="text-emerald-500">
                            Data Excess.
                        </span>
                    </h1>

                    <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
                        Green QL is the foundations of GraphQL optimization. Streamline your data flow, slashing payloads by up to 98% while reducing your infrastructure's environmental footprint.
                    </p>

                    <div className="pt-6">
                        <Link to="/login" className="inline-flex items-center gap-3 px-10 py-5 text-lg font-black text-white bg-slate-900 rounded-full hover:bg-black transition-all hover:scale-105 shadow-xl shadow-slate-200">
                            Go to Console <ArrowRight className="h-5 w-5" />
                        </Link>
                    </div>
                </div>

                {/* Visual Flow Diagram */}
                <div className="mt-24 w-full max-w-5xl mx-auto pb-20">
                    <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-12">Architecture Overview</h2>

                    <div className="relative flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 p-12 bg-white rounded-[40px] shadow-2xl shadow-slate-200 border border-slate-100">

                        {/* Step 1: Client */}
                        <div className="flex flex-col items-center gap-6 z-10 transition-transform hover:scale-110 duration-300">
                            <div className="w-20 h-20 bg-slate-50 rounded-[24px] flex items-center justify-center border border-slate-100 shadow-sm">
                                <Smartphone className="h-10 w-10 text-slate-400" />
                            </div>
                            <div className="text-center">
                                <h3 className="font-bold text-slate-900">Mobile Node</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Query Dispatch</p>
                            </div>
                        </div>

                        {/* Arrow 1 */}
                        <div className="hidden md:flex flex-1 items-center justify-center relative">
                            <div className="h-[2px] w-full bg-slate-100"></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 bg-white border border-slate-100 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                Standard GQL
                            </div>
                        </div>

                        {/* Step 2: Green QL Optimizer */}
                        <div className="flex flex-col items-center gap-6 z-10 scale-125">
                            <div className="w-24 h-24 bg-emerald-50 rounded-[32px] flex items-center justify-center border-2 border-emerald-500 shadow-[0_20px_40px_rgba(16,185,129,0.2)]">
                                <ShieldCheck className="h-12 w-12 text-emerald-600" />
                            </div>
                            <div className="text-center">
                                <h3 className="font-bold text-slate-900">Green QL Optimizer</h3>
                                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">Data Filtered</p>
                            </div>
                        </div>

                        {/* Arrow 2 */}
                        <div className="hidden md:flex flex-1 items-center justify-center relative">
                            <div className="h-[2px] w-full bg-slate-100"></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 bg-white border border-slate-100 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                Optimized Stream
                            </div>
                        </div>

                        {/* Step 3: Server */}
                        <div className="flex flex-col items-center gap-6 z-10 transition-transform hover:scale-110 duration-300">
                            <div className="w-20 h-20 bg-slate-50 rounded-[24px] flex items-center justify-center border border-slate-100 shadow-sm">
                                <Server className="h-10 w-10 text-slate-400" />
                            </div>
                            <div className="text-center">
                                <h3 className="font-bold text-slate-900">Core Engine</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Payload Origin</p>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <footer className="py-10 text-center bg-slate-900 text-slate-400 text-xs font-bold uppercase tracking-widest">
                © 2026 GREEN QL FOUNDATION. ENGINEERED FOR SUSTAINABILITY.
            </footer>
        </div>
    );
};

export default LandingPage;
