import { ReactNode, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ThemeProvider } from './context/ThemeContext';
import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import Craftsmanship from './components/Craftsmanship';
import ServiceMenu from './components/ServiceMenu';
import ConsultationQuiz from './components/ConsultationQuiz';
import Lookbook from './components/Lookbook';
import Reviews from './components/Reviews';
import LocationHub from './components/LocationHub';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import FloatingSideCTA from './components/FloatingSideCTA';
import { SALON_INFO } from './data/salonData';
import { createWhatsAppUrl, openExternalUrl } from './utils/booking';

function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.985 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: 'transform, opacity' }}
      className="bg-transparent"
    >
      {children}
    </motion.div>
  );
}

interface AppContentProps {
  onOpenBooking: (serviceId?: string, note?: string) => void;
  onOpenWhatsAppDirect: () => void;
  onSelectLookbookStyle: (styleTitle: string) => void;
}

function AppRoutes({
  onOpenBooking,
  onOpenWhatsAppDirect,
  onSelectLookbookStyle,
}: AppContentProps) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-transparent text-[#141413] dark:text-[#F4F1EA] flex flex-col selection:bg-[#C5A059] selection:text-white">
      {/* Mounted ONCE right above <Routes> */}
      <AnimatedBackground />

      <Navbar />

      <main className="flex-1 bg-transparent">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Route 1: / (Showcase) */}
            <Route
              path="/"
              element={
                <PageTransition>
                  <Hero onOpenBooking={() => onOpenBooking()} />
                  <TrustStrip />
                  <Craftsmanship
                    onOpenBooking={() => onOpenBooking('sig-cut', 'Face-Shape Consultation')}
                  />
                  <ServiceMenu
                    onSelectServiceModal={(serviceId) => onOpenBooking(serviceId)}
                  />
                  <ConsultationQuiz />
                  <Lookbook onSelectStyle={onSelectLookbookStyle} />
                  <Reviews />
                  <LocationHub onOpenWhatsApp={onOpenWhatsAppDirect} />
                </PageTransition>
              }
            />

            {/* Route 2: /craftsman (Master Barber & Hygiene Architecture) */}
            <Route
              path="/craftsman"
              element={
                <PageTransition>
                  <Craftsmanship
                    onOpenBooking={() => onOpenBooking('sig-cut', 'Face-Shape Consultation')}
                  />
                  <TrustStrip />
                  <ConsultationQuiz />
                  <Reviews />
                </PageTransition>
              }
            />

            {/* Route 3: /menu (Service Menu & Session Planner) */}
            <Route
              path="/menu"
              element={
                <PageTransition>
                  <ServiceMenu
                    onSelectServiceModal={(serviceId) => onOpenBooking(serviceId)}
                  />
                  <TrustStrip />
                  <ConsultationQuiz />
                </PageTransition>
              }
            />

            {/* Route 4: /salon (Salon Lookbook, Hygiene & Location Hub) */}
            <Route
              path="/salon"
              element={
                <PageTransition>
                  <Lookbook onSelectStyle={onSelectLookbookStyle} />
                  <Reviews />
                  <LocationHub onOpenWhatsApp={onOpenWhatsAppDirect} />
                </PageTransition>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer
        onOpenBooking={() => onOpenBooking()}
        onOpenWhatsApp={onOpenWhatsAppDirect}
      />

      <FloatingSideCTA onOpenWhatsApp={onOpenWhatsAppDirect} />
    </div>
  );
}

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preSelectedServiceId, setPreSelectedServiceId] = useState<string | undefined>(undefined);
  const [bookingNote, setBookingNote] = useState<string>('');

  const handleOpenBooking = (serviceId?: string, note?: string) => {
    setPreSelectedServiceId(serviceId);
    setBookingNote(note || '');
    setIsBookingOpen(true);
  };

  const handleOpenWhatsAppDirect = () => {
    const defaultMsg = `Hello Shivangi Hair Salon, I would like to book a chair at your Bhopal salon (Bhensakhedi Road). Could you please let me know current availability?`;
    const url = createWhatsAppUrl(SALON_INFO.rawPhone, defaultMsg);
    openExternalUrl(url);
  };

  const handleSelectLookbookStyle = (styleTitle: string) => {
    handleOpenBooking('sig-cut', `Requested style: ${styleTitle}`);
  };

  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppRoutes
          onOpenBooking={handleOpenBooking}
          onOpenWhatsAppDirect={handleOpenWhatsAppDirect}
          onSelectLookbookStyle={handleSelectLookbookStyle}
        />

        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          preSelectedServiceId={preSelectedServiceId}
          initialNote={bookingNote}
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}
