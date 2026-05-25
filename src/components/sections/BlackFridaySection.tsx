'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Zap, AlertTriangle } from 'lucide-react';
import CountdownTimer from '@/components/ui/CountdownTimer';

const dropEnd = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();

export default function BlackFridaySection() {
  return (
    <section className="relative overflow-hidden py-32 bg-space-black border-y border-brand/20">
      {/* Intense red/orange glow */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-brand blur-[120px] rounded-full" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center">
        {/* Warning label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-danger/30 bg-danger/10 mb-8"
        >
          <AlertTriangle className="w-4 h-4 text-danger animate-pulse" />
          <span className="text-xs font-bold tracking-[0.2em] text-danger uppercase">
            Global Tech Drop Active
          </span>
        </motion.div>

        {/* Drop Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            className="text-[4rem] sm:text-[8rem] lg:text-[10rem] font-black tracking-tighter leading-none mb-2"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            <span className="text-brand text-glow-brand">CYBER</span>
            <span className="text-white">DROP</span>
          </h2>
        </motion.div>

        {/* Discount */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <p className="text-2xl sm:text-4xl font-bold text-titanium mb-4">
            System Overrided. Prices slashed up to 70%.
          </p>
          <p className="text-text-muted text-base max-w-2xl mx-auto">
            Limited allocation available. Inventory updates in real-time. Secure your hardware before total depletion.
          </p>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center gap-4 mb-12"
        >
          <p className="text-xs text-brand font-mono uppercase tracking-[0.3em]">Network Lock In</p>
          <div className="glass px-8 py-6 rounded-3xl border-brand/50 shadow-brand">
            <CountdownTimer endDate={dropEnd} size="lg" />
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center"
        >
          <Link href="/products?filter=black-friday">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 rounded-2xl bg-white text-space-black font-bold text-lg uppercase tracking-widest flex items-center gap-3 hover:bg-brand hover:text-white transition-colors duration-300 shadow-glass"
            >
              <Zap className="w-5 h-5" />
              Enter The Drop
            </motion.button>
          </Link>
          
          <div className="mt-8 flex gap-8 font-mono text-xs text-text-muted uppercase tracking-widest">
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"/> Inventory Live</span>
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse"/> High Traffic</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
