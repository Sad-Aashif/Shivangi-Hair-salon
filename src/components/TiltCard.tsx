import { ReactNode, useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

export default function TiltCard({
  children,
  className = '',
  maxTilt = 4,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isTouchOrReduced, setIsTouchOrReduced] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);

  const rotateX = useSpring(rawRotateX, { stiffness: 260, damping: 25 });
  const rotateY = useSpring(rawRotateY, { stiffness: 260, damping: 25 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsTouchOrReduced(coarse || reduced);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchOrReduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -maxTilt;
    const tiltY = ((x - centerX) / centerX) * maxTilt;

    rawRotateX.set(Number(tiltX.toFixed(2)));
    rawRotateY.set(Number(tiltY.toFixed(2)));

    cardRef.current.style.setProperty('--glow-x', `${Math.round(x)}px`);
    cardRef.current.style.setProperty('--glow-y', `${Math.round(y)}px`);
  };

  const handleMouseEnter = () => {
    if (!isTouchOrReduced) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  if (isTouchOrReduced) {
    return (
      <div
        className={`relative border border-stone-900/10 dark:border-white/10 transition-colors duration-300 ${className}`}
      >
        {children}
      </div>
    );
  }

  return (
    <div style={{ perspective: '1200px' }} className="w-full h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
        className={`group/tilt relative border border-stone-900/10 dark:border-white/10 hover:border-[#9A7848]/55 dark:hover:border-[#C5A059]/55 transition-[border-color,box-shadow] duration-300 ${className}`}
      >
        {/* Dynamic Metallic Barber Gold Specular Border & Surface Sheen */}
        {isHovered && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] z-0 transition-opacity duration-300"
            style={{
              background:
                'radial-gradient(320px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(197, 160, 89, 0.14), transparent 65%)',
            }}
          />
        )}
        <div
          className="relative z-10 w-full h-full"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
