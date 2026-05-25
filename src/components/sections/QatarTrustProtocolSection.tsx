'use client';

import { motion } from 'framer-motion';
import { Truck, ShieldCheck, CreditCard, MessageCircle, HelpCircle } from 'lucide-react';

const trustPoints = [
  {
    icon: Truck,
    title: 'Doha 2h Express',
    description: 'Orders placed in Doha are hand-delivered within 2 hours. Rest of Qatar guaranteed same-day. Always free on orders over QAR 250.',
    badge: 'Logistics Protocol',
    colorClass: 'text-brand border-brand/20 bg-brand/5',
  },
  {
    icon: CreditCard,
    title: 'Pay on Delivery (COD)',
    description: 'Zero online card risk. Select cash on delivery at checkout, and pay with cash or swipe your debit/credit card directly at your door.',
    badge: 'Secure Gateway',
    colorClass: 'text-accent-blue border-accent-blue/20 bg-accent-blue/5',
  },
  {
    icon: ShieldCheck,
    title: 'Official Local Warranty',
    description: 'No gray market items. 100% original brand-sealed stock with official direct 1-Year Qatari and GCC distributor manufacturer warranties.',
    badge: 'Auth Guarantee',
    colorClass: 'text-green-400 border-green-500/20 bg-green-500/5',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Concierge',
    description: 'Skip the bots. Connect directly to our active Doha-based operations team on WhatsApp for instant orders, updates, or custom support.',
    badge: 'Direct Protocol',
    colorClass: 'text-purple-400 border-purple-500/20 bg-purple-500/5',
  },
];

export default function QatarTrustProtocolSection() {
  return (
    <section className="py-28 bg-space-navy relative overflow-hidden">
      {/* Decorative cyber line highlights */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-blue/20 to-transparent" />
      
      {/* Ambient background glow */}
      <div className="absolute -bottom-48 left-1/3 w-[600px] h-[600px] bg-accent-blue/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 section-label mb-6"
          >
            <HelpCircle className="w-4 h-4 text-brand" />
            Security & Trust Calibration
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg text-white mb-6"
          >
            The Qatar <span className="text-brand">Trust Protocol.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-lg"
          >
            We've eliminated the friction of international ordering. Get premium authentic hardware delivered directly to your doorstep in hours, with zero customs delays.
          </motion.p>
        </div>

        {/* High-Tech Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPoints.map((point, idx) => {
            const Icon = point.icon;

            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="group relative rounded-3xl bg-space-card/60 border border-glass p-6 backdrop-blur-md hover:border-brand/40 transition-colors duration-500 flex flex-col justify-between"
              >
                {/* Accent glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                <div className="relative z-10">
                  {/* Category micro badge */}
                  <span className="text-[9px] uppercase tracking-widest font-bold text-text-muted mb-4 block">
                    {point.badge}
                  </span>

                  {/* Pulsing Icon */}
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 ${point.colorClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand transition-colors">
                    {point.title}
                  </h3>

                  <p className="text-sm text-text-secondary leading-relaxed mb-6">
                    {point.description}
                  </p>
                </div>

                {/* Secure Checkmark bottom indicator */}
                <div className="relative z-10 pt-4 border-t border-glass/40 flex items-center gap-2 text-[10px] text-green-400 font-bold uppercase tracking-wider">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Verified Protocol
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
