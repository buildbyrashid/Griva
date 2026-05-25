'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Zap, Clock, ChevronRight } from 'lucide-react';
import { flashSales } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import CountdownTimer from '@/components/ui/CountdownTimer';

export default function FlashSaleSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden bg-space-black">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-space-radial pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none" />

      <motion.div style={{ opacity }} className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="section-label mb-4">Limited Allocations</div>
            <h2 className="heading-xl text-white">
              Protocol <span className="text-brand">Drops.</span>
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right hidden md:block">
              <p className="text-[10px] text-text-muted uppercase tracking-[0.2em] font-bold mb-1">Doha Status</p>
              <p className="text-brand text-sm font-bold flex items-center justify-end gap-2">
                <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                SECURE DISPATCH
              </p>
            </div>
            <div className="glass px-6 py-4 rounded-2xl border-brand">
              <p className="text-[10px] text-text-muted uppercase tracking-[0.2em] font-bold mb-2">Allocation Lock In</p>
              <CountdownTimer endDate={flashSales[0].endsAt} size="md" />
            </div>
          </div>
        </div>

        {/* Cinematic Horizontal Scroll / Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {flashSales.slice(0, 2).map((sale, idx) => {
            const stockUsed = ((sale.totalStock - sale.remainingStock) / sale.totalStock) * 100;
            const rarityTag = idx === 0 ? 'LEGENDARY ALLOCATION' : 'HIGH-DEMAND DROP';

            return (
              <motion.div
                key={sale.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-[2rem] overflow-hidden bg-space-card border border-glass p-1"
              >
                <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative rounded-[1.8rem] overflow-hidden bg-space-surface h-full flex flex-col sm:flex-row">
                  {/* Image Side */}
                  <div className="relative w-full sm:w-1/2 aspect-square sm:aspect-auto p-8 flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent">
                    {/* Glowing backdrop */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-duration-700">
                      <div className="w-32 h-32 rounded-full bg-brand/20 blur-3xl" />
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="relative w-full h-full z-10"
                    >
                      <Image
                        src={sale.product.thumbnail}
                        alt={sale.product.name}
                        fill
                        className="object-contain drop-shadow-2xl"
                      />
                    </motion.div>

                    {/* Rarity & Discount Badges */}
                    <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center pointer-events-none">
                      <div className="tag-brand shadow-brand pointer-events-auto">
                        -{sale.discount}%
                      </div>
                      <div className="tag-blue shadow-blue text-[8px] tracking-wider pointer-events-auto">
                        {rarityTag}
                      </div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="relative w-full sm:w-1/2 p-6 flex flex-col justify-between z-20 border-t sm:border-t-0 sm:border-l border-glass bg-space-card/50 backdrop-blur-xl">
                    <div>
                      <p className="text-[10px] text-text-secondary uppercase tracking-widest font-bold mb-2">
                        {sale.product.brand}
                      </p>
                      <h3 className="text-lg font-bold text-white mb-4 leading-tight">
                        {sale.product.name}
                      </h3>

                      <div className="flex items-baseline gap-3 mb-6">
                        <span className="text-3xl font-display font-bold text-brand">
                          {formatPrice(sale.salePrice)}
                        </span>
                        <span className="text-sm text-text-muted line-through">
                          {formatPrice(sale.originalPrice)}
                        </span>
                      </div>
                    </div>

                    <div>
                      {/* Tech Spec */}
                      <div className="flex flex-col gap-1 mb-6">
                        <div className="flex items-center gap-2">
                          <Zap className="w-3.5 h-3.5 text-brand animate-pulse" />
                          <span className="text-xs text-white font-semibold">🇶🇦 Doha 2h Express Hand-Delivery Active</span>
                        </div>
                        <p className="text-[10px] text-text-secondary pl-5">🔥 48 Qatari tech enthusiasts are viewing this drop</p>
                      </div>

                      {/* Stock Bar */}
                      <div className="mb-6">
                        <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold text-text-secondary mb-2">
                          <span>Units Sold: {sale.soldCount}</span>
                          <span className="text-white">Left: {sale.remainingStock}</span>
                        </div>
                        <div className="stock-track">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${stockUsed}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className={`stock-fill ${stockUsed > 80 ? 'stock-fill-critical' : ''}`}
                          />
                        </div>
                        {stockUsed > 80 && (
                          <p className="text-[10px] text-danger mt-2 font-bold animate-pulse">
                            CRITICAL LEVEL — SELLING FAST
                          </p>
                        )}
                      </div>

                      <Link href={`/products/${sale.product.slug}`} className="block">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-3 rounded-xl bg-white/5 border border-glass text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-brand hover:border-brand hover:shadow-brand transition-all"
                        >
                          View Details
                          <ChevronRight className="w-4 h-4" />
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
