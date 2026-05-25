'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Zap, ShieldCheck, CheckCircle2, Truck, CreditCard } from 'lucide-react';
import CountdownTimer from '@/components/ui/CountdownTimer';

const flashEnd = new Date(Date.now() + 7 * 60 * 60 * 1000).toISOString();

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-space-black pt-32 pb-16">
      {/* Background Lighting & futuristic grid lines */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-brand/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 grid-lines opacity-25 pointer-events-none" />
      
      {/* Glow lines accentuating outer grid */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
      
      {/* Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-8 text-center flex flex-col items-center w-full">
        {/* Dynamic status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand/30 bg-brand/10 mb-8"
        >
          <div className="w-2 h-2 rounded-full bg-brand animate-ping" />
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-white">
            🇶🇦 Doha Warehouse Drop: ACTIVE & ONLINE
          </span>
        </motion.div>

        {/* Gamified Futuristic Header */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="heading-hero font-black tracking-tighter text-white mb-6 uppercase"
        >
          LIMITLESS <br className="sm:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand via-brand-glow to-white text-glow-brand">
            HARDWARE.
          </span>
        </motion.h1>

        {/* Clear Trust-Filled Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-text-secondary text-base sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
        >
          Qatar's ultimate tech dropzone. Secure premium gaming rigs, authentic Apple ecosystems, and verified creator gear. Hand-delivered inside Doha in 2 hours with zero custom delays.
        </motion.p>

        {/* Cyber CTA Triggers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-12"
        >
          <Link href="/products?filter=flash-sale">
            <button className="btn-brand px-10 py-5 rounded-2xl text-sm sm:text-base font-bold tracking-widest uppercase flex items-center shadow-brand">
              <Zap className="w-5 h-5 mr-2 animate-bounce" />
              Enter The Drops
            </button>
          </Link>
          <Link href="/products">
            <button className="btn-ghost px-10 py-5 rounded-2xl text-sm sm:text-base font-bold tracking-widest uppercase flex items-center bg-white/5 backdrop-blur-md">
              Browse Terminal
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </Link>
        </motion.div>

        {/* Quick Doha Verification Row - Building Trust Immediately */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full mb-16 px-4 py-6 rounded-2xl border border-glass bg-space-navy/40 backdrop-blur-sm"
        >
          <div className="flex items-center justify-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5 text-brand" />
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">Doha 2h Express</p>
              <p className="text-[10px] text-text-secondary">Free delivery, zero custom fees</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-5 h-5 text-accent-blue" />
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">Cash on Delivery</p>
              <p className="text-[10px] text-text-secondary">Pay cash or swipe card at door</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">Authentic GCC Warranty</p>
              <p className="text-[10px] text-text-secondary">100% original brand products</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Massive Centered Setup Showcase with Interactive Holographic Hotspots */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-6xl mx-auto px-5 mt-4"
      >
        <div className="relative aspect-[16/9] md:aspect-[21/9] w-full group">
          {/* Main showcase background layout */}
          <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden border border-glass shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=1600"
              alt="Premium Gaming Setup Room"
              fill
              className="object-cover transition-transform duration-[2s] group-hover:scale-105"
              priority
            />
            {/* Dark fade layers */}
            <div className="absolute inset-0 bg-gradient-to-t from-space-black via-transparent to-transparent" />
            <div className="absolute inset-0 bg-space-black/20" />
          </div>

          {/* Interactive HOTSPOT 1: Laptop (Razer Blade 16) */}
          <div className="absolute top-[48%] left-[50%] z-30">
            <div className="relative group/hotspot">
              {/* Pulsing ring */}
              <div className="absolute -left-3 -top-3 w-6 h-6 rounded-full bg-brand/40 animate-ping pointer-events-none" />
              <button className="relative w-3.5 h-3.5 rounded-full bg-brand border-2 border-white cursor-pointer shadow-brand focus:outline-none" />
              
              {/* Tooltip Card */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 glass p-3 rounded-xl border-brand shadow-brand opacity-0 scale-95 group-hover/hotspot:opacity-100 group-hover/hotspot:scale-100 pointer-events-none transition-all duration-300 z-50">
                <span className="text-[8px] uppercase tracking-widest text-brand font-black">Trending in Doha</span>
                <p className="text-xs font-bold text-white mt-0.5">Razer Blade 16</p>
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-glass">
                  <span className="text-xs font-display font-bold text-white">QAR 8,999</span>
                  <span className="text-[8px] font-bold text-green-400 flex items-center gap-1">
                    <CheckCircle2 className="w-2 h-2" /> In Stock
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive HOTSPOT 2: Console (PS5 Slim) */}
          <div className="absolute top-[65%] left-[28%] z-30">
            <div className="relative group/hotspot">
              {/* Pulsing ring */}
              <div className="absolute -left-3 -top-3 w-6 h-6 rounded-full bg-brand/40 animate-ping pointer-events-none" />
              <button className="relative w-3.5 h-3.5 rounded-full bg-brand border-2 border-white cursor-pointer shadow-brand focus:outline-none" />
              
              {/* Tooltip Card */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 glass p-3 rounded-xl border-brand shadow-brand opacity-0 scale-95 group-hover/hotspot:opacity-100 group-hover/hotspot:scale-100 pointer-events-none transition-all duration-300 z-50">
                <span className="text-[8px] uppercase tracking-widest text-brand font-black">High Demand Drop</span>
                <p className="text-xs font-bold text-white mt-0.5">PlayStation 5 Slim</p>
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-glass">
                  <span className="text-xs font-display font-bold text-white">QAR 1,899</span>
                  <span className="text-[8px] font-bold text-danger animate-pulse">3 Left</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive HOTSPOT 3: Earbuds (AirPods Pro) */}
          <div className="absolute top-[60%] left-[73%] z-30">
            <div className="relative group/hotspot">
              {/* Pulsing ring */}
              <div className="absolute -left-3 -top-3 w-6 h-6 rounded-full bg-accent-blue/40 animate-ping pointer-events-none" />
              <button className="relative w-3.5 h-3.5 rounded-full bg-accent-blue border-2 border-white cursor-pointer shadow-blue focus:outline-none" />
              
              {/* Tooltip Card */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 glass p-3 rounded-xl border-blue shadow-blue opacity-0 scale-95 group-hover/hotspot:opacity-100 group-hover/hotspot:scale-100 pointer-events-none transition-all duration-300 z-50">
                <span className="text-[8px] uppercase tracking-widest text-accent-blue font-black">Premium Audio</span>
                <p className="text-xs font-bold text-white mt-0.5">AirPods Pro (2nd Gen)</p>
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-glass">
                  <span className="text-xs font-display font-bold text-white">QAR 849</span>
                  <span className="text-[8px] font-bold text-green-400 flex items-center gap-1">
                    <CheckCircle2 className="w-2 h-2" /> In Stock
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Live Drop Floating Banner */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 glass px-6 sm:px-8 py-4 rounded-3xl border border-brand/50 shadow-brand flex flex-col sm:flex-row items-center gap-4 sm:gap-6 whitespace-nowrap w-max max-w-[90vw]">
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-[10px] uppercase tracking-widest font-bold text-brand mb-1">Cyber Drop Countdown</span>
              <CountdownTimer endDate={flashEnd} size="sm" />
            </div>
            <div className="hidden sm:block w-px h-10 bg-glass-border" />
            <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-widest">
              <div className="w-2 h-2 rounded-full bg-danger animate-pulse" />
              Allocations Depleting
            </div>
          </div>
        </div>
      </motion.div>

    </section>
  );
}

