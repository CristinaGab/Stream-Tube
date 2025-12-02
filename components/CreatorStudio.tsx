import React, { useState } from 'react';
import { generateVideoMetadata, askCreatorSupport } from '../services/geminiService';
import { DollarSign, UploadCloud, ChevronDown, BarChart2 } from './Icons';

export const CreatorStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'monetization' | 'upload'>('monetization');
  const [topic, setTopic] = useState('');
  const [generatedMetadata, setGeneratedMetadata] = useState<{ title: string; description: string } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [supportQuery, setSupportQuery] = useState('');
  const [supportResponse, setSupportResponse] = useState('');
  const [isAsking, setIsAsking] = useState(false);

  // Revenue Simulation
  const grossRevenue = 15420.50;
  const commissionRate = 0.05; // 5%
  const commissionAmount = grossRevenue * commissionRate;
  const netEarnings = grossRevenue - commissionAmount;

  const handleGenerate = async () => {
    if (!topic) return;
    setIsGenerating(true);
    const result = await generateVideoMetadata(topic);
    setGeneratedMetadata(result);
    setIsGenerating(false);
  };

  const handleSupportAsk = async () => {
    if (!supportQuery) return;
    setIsAsking(true);
    const response = await askCreatorSupport(supportQuery);
    setSupportResponse(response);
    setIsAsking(false);
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-4">
        <div className="w-12 h-12 bg-yt-red rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <div className="w-4 h-4 bg-white rounded-md"></div>
        </div>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Creator Studio
        </span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Studio Sidebar */}
        <div className="bg-yt-sidebar/50 backdrop-blur-sm border border-yt-border rounded-[2rem] p-4 h-fit sticky top-24">
          <nav className="space-y-2">
            <button 
                onClick={() => setActiveTab('dashboard')}
                className={`w-full text-left px-5 py-4 rounded-2xl flex items-center gap-3 transition-all duration-300 ${activeTab === 'dashboard' ? 'bg-yt-hover text-white font-bold shadow-inner' : 'text-gray-400 hover:bg-yt-hover/50'}`}
            >
                <BarChart2 className={`w-5 h-5 ${activeTab === 'dashboard' ? 'text-yt-red' : ''}`} /> Dashboard
            </button>
            <button 
                onClick={() => setActiveTab('monetization')}
                className={`w-full text-left px-5 py-4 rounded-2xl flex items-center gap-3 transition-all duration-300 ${activeTab === 'monetization' ? 'bg-yt-hover text-white font-bold shadow-inner' : 'text-gray-400 hover:bg-yt-hover/50'}`}
            >
                <DollarSign className={`w-5 h-5 ${activeTab === 'monetization' ? 'text-green-400' : ''}`} /> Monetization
            </button>
            <button 
                onClick={() => setActiveTab('upload')}
                className={`w-full text-left px-5 py-4 rounded-2xl flex items-center gap-3 transition-all duration-300 ${activeTab === 'upload' ? 'bg-yt-hover text-white font-bold shadow-inner' : 'text-gray-400 hover:bg-yt-hover/50'}`}
            >
                <UploadCloud className={`w-5 h-5 ${activeTab === 'upload' ? 'text-blue-400' : ''}`} /> Content Tools
            </button>
          </nav>
        </div>

        {/* Main Area */}
        <div className="md:col-span-3 space-y-8">
            
          {activeTab === 'monetization' && (
            <div className="space-y-8 animate-fade-in">
              <div className="bg-yt-sidebar border border-yt-border p-8 rounded-[2.5rem] shadow-2xl">
                 <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                        <DollarSign className="text-green-400 w-8 h-8" /> Channel Monetization
                        </h2>
                        <p className="text-gray-400 text-sm">
                        Financial overview for current billing cycle.
                        </p>
                    </div>
                    <div className="px-4 py-2 bg-green-900/20 border border-green-500/30 rounded-xl text-green-400 text-xs font-bold tracking-wider">
                        ACTIVE PARTNER
                    </div>
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                    <div className="bg-yt-base p-6 rounded-3xl border border-yt-border">
                       <p className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-2">Gross Revenue</p>
                       <p className="text-3xl font-bold text-white tracking-tight">${grossRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                    </div>
                    <div className="bg-yt-base p-6 rounded-3xl border border-red-900/30 relative overflow-hidden group">
                       <div className="absolute top-0 right-0 bg-red-600/90 text-[10px] font-bold px-3 py-1 rounded-bl-2xl shadow-lg">PLATFORM FEE</div>
                       <p className="text-red-400 text-xs uppercase font-bold tracking-wider mb-2">Commission (5%)</p>
                       <p className="text-3xl font-bold text-red-400 tracking-tight">-${commissionAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                       <p className="text-[10px] text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Fixed 5% rate applied.</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-900/20 to-yt-base p-6 rounded-3xl border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
                       <p className="text-green-400 text-xs uppercase font-bold tracking-wider mb-2">Net Earnings</p>
                       <p className="text-4xl font-bold text-green-400 tracking-tight">${netEarnings.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                    </div>
                 </div>

                 {/* AI Support for Revenue */}
                 <div className="border-t border-yt-border pt-8">
                    <h3 className="font-bold mb-4 text-lg">Revenue Policy Agent</h3>
                    <div className="flex gap-3">
                      <input 
                        type="text" 
                        value={supportQuery}
                        onChange={(e) => setSupportQuery(e.target.value)}
                        placeholder="Ask about the 5% commission or payout rules..."
                        className="flex-1 bg-yt-base border border-yt-border rounded-2xl px-6 py-3 focus:border-yt-red focus:ring-1 focus:ring-yt-red outline-none transition-all"
                      />
                      <button 
                        onClick={handleSupportAsk}
                        disabled={isAsking}
                        className="bg-yt-red hover:bg-indigo-600 px-6 py-3 rounded-2xl font-bold transition-all disabled:opacity-50 shadow-lg shadow-indigo-500/30"
                      >
                        {isAsking ? 'Thinking...' : 'Ask AI'}
                      </button>
                    </div>
                    {supportResponse && (
                      <div className="mt-6 bg-yt-base p-6 rounded-3xl text-sm text-gray-300 border-l-4 border-yt-red shadow-inner">
                        <span className="font-bold text-yt-red block mb-2 text-xs uppercase tracking-wider">AI Response</span>
                        <p className="leading-relaxed">{supportResponse}</p>
                      </div>
                    )}
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="bg-yt-sidebar border border-yt-border p-8 rounded-[2.5rem] animate-fade-in shadow-2xl">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <UploadCloud className="text-blue-400 w-8 h-8" /> AI Content Assistant
              </h2>
              <p className="text-gray-400 text-sm mb-8 max-w-2xl leading-relaxed">
                Leverage our Gemini-powered engine to generate high-conversion metadata. Optimized titles can increase CTR by up to 15%, helping offset platform fees.
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 ml-1">Video Topic</label>
                  <div className="flex gap-3">
                    <input 
                      type="text" 
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="e.g., How to bake a chocolate cake"
                      className="flex-1 bg-yt-base border border-yt-border rounded-2xl px-6 py-3 focus:border-blue-500 outline-none transition-all placeholder-gray-600"
                    />
                    <button 
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-8 py-3 rounded-2xl font-bold transition-all disabled:opacity-50 shadow-lg shadow-blue-500/20"
                    >
                      {isGenerating ? 'Generating...' : 'Generate'}
                    </button>
                  </div>
                </div>

                {generatedMetadata && (
                  <div className="bg-yt-base rounded-3xl p-6 border border-yt-border mt-6 space-y-6 shadow-inner">
                    <div className="space-y-2">
                      <span className="text-xs text-blue-400 uppercase font-bold tracking-wider">Generated Title</span>
                      <p className="text-xl font-medium text-white select-all bg-black/20 p-3 rounded-xl border border-white/5">{generatedMetadata.title}</p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-xs text-blue-400 uppercase font-bold tracking-wider">Generated Description</span>
                      <p className="text-gray-300 text-sm select-all bg-black/20 p-4 rounded-xl border border-white/5 leading-relaxed">{generatedMetadata.description}</p>
                    </div>
                    <div className="flex justify-end">
                       <button className="text-blue-400 text-sm font-bold hover:text-blue-300 transition-colors bg-blue-900/20 px-4 py-2 rounded-xl">Apply Metadata</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'dashboard' && (
            <div className="bg-yt-sidebar border border-yt-border p-8 rounded-[2.5rem] flex items-center justify-center h-80 text-gray-500 shadow-xl">
               <div className="text-center">
                   <BarChart2 className="w-16 h-16 mx-auto mb-4 opacity-20" />
                   <p>Analytics dashboard pending integration.</p>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};