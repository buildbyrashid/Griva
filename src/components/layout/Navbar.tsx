'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';

const navLinks = [
  { label: 'Products', href: '/products' },
  { label: 'Flash Drops', href: '/products?filter=flash-sale' },
  { label: 'Gaming', href: '/products?category=gaming' },
  { label: 'Apple', href: '/products?category=apple-accessories' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
  const { getItemCount, toggleCart } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const itemCount = getItemCount();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    
    // Check if we are at the very top (below the 32px announcement bar)
    if (latest <= 32) {
      setIsTop(true);
      setHidden(false);
    } else {
      setIsTop(false);
      // Hide on scroll down, show on scroll up
      if (latest > previous && latest > 150) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    }
    
    setScrolled(latest > 40);
  });

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0, top: isTop ? 32 : 0 },
          hidden: { y: '-100%', top: 0 },
        }}
        initial="visible"
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled
            ? 'glass border-b border-glass shadow-glass'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" stroke="white" strokeWidth="1.5" fill="none" />
                    <circle cx="8" cy="8" r="2.5" fill="white" />
                  </svg>
                </div>
                <div className="absolute inset-0 rounded-lg bg-brand opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-300" />
              </div>
              <span
                className="text-lg font-display font-bold tracking-[0.12em] text-white"
                style={{ fontFamily: "'Clash Display', 'Space Grotesk', sans-serif" }}
              >
                GRIVA
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-text-secondary hover:text-white transition-colors duration-200 group"
                >
                  {link.label}
                  {link.label === 'Flash Drops' && (
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                  )}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-brand group-hover:w-1/2 transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-0.5">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="btn-icon"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              <Link href="/wishlist" aria-label="Wishlist">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-icon relative">
                  <Heart className="w-4 h-4" />
                  {wishlistItems.length > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-brand text-white text-[8px] font-bold flex items-center justify-center">
                      {wishlistItems.length}
                    </span>
                  )}
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleCart}
                className="btn-icon relative"
                aria-label="Cart"
              >
                <ShoppingCart className="w-4 h-4" />
                <AnimatePresence>
                  {itemCount > 0 && (
                    <motion.span
                      key={itemCount}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-brand text-white text-[8px] font-bold flex items-center justify-center"
                    >
                      {itemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <Link href="/account" className="hidden sm:block ml-1">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-icon">
                  <User className="w-4 h-4" />
                </motion.button>
              </Link>

              {/* Mobile menu */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden btn-icon ml-1"
              >
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Search Drawer */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-glass bg-space-surface/95 backdrop-blur-xl"
            >
              <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search for AirPods, PS5, Galaxy S25..."
                    className="input-field pl-11"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-glass bg-space-surface/95 backdrop-blur-xl"
            >
              <div className="px-5 py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 rounded-xl text-sm font-medium text-text-secondary hover:text-white hover:bg-white/5 transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
