import { useState, useEffect } from 'react';
import { X, Calendar, Clock, Scissors, Copy, Check, AlertCircle, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './BrandIcons';
import { SERVICES, SALON_INFO } from '../data/salonData';
import { BookingFormData } from '../types';
import {
  generateTimeSlots,
  calculateBookingTotal,
  validateBookingForm,
  formatWhatsAppBookingMessage,
  createWhatsAppUrl,
  openExternalUrl,
  isTuesday,
} from '../utils/booking';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedServiceId?: string;
  initialNote?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  preSelectedServiceId,
  initialNote = '',
}: BookingModalProps) {
  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    phone: '',
    selectedServices: preSelectedServiceId ? [preSelectedServiceId] : ['sig-cut'],
    date: todayStr,
    timeSlot: '11:00 AM',
    notes: initialNote,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preSelectedServiceId) {
      setFormData(prev => ({
        ...prev,
        selectedServices: prev.selectedServices.includes(preSelectedServiceId)
          ? prev.selectedServices
          : [...prev.selectedServices, preSelectedServiceId],
      }));
    }
  }, [preSelectedServiceId]);

  useEffect(() => {
    if (initialNote) {
      setFormData(prev => ({ ...prev, notes: initialNote }));
    }
  }, [initialNote]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const timeSlots = generateTimeSlots();
  const { totalDurationMinutes } = calculateBookingTotal(
    formData.selectedServices,
    SERVICES
  );

  const toggleService = (id: string) => {
    setFormData(prev => {
      const exists = prev.selectedServices.includes(id);
      let updated: string[];
      if (exists) {
        updated = prev.selectedServices.filter(sId => sId !== id);
      } else {
        updated = [...prev.selectedServices, id];
      }
      return { ...prev, selectedServices: updated };
    });
    if (errors.selectedServices) {
      setErrors(prev => ({ ...prev, selectedServices: '' }));
    }
  };

  const handleDateChange = (val: string) => {
    setFormData(prev => ({ ...prev, date: val }));
    if (isTuesday(val)) {
      setErrors(prev => ({ ...prev, date: 'Shivangi Salon is closed on Tuesdays. Please choose another date.' }));
    } else {
      setErrors(prev => ({ ...prev, date: '' }));
    }
  };

  const handleBookViaWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateBookingForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const message = formatWhatsAppBookingMessage(formData, SERVICES);
    const url = createWhatsAppUrl(SALON_INFO.rawPhone, message);
    
    setSubmitted(true);
    openExternalUrl(url);
  };

  const handleCopyMessage = () => {
    const message = formatWhatsAppBookingMessage(formData, SERVICES);
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const generatedPreview = formatWhatsAppBookingMessage(formData, SERVICES);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div 
        className="relative w-full max-w-2xl rounded-2xl bg-[#F4F1EA] dark:bg-[#121214] border border-stone-900/10 dark:border-white/10 shadow-2xl p-6 sm:p-8 my-8 max-h-[92vh] overflow-y-auto text-[#141413] dark:text-[#F4F1EA]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-11 h-11 rounded-xl text-[#57534E] dark:text-[#A1A1AA] hover:text-[#141413] dark:hover:text-[#F4F1EA] hover:bg-stone-900/5 dark:hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1 pb-5 border-b border-stone-900/10 dark:border-white/10 pr-12">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9A7848] dark:text-[#C5A059]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct WhatsApp Chair Booking</span>
          </div>
          <h2 id="booking-modal-title" className="font-display text-2xl sm:text-3xl font-bold text-[#141413] dark:text-[#F4F1EA]">
            Book Your Chair at Shivangi Salon
          </h2>
          <p className="text-xs sm:text-sm text-[#57534E] dark:text-[#A1A1AA]">
            Select your services, date & time. Your booking message goes straight to our salon WhatsApp at <span className="font-mono font-bold text-[#141413] dark:text-[#F4F1EA]">+91 9575830421</span>.
          </p>
        </div>

        {submitted ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 flex items-center justify-center text-[#9A7848] dark:text-[#C5A059] shadow-lg">
              <Check className="w-8 h-8 stroke-[2.5]" />
            </div>
            <h3 className="font-display text-2xl font-bold text-[#141413] dark:text-[#F4F1EA]">
              WhatsApp Request Ready
            </h3>
            <p className="text-sm text-[#57534E] dark:text-[#A1A1AA] max-w-md mx-auto leading-relaxed">
              Your appointment details have opened in WhatsApp. Send the message to confirm your chair slot.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="min-h-[44px] px-5 py-2.5 rounded-xl text-xs font-semibold border border-stone-900/10 dark:border-white/10 bg-[#EBE6DC] dark:bg-[#18181B] text-[#141413] dark:text-[#F4F1EA] cursor-pointer"
              >
                Edit Booking
              </button>
              <button
                type="button"
                onClick={onClose}
                className="min-h-[44px] px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider btn-call cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleBookViaWhatsApp} className="mt-6 space-y-6">
            
            {/* 1. Service Selection (Non-CTA selection highlights use Champagne Brass instead of green) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#141413] dark:text-[#F4F1EA] flex items-center gap-1.5">
                  <Scissors className="w-3.5 h-3.5 text-[#9A7848] dark:text-[#C5A059]" />
                  <span>1. Select Grooming Services</span>
                </label>
                <span className="text-xs text-[#57534E] dark:text-[#A1A1AA]">
                  Duration: <strong className="text-[#141413] dark:text-[#F4F1EA] font-mono">~{totalDurationMinutes} mins</strong>
                </span>
              </div>

              {errors.selectedServices && (
                <p className="text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.selectedServices}</span>
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                {SERVICES.map((s) => {
                  const isChecked = formData.selectedServices.includes(s.id);
                  return (
                    <button
                      type="button"
                      key={s.id}
                      onClick={() => toggleService(s.id)}
                      aria-label={`${s.name}, ${s.durationMinutes} minutes`}
                      aria-pressed={isChecked}
                      className={`p-3 rounded-xl border text-left flex items-start justify-between gap-2 transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#EBE6DC] dark:bg-[#18181B] border-[#9A7848] dark:border-[#C5A059] text-[#141413] dark:text-[#F4F1EA] shadow-sm'
                          : 'bg-[#EBE6DC]/50 dark:bg-[#0B0B0C] border-stone-900/10 dark:border-white/10 text-[#57534E] dark:text-[#A1A1AA] hover:border-[#9A7848]/50 dark:hover:border-[#C5A059]/50'
                      }`}
                    >
                      <div className="space-y-1">
                        <p className={`text-xs font-bold ${isChecked ? 'text-[#141413] dark:text-[#F4F1EA]' : 'text-[#57534E] dark:text-[#A1A1AA]'}`}>
                          {s.name}
                        </p>
                        <p className="text-[11px] text-[#57534E] dark:text-[#A1A1AA]">
                          {s.durationMinutes} mins · Salon Consultation
                        </p>
                      </div>
                      <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                        isChecked ? 'bg-[#9A7848] dark:bg-[#C5A059] border-[#9A7848] dark:border-[#C5A059] text-white dark:text-black' : 'border-stone-400 dark:border-zinc-600'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Date & Time Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Date */}
              <div className="space-y-1.5">
                <label htmlFor="booking-date" className="text-xs font-bold uppercase tracking-wider text-[#141413] dark:text-[#F4F1EA] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#9A7848] dark:text-[#C5A059]" />
                  <span>2. Preferred Date</span>
                </label>
                <input
                  id="booking-date"
                  type="date"
                  min={todayStr}
                  value={formData.date}
                  onChange={(e) => handleDateChange(e.target.value)}
                  className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#0B0B0C] border text-xs sm:text-sm text-[#141413] dark:text-[#F4F1EA] focus:outline-none focus:border-[#9A7848] dark:focus:border-[#C5A059] ${
                    errors.date ? 'border-rose-500' : 'border-stone-900/15 dark:border-white/15'
                  }`}
                  required
                />
                {errors.date ? (
                  <p className="text-[11px] text-rose-600 dark:text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.date}</span>
                  </p>
                ) : (
                  <p className="text-[11px] text-[#57534E] dark:text-[#A1A1AA]">
                    Closed every Tuesday for salon deep cleaning.
                  </p>
                )}
              </div>

              {/* Time slot */}
              <div className="space-y-1.5">
                <label htmlFor="booking-time" className="text-xs font-bold uppercase tracking-wider text-[#141413] dark:text-[#F4F1EA] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#9A7848] dark:text-[#C5A059]" />
                  <span>3. Preferred Time Slot</span>
                </label>
                <select
                  id="booking-time"
                  value={formData.timeSlot}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, timeSlot: e.target.value }));
                    if (errors.timeSlot) setErrors(prev => ({ ...prev, timeSlot: '' }));
                  }}
                  className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#0B0B0C] border text-xs sm:text-sm text-[#141413] dark:text-[#F4F1EA] focus:outline-none focus:border-[#9A7848] dark:focus:border-[#C5A059] cursor-pointer ${
                    errors.timeSlot ? 'border-rose-500' : 'border-stone-900/15 dark:border-white/15'
                  }`}
                  required
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot} className="bg-white dark:bg-[#121214] text-[#141413] dark:text-[#F4F1EA]">
                      {slot}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-[#57534E] dark:text-[#A1A1AA]">
                  Salon Hours: 8:30 AM – 9:30 PM
                </p>
              </div>

            </div>

            {/* 3. Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="space-y-1.5">
                <label htmlFor="client-name" className="text-xs font-bold uppercase tracking-wider text-[#141413] dark:text-[#F4F1EA]">
                  Your Full Name
                </label>
                <input
                  id="client-name"
                  type="text"
                  placeholder="e.g. Aashif Khan"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, fullName: e.target.value }));
                    if (errors.fullName) setErrors(prev => ({ ...prev, fullName: '' }));
                  }}
                  className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#0B0B0C] border text-xs sm:text-sm text-[#141413] dark:text-[#F4F1EA] focus:outline-none focus:border-[#9A7848] dark:focus:border-[#C5A059] ${
                    errors.fullName ? 'border-rose-500' : 'border-stone-900/15 dark:border-white/15'
                  }`}
                  required
                />
                {errors.fullName && (
                  <p className="text-[11px] text-rose-600 dark:text-rose-400">{errors.fullName}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="client-phone" className="text-xs font-bold uppercase tracking-wider text-[#141413] dark:text-[#F4F1EA]">
                  WhatsApp Mobile Number
                </label>
                <input
                  id="client-phone"
                  type="tel"
                  placeholder="e.g. 9575830421"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, phone: e.target.value }));
                    if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                  }}
                  className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#0B0B0C] border text-xs sm:text-sm text-[#141413] dark:text-[#F4F1EA] focus:outline-none focus:border-[#9A7848] dark:focus:border-[#C5A059] ${
                    errors.phone ? 'border-rose-500' : 'border-stone-900/15 dark:border-white/15'
                  }`}
                  required
                />
                {errors.phone && (
                  <p className="text-[11px] text-rose-600 dark:text-rose-400">{errors.phone}</p>
                )}
              </div>

            </div>

            {/* 4. Notes */}
            <div className="space-y-1.5">
              <label htmlFor="client-notes" className="text-xs font-bold uppercase tracking-wider text-[#141413] dark:text-[#F4F1EA]">
                Style Request / Notes (Optional)
              </label>
              <input
                id="client-notes"
                type="text"
                placeholder="e.g. Low drop fade, sharp beard line-up, hot towel shave"
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-white dark:bg-[#0B0B0C] border border-stone-900/15 dark:border-white/15 text-xs sm:text-sm text-[#141413] dark:text-[#F4F1EA] focus:outline-none focus:border-[#9A7848] dark:focus:border-[#C5A059]"
              />
            </div>

            {/* 5. Pre-filled WhatsApp Preview */}
            <div className="p-3.5 rounded-xl bg-[#EBE6DC] dark:bg-[#0B0B0C] border border-stone-900/10 dark:border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#141413] dark:text-[#F4F1EA] flex items-center gap-1.5">
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp Message Preview (+91 9575830421)</span>
                </span>
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="flex items-center gap-1 text-[11px] font-semibold text-[#9A7848] dark:text-[#C5A059] hover:underline cursor-pointer"
                >
                  {copied ? <Check className="w-3 h-3 text-[#9A7848] dark:text-[#C5A059]" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy Text'}</span>
                </button>
              </div>
              <pre className="text-[11px] font-mono text-[#57534E] dark:text-[#A1A1AA] whitespace-pre-wrap bg-[#F4F1EA] dark:bg-[#121214] p-2.5 rounded-lg border border-stone-900/10 dark:border-white/10 max-h-24 overflow-y-auto">
                {generatedPreview}
              </pre>
            </div>

            {/* Action Buttons: Strict Green WhatsApp CTA Preserved */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                className="w-full flex-1 flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider btn-whatsapp shadow-lg hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5 text-white" />
                <span>Confirm & Send on WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-4 rounded-xl text-xs font-semibold text-[#57534E] dark:text-[#A1A1AA] hover:text-[#141413] dark:hover:text-[#F4F1EA] border border-stone-900/10 dark:border-white/10 cursor-pointer"
              >
                Cancel
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
