import React, { useState, useEffect } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell
} from 'recharts';
import {
    Zap, Server, Smartphone, Leaf, RotateCw, Activity, Database, CheckCircle, AlertTriangle
} from 'lucide-react';

// --- MOCK DATA SIMULATION ---
const FULL_PAYLOAD = {
    data: {
        user: {
            id: "u-83920",
            name: "Angela Mariya",
            email: "angela@example.com",
            phone: "+1-555-010-9988",
            address: {
                street: "123 Tech Blvd",
                city: "San Francisco",
                state: "CA",
                zip: "94107"
            },
            posts: Array.from({ length: 15 }).map((_, i) => ({
                id: `p-${i}`,
                title: `GraphQL Optimization Post #${i + 1}`,
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
                likes: Math.floor(Math.random() * 500),
                comments: []
            })),
            settings: {
                theme: "dark",
                notifications: true
            }
        }
    }
};

const OPTIMIZED_PAYLOAD = {
    data: {
        user: {
            name: "Angela Mariya",
            email: "angela@example.com"
        }
    }
};

const DashboardPage = () => {
    const [isOptimized, setIsOptimized] = useState(false);
    const [loading, setLoading] = useState(false);
    const [metrics, setMetrics] = useState({
        size: 25.4, // KB
        latency: 240, // ms
        co2: 0.15, // g
        savings: 0 // %
    });
    const [responseJson, setResponseJson] = useState(JSON.stringify(FULL_PAYLOAD, null, 2));

    // Update logic when toggle changes
    useEffect(() => {
        simulateFetch();
    }, [isOptimized]);

    const simulateFetch = () => {
        setLoading(true);

        // Determine target values based on mode
        const targetSize = isOptimized ? 0.35 : 25.4;
        const targetLatency = isOptimized ? 65 : 240;
        const targetCo2 = isOptimized ? 0.002 : 0.15;
        const targetJson = isOptimized ? OPTIMIZED_PAYLOAD : FULL_PAYLOAD;

        // Simulate Network Delay
        const delay = isOptimized ? 600 : 1200;

        setTimeout(() => {
            setMetrics({
                size: targetSize,
                latency: targetLatency,
                co2: targetCo2,
                savings: isOptimized ? 98 : 0
            });
            setResponseJson(JSON.stringify(targetJson, null, 2));
            setLoading(false);
        }, delay);
    };

    const chartData = [
        { name: 'Response Size (KB)', value: metrics.size, full: 30 },
        { name: 'Latency (ms)', value: metrics.latency, full: 300 }
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            {/* Navbar */}
            <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-emerald-500 p-2 rounded-lg shadow-lg shadow-emerald-500/20">
                            <div className="text-white font-black leading-none">A</div>
                        </div>
                        <h1 className="font-black text-xl text-slate-900 tracking-tighter uppercase">GREEN QL <span className="text-slate-400 font-medium">CONSOLE</span></h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex flex-col items-end">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Node</span>
                            <span className="text-xs text-emerald-600 font-mono font-bold">hackathon-rqpy.onrender.com</span>
                        </div>
                        <div className="h-10 w-10 bg-slate-900 rounded-xl flex items-center justify-center text-white text-xs font-black ring-2 ring-slate-100 shadow-sm">
                            AM
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-1 max-w-7xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* LEFT COLUMN - Controls & Response */}
                <div className="lg:col-span-4 space-y-6">

                    {/* Card: Control Panel */}
                    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Database className="h-4 w-4" />
                                Optimization Control
                            </h2>
                            {loading && <RotateCw className="h-4 w-4 text-emerald-500 animate-spin" />}
                        </div>

                        {/* Toggle Switch */}
                        <div className="bg-slate-50 p-1.5 rounded-2xl mb-8 flex relative border border-slate-100">
                            <button
                                onClick={() => !loading && setIsOptimized(false)}
                                className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${!isOptimized ? 'bg-white text-rose-500 shadow-sm ring-1 ring-slate-100' : 'text-slate-400 hover:text-slate-900'}`}
                            >
                                RAW STREAM
                            </button>
                            <button
                                onClick={() => !loading && setIsOptimized(true)}
                                className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${isOptimized ? 'bg-white text-emerald-500 shadow-sm ring-1 ring-slate-100' : 'text-slate-400 hover:text-slate-900'}`}
                            >
                                GREEN QL MODE
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Query Definitions</label>
                                <div className="bg-slate-900 text-emerald-400 font-mono text-xs p-5 rounded-2xl shadow-inner leading-relaxed">
                                    <span className="text-purple-400">query</span> GetUserProfile {'{'} <br />
                                    &nbsp;&nbsp;user {'{'} <br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;id <br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;name <br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;email <br />
                                    &nbsp;&nbsp;{'}'} <br />
                                    {'}'}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card: Response Preview */}
                    <div className="bg-slate-900 rounded-3xl shadow-2xl flex flex-col h-[520px] overflow-hidden border border-slate-800">
                        <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50 backdrop-blur-xl sticky top-0">
                            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">GREENQL_RESPONSE_STREAM_V1</h3>
                            <span className={`text-[9px] px-2.5 py-1 rounded-full font-black uppercase tracking-tighter ${isOptimized ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'}`}>
                                {isOptimized ? 'Filtered' : 'Raw_Node'}
                            </span>
                        </div>
                        <div className="flex-1 overflow-auto p-6 relative bg-slate-950/30">
                            {loading && (
                                <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                                    <RotateCw className="h-8 w-8 text-emerald-500 animate-spin mb-4" />
                                    <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Synchronizing Stream...</div>
                                </div>
                            )}
                            <pre className={`font-mono text-xs leading-relaxed ${isOptimized ? 'text-emerald-400' : 'text-slate-400'}`}>
                                {responseJson}
                            </pre>
                        </div>
                    </div>

                </div>

                {/* RIGHT COLUMN - Metrics & Charts */}
                <div className="lg:col-span-8 space-y-8">

                    {/* Metrics Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Metric 1 */}
                        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
                            <div className={`absolute -top-4 -right-4 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-all duration-500 ${isOptimized ? 'text-emerald-500' : 'text-rose-500'}`}>
                                <Server className="h-24 w-24 rotate-12" />
                            </div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Payload Weight</p>
                            <h3 className="text-4xl font-black text-slate-900 tracking-tighter flex items-end gap-1">
                                {metrics.size} <span className="text-sm text-slate-300 font-bold mb-1.5 uppercase tracking-normal font-sans">kb</span>
                            </h3>
                            {isOptimized && (
                                <div className="flex items-center gap-1.5 text-[10px] font-black text-emerald-600 bg-emerald-50 w-fit px-3 py-1 rounded-full mt-4 border border-emerald-100">
                                    <Leaf className="h-3 w-3" /> 98% RECOVERY
                                </div>
                            )}
                        </div>

                        {/* Metric 2 */}
                        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
                            <div className="absolute -top-4 -right-4 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-all duration-500 text-blue-500">
                                <Activity className="h-24 w-24 -rotate-12" />
                            </div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Response Time</p>
                            <h3 className="text-4xl font-black text-slate-900 tracking-tighter flex items-end gap-1">
                                {metrics.latency} <span className="text-sm text-slate-300 font-bold mb-1.5 uppercase tracking-normal font-sans">ms</span>
                            </h3>
                            <div className={`text-[10px] font-black mt-4 uppercase tracking-widest ${isOptimized ? 'text-emerald-500' : 'text-rose-400'}`}>
                                {isOptimized ? '⚡ High Priority' : '⚠️ Throttled'}
                            </div>
                        </div>

                        {/* Metric 3 */}
                        <div className="bg-slate-900 p-8 rounded-[32px] shadow-2xl relative overflow-hidden group border-b-8 border-emerald-500">
                            <div className="absolute -top-4 -right-4 p-8 opacity-10 text-emerald-400">
                                <Leaf className="h-24 w-24" />
                            </div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Green QL Score</p>
                            <h3 className="text-4xl font-black text-white tracking-tighter flex items-end gap-1">
                                {isOptimized ? '9.8' : '1.2'} <span className="text-sm text-slate-500 font-bold mb-1.5 uppercase tracking-normal font-sans">/ 10</span>
                            </h3>
                            <p className="text-[10px] font-black text-emerald-500/60 mt-4 uppercase tracking-widest">Sustainability Index</p>
                        </div>
                    </div>

                    {/* Charts Area */}
                    <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/60">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h3 className="text-lg font-black text-slate-900 tracking-tight">Performance Delta Analysis</h3>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Real-time Node Comparison</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase">
                                    <div className="w-2.5 h-2.5 rounded-sm bg-slate-200"></div> RAW
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase">
                                    <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></div> GREEN QL
                                </div>
                            </div>
                        </div>

                        <div className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} barSize={60}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 800 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 800 }} />
                                    <RechartsTooltip
                                        cursor={{ fill: '#F8FAFC' }}
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)', padding: '16px' }}
                                    />
                                    <Bar dataKey="value" radius={[12, 12, 12, 12]} animationDuration={1500}>
                                        {
                                            chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={isOptimized ? '#10B981' : '#F1F5F9'} />
                                            ))
                                        }
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Pro Insight Footer */}
                    <div className="bg-emerald-500 rounded-[32px] p-8 text-white flex items-center justify-between shadow-xl shadow-emerald-500/20">
                        <div className="flex items-center gap-6">
                            <div className="p-4 bg-white/20 rounded-[24px] backdrop-blur-md">
                                <CheckCircle className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <h4 className="text-xl font-black tracking-tight leading-tight">Green QL Protocol Active</h4>
                                <p className="text-emerald-100 text-sm font-bold opacity-80 mt-1 uppercase tracking-widest">Efficiency threshold maintained at 98.4%</p>
                            </div>
                        </div>
                        <div className="hidden md:block text-right">
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest block mb-1">Infrastructure Load</span>
                            <span className="text-2xl font-black tabular-nums">-{metrics.savings}%</span>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default DashboardPage;
