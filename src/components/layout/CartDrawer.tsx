'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { X, Plus, Minus, Trash2, ShoppingBag, Zap, MessageCircle } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal, getTotal } = useCartStore();
  const subtotal = getSubtotal();
  const total = getTotal();
  const shipping = subtotal > 500 ? 0 : 25;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-space-black/80 backdrop-blur-md z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md z-[70] flex flex-col bg-space-surface border-l border-glass shadow-glass-lg"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-glass">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center shadow-brand-sm">
                  <ShoppingBag className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <h2 className="text-lg font-display font-bold text-white tracking-tight">Your Hardware</h2>
                  <p className="text-xs text-text-muted font-mono uppercase">{items.length} items allocated</p>
                </div>
              </div>
              <button
                onClick={closeCart}
                className="w-10 h-10 rounded-xl glass border border-glass flex items-center justify-center text-text-secondary hover:text-white hover:bg-white/10 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free shipping badge */}
            {subtotal > 0 && subtotal < 500 && (
              <div className="mx-6 mt-6 px-5 py-4 rounded-2xl bg-brand/5 border border-brand/20 shadow-inner-brand">
                <p className="text-xs text-titanium text-center font-medium mb-3">
                  Add <span className="text-brand font-bold">{formatPrice(500 - subtotal)}</span> more for <span className="font-bold text-white">FREE delivery!</span>
                </p>
                <div className="h-1.5 bg-space-black rounded-full overflow-hidden border border-glass">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(subtotal / 500) * 100}%` }}
                    className="h-full bg-brand"
                  />
                </div>
              </div>
            )}
            {subtotal >= 500 && (
              <div className="mx-6 mt-6 px-5 py-3 rounded-2xl bg-success/10 border border-success/30 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                <p className="text-xs text-success text-center font-bold tracking-widest uppercase flex items-center justify-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  Free Delivery Unlocked
                </p>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 scrollbar-hide">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <div className="w-24 h-24 rounded-full glass border border-glass flex items-center justify-center mb-2">
                    <ShoppingBag className="w-8 h-8 text-text-muted" />
                  </div>
                  <div>
                    <p className="text-titanium font-bold text-lg mb-1">Cart is empty</p>
                    <p className="text-text-secondary text-sm">Deploy some hardware to your cart.</p>
                  </div>
                  <button
                    onClick={closeCart}
                    className="btn-ghost mt-4"
                  >
                    Return to Catalog
                  </button>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.div
                      key={`${item.product.id}-${item.selectedColor?.hex}`}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95, height: 0 }}
                      className="group relative p-4 rounded-2xl bg-space-card/50 border border-glass hover:border-brand/30 transition-all duration-300 flex gap-4"
                    >
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden glass flex-shrink-0 p-2 flex items-center justify-center">
                        <Image
                          src={item.product.thumbnail}
                          alt={item.product.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2 mb-1">
                            <h3 className="text-sm font-bold text-white line-clamp-2 leading-tight">
                              {item.product.name}
                            </h3>
                            <button
                              onClick={() => removeItem(item.product.id)}
                              className="text-text-muted hover:text-danger transition-colors p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          
                          {item.selectedColor && (
                            <div className="flex items-center gap-1.5 mt-1">
                              <div className="w-2.5 h-2.5 rounded-full border border-glass shadow-sm" style={{ background: item.selectedColor.hex }} />
                              <span className="text-[10px] uppercase font-mono text-text-muted">{item.selectedColor.name}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-end justify-between mt-3">
                          <span className="text-brand font-display font-bold text-lg leading-none">
                            {formatPrice(item.product.price)}
                          </span>
                          
                          <div className="flex items-center gap-1 bg-space-black rounded-lg border border-glass p-0.5">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-white/10 text-text-muted hover:text-white transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-white font-mono text-xs w-6 text-center font-bold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-white/10 text-text-muted hover:text-white transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-glass bg-space-card/80 backdrop-blur-xl px-6 py-6 space-y-5">
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex justify-between text-text-secondary">
                    <span>Subtotal</span>
                    <span className="text-white">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-text-secondary">
                    <span>Logistics</span>
                    <span className={shipping === 0 ? 'text-success font-bold' : 'text-white'}>
                      {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between items-end border-t border-glass pt-4 mt-2">
                    <span className="text-text-muted uppercase tracking-widest text-xs font-sans font-bold">Total Commitment</span>
                    <span className="text-2xl font-display font-black text-brand text-glow-brand leading-none">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  <Link href="/checkout" onClick={closeCart}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-brand w-full py-4 text-sm uppercase tracking-widest flex items-center justify-center"
                    >
                      Complete Checkout
                    </motion.button>
                  </Link>

                  <button className="w-full py-4 rounded-xl glass border border-success/30 text-success text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-success/10 hover:border-success/50 transition-all">
                    <MessageCircle className="w-4 h-4" />
                    Secure via WhatsApp
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
