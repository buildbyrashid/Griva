'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  message?: string;
  phone?: string;
}

export default function WhatsAppButton({
  message = 'Hi! I want to order from Griva. Can you help me?',
  phone = '97412345678',
}: WhatsAppButtonProps) {
  const encodedMsg = encodeURIComponent(message);
  const href = `https://wa.me/${phone}?text=${encodedMsg}`;

  return (
    <motion.div
      className="fixed bottom-6 right-4 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 400, damping: 20 }}
    >
      <Link href={href} target="_blank" rel="noopener noreferrer">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl"
          style={{ boxShadow: '0 4px 30px rgba(37, 211, 102, 0.5)' }}
        >
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
          <MessageCircle className="w-7 h-7 text-white fill-white" />
        </motion.button>
      </Link>
    </motion.div>
  );
}
