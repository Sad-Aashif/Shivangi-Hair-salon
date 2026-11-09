import { Phone, MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { WhatsAppIcon, FacebookIcon, InstagramIcon } from './BrandIcons';
import { SALON_INFO } from '../data/salonData';

interface FooterProps {
  onOpenBooking?: () => void;
  onOpenWhatsApp: () => void;
}

export default function Footer({ onOpenWhatsApp }: FooterProps) {
  return (
    <footer className="bg-transparent backdrop-blur-sm border-t border-stone-900/10 dark:border-white/10 text-[#57534E] dark:text-[#A1A1AA] text-xs py-16 transition-colors duration-250">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Col with Logo (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-stone-900/10 dark:border-white/15 bg-black shrink-0">
                <img 
                  src="/logo.jpg" 
                  alt="Shivangi Hair Salon Logo" 
                  className="w-full h-full object-cover"
                  style={{ filter: 'none' }}
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-display text-lg font-bold tracking-wider text-[#141413] dark:text-[#F4F1EA]">
                SHIVANGI <span className="gold-gradient-text">HAIR SALON</span>
              </span>
            </div>
            
            <p className="text-xs text-[#57534E] dark:text-[#A1A1AA] max-w-sm leading-relaxed">
              Bhopal's trusted men's hair & beard salon. Sharp skin fades, clean beard line-ups, and relaxing hot towel shaves with 100% fresh blades.
            </p>

            <div className="flex items-center gap-1.5 text-[#9A7848] dark:text-[#C5A059]">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-[#141413] dark:text-[#F4F1EA] font-bold">4.9 / 5.0 Rated on Google</span>
              <span className="text-[#57534E] dark:text-[#A1A1AA]">· 148+ Bhopal customers</span>
            </div>
          </div>

          {/* Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-[#141413] dark:text-[#F4F1EA]">
              Salon Navigation
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-[#141413] dark:hover:text-[#F4F1EA] transition-colors">
                  Showcase
                </Link>
              </li>
              <li>
                <Link to="/craftsman" className="hover:text-[#141413] dark:hover:text-[#F4F1EA] transition-colors">
                  Craftsman
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-[#141413] dark:hover:text-[#F4F1EA] transition-colors">
                  Service Menu
                </Link>
              </li>
              <li>
                <Link to="/salon" className="hover:text-[#141413] dark:hover:text-[#F4F1EA] transition-colors">
                  Salon & Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details & Strict Circular CTAs (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-[#141413] dark:text-[#F4F1EA]">
              Direct Salon Channels
            </p>
            <div className="space-y-2 text-xs text-[#57534E] dark:text-[#A1A1AA]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#9A7848] dark:text-[#C5A059] shrink-0 mt-0.5" />
                <span>{SALON_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#9A7848] dark:text-[#C5A059] shrink-0" />
                <a href={`tel:${SALON_INFO.phone}`} className="hover:underline font-semibold font-mono text-[#141413] dark:text-[#F4F1EA]">
                  {SALON_INFO.phone}
                </a>
              </div>
              <div className="text-[11px] text-[#57534E] dark:text-[#A1A1AA]">
                Mon, Wed–Sun: 8:30 AM – 9:30 PM <span className="text-[#9A7848] dark:text-[#C5A059] font-bold">(Tuesday Closed)</span>
              </div>
            </div>

            {/* Strict Color Coded Action Buttons (PERFECT CIRCLES, 44px, Icon-Only inside, zero text - Preserved 100%) */}
            <div className="pt-2 flex items-center gap-3 sm:gap-4 flex-wrap">
              
              {/* 1. Call Black 44px */}
              <a
                href={`tel:${SALON_INFO.phone}`}
                className="cta-circle w-11 h-11 btn-call text-white shadow-sm flex items-center justify-center shrink-0 focus:outline-none"
                aria-label={`Call salon at ${SALON_INFO.phone}`}
                title="Call Salon"
              >
                <Phone className="w-5 h-5 shrink-0" />
              </a>

              {/* 2. WhatsApp Green 44px */}
              <button
                type="button"
                onClick={onOpenWhatsApp}
                className="cta-circle w-11 h-11 bg-[#25D366] hover:bg-[#20BA59] text-white shadow-sm flex items-center justify-center shrink-0 cursor-pointer focus:outline-none"
                aria-label="Direct WhatsApp booking"
                title="Book on WhatsApp"
              >
                <WhatsAppIcon className="w-5 h-5 text-white shrink-0" />
              </button>

              {/* 3. Facebook Blue 44px */}
              <a
                href={SALON_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-circle w-11 h-11 bg-[#1877F2] hover:bg-[#166fe5] text-white shadow-sm flex items-center justify-center shrink-0 focus:outline-none"
                aria-label="Visit Facebook Page"
                title="Follow on Facebook"
              >
                <FacebookIcon className="w-5 h-5 text-white shrink-0" />
              </a>

              {/* 4. Instagram 44px */}
              <a
                href={SALON_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-circle w-11 h-11 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-95 text-white shadow-sm flex items-center justify-center shrink-0 focus:outline-none"
                aria-label="Visit Instagram @shivangihairsalon.in"
                title="Follow on Instagram @shivangihairsalon.in"
              >
                <InstagramIcon className="w-5 h-5 text-white shrink-0" />
              </a>

            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-stone-900/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#57534E] dark:text-[#A1A1AA]">
          <p>© {new Date().getFullYear()} Shivangi Hair Salon. All rights reserved.</p>
          <p>7897+5X4, Bhensakhedi Road, near The Fitness Planet, Bhopal, MP 462030</p>
        </div>

      </div>
    </footer>
  );
}
