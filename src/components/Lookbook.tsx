import { useState } from 'react';
import { Eye, ArrowRight, X } from 'lucide-react';
import { FacebookIcon, InstagramIcon } from './BrandIcons';
import { LOOKBOOK_ITEMS, SALON_INFO } from '../data/salonData';
import TiltCard from './TiltCard';

interface LookbookProps {
  onSelectStyle: (styleName: string) => void;
}

export default function Lookbook({ onSelectStyle }: LookbookProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const categories = ['All', 'Skin Fade', 'Beard Detailing', 'Hot Towel Shave', 'Salon'];

  const filteredItems = activeCategory === 'All'
    ? LOOKBOOK_ITEMS
    : LOOKBOOK_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-transparent border-b border-stone-900/10 dark:border-white/10 scroll-mt-20 transition-colors duration-250">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#9A7848] dark:bg-[#C5A059]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#9A7848] dark:text-[#C5A059]">
                Real Salon Work & Gallery
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#141413] dark:text-[#F4F1EA] tracking-tight">
              Precision Cuts & Razor Detailing
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E] dark:text-[#A1A1AA] max-w-xl">
              Explore our skin fades, sharp beard line-ups, relaxing hot towel shaves, and AC grooming chairs in Bhopal.
            </p>
          </div>

          {/* Filter Pills - Horizontally scrollable on mobile */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-[#EBE6DC] dark:bg-[#121214] border border-stone-900/10 dark:border-white/10 overflow-x-auto no-scrollbar max-w-full shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`min-h-[44px] px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeCategory === cat
                    ? 'bg-[#141413] dark:bg-[#F4F1EA] text-[#F4F1EA] dark:text-[#0B0B0C] shadow-sm'
                    : 'text-[#57534E] dark:text-[#A1A1AA] hover:text-[#141413] dark:hover:text-[#F4F1EA]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid (16 Items total: 4 per category) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <TiltCard
              key={item.id}
              className="group rounded-2xl overflow-hidden bg-[#EBE6DC] dark:bg-[#121214] flex flex-col justify-between shadow-sm hover:shadow-xl"
            >
              {/* Image Frame with overflow-hidden for watermark cropping */}
              <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-[#0B0B0C]">
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full h-full ${item.imageClassName || 'object-cover object-center'} group-hover:scale-[1.15] transition-transform duration-500`}
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#070709]/85 via-[#070709]/20 to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />
                
                {/* Category tag */}
                <div className="depth-layer-z absolute top-3 left-3 text-[11px] font-bold text-[#F4F1EA] bg-[#0B0B0C]/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/15">
                  {item.category}
                </div>

                {/* Quick preview */}
                <button
                  type="button"
                  onClick={() => setPreviewImage(item.image)}
                  className="depth-layer-z absolute top-3 right-3 w-9 h-9 rounded-lg bg-[#0B0B0C]/80 backdrop-blur-md text-white hover:bg-black transition-colors opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer"
                  aria-label={`Preview ${item.title}`}
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Text Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="depth-layer-z font-display text-lg font-bold text-[#141413] dark:text-[#F4F1EA]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-[#57534E] dark:text-[#A1A1AA] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-900/10 dark:border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-[#57534E] dark:text-[#A1A1AA]">Bhopal Salon</span>
                  <button
                    type="button"
                    onClick={() => onSelectStyle(item.title)}
                    className="depth-layer-z flex items-center gap-1 text-xs font-bold text-[#9A7848] dark:text-[#C5A059] hover:underline cursor-pointer"
                  >
                    <span>Request This Cut</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Social Spotlight: Official Facebook & Instagram 44px Circular Buttons */}
        <div className="mt-14 p-7 sm:p-10 rounded-2xl bg-[#EBE6DC] dark:bg-[#121214] border border-stone-900/10 dark:border-white/10 max-w-xl mx-auto flex flex-col items-center text-center space-y-4 shadow-sm">
          <div className="space-y-1">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#141413] dark:text-[#F4F1EA]">
              Salon Photos & Daily Haircut Reels
            </h3>
            <p className="text-xs sm:text-sm text-[#57534E] dark:text-[#A1A1AA] max-w-md">
              Follow our daily haircut reels, sharp beard line-ups, and real customer makeovers in Bhopal.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-center gap-6">
            
            {/* Facebook 44px CTA */}
            <div className="flex flex-col items-center gap-2">
              <a
                href={SALON_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-circle w-11 h-11 bg-[#1877F2] hover:bg-[#166fe5] text-white shadow-md flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#1877F2]/40"
                aria-label="Follow Shivangi Hair Salon on Facebook"
                title="Follow on Facebook"
              >
                <FacebookIcon className="w-5 h-5 text-white shrink-0" />
              </a>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1877F2] dark:text-blue-400">
                Facebook
              </span>
            </div>

            {/* Instagram 44px CTA */}
            <div className="flex flex-col items-center gap-2">
              <a
                href={SALON_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-circle w-11 h-11 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-95 text-white shadow-md flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-500/40"
                aria-label="Follow Shivangi Hair Salon on Instagram"
                title="Follow on Instagram @shivangihairsalon.in"
              >
                <InstagramIcon className="w-5 h-5 text-white shrink-0" />
              </a>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#dc2743] dark:text-rose-400">
                Instagram
              </span>
            </div>

          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
          role="dialog"
          aria-label="Image preview"
        >
          <div className="relative max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-auto max-h-[85vh] object-contain"
              referrerPolicy="no-referrer"
            />
            <button
              type="button"
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/80 text-white text-xs font-semibold hover:bg-black transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Close</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
