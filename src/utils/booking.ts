import { BookingFormData, BookingValidationResult, ServiceItem } from '../types';

/**
 * Checks if a date string (YYYY-MM-DD) falls on a Tuesday.
 * The salon is closed on Tuesdays.
 */
export function isTuesday(dateStr: string): boolean {
  if (!dateStr) return false;
  const [year, month, day] = dateStr.split('-').map(Number);
  if (!year || !month || !day) return false;
  // Create date using local midnight
  const date = new Date(year, month - 1, day);
  return date.getDay() === 2; // 0 = Sun, 1 = Mon, 2 = Tue
}

/**
 * Checks if dateStr (YYYY-MM-DD) is in the past compared to today's local date.
 */
export function isPastDate(dateStr: string): boolean {
  if (!dateStr) return false;
  const [year, month, day] = dateStr.split('-').map(Number);
  if (!year || !month || !day) return false;
  
  const targetDate = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return targetDate.getTime() < today.getTime();
}

/**
 * Generates salon operational time slots from 8:30 AM to 9:00 PM in 30-min increments.
 */
export function generateTimeSlots(): string[] {
  const slots: string[] = [];
  // 8:30 AM to 9:00 PM (21:00)
  let currentMinutes = 8 * 60 + 30; // 510 mins
  const endMinutes = 21 * 60; // 1260 mins

  while (currentMinutes <= endMinutes) {
    const hours24 = Math.floor(currentMinutes / 60);
    const mins = currentMinutes % 60;
    const period = hours24 >= 12 ? 'PM' : 'AM';
    const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
    const formattedMinutes = mins < 10 ? `0${mins}` : mins;
    slots.push(`${hours12}:${formattedMinutes} ${period}`);
    currentMinutes += 30;
  }

  return slots;
}

/**
 * Calculates total duration and price range for selected services.
 */
export function calculateBookingTotal(
  selectedIds: string[],
  allServices: ServiceItem[]
): {
  totalDurationMinutes: number;
  minPrice: number;
  maxPrice: number;
  selectedItems: ServiceItem[];
} {
  const selectedItems = allServices.filter(s => selectedIds.includes(s.id));
  const totalDurationMinutes = selectedItems.reduce((acc, s) => acc + s.durationMinutes, 0);
  const minPrice = selectedItems.reduce((acc, s) => acc + s.priceMin, 0);
  const maxPrice = selectedItems.reduce((acc, s) => acc + s.priceMax, 0);

  return {
    totalDurationMinutes,
    minPrice,
    maxPrice,
    selectedItems,
  };
}

/**
 * Validates Indian phone number format (10 digits, optional +91 prefix).
 */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  // Matches 10-digit number starting with 6, 7, 8, or 9; or with country code +91 or 91 or 0
  const indianPhoneRegex = /^(?:\+?91|0)?[6-9]\d{9}$/;
  return indianPhoneRegex.test(cleaned);
}

/**
 * Validates the booking form state.
 */
export function validateBookingForm(data: BookingFormData): BookingValidationResult {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name (at least 2 characters).";
  }

  if (!data.phone || !isValidPhone(data.phone)) {
    errors.phone = "Please enter a valid 10-digit mobile number.";
  }

  if (!data.selectedServices || data.selectedServices.length === 0) {
    errors.selectedServices = "Please select at least one grooming service.";
  }

  if (!data.date) {
    errors.date = "Please select a preferred appointment date.";
  } else if (isPastDate(data.date)) {
    errors.date = "Selected date cannot be in the past.";
  } else if (isTuesday(data.date)) {
    errors.date = "Shivangi Salon is closed on Tuesdays. Please choose another day.";
  }

  if (!data.timeSlot) {
    errors.timeSlot = "Please pick a preferred time slot.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Formats a clean, professional booking message for WhatsApp.
 */
export function formatWhatsAppBookingMessage(
  data: BookingFormData,
  allServices: ServiceItem[]
): string {
  const { selectedItems, totalDurationMinutes, minPrice, maxPrice } = calculateBookingTotal(
    data.selectedServices,
    allServices
  );

  const serviceNames = selectedItems.map(s => `• ${s.name} (~${s.durationMinutes}m)`).join('\n');
  const priceRange = minPrice === maxPrice ? `₹${minPrice}` : `₹${minPrice} - ₹${maxPrice}`;

  return [
    `*APPOINTMENT RESERVATION - SHIVANGI HAIR SALON*`,
    `--------------------------------------`,
    `*Client Name:* ${data.fullName.trim()}`,
    `*Contact:* ${data.phone.trim()}`,
    `*Preferred Date:* ${data.date}`,
    `*Preferred Time Slot:* ${data.timeSlot}`,
    ``,
    `*Selected Services:*`,
    serviceNames || '• Consultation Required',
    ``,
    `*Estimated Duration:* ~${totalDurationMinutes} minutes`,
    `*Pricing:* Consultation Required`,
    data.notes ? `*Notes/Preferences:* ${data.notes.trim()}` : ``,
    ``,
    `*Salon Location:* Near The Fitness Planet, Bhensakhedi Road, Bhopal`,
    `Kindly confirm chair availability.`
  ].filter(line => line !== null && line !== undefined).join('\n');
}

/**
 * Constructs direct WhatsApp API deep link.
 */
export function createWhatsAppUrl(rawPhone: string, message: string): string {
  const cleanPhone = rawPhone.replace(/\D/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Safely opens an external link (like WhatsApp or Facebook) without relying on window.open()
 * which is restricted by iframe sandboxes and popup blockers.
 */
export function openExternalUrl(url: string): void {
  if (typeof window === 'undefined') return;
  try {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch {
    window.location.href = url;
  }
}
