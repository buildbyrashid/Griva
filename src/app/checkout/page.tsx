'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Shield, Truck, CreditCard, MessageCircle, CheckCircle, Zap, Tag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

const steps = ['Cart Review', 'Delivery', 'Payment'];

export default function CheckoutPage() {
  const { items, getSubtotal, getTotal, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod' | 'whatsapp'>('card');
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = getSubtotal();
  const shipping = subtotal > 500 ? 0 : 25;
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + shipping - discount;

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleCoupon = () => {
    if (coupon.toUpperCase() === 'GRIVA10') {
      setCouponApplied(true);
    }
  };

  const onSubmit = (data: any) => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      setOrderPlaced(true);
    }
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ paddingTop: '100px', background: '#0F1115' }}>
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-black text-white mb-3">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add some products before checking out</p>
          <Link href="/products">
            <button className="btn-orange px-8 py-4 rounded-2xl font-bold">Start Shopping</button>
          </Link>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ paddingTop: '100px', background: '#0F1115' }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md px-4"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 rounded-full bg-green-500/10 border-2 border-green-500 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-green-400" />
          </motion.div>
          <h2 className="text-3xl font-black text-white mb-3">Order Confirmed! 🎉</h2>
          <p className="text-gray-400 mb-2">Your order has been placed successfully.</p>
          <p className="text-gray-500 text-sm mb-8">You'll receive a WhatsApp confirmation shortly.</p>
          <div className="p-4 rounded-2xl mb-6" style={{ background: '#161A22', border: '1px solid #2A2F3A' }}>
            <p className="text-xs text-gray-500 mb-1">Order Total</p>
            <p className="text-2xl font-black gradient-text">{formatPrice(total)}</p>
          </div>
          <Link href="/products">
            <button className="btn-orange px-8 py-4 rounded-2xl font-bold w-full">Continue Shopping</button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ paddingTop: '100px', background: '#0F1115' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-black text-white mb-4">Checkout</h1>

          {/* Progress Indicator */}
          <div className="flex items-center gap-0">
            {steps.map((s, idx) => (
              <div key={s} className="flex items-center">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  idx + 1 === step ? 'bg-orange-primary text-white' :
                  idx + 1 < step ? 'text-green-400' : 'text-gray-600'
                }`}>
                  <span>{idx + 1 < step ? '✓' : idx + 1}</span>
                  <span className="hidden sm:block">{s}</span>
                </div>
                {idx < steps.length - 1 && (
                  <div className={`h-0.5 w-8 mx-1 ${idx + 1 < step ? 'bg-green-400' : 'bg-dark-border'}`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left — Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                  <h2 className="text-lg font-bold text-white mb-4">Delivery Information</h2>
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold block mb-2">First Name</label>
                        <input
                          {...register('firstName', { required: true })}
                          className="w-full px-4 py-3 rounded-xl text-white text-sm focus:outline-none focus:border-orange-primary/60 transition-colors"
                          style={{ background: '#161A22', border: '1px solid #2A2F3A' }}
                          placeholder="Ahmed"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold block mb-2">Last Name</label>
                        <input
                          {...register('lastName', { required: true })}
                          className="w-full px-4 py-3 rounded-xl text-white text-sm focus:outline-none focus:border-orange-primary/60 transition-colors"
                          style={{ background: '#161A22', border: '1px solid #2A2F3A' }}
                          placeholder="Al-Rashidi"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold block mb-2">Phone (WhatsApp)</label>
                      <input
                        {...register('phone', { required: true })}
                        className="w-full px-4 py-3 rounded-xl text-white text-sm focus:outline-none focus:border-orange-primary/60 transition-colors"
                        style={{ background: '#161A22', border: '1px solid #2A2F3A' }}
                        placeholder="+974 XXXX XXXX"
                        type="tel"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold block mb-2">Email</label>
                      <input
                        {...register('email', { required: true })}
                        className="w-full px-4 py-3 rounded-xl text-white text-sm focus:outline-none focus:border-orange-primary/60 transition-colors"
                        style={{ background: '#161A22', border: '1px solid #2A2F3A' }}
                        placeholder="ahmed@email.com"
                        type="email"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold block mb-2">Delivery Address</label>
                      <input
                        {...register('address', { required: true })}
                        className="w-full px-4 py-3 rounded-xl text-white text-sm focus:outline-none focus:border-orange-primary/60 transition-colors"
                        style={{ background: '#161A22', border: '1px solid #2A2F3A' }}
                        placeholder="Street, Area, Zone"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold block mb-2">City</label>
                        <input
                          {...register('city')}
                          className="w-full px-4 py-3 rounded-xl text-white text-sm focus:outline-none focus:border-orange-primary/60 transition-colors"
                          style={{ background: '#161A22', border: '1px solid #2A2F3A' }}
                          placeholder="Doha"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold block mb-2">Country</label>
                        <select
                          {...register('country')}
                          className="w-full px-4 py-3 rounded-xl text-white text-sm focus:outline-none focus:border-orange-primary/60 transition-colors appearance-none"
                          style={{ background: '#161A22', border: '1px solid #2A2F3A' }}
                        >
                          <option>Qatar</option>
                          <option>UAE</option>
                          <option>Saudi Arabia</option>
                          <option>Kuwait</option>
                          <option>Bahrain</option>
                          <option>Oman</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h2 className="text-lg font-bold text-white mb-4">Payment Method</h2>
                  <div className="space-y-3">
                    {[
                      { id: 'card', icon: CreditCard, label: 'Credit / Debit Card', sub: 'Visa, Mastercard, AMEX' },
                      { id: 'cod', icon: Truck, label: 'Cash on Delivery', sub: 'Pay when you receive' },
                      { id: 'whatsapp', icon: MessageCircle, label: 'WhatsApp Order', sub: 'Confirm & pay via WhatsApp' },
                    ].map(({ id, icon: Icon, label, sub }) => (
                      <motion.button
                        key={id}
                        type="button"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setPaymentMethod(id as any)}
                        className="w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all"
                        style={{
                          background: paymentMethod === id ? 'rgba(255,107,0,0.08)' : '#161A22',
                          border: `1.5px solid ${paymentMethod === id ? '#FF6B00' : '#2A2F3A'}`,
                        }}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          paymentMethod === id ? 'bg-orange-primary/20' : 'bg-dark-hover'
                        }`}>
                          <Icon className={`w-5 h-5 ${paymentMethod === id ? 'text-orange-primary' : 'text-gray-500'}`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-white">{label}</p>
                          <p className="text-xs text-gray-500">{sub}</p>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          paymentMethod === id ? 'border-orange-primary bg-orange-primary' : 'border-gray-600'
                        }`} />
                      </motion.button>
                    ))}
                  </div>

                  {paymentMethod === 'card' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 space-y-3"
                    >
                      <input
                        className="w-full px-4 py-3 rounded-xl text-white text-sm focus:outline-none"
                        style={{ background: '#161A22', border: '1px solid #2A2F3A' }}
                        placeholder="Card Number"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          className="px-4 py-3 rounded-xl text-white text-sm focus:outline-none"
                          style={{ background: '#161A22', border: '1px solid #2A2F3A' }}
                          placeholder="MM / YY"
                        />
                        <input
                          className="px-4 py-3 rounded-xl text-white text-sm focus:outline-none"
                          style={{ background: '#161A22', border: '1px solid #2A2F3A' }}
                          placeholder="CVV"
                        />
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Navigation */}
              <div className="flex gap-3 mt-8">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="btn-outline-orange flex-1 py-4 rounded-2xl text-sm font-bold"
                  >
                    ← Back
                  </button>
                )}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-orange flex-1 py-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2"
                >
                  {step === 2 ? (
                    <>
                      <Zap className="w-4 h-4" />
                      Place Order — {formatPrice(total)}
                    </>
                  ) : (
                    'Continue →'
                  )}
                </motion.button>
              </div>
            </form>
          </div>

          {/* Right — Order Summary (Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-4">
              <div className="p-5 rounded-2xl" style={{ background: '#161A22', border: '1px solid #2A2F3A' }}>
                <h3 className="text-sm font-bold text-white mb-4">Order Summary</h3>

                {/* Items */}
                <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                        <Image src={item.product.thumbnail} alt={item.product.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-white line-clamp-1">{item.product.name}</p>
                        <p className="text-[10px] text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-xs font-bold text-white flex-shrink-0">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Coupon */}
                <div className="flex gap-2 mb-4">
                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Coupon code"
                    className="flex-1 px-3 py-2 rounded-xl text-white text-xs focus:outline-none"
                    style={{ background: '#0F1115', border: '1px solid #2A2F3A' }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleCoupon}
                    className="px-3 py-2 rounded-xl text-xs font-semibold text-orange-primary border border-orange-primary/40 hover:bg-orange-primary/10 transition-all flex items-center gap-1"
                  >
                    <Tag className="w-3 h-3" />
                    Apply
                  </motion.button>
                </div>
                {couponApplied && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 text-xs text-green-400 mb-3 px-3 py-2 rounded-xl bg-green-900/20 border border-green-500/20"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    Coupon GRIVA10 applied! 10% off
                  </motion.div>
                )}

                {/* Totals */}
                <div className="space-y-2 border-t border-dark-border pt-3">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'text-green-400' : ''}>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between text-xs text-green-400">
                      <span>Discount</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-black text-base border-t border-dark-border pt-2">
                    <span className="text-white">Total</span>
                    <span className="text-orange-primary">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              {/* Trust */}
              <div className="space-y-2.5 px-1">
                {[
                  { icon: Shield, text: 'SSL Encrypted Secure Checkout' },
                  { icon: CheckCircle, text: '100% Original Products Guaranteed' },
                  { icon: MessageCircle, text: 'WhatsApp Confirmation Sent' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5 text-xs text-gray-500">
                    <Icon className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
