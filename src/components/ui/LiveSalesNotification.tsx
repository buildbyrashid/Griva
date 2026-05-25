'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { liveNotifications } from '@/data/products';
import { ShoppingBag } from 'lucide-react';

export default function LiveSalesNotification() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % liveNotifications.length);
        setVisible(true);
      }, 400);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const notification = liveNotifications[currentIndex];

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key={notification.id}
          initial={{ x: -100, opacity: 0, scale: 0.95 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: -100, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="fixed bottom-24 left-4 z-40 max-w-[280px]"
        >
          <div className="glass rounded-2xl p-3 flex items-center gap-3 shadow-2xl border border-dark-border/60">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
              <Image
                src={notification.productImage}
                alt={notification.productName}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 mb-0.5">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] text-green-400 font-semibold">Just Purchased</span>
              </div>
              <p className="text-xs font-semibold text-white line-clamp-1">
                {notification.name} from {notification.location}
              </p>
              <p className="text-[10px] text-gray-400 line-clamp-1">{notification.productName}</p>
              <p className="text-[10px] text-gray-500">{notification.timeAgo}</p>
            </div>
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-lg bg-orange-primary/10 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-orange-primary" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
