'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart, Zap } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCartStore();
  const { toggleItem, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleItem(product);
    if (!wishlisted) toast.success('Added to wishlist!');
  };

  return (
    <div className="product-card-v2 group">
      <Link href={`/products/${product.slug}`} className="block relative">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-brand/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />

        {/* Top Badges & Actions */}
        <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start pointer-events-none">
          <div className="flex flex-col gap-2">
            {product.discount > 0 && (
              <span className="tag-brand shadow-brand pointer-events-auto">
                {product.discount}% OFF
              </span>
            )}
            {product.isNew && (
              <span className="tag-blue shadow-blue pointer-events-auto">
                NEW DROP
              </span>
            )}
          </div>
          <button
            onClick={handleWishlist}
            className="w-8 h-8 rounded-full glass flex items-center justify-center pointer-events-auto transition-all hover:bg-white/10"
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'text-danger fill-danger' : 'text-text-muted hover:text-white'}`} />
          </button>
        </div>

        {/* Product Image */}
        <div className="relative aspect-[5/4] overflow-hidden p-6 flex items-center justify-center">
          {/* Subtle background circle */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-duration-700">
            <div className="w-48 h-48 rounded-full bg-white/5 blur-3xl" />
          </div>

          <motion.div
            whileHover={{ scale: 1.08, rotate: -3 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="relative w-full h-full z-10"
          >
            <Image
              src={product.thumbnail}
              alt={product.name}
              fill
              className="object-contain drop-shadow-2xl"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
        </div>

        {/* Content Area */}
        <div className="relative z-20 p-5 bg-gradient-to-t from-space-card to-transparent border-t border-glass">
          <div className="flex justify-between items-end mb-3">
            <div>
              <p className="text-[10px] text-text-secondary uppercase tracking-widest font-bold mb-1">
                {product.brand}
              </p>
              <h3 className="text-sm font-bold text-white line-clamp-1 group-hover:text-brand transition-colors">
                {product.name}
              </h3>
            </div>
            {product.stock <= 5 && (
              <div className="flex items-center gap-1 text-[10px] text-brand font-bold bg-brand/10 px-2 py-1 rounded">
                <Zap className="w-3 h-3" />
                {product.stock} Left
              </div>
            )}
          </div>

          <div className="flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-xl font-display font-bold text-white leading-none">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-text-muted line-through mt-1">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Quick Add Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAdd}
              className="w-10 h-10 rounded-xl bg-white/5 border border-glass flex items-center justify-center text-white hover:bg-brand hover:border-brand hover:shadow-brand transition-all z-30"
            >
              <ShoppingCart className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Animated border bottom */}
        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-brand group-hover:w-full transition-all duration-500 ease-out" />
      </Link>
    </div>
  );
}
