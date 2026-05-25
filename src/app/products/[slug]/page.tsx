'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star, ShoppingCart, Heart, MessageCircle, Shield, Truck, RotateCcw,
  ChevronLeft, ChevronRight, Zap, Plus, Minus, CheckCircle, Fingerprint, Activity
} from 'lucide-react';
import { getProductBySlug, products } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { formatPrice } from '@/lib/utils';
import { ProductColor } from '@/types';
import ProductCard from '@/components/product/ProductCard';
import { toast } from 'sonner';
import Link from 'next/link';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) return notFound();

  const [currentImage, setCurrentImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor | undefined>(product.colors?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'features'>('features');

  const { addItem } = useCartStore();
  const { toggleItem, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, selectedColor, quantity);
    toast.success(`${product.name} added to cart!`);
  };

  const handleWhatsApp = () => {
    const msg = `Hi! I want to secure allocation for: ${product.name} - ${formatPrice(product.price)}`;
    window.open(`https://wa.me/97412345678?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-space-black relative" style={{ paddingTop: '96px' }}>
      {/* Dynamic Background Lighting based on selected color or brand */}
      <div
        className="absolute top-0 left-0 w-full h-[800px] pointer-events-none opacity-20 blur-[150px] transition-colors duration-1000"
        style={{ background: selectedColor?.hex || '#FF6B00' }}
      />
      <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 relative z-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-3 text-xs text-text-muted font-mono uppercase tracking-widest mb-12">
          <Link href="/" className="hover:text-brand transition-colors">HQ</Link>
          <span className="text-glass-border">/</span>
          <Link href="/products" className="hover:text-brand transition-colors">Hardware</Link>
          <span className="text-glass-border">/</span>
          <span className="text-white">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-32">
          {/* LEFT — Cinematic Image Gallery */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative aspect-square rounded-[2rem] bg-space-surface border border-glass overflow-hidden group"
            >
              {/* Internal glow */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className="w-2/3 h-2/3 rounded-full blur-[80px] transition-colors duration-1000 opacity-20"
                  style={{ background: selectedColor?.hex || '#FF6B00' }}
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full h-full p-12 flex items-center justify-center"
                >
                  <Image
                    src={product.images[currentImage] || product.thumbnail}
                    alt={product.name}
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Holographic scanning effect on hover */}
              <div className="absolute left-0 right-0 h-1 bg-brand/50 blur-[2px] -translate-y-full group-hover:animate-[scanLine_3s_ease-in-out_infinite] opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Status Badges */}
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                {product.badge === 'sale' && <span className="tag-brand shadow-brand">{product.discount}% DROP</span>}
                {product.isNew && <span className="tag-blue shadow-blue">NEW SYS</span>}
              </div>

              {/* Image Navigation Controls */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImage(Math.max(0, currentImage - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass border border-glass flex items-center justify-center text-white hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setCurrentImage(Math.min(product.images.length - 1, currentImage + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass border border-glass flex items-center justify-center text-white hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </motion.div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="flex gap-4 mt-6">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`relative w-24 h-24 rounded-2xl overflow-hidden bg-space-surface border-2 transition-all ${
                      currentImage === idx ? 'border-brand shadow-brand' : 'border-glass hover:border-white/20'
                    }`}
                  >
                    <div className="absolute inset-2">
                      <Image src={img} alt="" fill className="object-contain" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — Terminal Data & Actions */}
          <div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              {/* Brand & Wishlist */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-glass">
                  <Fingerprint className="w-4 h-4 text-brand" />
                  <span className="text-[10px] font-bold text-titanium uppercase tracking-widest">{product.brand}</span>
                </div>
                <button
                  onClick={() => toggleItem(product)}
                  className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all border border-glass hover:border-white/20"
                >
                  <Heart className={`w-5 h-5 ${wishlisted ? 'text-danger fill-danger' : 'text-text-muted hover:text-white'}`} />
                </button>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight tracking-tight">
                {product.name}
              </h1>

              {/* Telemetry (Rating & Sales) */}
              <div className="flex flex-wrap items-center gap-6 mb-8 py-4 border-y border-glass">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-success" />
                  <span className="text-xs text-text-secondary uppercase tracking-widest font-mono">System Rating</span>
                  <span className="text-sm font-bold text-white ml-2">{product.rating}/5.0</span>
                </div>
                <div className="w-px h-4 bg-glass-border" />
                <div className="flex items-center gap-2">
                  <span className="text-xs text-text-secondary uppercase tracking-widest font-mono">Deployments</span>
                  <span className="text-sm font-bold text-white ml-2">{product.soldCount.toLocaleString()}</span>
                </div>
              </div>

              {/* Pricing Module */}
              <div className="mb-10">
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-5xl lg:text-6xl font-display font-bold text-brand text-glow-brand">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-2xl text-text-muted line-through font-display font-bold">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                {product.emi && (
                  <p className="text-sm text-accent-blue font-mono">■ {product.emi}</p>
                )}
              </div>

              {/* Color Configuration */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-8 p-6 rounded-3xl bg-space-surface border border-glass">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-text-secondary uppercase tracking-[0.2em] font-bold">
                      Chassis Color
                    </span>
                    <span className="text-xs text-white font-mono uppercase bg-space-black px-3 py-1 rounded-full border border-glass">
                      {selectedColor?.name}
                    </span>
                  </div>
                  <div className="flex gap-4">
                    {product.colors.map((color) => (
                      <button
                        key={color.hex}
                        onClick={() => setSelectedColor(color)}
                        className={`relative w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                          selectedColor?.hex === color.hex ? 'border-brand scale-110' : 'border-glass hover:border-white/30'
                        }`}
                        style={{ background: color.hex }}
                      >
                        {selectedColor?.hex === color.hex && (
                          <div className="absolute inset-0 rounded-full bg-transparent border-4 border-space-surface" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions Interface */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {/* Quantity Control */}
                <div className="flex items-center justify-between px-6 py-4 rounded-2xl bg-space-surface border border-glass">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-text-muted hover:text-white">
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-xl font-display font-bold text-white">{quantity}</span>
                  <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="text-text-muted hover:text-white">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="btn-brand justify-center w-full rounded-2xl py-5 text-base"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>

                {/* WhatsApp Priority */}
                <button
                  onClick={handleWhatsApp}
                  className="sm:col-span-2 flex items-center justify-center gap-3 px-6 py-5 rounded-2xl bg-white text-space-black font-bold text-sm uppercase tracking-widest hover:bg-success hover:text-white transition-all duration-300 shadow-glass"
                >
                  <MessageCircle className="w-5 h-5" />
                  Buy Now via WhatsApp
                </button>
              </div>

              {/* Security Protocols */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Shield, title: 'Warranty', val: product.warranty },
                  { icon: Truck, title: 'Logistics', val: `T+${product.deliveryDays} Days` },
                  { icon: RotateCcw, title: 'Returns', val: '7-Day Policy' },
                ].map(({ icon: Icon, title, val }) => (
                  <div key={title} className="p-4 rounded-2xl bg-space-surface border border-glass text-center">
                    <Icon className="w-5 h-5 text-brand mx-auto mb-2" />
                    <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold mb-1">{title}</p>
                    <p className="text-xs text-white font-mono">{val}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Data Tabs (Features / Specs) */}
        <div className="mb-32">
          <div className="flex border-b border-glass mb-12">
            {(['features', 'specs'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 text-sm font-mono uppercase tracking-[0.2em] transition-all relative ${
                  activeTab === tab ? 'text-brand font-bold' : 'text-text-muted hover:text-white'
                }`}
              >
                {tab === 'features' ? 'System Features' : 'Technical Specs'}
                {activeTab === tab && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-0.5 bg-brand" />
                )}
              </button>
            ))}
          </div>

          <div className="relative min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                {activeTab === 'features' && (
                  <div className="grid lg:grid-cols-2 gap-12">
                    <div>
                      <p className="text-titanium text-lg leading-relaxed mb-8">
                        {product.description}
                      </p>
                      <ul className="space-y-4">
                        {product.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-4">
                            <div className="mt-1 w-6 h-6 rounded-full bg-brand/10 border border-brand/30 flex items-center justify-center flex-shrink-0">
                              <CheckCircle className="w-3 h-3 text-brand" />
                            </div>
                            <span className="text-text-secondary">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                {activeTab === 'specs' && (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="flex flex-col border-b border-glass pb-4">
                        <span className="text-[10px] text-text-muted uppercase tracking-[0.2em] font-bold mb-1">{key}</span>
                        <span className="text-sm font-mono text-white">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
