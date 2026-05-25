import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency = 'QAR') {
  return `${currency} ${price.toLocaleString('en-QA')}`;
}

export function formatDiscount(original: number, sale: number) {
  return Math.round(((original - sale) / original) * 100);
}

export function getTimeLeft(endDate: string) {
  const now = new Date().getTime();
  const end = new Date(endDate).getTime();
  const diff = end - now;

  if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0, expired: true };

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { hours, minutes, seconds, expired: false };
}

export function getStockPercentage(stock: number, maxStock: number) {
  return Math.round((stock / maxStock) * 100);
}

export function truncate(str: string, n: number) {
  return str.length > n ? str.slice(0, n - 1) + '...' : str;
}
