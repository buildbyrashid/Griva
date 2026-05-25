'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Grid, ShoppingCart, Heart, User } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Shop', href: '/products', icon: Grid },
  { label: 'Cart', href: '#', icon: ShoppingCart, isCart: true },
  { label: 'Wishlist', href: '/wishlist', icon: Heart },
  { label: 'Account', href: '/account', icon: User },
];

export default function MobileNav() {
  const pathname = usePathname();
  const { getItemCount, toggleCart } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const itemCount = getItemCount();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-dark-border/60 pb-safe">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          const badge = item.isCart ? itemCount : item.label === 'Wishlist' ? wishlistItems.length : 0;

          if (item.isCart) {
            return (
              <button
                key={item.label}
                onClick={toggleCart}
                className="flex flex-col items-center gap-1 px-3 py-1 relative"
              >
                <div className="relative w-12 h-10 -mt-5 rounded-2xl bg-orange-primary flex items-center justify-center shadow-glow">
                  <Icon className="w-5 h-5 text-white" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-griva-sale rounded-full text-white text-[9px] font-bold flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-gray-400">{item.label}</span>
              </button>
            );
          }

          return (
            <Link key={item.label} href={item.href} className="flex flex-col items-center gap-1 px-3 py-1 relative">
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'text-orange-primary' : 'text-gray-500'}`} />
                {badge > 0 && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-orange-primary rounded-full text-white text-[8px] font-bold flex items-center justify-center">
                    {badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] ${isActive ? 'text-orange-primary' : 'text-gray-500'}`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-orange-primary"
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
