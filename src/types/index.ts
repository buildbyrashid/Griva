// ============================================
// GRIVA — TypeScript Types
// ============================================

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  subcategory?: string;
  price: number;
  originalPrice: number;
  discount: number;
  images: string[];
  thumbnail: string;
  rating: number;
  reviewCount: number;
  soldCount: number;
  stock: number;
  maxStock: number;
  colors?: ProductColor[];
  tags: string[];
  isTrending?: boolean;
  isNew?: boolean;
  isFlashSale?: boolean;
  isFeatured?: boolean;
  deliveryDays: number;
  warranty: string;
  emi?: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  badge?: 'trending' | 'new' | 'sale' | 'hot' | 'limited';
  flashSaleEndsAt?: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  productCount: number;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: ProductColor;
}

export interface Cart {
  items: CartItem[];
  total: number;
  subtotal: number;
  shipping: number;
  discount: number;
  couponCode?: string;
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  location: string;
  rating: number;
  content: string;
  date: string;
  verified: boolean;
  productName: string;
  helpful: number;
}

export interface FlashSale {
  id: string;
  product: Product;
  salePrice: number;
  originalPrice: number;
  discount: number;
  endsAt: string;
  soldCount: number;
  totalStock: number;
  remainingStock: number;
}

export interface LiveNotification {
  id: string;
  name: string;
  location: string;
  productName: string;
  productImage: string;
  timeAgo: string;
}

export type SetupType = 'gaming' | 'work' | 'travel' | 'creator' | 'apple';

export interface SetupItem {
  type: SetupType;
  label: string;
  icon: string;
  products: Product[];
}

export interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  paymentMethod: 'card' | 'cod' | 'whatsapp' | 'applepay';
  couponCode?: string;
}
