'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const { addItem } = useCartStore();

  return (
    <div className="min-h-screen" style={{ paddingTop: '100px', background: '#0F1115' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <Heart className="w-8 h-8 text-red-400 fill-red-400" />
            Wishlist
            <span className="text-lg text-gray-500 font-normal">({items.length})</span>
          </h1>
        </motion.div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-20 h-20 rounded-2xl bg-dark-hover flex items-center justify-center">
              <Heart className="w-10 h-10 text-gray-600" />
            </div>
            <p className="text-gray-400 font-medium text-lg">Your wishlist is empty</p>
            <p className="text-gray-600 text-sm">Save products you love to buy later</p>
            <Link href="/products">
              <button className="btn-orange px-8 py-3 rounded-xl text-sm font-bold mt-2">Explore Products</button>
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: idx * 0.05 }}
                className="product-card group"
              >
                <Link href={`/products/${product.slug}`}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={product.thumbnail} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <button
                      onClick={(e) => { e.preventDefault(); removeItem(product.id); toast.success('Removed from wishlist'); }}
                      className="absolute top-3 right-3 w-8 h-8 glass rounded-xl flex items-center justify-center text-red-400 hover:bg-red-900/30 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </Link>
                <div className="p-4">
                  <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
                  <h3 className="text-sm font-bold text-white line-clamp-2 mb-2">{product.name}</h3>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-lg font-black text-white">{formatPrice(product.price)}</span>
                    {product.discount > 0 && <span className="tag-sale">{product.discount}% OFF</span>}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { addItem(product); toast.success('Added to cart!'); }}
                    className="btn-orange w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
