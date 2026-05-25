'use client';

import { motion } from 'framer-motion';
import { Star, CheckCircle, Fingerprint } from 'lucide-react';
import { reviews } from '@/data/products';

export default function SocialProofSection() {
  return (
    <section className="py-32 bg-space-black relative overflow-hidden">
      {/* Decorative gradient sphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 section-label mb-6"
          >
            <Fingerprint className="w-5 h-5 text-brand" />
            🇶🇦 Doha Community Logs
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-xl text-white mb-6"
          >
            Community <span className="text-brand">Vouches.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-lg"
          >
            Verified vouch logs from active gamers and creator setups in Al Waab, Lusail, West Bay, and Pearl-Qatar.
          </motion.p>
        </div>

        {/* Cinematic Review Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {reviews.slice(0, 3).map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="relative p-8 rounded-[2rem] bg-space-surface border border-glass group hover:border-brand/40 transition-colors duration-500"
            >
              {/* Subtle hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i <= review.rating ? 'text-brand fill-brand' : 'text-space-card'}`}
                      />
                    ))}
                  </div>
                  {review.verified && (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/10 border border-success/20">
                      <CheckCircle className="w-3 h-3 text-success" />
                      <span className="text-[10px] uppercase tracking-widest font-bold text-success">Verified Vouch</span>
                    </div>
                  )}
                </div>

                <p className="text-titanium text-lg leading-relaxed mb-8">
                  "{review.content}"
                </p>

                <div className="flex items-center gap-4 pt-6 border-t border-glass">
                  <div className="w-12 h-12 rounded-full bg-space-card border border-glass flex items-center justify-center">
                    <span className="text-lg font-display font-bold text-brand">
                      {review.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white mb-0.5">{review.author}</p>
                    <p className="text-xs text-text-muted">{review.location} • {review.productName}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Stats Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-1 rounded-3xl bg-gradient-to-r from-brand/20 via-blue/20 to-brand/20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-space-black rounded-[23px] overflow-hidden">
            {[
              { label: 'Doha Deliveries', value: '12K+' },
              { label: '2-Hour SLA Success', value: '99.8%' },
              { label: 'Defect Claim Rate', value: '< 0.4%' },
              { label: 'Community Rating', value: '4.95/5' },
            ].map((stat) => (
              <div key={stat.label} className="p-8 bg-space-surface/50 backdrop-blur-md text-center group">
                <div className="text-3xl md:text-4xl font-display font-black text-white mb-2 group-hover:text-brand transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-muted">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
