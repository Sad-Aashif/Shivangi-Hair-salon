import { Star, ShieldCheck, Sparkles, UserCheck } from 'lucide-react';
import { MACRO_VIDEOS } from '../config/videos';
import MacroVideo from './MacroVideo';

export default function TrustStrip() {
  return (
    <section 
      aria-label="Salon Trust Signals"
      className="relative py-5 bg-[#070709] border-y border-white/10 overflow-hidden transition-colors duration-250"
    >
      {/* Video 3: Macro Black Japanese Straight Razor on dark slate with floating golden dust particles */}
      <MacroVideo
        asset={MACRO_VIDEOS.trustStrip}
        className="w-full h-full object-cover object-center opacity-35"
        overlayClassName="bg-gradient-to-r from-[#070709]/92 via-[#070709]/78 to-[#070709]/92"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          
          {/* Signal 1: 4.9 Google Rating */}
          <div className="flex items-center justify-center gap-2.5 py-1">
            <Star className="w-4 h-4 fill-[#C5A059] text-[#C5A059] shrink-0 stroke-[1.5]" />
            <div className="text-left">
              <span className="font-bold text-xs sm:text-sm text-[#F4F1EA] block">
                4.9 / 5.0 Google Rating
              </span>
              <span className="text-[10px] text-[#A6A095] block">
                148+ Happy Bhopal Customers
              </span>
            </div>
          </div>

          {/* Signal 2: UV Cleaned Tools (Champagne Brass #C5A059 instead of green) */}
          <div className="flex items-center justify-center gap-2.5 py-1">
            <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0 stroke-[1.5]" />
            <div className="text-left">
              <span className="font-bold text-xs sm:text-sm text-[#F4F1EA] block">
                UV Cleaned Tools
              </span>
              <span className="text-[10px] text-[#A6A095] block">
                Sanitized After Every Customer
              </span>
            </div>
          </div>

          {/* Signal 3: 100% Fresh Blades */}
          <div className="flex items-center justify-center gap-2.5 py-1">
            <Sparkles className="w-4 h-4 text-[#C5A059] shrink-0 stroke-[1.5]" />
            <div className="text-left">
              <span className="font-bold text-xs sm:text-sm text-[#F4F1EA] block">
                100% Fresh Blades
              </span>
              <span className="text-[10px] text-[#A6A095] block">
                New Blade Opened In Front of You
              </span>
            </div>
          </div>

          {/* Signal 4: Walk-ins Welcome */}
          <div className="flex items-center justify-center gap-2.5 py-1">
            <UserCheck className="w-4 h-4 text-[#C5A059] shrink-0 stroke-[1.5]" />
            <div className="text-left">
              <span className="font-bold text-xs sm:text-sm text-[#F4F1EA] block">
                Walk-ins Welcome
              </span>
              <span className="text-[10px] text-[#A6A095] block">
                Fast WhatsApp Priority
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
