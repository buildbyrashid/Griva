'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedProducts } from '@/data/products';
import { ArrowRight, Fingerprint } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function FeaturedProductsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const featured = getFeaturedProducts().slice(0, 3);

  return (
    <section ref={containerRef} className="py-32 bg-space-black relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-glow opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 section-label mb-4">
              <Fingerprint className="w-5 h-5 text-brand" />
              Signature Collection
            </div>
            <h2 className="heading-xl text-white">
              Engineering <span className="text-titanium">Excellence.</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/products">
              <button className="btn-ghost">
                View Full Catalog <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Immersive Horizontal Showcases */}
        <div className="space-y-32">
          {featured.map((product, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div key={product.id} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24`}>
                {/* Image Side */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full lg:w-1/2 relative"
                >
                  <div className="relative aspect-square w-full max-w-[500px] mx-auto">
                    <div className="absolute inset-0 bg-brand/5 blur-[100px] rounded-full" />
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: isEven ? 5 : -5 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="relative w-full h-full z-10"
                    >
                      <Image
                        src={product.thumbnail}
                        alt={product.name}
                        fill
                        className="object-contain drop-shadow-2xl"
                      />
                    </motion.div>

                    {/* Floating Specs */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                      className={`absolute ${isEven ? '-right-4 sm:-right-12' : '-left-4 sm:-left-12'} top-1/4 glass px-6 py-4 rounded-2xl border-brand z-20 hidden sm:block`}
                    >
                      <p className="text-[10px] text-text-muted uppercase tracking-[0.2em] font-bold mb-1">Architecture</p>
                      <p className="text-sm font-bold text-white leading-tight">Next-Gen<br/>Processing</p>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Content Side */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full lg:w-1/2"
                >
                  <p className="text-xs text-brand tracking-[0.2em] font-bold uppercase mb-4">
                    {product.brand}
                  </p>
                  <h3 className="heading-lg text-white mb-6">
                    {product.name}
                  </h3>
                  <p className="text-text-secondary text-lg mb-8 leading-relaxed max-w-lg">
                    {product.description}
                  </p>

                  <div className="flex flex-wrap gap-4 mb-10">
                    {product.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="glass-white px-4 py-2 rounded-xl text-xs font-semibold text-titanium">
                        {feat}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex flex-col">
                      <span className="text-sm text-text-muted mb-1">Starting at</span>
                      <span className="text-3xl font-display font-bold text-white">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                    <Link href={`/products/${product.slug}`}>
                      <button className="btn-brand">
                        Discover More
                      </button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
