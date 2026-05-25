'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 'gaming',
    name: 'Gaming Rigs',
    slug: 'gaming',
    count: 24,
    image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=800',
    colSpan: 'col-span-1 md:col-span-2',
    rowSpan: 'row-span-2',
    description: 'Next-gen consoles & premium accessories.'
  },
  {
    id: 'apple',
    name: 'Apple Ecosystem',
    slug: 'apple-accessories',
    count: 42,
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600',
    colSpan: 'col-span-1',
    rowSpan: 'row-span-1',
    description: 'Pro devices.'
  },
  {
    id: 'audio',
    name: 'High-Fidelity Audio',
    slug: 'audio',
    count: 18,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
    colSpan: 'col-span-1',
    rowSpan: 'row-span-1',
    description: 'Studio sound.'
  },
  {
    id: 'creator',
    name: 'Creator Tools',
    slug: 'creator-gear',
    count: 15,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
    colSpan: 'col-span-1 md:col-span-2',
    rowSpan: 'row-span-1',
    description: 'Cameras & streaming gear.'
  }
];

export default function TrendingCategoriesSection() {
  return (
    <section className="py-24 bg-space-navy relative overflow-hidden">
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 w-full tech-line-h" />
      <div className="absolute top-0 bottom-0 left-10 tech-line-v opacity-20" />
      <div className="absolute top-0 bottom-0 right-10 tech-line-v opacity-20" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-label mb-4">Tech Sectors</div>
            <h2 className="heading-lg text-white">
              Explore <span className="text-titanium">Categories.</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/products">
              <button className="btn-ghost">
                View All Sectors <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Cinematic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[250px]">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`${cat.colSpan} ${cat.rowSpan}`}
            >
              <Link href={`/products?category=${cat.slug}`} className="block w-full h-full">
                <div className="relative w-full h-full rounded-3xl overflow-hidden group">
                  {/* Image Background */}
                  <div className="absolute inset-0">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Overlays */}
                  <div className="absolute inset-0 bg-space-black/40 group-hover:bg-space-black/20 transition-colors duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-space-black via-space-black/50 to-transparent opacity-90" />
                  <div className="absolute inset-0 border border-glass rounded-3xl group-hover:border-brand/50 transition-colors duration-500" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="tag-glass">{cat.count} items</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
                        {cat.name}
                      </h3>
                      <p className="text-text-secondary text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  {/* Hover icon */}
                  <div className="absolute top-6 right-6 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
