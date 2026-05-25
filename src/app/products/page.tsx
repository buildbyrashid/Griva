'use client';

import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Grid, List, Search, SlidersHorizontal, X } from 'lucide-react';
import { products, categories } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';
import { Product } from '@/types';

const sortOptions = ['Trending', 'Price: Low to High', 'Price: High to Low', 'Newest', 'Best Rated'];
const priceRanges = ['All', 'Under QAR 500', 'QAR 500–1,000', 'QAR 1,000–3,000', 'QAR 3,000+'];

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('Trending');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchPrice =
      selectedPrice === 'All' ||
      (selectedPrice === 'Under QAR 500' && p.price < 500) ||
      (selectedPrice === 'QAR 500–1,000' && p.price >= 500 && p.price < 1000) ||
      (selectedPrice === 'QAR 1,000–3,000' && p.price >= 1000 && p.price < 3000) ||
      (selectedPrice === 'QAR 3,000+' && p.price >= 3000);
    return matchSearch && matchCategory && matchPrice;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (selectedSort === 'Price: Low to High') return a.price - b.price;
    if (selectedSort === 'Price: High to Low') return b.price - a.price;
    if (selectedSort === 'Best Rated') return b.rating - a.rating;
    if (selectedSort === 'Newest') return b.isNew ? 1 : -1;
    return (b.soldCount || 0) - (a.soldCount || 0); // Trending
  });

  return (
    <div className="min-h-screen" style={{ paddingTop: '100px', background: '#0F1115' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">
            All <span className="gradient-text">Products</span>
          </h1>
          <p className="text-gray-500">{sorted.length} products found</p>
        </motion.div>

        {/* Search + Filter bar */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, brands..."
              className="w-full pl-11 pr-4 py-3 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-orange-primary/60 transition-colors"
              style={{ background: '#161A22', border: '1px solid #2A2F3A' }}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-gray-400 hover:text-white transition-colors"
            style={{ background: '#161A22', border: '1px solid #2A2F3A' }}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:block">Filters</span>
          </motion.button>
          <div className="hidden sm:flex rounded-xl overflow-hidden" style={{ border: '1px solid #2A2F3A' }}>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 transition-colors ${viewMode === 'grid' ? 'bg-orange-primary text-white' : 'bg-dark-card text-gray-500 hover:text-white'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 transition-colors ${viewMode === 'list' ? 'bg-orange-primary text-white' : 'bg-dark-card text-gray-500 hover:text-white'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="p-5 rounded-2xl space-y-4" style={{ background: '#161A22', border: '1px solid #2A2F3A' }}>
                {/* Categories */}
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-3">Category</p>
                  <div className="flex flex-wrap gap-2">
                    {['All', ...categories.map(c => c.name)].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          selectedCategory === cat
                            ? 'bg-orange-primary text-white'
                            : 'text-gray-400 hover:text-white'
                        }`}
                        style={selectedCategory !== cat ? { background: '#0F1115', border: '1px solid #2A2F3A' } : {}}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-3">Price Range</p>
                  <div className="flex flex-wrap gap-2">
                    {priceRanges.map((range) => (
                      <button
                        key={range}
                        onClick={() => setSelectedPrice(range)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          selectedPrice === range
                            ? 'bg-orange-primary text-white'
                            : 'text-gray-400 hover:text-white'
                        }`}
                        style={selectedPrice !== range ? { background: '#0F1115', border: '1px solid #2A2F3A' } : {}}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-3">Sort By</p>
                  <div className="flex flex-wrap gap-2">
                    {sortOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSelectedSort(opt)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          selectedSort === opt
                            ? 'bg-orange-primary text-white'
                            : 'text-gray-400 hover:text-white'
                        }`}
                        style={selectedSort !== opt ? { background: '#0F1115', border: '1px solid #2A2F3A' } : {}}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category pills (quick filter) */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {['All', ...categories.map(c => c.name)].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-orange-primary text-white'
                  : 'text-gray-500 hover:text-white'
              }`}
              style={selectedCategory !== cat ? { background: '#161A22', border: '1px solid #2A2F3A' } : {}}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          {sorted.length > 0 ? (
            <motion.div
              key={`${selectedCategory}-${selectedSort}-${selectedPrice}-${search}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {sorted.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24 gap-4"
            >
              <div className="text-6xl mb-2">🔍</div>
              <p className="text-gray-400 font-semibold text-lg">No products found</p>
              <p className="text-gray-600 text-sm">Try adjusting your filters</p>
              <button
                onClick={() => { setSearch(''); setSelectedCategory('All'); setSelectedPrice('All'); }}
                className="btn-outline-orange px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 mt-2"
              >
                <X className="w-4 h-4" /> Clear Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
