import React, { useEffect, useRef, useMemo } from 'react';
import { initializeHeroAnimation, cleanupHeroAnimation } from './heroAnimation';
import { generateStripClipPath } from './PaperTear';
import './Hero.css';

const STRIP_COUNT = 7;

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cartoonRef = useRef<HTMLImageElement | null>(null);
  const stripRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ReturnType<typeof initializeHeroAnimation>>(null);
  const hasScrolledRef = useRef(false);

  // Computed once — stable across re-renders, so tear edges never flicker.
  const strips = useMemo(
    () =>
      Array.from({ length: STRIP_COUNT }, (_, i) => ({
        clipPath: generateStripClipPath(i, STRIP_COUNT),
        stagger: i / STRIP_COUNT,
        rotate: (i % 2 === 0 ? -1 : 1) * (4 + ((i * 7) % 5)),
      })),
    []
  );

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      containerRef.current?.classList.add('reduced-motion');
      return;
    }

    triggerRef.current = initializeHeroAnimation({
      containerRef,
      cartoonRef,
      onProgressUpdate: (progress) => {
        if (progress > 0.05 && !hasScrolledRef.current) {
          hasScrolledRef.current = true;
          if (scrollIndicatorRef.current) {
            scrollIndicatorRef.current.style.opacity = '0';
          }
        }

        strips.forEach((strip, i) => {
          const el = stripRefs.current[i];
          if (!el) return;
          const local = Math.min(
            1,
            Math.max(0, (progress - strip.stagger * 0.6) / 0.5)
          );
          el.style.opacity = String(1 - local);
          el.style.transform = `translate(-50%, -50%) translateY(${local * 60}px) rotateZ(${local * strip.rotate}deg)`;
        });
      },
    });

    return () => cleanupHeroAnimation(triggerRef.current);
  }, [strips]);

  return (
    <div className="hero-section" ref={containerRef}>
      <div className="hero-background" />

      {/* Cartoon portrait — static, sits underneath, revealed as strips peel away */}
      <img
        ref={cartoonRef}
        src="/images/hero-art.png"
        alt="Cartoon portrait"
        className="hero-portrait cartoon-portrait"
      />

      {/* Photo, split into torn strips that peel away on scroll */}
      <div
        className="photo-strip-wrap"
        role="img"
        aria-label="Keynt - Software Developer, Graphic Designer, Music Producer"
      >
        {strips.map((strip, i) => (
          <div
            key={i}
            ref={(el) => { stripRefs.current[i] = el; }}
            className="photo-strip"
            style={{
              clipPath: strip.clipPath,
              backgroundImage: 'url(/images/hero-real.png)',
            }}
          />
        ))}
      </div>

      <div className="paper-edge-shadow" />

      <div className="hero-content">
        <h1 className="hero-title">
          HI, I'M <span className="hero-name">KEYNT.</span>
        </h1>
        <div className="hero-subtitle">
          <p>SOFTWARE DEVELOPER</p>
          <p>GRAPHIC DESIGNER</p>
          <p>MUSIC PRODUCER</p>
        </div>
      </div>

      <div className="scroll-indicator" ref={scrollIndicatorRef}>
        <span>SCROLL</span>
        <div className="scroll-arrow">↓</div>
      </div>
    </div>
  );
};

export default Hero;