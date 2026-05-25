'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { getAppleProducts } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { ArrowRight, Apple } from 'lucide-react';

const appleCategories = [
  { icon: '📱', label: 'iPhone', tag: 'iphone' },
  { icon: '🎧', label: 'AirPods', tag: 'wireless' },
  { icon: '⌚', label: 'Watch', tag: 'watch' },
  { icon: '💻', label: 'Mac', tag: 'mac' },
  { icon: '🥽', label: 'Vision', tag: 'vision' },
];

export default function AppleEcosystemSection() {
  const appleProducts = getAppleProducts().slice(0, 4);

  return (
    <section className="py-32 bg-space-navy relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-1/2 h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-[500px] bg-accent-blue/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Header - Apple Dark Mode Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6 border-b border-glass pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <div className="w-16 h-16 rounded-3xl glass flex items-center justify-center">
              <Apple className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="heading-lg text-white tracking-tight">Pro. Beyond.</h2>
              <p className="text-text-secondary text-lg mt-1">The complete Apple ecosystem.</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/products?brand=apple">
              <button className="btn-ghost rounded-full px-6 text-sm">
                Shop Ecosystem <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Dynamic Nav Pills */}
        <div className="flex flex-wrap gap-3 mb-12">
          {appleCategories.map((cat, idx) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link href={`/products?brand=apple&tag=${cat.tag}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-space-card/50 border border-glass text-titanium hover:bg-white/10 hover:text-white transition-all backdrop-blur-md"
                >
                  <span className="opacity-70">{cat.icon}</span>
                  {cat.label}
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Glass Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {appleProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
            >
              <Link href={`/products/${product.slug}`} className="block h-full">
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group relative h-full rounded-[2rem] overflow-hidden bg-gradient-to-b from-white/[0.08] to-transparent border border-glass backdrop-blur-xl transition-all duration-500 hover:border-white/20"
                >
                  {/* Glowing backdrop inside card */}
                  <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-32 h-32 bg-white/10 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Image */}
                  <div className="relative aspect-square p-8 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={product.thumbnail}
                        alt={product.name}
                        fill
                        className="object-contain drop-shadow-2xl"
                      />
                    </motion.div>
                    {product.isNew && (
                      <div className="absolute top-4 right-4 text-[10px] font-bold tracking-widest text-white uppercase bg-white/10 px-3 py-1 rounded-full border border-white/20 backdrop-blur-md">
                        New
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 pt-0 text-center">
                    <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-brand transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-text-secondary line-clamp-2 mb-4 h-10">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-lg font-medium text-titanium">{formatPrice(product.price)}</span>
                    </div>
                  </div>

                  {/* Hover action bar */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
