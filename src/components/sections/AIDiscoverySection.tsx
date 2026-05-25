'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '@/data/products';
import { SetupType } from '@/types';
import ProductCard from '@/components/product/ProductCard';
import { Monitor, Briefcase, Plane, Video, Smartphone, Cpu } from 'lucide-react';

const setups: { type: SetupType; label: string; icon: any; desc: string; tag: string }[] = [
  { type: 'gaming', label: 'Pro Gamer', icon: Monitor, desc: 'Maximum FPS. Zero latency.', tag: 'gaming' },
  { type: 'creator', label: 'Content Creator', icon: Video, desc: 'Studio quality setups.', tag: 'creator' },
  { type: 'apple', label: 'Apple Ecosystem', icon: Smartphone, desc: 'Seamless integration.', tag: 'apple' },
  { type: 'travel', label: 'Digital Nomad', icon: Plane, desc: 'Power on the go.', tag: 'portable' },
  { type: 'work', label: 'Executive', icon: Briefcase, desc: 'Premium productivity.', tag: 'creator' },
];

export default function AIDiscoverySection() {
  const [activeSetup, setActiveSetup] = useState<SetupType>('gaming');

  const filteredProducts = products.filter((p) => {
    const setup = setups.find((s) => s.type === activeSetup);
    if (!setup) return false;
    return p.tags.some((t) => t.includes(setup.tag)) || p.category.toLowerCase().includes(setup.tag);
  }).slice(0, 4);

  const currentDesc = setups.find((s) => s.type === activeSetup)?.desc || '';

  return (
    <section className="py-24 bg-space-black relative overflow-hidden scan-line">
      {/* Decorative background element and micro-grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 grid-lines-blue opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Terminal Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue/20 bg-blue/5 mb-6"
          >
            <Cpu className="w-4 h-4 text-accent-blue animate-pulse" />
            <span className="text-xs font-bold tracking-widest uppercase text-accent-blue font-mono">SYSTEM CALIBRATOR V2.6</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg text-white mb-6"
          >
            Configure Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-brand">Reality.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-lg"
          >
            Select your main deployment objective. Our system will calibrate the perfect hardware ecosystem for your needs, optimized for local GCC configurations.
          </motion.p>
        </div>

        {/* Setup Selector Terminal Console */}
        <div className="max-w-4xl mx-auto mb-16 p-2.5 rounded-3xl glass-sm border border-glass flex flex-wrap justify-center gap-2 relative">
          {/* Cybernetic outer corner brackets */}
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-brand/50 rounded-tl-lg pointer-events-none" />
          <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-brand/50 rounded-tr-lg pointer-events-none" />
          <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-brand/50 rounded-bl-lg pointer-events-none" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-brand/50 rounded-br-lg pointer-events-none" />

          {setups.map((setup) => {
            const Icon = setup.icon;
            const isActive = activeSetup === setup.type;

            return (
              <button
                key={setup.type}
                onClick={() => setActiveSetup(setup.type)}
                className={`relative flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 ${
                  isActive ? 'text-white' : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSetup"
                    className="absolute inset-0 bg-space-surface border border-brand/40 rounded-2xl shadow-brand"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-3 font-mono tracking-wide uppercase text-xs">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand' : ''}`} />
                  <span className="font-bold">{setup.label}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Display Area */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSetup}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <div className="flex items-center justify-between mb-8 border-b border-glass pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span className="text-sm font-mono text-success tracking-widest uppercase">Ecosystem Calibrated</span>
                </div>
                <span className="text-sm text-text-muted font-mono">{currentDesc}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product, idx) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))
                ) : (
                  // Fallback
                  products.slice(0, 4).map((product, idx) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
