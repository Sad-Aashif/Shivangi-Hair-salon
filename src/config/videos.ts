export interface MacroVideoAsset {
  id: 'hero' | 'trustStrip' | 'serviceMenu';
  title: string;
  description: string;
  envUrl?: string;
  localPath: string;
  cdnFallback: string;
  poster: string;
  sources: string[];
}

export interface VideoSources {
  hero: string;
  trust: string;
  services: string;
  serviceMenu: string;
  trustStrip: string;
}

const envHeroUrl = import.meta.env?.VITE_VIDEO_HERO_URL?.trim();
const envTrustUrl = import.meta.env?.VITE_VIDEO_TRUST_URL?.trim();
const envServicesUrl = import.meta.env?.VITE_VIDEO_SERVICES_URL?.trim();

function buildSourceChain(envUrl: string | undefined, localPath: string, cdnFallback: string): string[] {
  const list: string[] = [];
  if (envUrl && envUrl.length > 0) {
    list.push(envUrl);
  }
  list.push(localPath);
  list.push(cdnFallback);
  return list;
}

/**
 * 3 Custom 3D Macro Videos mapped to their exact visual storytelling:
 * - Video 1 (Hero Showcase): 3D Macro Brushed-Steel Clipper rotating on dark reflective glass
 * - Video 2 (Service Menu): Macro Steaming Folded Black Hot Towel on dark wood grain
 * - Video 3 (Trust Strip & Hygiene): Macro Black Japanese Straight Razor on dark slate with floating golden dust particles
 */
export const MACRO_VIDEOS: Record<'hero' | 'trustStrip' | 'serviceMenu', MacroVideoAsset> = {
  hero: {
    id: 'hero',
    title: '3D Macro Brushed-Steel Clipper',
    description: '3D Macro Brushed-Steel Clipper rotating on dark reflective glass',
    envUrl: envHeroUrl,
    localPath: '/videos/clipper-3d.mp4',
    cdnFallback: 'https://assets.mixkit.co/videos/preview/mixkit-barber-cutting-hair-with-clippers-43232-large.mp4',
    poster: '/crop_fade.jpg',
    sources: buildSourceChain(
      envHeroUrl,
      '/videos/clipper-3d.mp4',
      'https://assets.mixkit.co/videos/preview/mixkit-barber-cutting-hair-with-clippers-43232-large.mp4'
    ),
  },
  trustStrip: {
    id: 'trustStrip',
    title: 'Macro Black Japanese Straight Razor',
    description: 'Macro Black Japanese Straight Razor on dark slate with floating golden dust particles',
    envUrl: envTrustUrl,
    localPath: '/videos/razor-3d.mp4',
    cdnFallback: 'https://assets.mixkit.co/videos/preview/mixkit-barber-shaving-a-bearded-man-with-a-razor-43235-large.mp4',
    poster: '/razor_shave.jpg',
    sources: buildSourceChain(
      envTrustUrl,
      '/videos/razor-3d.mp4',
      'https://assets.mixkit.co/videos/preview/mixkit-barber-shaving-a-bearded-man-with-a-razor-43235-large.mp4'
    ),
  },
  serviceMenu: {
    id: 'serviceMenu',
    title: 'Macro Steaming Folded Black Hot Towel',
    description: 'Macro Steaming Folded Black Hot Towel on dark wood grain',
    envUrl: envServicesUrl,
    localPath: '/videos/towel-3d.mp4',
    cdnFallback: 'https://assets.mixkit.co/videos/preview/mixkit-man-getting-his-beard-shaved-at-the-barbershop-43225-large.mp4',
    poster: '/beard_sculpt.jpg',
    sources: buildSourceChain(
      envServicesUrl,
      '/videos/towel-3d.mp4',
      'https://assets.mixkit.co/videos/preview/mixkit-man-getting-his-beard-shaved-at-the-barbershop-43225-large.mp4'
    ),
  },
};

export const VIDEOS: VideoSources = {
  hero: MACRO_VIDEOS.hero.envUrl || MACRO_VIDEOS.hero.cdnFallback,
  trust: MACRO_VIDEOS.trustStrip.envUrl || MACRO_VIDEOS.trustStrip.cdnFallback,
  services: MACRO_VIDEOS.serviceMenu.envUrl || MACRO_VIDEOS.serviceMenu.cdnFallback,
  trustStrip: MACRO_VIDEOS.trustStrip.envUrl || MACRO_VIDEOS.trustStrip.cdnFallback,
  serviceMenu: MACRO_VIDEOS.serviceMenu.envUrl || MACRO_VIDEOS.serviceMenu.cdnFallback,
};

export interface HeroSlideConfig {
  id: string;
  asset: MacroVideoAsset;
  videoUrl: string;
  eyebrow: string;
  headline: string;
  subtext: string;
  shortLabel: string;
}

export const HERO_CAROUSEL_SLIDES: HeroSlideConfig[] = [
  {
    id: 'slide-clipper',
    asset: MACRO_VIDEOS.hero,
    videoUrl: VIDEOS.hero,
    eyebrow: "BHOPAL'S #1 MEN'S SALON · 4.9★ GOOGLE RATED (148+ REVIEWS)",
    headline: 'Sirf Haircut Nahi, Aapka Pura Look Upgrade Karte Hain.',
    subtext:
      'Har baar naye barber se baal kharab hone ka darr khatam. Aapke face shape ke hisaab se perfect Skin Fade aur Haircut — taaki salon se nikalte hi log notice karein.',
    shortLabel: '01 · Precision Haircut',
  },
  {
    id: 'slide-razor',
    asset: MACRO_VIDEOS.trustStrip,
    videoUrl: VIDEOS.trust,
    eyebrow: '100% FRESH BLADE GUARANTEE · ZERO SKIN IRRITATION',
    headline: 'Sharpest Beard Line-Up. Har Customer Ke Liye Naya Blade.',
    subtext:
      'Jaldi-baazi wale cuts ko bhool jaiye. UV-sanitized tools aur fresh single-use blade ke saath paayein ekdum sharp jawline aur clean beard styling.',
    shortLabel: '02 · Fresh Blade Beard Line-Up',
  },
  {
    id: 'slide-towel',
    asset: MACRO_VIDEOS.serviceMenu,
    videoUrl: VIDEOS.services,
    eyebrow: 'VIP CHAIR EXPERIENCE · WALK-IN OR BOOK ON WHATSAPP',
    headline: '45 Minute Sukoon Ke. Thakan Mitao Aur Royal Look Paao.',
    subtext:
      'Garam towel steam, relaxing head massage aur premium grooming. Weekend par chairs jaldi full ho jaati hain — bina waiting ke abhi WhatsApp par apni chair book karein.',
    shortLabel: '03 · Hot Towel & Head Massage',
  },
];
