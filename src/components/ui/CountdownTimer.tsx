'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTimeLeft } from '@/lib/utils';

interface CountdownTimerProps {
  endDate: string;
  size?: 'sm' | 'md' | 'lg';
  onExpire?: () => void;
}

export default function CountdownTimer({ endDate, size = 'md', onExpire }: CountdownTimerProps) {
  const [time, setTime] = useState(getTimeLeft(endDate));
  const [prevTime, setPrevTime] = useState(time);

  const tick = useCallback(() => {
    const newTime = getTimeLeft(endDate);
    setPrevTime(time);
    setTime(newTime);
    if (newTime.expired && onExpire) onExpire();
  }, [endDate, onExpire, time]);

  useEffect(() => {
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [tick]);

  const sizeClasses = {
    sm: { digit: 'text-xl font-bold w-12 h-10', label: 'text-[9px]', gap: 'gap-1' },
    md: { digit: 'text-3xl font-bold w-16 h-14', label: 'text-[10px]', gap: 'gap-2' },
    lg: { digit: 'text-5xl font-bold w-20 h-18', label: 'text-xs', gap: 'gap-3' },
  };

  const s = sizeClasses[size];

  if (time.expired) return null;

  const units = [
    { value: time.hours, prev: prevTime.hours, label: 'HRS' },
    { value: time.minutes, prev: prevTime.minutes, label: 'MIN' },
    { value: time.seconds, prev: prevTime.seconds, label: 'SEC' },
  ];

  return (
    <div className={`flex items-center ${s.gap}`}>
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-1">
          <div className="flex flex-col items-center">
            <div
              className={`${s.digit} countdown-digit flex items-center justify-center text-white relative`}
              style={{ background: 'rgba(22,26,34,0.9)', border: '1px solid rgba(42,47,58,0.8)' }}
            >
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={unit.value}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="tabular-nums"
                >
                  {String(unit.value).padStart(2, '0')}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className={`${s.label} text-gray-500 font-semibold tracking-widest mt-1`}>
              {unit.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="text-orange-primary font-bold text-xl pb-4 opacity-80">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
