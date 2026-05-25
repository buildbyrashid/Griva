'use client';

import { useEffect, useRef } from 'react';
import { Zap, Truck, MessageCircle, Star, Clock } from 'lucide-react';

const announcements = [
  { icon: <Zap className="w-3.5 h-3.5" />, text: 'DOHA EXPRESS: Free 2-Hour Hand Delivery in Doha on Orders Over QAR 250!' },
  { icon: <Truck className="w-3.5 h-3.5" />, text: 'LOCAL WAREHOUSE: Zero Import/Custom Duties — Same-Day Delivery Across Qatar!' },
  { icon: <MessageCircle className="w-3.5 h-3.5" />, text: 'PAY YOUR WAY: Cash on Delivery (COD) or Card Swipe at Your Doorstep!' },
  { icon: <Star className="w-3.5 h-3.5" />, text: '100% AUTHENTIC: Official Brand Items with 1-Year Direct Local Qatar Warranty!' },
  { icon: <Clock className="w-3.5 h-3.5" />, text: 'DOHA DIRECT: Order on WhatsApp for Instant Local Agent Support!' },
];

export default function AnnouncementBar() {
  const duplicated = [...announcements, ...announcements, ...announcements];

  return (
    <div className="bg-orange-primary overflow-hidden relative z-50 py-2">
      <div className="flex">
        <div
          className="flex items-center gap-16 whitespace-nowrap animate-ticker"
          style={{ willChange: 'transform' }}
        >
          {duplicated.map((item, i) => (
            <span key={i} className="flex items-center gap-2 text-white text-xs font-semibold tracking-wide">
              {item.icon}
              {item.text}
              <span className="text-orange-200 mx-4">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
