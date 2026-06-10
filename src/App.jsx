import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

// Components
import CustomCursor from './components/CustomCursor';
import NoiseOverlay from './components/NoiseOverlay';
import Hero3D from './components/Hero3D';
import HeroForeground from './components/HeroForeground';
import SelectedWork from './components/SelectedWork';
import BentoGrid from './components/BentoGrid';
import Footer from './components/Footer';
import SleekLoader from './components/SleekLoader';

export default function App() {
  const [loading, setLoading] = useState(true);

  // Disable automatic scroll restoration on refresh/reload
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Setup Lenis Smooth Scroll
  useEffect(() => {
    if (loading) return; // Wait until loader finishes

    // Force top of page — runs right as content becomes visible
    window.scrollTo(0, 0);
    // Also clear any URL hash that could anchor-scroll the browser
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }

    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Force scroll to top on Lenis init
    lenis.scrollTo(0, { immediate: true });

    // Double check scroll state after browser layout engine finishes paint
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
    }, 50);

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [loading]);

  // Lock / unlock body scroll in sync with loading state
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [loading]);

  return (
    <div className="relative w-full min-h-screen bg-[#030303] overflow-x-hidden text-neutral-200">
      
      {/* Custom Cursor follower */}
      <CustomCursor />
      
      {/* CRT noise and vignette screen overlays */}
      <NoiseOverlay />

      {/* Global Interactive 3D Canvas Background */}
      <Hero3D />

      <AnimatePresence mode="wait">
        {loading ? (
          <SleekLoader onComplete={() => setLoading(false)} />
        ) : (
          /* Main Portfolio Application layout */
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full"
          >
            {/* Hero Section */}
            <header className="relative w-full h-screen">
              {/* Overlay Foreground Text */}
              <HeroForeground />
            </header>

            {/* Selected Work (Pinned scroll section) */}
            <SelectedWork />

            {/* About & Services (Bento Grid) */}
            <BentoGrid />

            {/* Footer Contact & Dynamic CTA */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
