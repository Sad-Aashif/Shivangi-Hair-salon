import { Phone, Scissors, ShieldCheck, Compass } from 'lucide-react';
import { WhatsAppIcon } from './BrandIcons';
import { SALON_INFO } from '../data/salonData';
import { MACRO_VIDEOS } from '../config/videos';
import { createWhatsAppUrl, openExternalUrl } from '../utils/booking';
import MacroVideo from './MacroVideo';
import TiltCard from './TiltCard';

interface CraftsmanshipProps {
  onOpenBooking?: () => void;
}

export default function Craftsmanship({}: CraftsmanshipProps) {
  const handleWhatsAppClick = () => {
    const msg = [
      `*BARBER CHAIR INQUIRY - SHIVANGI HAIR SALON*`,
      `Hello Master Barber, I would like to reserve a chair session with you at the Bhopal salon.`,
      `Please let me know your earliest available slot.`
    ].join('\n');
    const url = createWhatsAppUrl(SALON_INFO.rawPhone, msg);
    openExternalUrl(url);
  };

  const pillars = [
    {
      index: '01',
      icon: Scissors,
      title: 'Sharp Scissor & Fade Work',
      desc: 'Clean, balanced haircuts that stay in shape for weeks, not just day one.',
    },
    {
      index: '02',
      icon: Compass,
      title: 'Cut According to Your Face Shape',
      desc: 'We check your face cut and hair growth before touching the clipper so the style suits you 100%.',
    },
    {
      index: '03',
      icon: ShieldCheck,
      title: '100% Clean Tools & Fresh Blades',
      desc: 'Every scissor and clipper is UV-cleaned, and a brand-new blade is opened in front of you.',
    },
  ];

  return (
    <section 
      id="barber" 
      className="py-20 sm:py-28 bg-transparent border-b border-stone-900/10 dark:border-white/10 scroll-mt-20 transition-colors duration-250 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Subtitle Marker */}
        <div className="flex items-center gap-3 mb-10">
          <span className="w-8 h-[1px] bg-[#9A7848] dark:bg-[#C5A059]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#9A7848] dark:text-[#C5A059]">
            Meet Your Barber · Shivangi Hair Salon
          </span>
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Clean Unobstructed Portrait of @barber.jpg + Badges Below Frame (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <TiltCard className="rounded-2xl overflow-hidden bg-[#EBE6DC] dark:bg-[#121214] border border-stone-900/10 dark:border-white/10 shadow-xl">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <img
                  src="/barber.jpg"
                  alt="Master Barber at Shivangi Hair Salon Bhopal"
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>
            </TiltCard>

            {/* Clean Badges Placed Strictly Below the Portrait Frame (Zero Face Overlap) */}
            <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-[#EBE6DC] dark:bg-[#121214] border border-stone-900/10 dark:border-white/10">
              <div>
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#9A7848] dark:text-[#C5A059] font-bold block">
                  SHIVANGI SALON · BHOPAL
                </span>
                <p className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#141413] dark:text-[#F4F1EA] mt-0.5">
                  Master Barber
                </p>
                <p className="text-xs text-[#57544E] dark:text-[#A6A095] font-mono">
                  Bhensakhedi Road
                </p>
              </div>

              <div className="px-3.5 py-2 rounded-lg border border-stone-900/10 dark:border-white/10 text-right shrink-0">
                <span className="font-mono text-sm sm:text-base font-bold text-[#141413] dark:text-[#F4F1EA] block">
                  8+ Years
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#9A7848] dark:text-[#C5A059] block font-semibold">
                  Salon Experience
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Clear Customer-Friendly Copy, 3D Tilt Pillars & Macro Straight Razor Showcase (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            <div className="space-y-4">
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-[#141413] dark:text-[#F4F1EA] tracking-tight leading-[1.12]">
                The hands behind the fade. 8+ years of real salon experience.
              </h2>
              
              <p className="text-sm sm:text-base text-[#4A4742] dark:text-[#A6A095] leading-relaxed font-normal">
                At Shivangi Hair Salon, we never rush your haircut. Before picking up a clipper, our Master Barber checks your face shape and natural hair growth—giving you a sharp, comfortable look that stays neat and easy to style for weeks.
              </p>
            </div>

            {/* 3 Feature Cards: Monospace 01, 02, 03 + Bare Thin-Stroke Icons + 1px Architectural Hairlines */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <TiltCard
                    key={pillar.title}
                    className="p-5 rounded-xl bg-[#EBE6DC] dark:bg-[#121214] border border-stone-900/10 dark:border-white/10"
                  >
                    <div className="space-y-3">
                      <div className="depth-layer-z flex items-center justify-between">
                        <span className="text-xs font-mono font-bold tracking-widest text-[#9A7848] dark:text-[#C5A059]">
                          {pillar.index}
                        </span>
                        <Icon className="w-4 h-4 text-[#9A7848] dark:text-[#C5A059] stroke-[1.5]" />
                      </div>
                      <h3 className="depth-layer-z font-bold text-xs sm:text-sm uppercase tracking-wider text-[#141413] dark:text-[#F4F1EA]">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-[#57544E] dark:text-[#A6A095] leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </TiltCard>
                );
              })}
            </div>

            {/* Video 3 Showcase Strip: Macro Black Japanese Straight Razor on Dark Slate */}
            <div className="relative rounded-2xl overflow-hidden border border-stone-900/10 dark:border-white/10 bg-[#070709] p-5 sm:p-6 shadow-md">
              <MacroVideo
                asset={MACRO_VIDEOS.trustStrip}
                className="w-full h-full object-cover object-center opacity-45"
                overlayClassName="bg-gradient-to-r from-[#070709]/92 via-[#070709]/78 to-[#070709]/90"
              />
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C5A059] block">
                    Fresh Japanese Blade · Zero Reuse
                  </span>
                  <h3 className="font-display text-base sm:text-lg font-bold text-[#F4F1EA]">
                    Sharp Beard Line-Up & UV-Cleaned Tools
                  </h3>
                  <p className="text-xs text-[#D6D1C7] max-w-xl">
                    Every shave and beard line-up uses a brand-new sealed blade unpacked right in front of your chair.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons: 44px Circular Action Buttons (Kept 100% Intact) */}
            <div className="pt-2 flex items-center gap-6">
              
              {/* WhatsApp Green Circular CTA (44px) */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleWhatsAppClick}
                  className="cta-circle w-11 h-11 bg-[#25D366] text-white shadow-md hover:bg-[#20BA59] cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 flex items-center justify-center shrink-0"
                  aria-label="Book Chair on WhatsApp (+91 9575830421)"
                  title="Book on WhatsApp"
                >
                  <WhatsAppIcon className="w-5 h-5 text-white shrink-0" />
                </button>
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#141413] dark:text-[#F4F1EA]">
                    Book Chair
                  </span>
                  <span className="text-[10px] text-[#25D366] font-mono font-semibold">
                    WhatsApp Direct
                  </span>
                </div>
              </div>

              {/* Call Black Circular CTA (44px) */}
              <div className="flex items-center gap-3">
                <a
                  href={`tel:${SALON_INFO.phone}`}
                  className="cta-circle w-11 h-11 btn-call text-white shadow-md cursor-pointer focus:outline-none flex items-center justify-center shrink-0"
                  aria-label={`Call salon at ${SALON_INFO.phone}`}
                  title="Call Salon"
                >
                  <Phone className="w-5 h-5 shrink-0" />
                </a>
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#141413] dark:text-[#F4F1EA]">
                    Direct Call
                  </span>
                  <span className="text-[10px] text-[#57544E] dark:text-[#A6A095] font-mono">
                    {SALON_INFO.phone}
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
