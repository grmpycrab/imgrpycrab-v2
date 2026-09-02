import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimationConfig {
  containerRef: React.RefObject<HTMLDivElement | null>;
  cartoonRef: React.RefObject<HTMLImageElement | null>;
  onProgressUpdate?: (progress: number) => void;
}

export const initializeHeroAnimation = ({
  containerRef,
  cartoonRef,
  onProgressUpdate,
}: AnimationConfig): ScrollTrigger | null => {
  if (!containerRef.current) return null;

  if (cartoonRef.current) {
    gsap.set(cartoonRef.current, { opacity: 1 });
  }

  return ScrollTrigger.create({
    trigger: containerRef.current,
    start: 'top top',
    end: '+=2000',
    pin: true,
    pinSpacing: true,
    scrub: 1,
    onUpdate: (self) => onProgressUpdate?.(self.progress),
  });
};

export const cleanupHeroAnimation = (trigger: ScrollTrigger | null): void => {
  trigger?.kill();
};