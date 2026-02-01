import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Zap } from 'lucide-react';

const LoginPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate auth delay
        setTimeout(() => {
            navigate('/dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 font-sans">
            <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl shadow-slate-200 overflow-hidden border border-slate-100 italic-none">

                {/* Header */}
                <div className="bg-slate-900 p-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500 rounded-3xl mb-6 shadow-xl shadow-emerald-500/30">
                        <span className="text-white text-3xl font-black">A</span>
                    </div>
                    <h2 className="text-3xl font-black text-white tracking-tighter uppercase">GREEN QL <span className="text-slate-500">AUTH</span></h2>
                    <p className="text-slate-400 mt-2 text-xs font-bold uppercase tracking-widest">Foundations of Data Efficiency</p>
                </div>

                {/* Form */}
                <div className="p-10">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Identity Stream</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                                <input
                                    type="email"
                                    defaultValue="engineer@greenql.io"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all font-medium text-slate-600 shadow-inner"
                                    placeholder="name@company.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Secure Key</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                                <input
                                    type="password"
                                    defaultValue="••••••••"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all font-medium text-slate-600 shadow-inner"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`w-full py-5 px-4 bg-slate-900 hover:bg-black text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-slate-200 transition-all active:scale-95 flex justify-center items-center ${loading ? 'opacity-70 cursor-wait' : ''}`}
                            disabled={loading}
                        >
                            {loading ? (
                                <RotateCw className="h-4 w-4 animate-spin" />
                            ) : (
                                <span>Initialize Console</span>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-[10px] font-black text-slate-300 uppercase tracking-widest leading-loose">
                        Unordered Access Terminal <br />
                        Secure Session V4.0.2
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
