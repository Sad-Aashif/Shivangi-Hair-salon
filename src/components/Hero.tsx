import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { HERO_CAROUSEL_SLIDES } from '../config/videos';
import MacroVideo from './MacroVideo';

interface HeroProps {
  onOpenBooking?: () => void;
}

const SLIDE_INTERVAL_MS = 6500;

export default function Hero({}: HeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_CAROUSEL_SLIDES.length);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [activeIndex]);

  const activeSlide = HERO_CAROUSEL_SLIDES[activeIndex];

  return (
    <section
      id="showcase"
      className="relative w-screen max-w-none left-1/2 -translate-x-1/2 m-0 p-0 overflow-hidden select-none bg-[#070709]"
      aria-label="Cinematic Showcase"
    >
      {/* 100vw Full-Bleed Container */}
      <div className="relative w-full h-[78vh] sm:h-[85vh] min-h-[520px] max-h-[920px] flex flex-col justify-between bg-[#070709]">
        
        {/* 3-Video Background Crossfade Stream (VIDEOS.hero, VIDEOS.trust, VIDEOS.services) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#070709]">
          <AnimatePresence mode="sync">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <MacroVideo
                asset={activeSlide.asset}
                className="w-full h-full object-cover object-center filter brightness-[0.65] contrast-[1.08]"
                overlayClassName="bg-gradient-to-t from-[#070709] via-[#070709]/60 to-[#070709]/70"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Top Spacer */}
        <div aria-hidden="true" className="h-8 sm:h-12" />

        {/* Center: Hinglish Psychological Copywriting */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-4xl mx-auto my-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4 sm:space-y-5"
            >
              {/* Eyebrow */}
              <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-[0.28em] text-[#C5A059]">
                {activeSlide.eyebrow}
              </span>

              {/* Psychological Hinglish Headline */}
              <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#F4F1EA] leading-[1.1] drop-shadow-lg max-w-3xl mx-auto">
                {activeSlide.headline}
              </h1>

              {/* Relatable Hinglish Subtext */}
              <p className="text-xs sm:text-base text-[#F4F1EA]/85 font-normal tracking-wide max-w-2xl mx-auto leading-relaxed">
                {activeSlide.subtext}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom: Clickable Slide Progress Bars (>=44px touch target height) */}
        <div
          className="relative z-20 w-full max-w-2xl mx-auto px-4 sm:px-6 pb-5 sm:pb-7"
          role="tablist"
          aria-label="Hero video slides"
        >
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {HERO_CAROUSEL_SLIDES.map((slide, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Slide ${idx + 1}: ${slide.shortLabel}`}
                  onClick={() => setActiveIndex(idx)}
                  className="group min-h-[44px] flex flex-col justify-end pb-2 text-left cursor-pointer focus:outline-none"
                >
                  <span
                    className={`text-[10px] sm:text-[11px] font-mono uppercase tracking-wider mb-2 block truncate transition-colors ${
                      isActive
                        ? 'text-[#C5A059] font-semibold'
                        : 'text-[#F4F1EA]/55 group-hover:text-[#F4F1EA]/85'
                    }`}
                  >
                    {slide.shortLabel}
                  </span>
                  <div className="w-full h-[2px] bg-white/20 overflow-hidden">
                    {isActive ? (
                      <motion.div
                        key={`progress-${activeIndex}`}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: SLIDE_INTERVAL_MS / 1000, ease: 'linear' }}
                        className="h-full bg-[#C5A059]"
                      />
                    ) : (
                      <div className="w-0 h-full bg-[#C5A059]" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
