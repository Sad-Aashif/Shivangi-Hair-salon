import { useState } from 'react';
import { Clock, Check, Plus, Minus } from 'lucide-react';
import { WhatsAppIcon } from './BrandIcons';
import { SERVICES, SALON_INFO } from '../data/salonData';
import { MACRO_VIDEOS } from '../config/videos';
import { ServiceItem } from '../types';
import { createWhatsAppUrl, openExternalUrl } from '../utils/booking';
import MacroVideo from './MacroVideo';
import TiltCard from './TiltCard';

interface ServiceMenuProps {
  onSelectServiceModal?: (serviceId: string) => void;
}

export default function ServiceMenu({}: ServiceMenuProps) {
  const [activeCategory, setActiveCategory] = useState<'hair' | 'beard' | 'spa'>('hair');
  const [selectedIds, setSelectedIds] = useState<string[]>(['sig-cut']);
  const [expandedDetailsId, setExpandedDetailsId] = useState<string | null>(null);

  const categories: { id: 'hair' | 'beard' | 'spa'; label: string }[] = [
    { id: 'hair', label: 'Haircuts & Fades' },
    { id: 'beard', label: 'Beard Trimming' },
    { id: 'spa', label: 'Scalp & Facial Care' },
  ];

  const currentServices = SERVICES.filter((s) => s.category === activeCategory);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBookSingleOnWhatsApp = (service: ServiceItem) => {
    const msg = [
      `*APPOINTMENT INQUIRY - SHIVANGI HAIR SALON*`,
      `Hello Master Barber, I would like to book the following service at your Bhopal salon:`,
      `Service: ${service.name} (${service.durationMinutes} Mins)`,
      `Pricing: Consultation Required`,
      `Salon: Bhensakhedi Road, near The Fitness Planet`,
      `Please confirm current chair availability.`
    ].join('\n');
    const url = createWhatsAppUrl(SALON_INFO.rawPhone, msg);
    openExternalUrl(url);
  };

  const selectedItems = SERVICES.filter((s) => selectedIds.includes(s.id));
  const totalDuration = selectedItems.reduce((acc, s) => acc + s.durationMinutes, 0);

  const handleBookSelectionOnWhatsApp = () => {
    if (selectedItems.length === 0) return;
    const itemsList = selectedItems
      .map((s) => `• ${s.name} (${s.durationMinutes} mins)`)
      .join('\n');
    const msg = [
      `*CUSTOM GROOMING PLAN - SHIVANGI HAIR SALON*`,
      `Hello Master Barber, I selected my salon services:`,
      itemsList,
      ``,
      `Estimated Time: ~${totalDuration} Mins`,
      `Pricing: Consultation Required`,
      `Salon: Bhensakhedi Road, Bhopal`,
      `Please confirm chair availability.`
    ].join('\n');
    const url = createWhatsAppUrl(SALON_INFO.rawPhone, msg);
    openExternalUrl(url);
  };

  return (
    <section 
      id="services" 
      className="relative py-20 sm:py-28 bg-[#070709] border-b border-white/10 scroll-mt-20 overflow-hidden transition-colors duration-250"
    >
      {/* Video 2: Macro Steaming Folded Black Hot Towel on dark wood grain */}
      <MacroVideo
        asset={MACRO_VIDEOS.serviceMenu}
        className="w-full h-full object-cover object-center opacity-30"
        overlayClassName="bg-gradient-to-b from-[#070709]/92 via-[#070709]/82 to-[#070709]/94"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#C5A059]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#C5A059]">
                Service Menu
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#F4F1EA] tracking-tight">
              Haircut, Beard & Grooming Menu
            </h2>
            <p className="text-xs sm:text-sm text-[#C2BCB0] max-w-xl">
              No rushed cuts. Every appointment includes a face-shape style check, UV-cleaned tools, a fresh blade, and warm towel prep.
            </p>
          </div>

          {/* Horizontal Scrollable Category Pills on Mobile (overflow-x-auto no-scrollbar, >=44px touch targets) */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-[#121214]/90 border border-white/10 overflow-x-auto no-scrollbar max-w-full shrink-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`min-h-[44px] px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-[#F4F1EA] text-[#070709] shadow-sm'
                    : 'text-[#A6A095] hover:text-[#F4F1EA]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Interactive Service Cards */}
        <div className="space-y-4">
          {/* Desktop Column Legend */}
          <div className="hidden md:grid md:grid-cols-12 px-6 py-3 rounded-xl border border-white/10 text-[11px] font-bold uppercase tracking-[0.2em] text-[#C5A059] bg-[#121214]/85 backdrop-blur-sm">
            <div className="col-span-6">Service Details</div>
            <div className="col-span-2 text-center">Time Needed</div>
            <div className="col-span-2 text-right">Pricing</div>
            <div className="col-span-2 text-right">Book (WhatsApp)</div>
          </div>

          {currentServices.map((service) => {
            const isSelected = selectedIds.includes(service.id);
            const isExpanded = expandedDetailsId === service.id;

            return (
              <TiltCard
                key={service.id}
                maxTilt={3}
                className={`rounded-2xl p-5 sm:p-6 backdrop-blur-md transition-colors duration-200 border ${
                  isSelected
                    ? 'bg-[#171612]/95 border-[#C5A059]/60'
                    : 'bg-[#121214]/90 border-white/10 hover:bg-[#161618]/95'
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  
                  {/* Col 1: Service Name & Description (6 cols) */}
                  <div className="md:col-span-6 space-y-1.5">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <button
                        type="button"
                        onClick={() => toggleSelect(service.id)}
                        className={`depth-layer-z w-5 h-5 rounded border flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                          isSelected
                            ? 'bg-[#C5A059] border-[#C5A059] text-[#070709]'
                            : 'border-white/25 bg-transparent'
                        }`}
                        aria-label={`Select ${service.name} for calculation`}
                        title="Select Service"
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>

                      <h3 className="depth-layer-z font-display text-base sm:text-lg font-bold text-[#F4F1EA]">
                        {service.name}
                      </h3>

                      {service.popular && (
                        <span className="depth-layer-z text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/35">
                          Popular
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#B8B2A6] leading-relaxed pl-7">
                      {service.shortDesc}
                    </p>

                    {/* Expand Inclusions toggle */}
                    <button
                      type="button"
                      onClick={() => setExpandedDetailsId(isExpanded ? null : service.id)}
                      className="text-[11px] font-semibold text-[#C5A059] hover:underline pl-7 cursor-pointer inline-flex items-center gap-1 pt-1"
                    >
                      <span>{isExpanded ? 'Hide What’s Included' : 'See What’s Included'}</span>
                      {isExpanded ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                    </button>

                    {isExpanded && (
                      <div className="mt-2.5 pl-7 pt-2 border-t border-white/10">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-[#C2BCB0]">
                          {service.inclusions.map((inc, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <Check className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5 stroke-[2]" />
                              <span>{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Col 2: Duration (2 cols) */}
                  <div className="md:col-span-2 flex md:justify-center items-center gap-1.5 text-xs text-[#C2BCB0] pl-7 md:pl-0">
                    <Clock className="depth-layer-z w-3.5 h-3.5 text-[#C5A059] stroke-[1.5]" />
                    <span className="font-mono font-medium">{service.durationMinutes} Mins</span>
                  </div>

                  {/* Col 3: Price Purged - Consultation Required (2 cols) */}
                  <div className="md:col-span-2 flex md:justify-end items-center pl-7 md:pl-0">
                    <span className="depth-layer-z text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-[#C5A059]">
                      Consultation Required
                    </span>
                  </div>

                  {/* Col 4: Scaled-down Circular Green WhatsApp Action (44px - Kept 100% Intact) */}
                  <div className="md:col-span-2 flex justify-end items-center pl-7 md:pl-0">
                    <button
                      type="button"
                      onClick={() => handleBookSingleOnWhatsApp(service)}
                      className="depth-layer-z cta-circle w-11 h-11 bg-[#25D366] text-white hover:bg-[#20BA59] shadow-md cursor-pointer flex items-center justify-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/40"
                      aria-label={`Book ${service.name} on WhatsApp`}
                      title={`Book ${service.name} via WhatsApp`}
                    >
                      <WhatsAppIcon className="w-5 h-5 text-white shrink-0" />
                    </button>
                  </div>

                </div>
              </TiltCard>
            );
          })}
        </div>

        {/* Minimalist Session Planner Strip */}
        <div className="mt-8 rounded-2xl bg-[#121214]/90 backdrop-blur-md border border-white/10 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A059]">
              Your Selected Services
            </span>
            <p className="font-display text-sm sm:text-base font-bold text-[#F4F1EA]">
              {selectedItems.length} Service{selectedItems.length === 1 ? '' : 's'} Selected
            </p>
            <p className="text-[11px] text-[#B8B2A6] max-w-md">
              {selectedItems.map((s) => s.name).join(' + ') || 'Select one or more services above to book together.'}
            </p>
          </div>

          <div className="flex items-center gap-6 shrink-0">
            <div className="text-right">
              <span className="text-[10px] text-[#A6A095] uppercase tracking-wider block font-semibold">
                Total Time
              </span>
              <span className="font-mono text-sm sm:text-base font-bold text-[#F4F1EA]">
                ~{totalDuration} Mins
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-[#A6A095] uppercase tracking-wider block font-semibold">
                Pricing
              </span>
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#C5A059]">
                Consultation Required
              </span>
            </div>

            {/* Circular Green WhatsApp CTA for selection (44px - Kept 100% Intact) */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleBookSelectionOnWhatsApp}
                disabled={selectedItems.length === 0}
                className="cta-circle w-11 h-11 bg-[#25D366] text-white shadow-lg hover:bg-[#20BA59] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center shrink-0 focus:outline-none"
                aria-label="Send selection to WhatsApp"
                title="Inquire via WhatsApp"
              >
                <WhatsAppIcon className="w-5 h-5 text-white shrink-0" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
