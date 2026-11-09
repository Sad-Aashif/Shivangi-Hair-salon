import { MapPin, Clock, Phone, Navigation, AlertCircle } from 'lucide-react';
import { WhatsAppIcon, FacebookIcon, InstagramIcon } from './BrandIcons';
import { SALON_INFO } from '../data/salonData';

interface LocationHubProps {
  onOpenWhatsApp: () => void;
}

export default function LocationHub({ onOpenWhatsApp }: LocationHubProps) {
  const today = new Date();
  const isTuesdayToday = today.getDay() === 2;

  return (
    <section
      id="location"
      className="py-16 sm:py-24 bg-transparent border-b border-stone-900/10 dark:border-white/10 scroll-mt-20 transition-colors duration-250"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 space-y-3">
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-[#9A7848] dark:bg-[#C5A059]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#9A7848] dark:text-[#C5A059]">
              Bhopal Salon Location
            </span>
            <span className="w-8 h-[1px] bg-[#9A7848] dark:bg-[#C5A059]" />
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#141413] dark:text-[#F4F1EA] tracking-tight">
            Location & Salon Timings
          </h2>
          <p className="text-xs sm:text-sm text-[#57534E] dark:text-[#A1A1AA]">
            Easy to find on Bhensakhedi Road, right next to The Fitness Planet gym.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Salon Details Card (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-[#EBE6DC] dark:bg-[#121214] border border-stone-900/10 dark:border-white/10 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div className="space-y-6">
              
              {/* Tuesday Closed Prominent Warning & Live Status (No green on non-CTA status dot) */}
              <div className="p-4 rounded-xl bg-[#F4F1EA] dark:bg-[#0B0B0C] border border-stone-900/10 dark:border-white/10 space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${isTuesdayToday ? 'bg-amber-600' : 'bg-[#9A7848] dark:bg-[#C5A059] animate-pulse'}`} />
                  <span className="font-bold text-xs uppercase tracking-wider text-[#9A7848] dark:text-[#C5A059]">
                    {isTuesdayToday ? 'Closed Today (Tuesday Weekly Off)' : 'Open Today (8:30 AM – 9:30 PM)'}
                  </span>
                </div>
                
                <div className="flex items-start gap-2 text-xs text-[#57534E] dark:text-[#A1A1AA]">
                  <AlertCircle className="w-4 h-4 text-[#9A7848] dark:text-[#C5A059] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#141413] dark:text-[#F4F1EA]">Tuesday Closed Notice:</strong> The salon remains closed every Tuesday for deep cleaning and weekly rest. Open Wednesday to Monday.
                  </span>
                </div>
              </div>

              {/* Address block */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#9A7848] dark:text-[#C5A059] uppercase tracking-wider">
                  <MapPin className="w-4 h-4" />
                  <span>Salon Address</span>
                </div>
                <p className="font-display text-lg font-bold text-[#141413] dark:text-[#F4F1EA] leading-snug">
                  {SALON_INFO.address}
                </p>
                <p className="text-xs text-[#57534E] dark:text-[#A1A1AA]">
                  Landmark: Right beside The Fitness Planet gym, Bhensakhedi Road.
                </p>
                <div className="text-xs text-[#57534E] dark:text-[#A1A1AA] font-mono pt-1">
                  Google Maps Code: <span className="font-bold text-[#141413] dark:text-[#F4F1EA]">{SALON_INFO.plusCode}</span>
                </div>
              </div>

              {/* Weekly Schedule Table */}
              <div className="space-y-2 pt-3 border-t border-stone-900/10 dark:border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-[#9A7848] dark:text-[#C5A059] uppercase tracking-wider">
                  <Clock className="w-4 h-4" />
                  <span>Salon Hours</span>
                </div>
                
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-stone-900/10 dark:border-white/10">
                    <span className="text-[#57534E] dark:text-[#A1A1AA]">Monday</span>
                    <span className="font-mono font-bold text-[#141413] dark:text-[#F4F1EA]">8:30 AM – 9:30 PM</span>
                  </div>
                  
                  {/* Highlighted Tuesday */}
                  <div className="flex justify-between py-1.5 px-2.5 rounded-lg bg-[#9A7848]/15 dark:bg-[#C5A059]/15 text-[#141413] dark:text-[#C5A059] font-bold border border-[#9A7848]/30 dark:border-[#C5A059]/30">
                    <span>Tuesday</span>
                    <span className="uppercase tracking-widest text-[11px]">Closed (Weekly Off)</span>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-stone-900/10 dark:border-white/10">
                    <span className="text-[#57534E] dark:text-[#A1A1AA]">Wednesday – Sunday</span>
                    <span className="font-mono font-bold text-[#141413] dark:text-[#F4F1EA]">8:30 AM – 9:30 PM</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Triggers: Direction Trigger + Circular CTAs (Call Black, WhatsApp Green, FB Blue, IG Gradient - All Strictly Preserved) */}
            <div className="pt-4 border-t border-stone-900/10 dark:border-white/10 space-y-4">
              <a
                href={SALON_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#141413] dark:bg-[#F4F1EA] text-[#F4F1EA] dark:text-[#0B0B0C] hover:opacity-90 shadow-sm transition-all text-center cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>

              {/* Circular Action Buttons: 44px Circles */}
              <div className="flex items-center justify-center gap-4 sm:gap-6 pt-1 flex-wrap">
                {/* 1. Call */}
                <div className="flex flex-col items-center gap-1.5">
                  <a
                    href={`tel:${SALON_INFO.phone}`}
                    className="cta-circle w-11 h-11 btn-call text-white shadow-md flex items-center justify-center shrink-0 focus:outline-none"
                    aria-label={`Call salon now at ${SALON_INFO.phone}`}
                    title="Call Salon"
                  >
                    <Phone className="w-5 h-5 shrink-0" />
                  </a>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#57534E] dark:text-[#A1A1AA]">
                    Call
                  </span>
                </div>

                {/* 2. WhatsApp Green 44px */}
                <div className="flex flex-col items-center gap-1.5">
                  <button
                    type="button"
                    onClick={onOpenWhatsApp}
                    className="cta-circle w-11 h-11 bg-[#25D366] hover:bg-[#20BA59] text-white shadow-md flex items-center justify-center shrink-0 cursor-pointer focus:outline-none"
                    aria-label="Direct WhatsApp booking"
                    title="Book on WhatsApp"
                  >
                    <WhatsAppIcon className="w-5 h-5 text-white shrink-0" />
                  </button>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#25D366]">
                    WhatsApp
                  </span>
                </div>

                {/* 3. Facebook Blue 44px */}
                <div className="flex flex-col items-center gap-1.5">
                  <a
                    href={SALON_INFO.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-circle w-11 h-11 bg-[#1877F2] hover:bg-[#166fe5] text-white shadow-md flex items-center justify-center shrink-0 focus:outline-none"
                    aria-label="Visit Facebook Page"
                    title="Follow on Facebook"
                  >
                    <FacebookIcon className="w-5 h-5 text-white shrink-0" />
                  </a>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1877F2] dark:text-blue-400">
                    Facebook
                  </span>
                </div>

                {/* 4. Instagram 44px */}
                <div className="flex flex-col items-center gap-1.5">
                  <a
                    href={SALON_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-circle w-11 h-11 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-95 text-white shadow-md flex items-center justify-center shrink-0 focus:outline-none"
                    aria-label="Follow on Instagram"
                    title="Follow on Instagram @shivangihairsalon.in"
                  >
                    <InstagramIcon className="w-5 h-5 text-white shrink-0" />
                  </a>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#dc2743] dark:text-rose-400">
                    Instagram
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Map & Cropped Salon Interior Frame (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl bg-[#EBE6DC] dark:bg-[#121214] border border-stone-900/10 dark:border-white/10 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#9A7848] dark:text-[#C5A059]">
                    Directions & Salon Interior
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#141413] dark:text-[#F4F1EA] mt-0.5">
                    Visit Shivangi Hair Salon
                  </h3>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-md bg-[#F4F1EA] dark:bg-[#0B0B0C] text-[#141413] dark:text-[#F4F1EA] border border-stone-900/10 dark:border-white/10">
                  Free Front Parking
                </span>
              </div>

              {/* Salon Interior & Navigation Banner (With watermark crop object-[center_15%] scale-[1.12] inside overflow-hidden) */}
              <div className="relative rounded-xl overflow-hidden border border-stone-900/10 dark:border-white/10 bg-[#0B0B0C] aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center p-6 text-center group">
                <img
                  src="/interior_luxury.jpg"
                  alt="Shivangi Hair Salon AC Grooming Interior in Bhopal"
                  className="absolute inset-0 w-full h-full object-cover object-[center_15%] scale-[1.12] opacity-40 group-hover:scale-[1.15] transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070709]/95 via-[#070709]/70 to-[#070709]/50" />
                
                <div className="relative z-10 space-y-3 max-w-md">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#121214]/90 border border-[#C5A059]/60 flex items-center justify-center shadow-xl">
                    <MapPin className="w-6 h-6 text-[#C5A059]" />
                  </div>

                  <h4 className="font-display text-xl sm:text-2xl font-bold text-[#F4F1EA]">
                    Shivangi Hair Salon
                  </h4>
                  <p className="text-xs sm:text-sm text-[#D4D0C8]">
                    7897+5X4, Bhensakhedi Road, near The Fitness Planet, Bhopal, MP 462030
                  </p>

                  <div className="pt-2">
                    <a
                      href={SALON_INFO.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[44px] inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F4F1EA] text-[#141413] text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors shadow-md"
                    >
                      <Navigation className="w-4 h-4 text-[#9A7848]" />
                      <span>Get Directions on Maps</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Simple Arrival Tips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3.5 rounded-xl bg-[#F4F1EA] dark:bg-[#0B0B0C] border border-stone-900/10 dark:border-white/10 space-y-1">
                <span className="font-bold text-[#141413] dark:text-[#F4F1EA] block">Bike & Car Parking</span>
                <p className="text-[#57534E] dark:text-[#A1A1AA] text-[11px]">Easy, free street parking right outside the salon door.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F4F1EA] dark:bg-[#0B0B0C] border border-stone-900/10 dark:border-white/10 space-y-1">
                <span className="font-bold text-[#141413] dark:text-[#F4F1EA] block">Easy Landmark</span>
                <p className="text-[#57534E] dark:text-[#A1A1AA] text-[11px]">Right next to The Fitness Planet gym on Bhensakhedi Road.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F4F1EA] dark:bg-[#0B0B0C] border border-stone-900/10 dark:border-white/10 space-y-1">
                <span className="font-bold text-[#141413] dark:text-[#F4F1EA] block">Walk-In or Book</span>
                <p className="text-[#57534E] dark:text-[#A1A1AA] text-[11px]">Walk-ins are welcome, or message on WhatsApp to skip waiting.</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
