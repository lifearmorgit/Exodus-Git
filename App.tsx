import React, { useState, useEffect, useRef } from 'react';
import { INITIAL_QUESTIONS, LOGO_STYLES, playChime, playWolfHowl } from './constants';
import { Question, LogoStyle, FormState } from './types';
import QuestionCard from './components/QuestionCard';
import LandingPagePreview from './components/LandingPagePreview';
import { generateWolfyLogo, generateExodusLogo, generateLandingPageHero } from './services/geminiService';
import { Download, Edit, Save, Loader2, CheckCircle, Smartphone, Globe, Mail, Eye, X } from 'lucide-react';

export default function App() {
  const [wolfyLogo, setWolfyLogo] = useState<string | null>(null);
  const [isWolfyLogoLoading, setIsWolfyLogoLoading] = useState(false);
  
  const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS);
  const [logoStyles, setLogoStyles] = useState<LogoStyle[]>(LOGO_STYLES);
  const [additionalNotes, setAdditionalNotes] = useState('');
  
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Preview State
  const [previewStyle, setPreviewStyle] = useState<LogoStyle | null>(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);

  // Confirmation State
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Load Wolfy Logo on mount
  useEffect(() => {
    const loadWolfy = async () => {
      setIsWolfyLogoLoading(true);
      const logo = await generateWolfyLogo();
      if (logo) setWolfyLogo(logo);
      setIsWolfyLogoLoading(false);
    };
    loadWolfy();
  }, []);

  const handleQuestionUpdate = (updatedQuestion: Question) => {
    setQuestions(questions.map(q => q.id === updatedQuestion.id ? updatedQuestion : q));
  };

  const handleLogoSelect = (id: string) => {
    if (isEditMode) return;
    playChime();
    setLogoStyles(logoStyles.map(l => ({
      ...l,
      selected: l.id === id ? !l.selected : false // Allow toggle, ensure single select
    })));
  };

  const handleOpenPreview = async (style: LogoStyle) => {
    setPreviewStyle(style);
    
    // Check if we need to generate assets
    // We try to generate both hero (essential) and logo (optional but nice) if missing
    // We prioritize Hero for the "Landing Page" feel.
    
    if (!style.heroImageUrl) {
        setIsPreviewLoading(true);
        
        // Generate Hero
        const heroUrl = await generateLandingPageHero(style.heroPrompt);
        
        // Generate Logo if missing (parallel-ish, but let's do sequence to keep state simple or just fire and update)
        let logoUrl = style.imageUrl;
        if (!logoUrl) {
           logoUrl = await generateExodusLogo(style.prompt);
        }

        if (heroUrl) {
            setLogoStyles(prev => prev.map(l => l.id === style.id ? { ...l, heroImageUrl: heroUrl, imageUrl: logoUrl || undefined } : l));
            // Update the currently viewed style object so the modal sees it immediately
            setPreviewStyle(prev => prev ? { ...prev, heroImageUrl: heroUrl, imageUrl: logoUrl || undefined } : null);
        }
        setIsPreviewLoading(false);
    }
  };

  const handleSaveForm = () => {
    // Play Sound
    playWolfHowl();

    const formData: FormState = {
      questions,
      logoStyles: logoStyles.filter(l => l.selected),
      additionalNotes
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `Exodus_Vegas_Questionnaire_Result.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();

    // Show Confirmation
    setShowConfirmation(true);
  };

  const LogoSection = () => (
    <div className="w-full flex justify-between items-center bg-gray-900 border-b border-yellow-500/30 p-4">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-800 rounded-full overflow-hidden border-2 border-yellow-500 flex items-center justify-center shrink-0">
          {isWolfyLogoLoading ? (
            <Loader2 className="animate-spin text-yellow-500" />
          ) : wolfyLogo ? (
            <img src={wolfyLogo} alt="Wolfy's Websites" className="w-full h-full object-cover" />
          ) : (
             <span className="text-xs text-center text-gray-500">Wolfy's<br/>Websites</span>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white font-serif tracking-wider">WOLFY'S WEBSITES</h1>
          <p className="text-yellow-500 text-sm">Design & Concierge Solutions</p>
        </div>
      </div>
      <button 
        onClick={() => setIsEditMode(!isEditMode)} 
        className={`p-2 rounded-full transition-colors ${isEditMode ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
        title="Toggle Edit Mode (For Developer)"
      >
        <Edit size={20} />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-gray-200 font-sans selection:bg-yellow-500 selection:text-black">
      <LogoSection />

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-500">
            <div className="text-center p-8 max-w-lg w-full relative">
                <button 
                    onClick={() => setShowConfirmation(false)}
                    className="absolute top-0 right-0 p-2 text-gray-400 hover:text-white"
                >
                    <X size={24} />
                </button>
                <div className="w-40 h-40 mx-auto mb-8 rounded-full border-4 border-yellow-500 overflow-hidden shadow-[0_0_50px_rgba(234,179,8,0.5)] animate-bounce">
                    {wolfyLogo ? <img src={wolfyLogo} alt="Wolfy" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-800"/>}
                </div>
                <h2 className="text-4xl md:text-5xl font-serif text-yellow-500 mb-6 tracking-widest drop-shadow-xl font-bold">
                    WOLFY'S ON THE JOB!
                </h2>
                <p className="text-gray-300 text-xl font-light">Your preferences have been secured. We will start building your empire immediately.</p>
                <button 
                    onClick={() => setShowConfirmation(false)}
                    className="mt-10 px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-full transition-transform hover:scale-105"
                >
                    Return to Site
                </button>
            </div>
        </div>
      )}

      {previewStyle && (
        <LandingPagePreview 
            style={previewStyle} 
            onClose={() => setPreviewStyle(null)} 
            isLoading={isPreviewLoading}
        />
      )}

      <main className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Intro */}
        <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-600 mb-4 animate-pulse">
                EXODUS VEGAS
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Exclusive Concierge Design Questionnaire. Please help Wolfy and his team tailor your digital presence to match the luxury of your services.
            </p>
        </div>

        {/* Brand Identity */}
        <section className="mb-12">
            <h3 className="text-2xl font-serif text-white mb-6 border-l-4 border-yellow-500 pl-4">1. Brand Identity & Vibe</h3>
            <p className="text-gray-400 mb-6">Explore the concepts below. Click "View Concept" to generate a full landing page mockup. Select the one that matches your vision.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {logoStyles.map((style) => (
                    <div 
                        key={style.id} 
                        className={`
                            relative bg-gray-800 rounded-xl overflow-hidden border-2 transition-all duration-300
                            ${style.selected ? 'border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.4)] transform scale-[1.02]' : 'border-gray-700 hover:border-gray-500'}
                        `}
                    >
                        {/* Preview Area - Now focuses on the 'Hero' aspect or Logo if available */}
                        <div className="h-48 bg-black flex items-center justify-center relative overflow-hidden group">
                            {style.heroImageUrl ? (
                                <img src={style.heroImageUrl} alt={style.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                            ) : style.imageUrl ? (
                                <img src={style.imageUrl} alt={style.name} className="w-full h-full object-contain p-4" />
                            ) : (
                                <div className="text-center p-4 z-10">
                                    <p className="text-gray-500 mb-2 italic">"{style.name}"</p>
                                    <p className="text-xs text-gray-700">Concept Mockup</p>
                                </div>
                            )}
                            
                            {/* Overlay Button for Generating/Viewing */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                            </div>

                            <button 
                                onClick={(e) => { e.stopPropagation(); handleOpenPreview(style); }}
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-2 rounded-full shadow-lg flex items-center z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0"
                            >
                                <Eye size={18} className="mr-2" />
                                View Concept
                            </button>
                            
                            {/* Selection Checkmark */}
                            {style.selected && (
                                <div className="absolute top-2 right-2 bg-yellow-500 text-black p-1 rounded-full shadow-lg z-30">
                                    <CheckCircle size={24} />
                                </div>
                            )}

                             {/* Make the whole card clickable for selection, but button handles preview */}
                             <div 
                                onClick={() => handleLogoSelect(style.id)}
                                className="absolute inset-0 z-0 cursor-pointer"
                            />
                        </div>

                        <div className="p-4 border-t border-gray-700 relative z-10 pointer-events-none">
                            <h4 className="font-bold text-white text-lg">{style.name}</h4>
                            <p className="text-sm text-gray-400">{style.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* Questions */}
        <section className="mb-12">
            <h3 className="text-2xl font-serif text-white mb-6 border-l-4 border-yellow-500 pl-4">2. Website Requirements</h3>
            {questions.map((q, idx) => (
                <QuestionCard 
                    key={q.id} 
                    index={idx} 
                    question={q} 
                    onUpdate={handleQuestionUpdate} 
                    isEditMode={isEditMode}
                />
            ))}
        </section>

        {/* Additional Notes */}
        <section className="mb-12">
            <h3 className="text-2xl font-serif text-white mb-6 border-l-4 border-yellow-500 pl-4">3. Additional Ideas</h3>
            <textarea 
                className="w-full h-40 bg-gray-900 border border-gray-700 rounded-xl p-4 text-gray-200 focus:border-yellow-500 outline-none resize-none"
                placeholder="Tell Wolfy and his team about specific features, competitor sites you like, or any other vision for Exodus Vegas..."
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
            />
        </section>

        {/* Action Bar */}
        <div className="sticky bottom-4 z-50">
            <div className="bg-gray-800/90 backdrop-blur-md border border-gray-700 p-4 rounded-2xl shadow-2xl flex justify-between items-center max-w-4xl mx-auto">
                <div className="text-sm text-gray-400 hidden sm:block">
                    {questions.filter(q => q.selectedOptions.length > 0).length} / {questions.length} Questions Answered
                </div>
                <button 
                    onClick={handleSaveForm}
                    className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded-full shadow-lg transform transition-all hover:scale-105 active:scale-95 ml-auto sm:ml-0"
                >
                    <Save size={20} />
                    <span>Save & Download Form</span>
                </button>
            </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12 mt-12 text-center">
         <div className="flex flex-col items-center justify-center opacity-70 mb-6">
            <div className="w-12 h-12 bg-gray-800 rounded-full overflow-hidden border border-gray-600 flex items-center justify-center mb-2">
                 {wolfyLogo ? (
                    <img src={wolfyLogo} alt="Wolfy Logo" className="w-full h-full object-cover" />
                 ) : (
                    <span className="text-[10px] text-gray-500">Wolfy's</span>
                 )}
            </div>
            <h4 className="text-yellow-500 font-serif tracking-widest">WOLFY'S WEBSITES</h4>
         </div>
         <p className="text-gray-600 text-sm">&copy; {new Date().getFullYear()} Wolfy's Websites. All Rights Reserved.</p>
         <div className="flex justify-center space-x-6 mt-4 text-gray-500">
             <Smartphone size={16} />
             <Globe size={16} />
             <Mail size={16} />
         </div>
      </footer>
    </div>
  );
}
