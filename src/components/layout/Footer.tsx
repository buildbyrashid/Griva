'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, MessageCircle, Instagram, Twitter, Youtube, Mail } from 'lucide-react';

const footerLinks = {
  Shop: [
    { label: 'All Products', href: '/products' },
    { label: 'Flash Deals', href: '/products?filter=flash-sale' },
    { label: 'New Arrivals', href: '/products?filter=new' },
    { label: 'Trending', href: '/products?filter=trending' },
    { label: 'Black Friday', href: '/products?filter=black-friday' },
  ],
  Categories: [
    { label: 'Apple Accessories', href: '/products?category=apple-accessories' },
    { label: 'Gaming', href: '/products?category=gaming' },
    { label: 'Audio', href: '/products?category=audio' },
    { label: 'Creator Gear', href: '/products?category=creator-gear' },
    { label: 'Smart Home', href: '/products?category=smart-home' },
  ],
  Support: [
    { label: 'WhatsApp Order', href: 'https://wa.me/97412345678' },
    { label: 'Track Order', href: '/track-order' },
    { label: 'Returns', href: '/returns' },
    { label: 'Warranty', href: '/warranty' },
    { label: 'FAQ', href: '/faq' },
  ],
  Company: [
    { label: 'About Griva', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Careers', href: '/careers' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-dark-border/50">
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-primary/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Top Section */}
        <div className="grid lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 mb-4 w-fit">
              <div className="w-10 h-10 rounded-xl bg-orange-primary flex items-center justify-center">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-2xl font-black text-white">GRIVA</span>
            </Link>

            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xs">
              Qatar & GCC's premier destination for premium gadgets and electronics. Original products, best prices, instant delivery.
            </p>

            {/* WhatsApp CTA */}
            <Link href="https://wa.me/97412345678" target="_blank">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white mb-6"
                style={{ background: '#25D366', boxShadow: '0 0 20px rgba(37,211,102,0.3)' }}
              >
                <MessageCircle className="w-4 h-4" />
                Order on WhatsApp
              </motion.button>
            </Link>

            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { Icon: Instagram, href: '#', label: 'Instagram' },
                { Icon: Twitter, href: '#', label: 'Twitter' },
                { Icon: Youtube, href: '#', label: 'YouTube' },
              ].map(({ Icon, href, label }) => (
                <Link key={label} href={href}>
                  <motion.div
                    whileHover={{ scale: 1.1, color: '#FF6B00' }}
                    className="w-9 h-9 rounded-xl border border-dark-border flex items-center justify-center text-gray-500 hover:text-orange-primary hover:border-orange-primary/40 transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="lg:col-span-1">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">{category}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="p-6 rounded-2xl mb-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between"
          style={{ background: '#161A22', border: '1px solid #2A2F3A' }}>
          <div>
            <h3 className="text-white font-bold mb-1">Get Exclusive Deals First</h3>
            <p className="text-gray-500 text-sm">Subscribe for flash sales, midnight drops & member-only discounts.</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 sm:w-64 px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-white text-sm placeholder-gray-600 focus:outline-none focus:border-orange-primary/60 transition-colors"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="btn-orange px-5 py-3 rounded-xl text-sm font-bold flex items-center gap-1.5"
            >
              <Mail className="w-4 h-4" />
              Subscribe
            </motion.button>
          </div>
        </div>

        {/* Trust badges row */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-xs text-gray-600">
          {[
            '🔒 SSL Secured Checkout',
            '✅ 100% Original Products',
            '🚀 Fast Delivery Qatar & GCC',
            '↩️ Easy Returns',
            '💬 24/7 WhatsApp Support',
          ].map((badge) => (
            <span key={badge}>{badge}</span>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-dark-border/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-700">
            © {new Date().getFullYear()} Griva. All rights reserved. Crafted by <a href="https://www.ekodrix.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Ekodrix</a>
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-700">
            <Link href="/privacy" className="hover:text-gray-400 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-400 transition-colors">Terms</Link>
            <Link href="/cookies" className="hover:text-gray-400 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
