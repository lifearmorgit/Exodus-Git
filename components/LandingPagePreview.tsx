import React from 'react';
import { LogoStyle } from '../types';
import { Loader2, X, ArrowRight, Menu, Phone } from 'lucide-react';

interface Props {
  style: LogoStyle;
  onClose: () => void;
  isLoading: boolean;
}

const LandingPagePreview: React.FC<Props> = ({ style, onClose, isLoading }) => {
  
  // Dynamic styles based on the theme
  const isLightMode = style.name.includes('Minimalist') || style.name.includes('Corporate') || style.name.includes('Signature');
  const textColor = isLightMode ? 'text-gray-900' : 'text-white';
  const bgColor = isLightMode ? 'bg-white' : 'bg-black';
  const accentColor = style.name.includes('Neon') ? 'text-cyan-400' : 
                      style.name.includes('Gold') ? 'text-yellow-500' : 
                      style.name.includes('Desert') ? 'text-orange-500' : 'text-yellow-500';
  
  const buttonClass = style.name.includes('Neon') 
    ? 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]'
    : style.name.includes('Gold')
    ? 'bg-yellow-600 hover:bg-yellow-500 text-white border border-yellow-300'
    : isLightMode
    ? 'bg-black text-white hover:bg-gray-800'
    : 'bg-white text-black hover:bg-gray-200';

  const fontClass = style.name.includes('Modern') || style.name.includes('Minimalist') || style.name.includes('Abstract')
    ? 'font-sans'
    : 'font-serif';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 z-[60] bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-md transition-colors"
      >
        <X size={24} />
      </button>

      {/* Main Container */}
      <div className={`w-full max-w-6xl h-[85vh] ${bgColor} rounded-xl overflow-hidden shadow-2xl relative flex flex-col`}>
        
        {isLoading && !style.heroImageUrl ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-20">
            <Loader2 className="animate-spin text-yellow-500 mb-4" size={48} />
            <p className="text-gray-400 font-serif text-lg animate-pulse">Designing "{style.name}" Experience...</p>
          </div>
        ) : (
            <>
                {/* Mock Navbar */}
                <div className={`absolute top-0 w-full z-10 flex justify-between items-center p-6 ${isLightMode ? 'bg-white/10' : 'bg-black/20'} backdrop-blur-md`}>
                    <div className="flex items-center space-x-3">
                         {style.imageUrl ? (
                             <img src={style.imageUrl} alt="Logo" className="h-10 w-10 object-contain rounded-full bg-black/50" />
                         ) : (
                             <div className={`h-10 w-10 border-2 rounded-full flex items-center justify-center font-bold ${isLightMode ? 'border-black text-black' : 'border-white text-white'}`}>EV</div>
                         )}
                         <span className={`font-bold text-xl tracking-widest ${fontClass} ${textColor}`}>EXODUS</span>
                    </div>
                    <div className={`hidden md:flex space-x-8 text-sm font-semibold tracking-wide ${textColor}`}>
                        <span className="cursor-pointer hover:opacity-70">SERVICES</span>
                        <span className="cursor-pointer hover:opacity-70">FLEET</span>
                        <span className="cursor-pointer hover:opacity-70">MEMBERSHIP</span>
                    </div>
                    <div className={`flex items-center space-x-4 ${textColor}`}>
                        <Phone size={18} />
                        <Menu className="md:hidden" size={24} />
                    </div>
                </div>

                {/* Hero Section */}
                <div className="relative w-full flex-grow">
                    {/* Hero Image */}
                    {style.heroImageUrl && (
                        <div className="absolute inset-0">
                            <img src={style.heroImageUrl} alt="Hero" className="w-full h-full object-cover" />
                            <div className={`absolute inset-0 bg-gradient-to-b ${isLightMode ? 'from-white/10 via-transparent to-white/90' : 'from-black/30 via-transparent to-black/90'}`} />
                        </div>
                    )}

                    {/* Hero Content */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 mt-16">
                        <h5 className={`text-sm md:text-base font-bold tracking-[0.3em] uppercase mb-4 ${accentColor}`}>
                            Las Vegas Private Concierge
                        </h5>
                        <h1 className={`text-4xl md:text-7xl font-bold mb-6 max-w-4xl leading-tight drop-shadow-lg ${fontClass} ${textColor === 'text-gray-900' ? 'text-black' : 'text-white'}`}>
                            {style.name.includes('Noir') ? "THE CITY IS YOURS." :
                             style.name.includes('Gold') ? "TIMELESS LUXURY AWAITS." :
                             style.name.includes('Wolf') ? "DOMINATE THE NIGHT." :
                             "EXPERIENCE THE EXTRAORDINARY."}
                        </h1>
                        <p className={`text-lg md:text-xl max-w-xl mb-10 drop-shadow-md ${textColor === 'text-gray-900' ? 'text-gray-800' : 'text-gray-200'}`}>
                            {style.description} Tailored specifically for those who demand the absolute best.
                        </p>
                        <button className={`px-8 py-4 text-sm md:text-base font-bold uppercase tracking-widest rounded transition-transform hover:scale-105 flex items-center space-x-3 ${buttonClass}`}>
                            <span>Request Access</span>
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Bottom Bar / Features Mockup */}
                <div className={`p-6 md:p-10 ${bgColor} z-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center border-t ${isLightMode ? 'border-gray-200' : 'border-gray-800'}`}>
                    <div>
                        <h4 className={`font-bold mb-2 ${textColor}`}>VIP Access</h4>
                        <p className={`text-sm ${isLightMode ? 'text-gray-600' : 'text-gray-400'}`}>Instant entry to top-tier venues.</p>
                    </div>
                    <div>
                        <h4 className={`font-bold mb-2 ${textColor}`}>24/7 Transport</h4>
                        <p className={`text-sm ${isLightMode ? 'text-gray-600' : 'text-gray-400'}`}>Luxury fleet at your disposal.</p>
                    </div>
                    <div>
                        <h4 className={`font-bold mb-2 ${textColor}`}>Private Security</h4>
                        <p className={`text-sm ${isLightMode ? 'text-gray-600' : 'text-gray-400'}`}>Discreet protection for peace of mind.</p>
                    </div>
                </div>
            </>
        )}
      </div>
    </div>
  );
};

export default LandingPagePreview;
