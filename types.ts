
export interface Service {
  id: string;
  title: string;
  description: string;
  fullContent: string;
  image: string;
  icon: string;
  features?: string[];
  gallery?: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  location: string;
  description: string;
  fullStory: string;
  images: string[];
  category: string;
  guestCount?: string;
  year?: string;
}

export interface ContactDetails {
  address: string;
  phones: string[];
  email: string;
}

export interface InquiryMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service: string;
  eventType?: string;
  eventDate?: string;
  guestCount?: string;
  budget?: string;
  location?: string;
  hearAboutUs?: string;
  message: string;
  date: string;
  status: 'new' | 'read' | 'archived';
  type: 'inquiry' | 'booking';
}

export interface BookingRequest {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guestCount: string;
  budget: string;
  location: string;
  message: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  description: string;
  fullDescription: string;
  images: string[];
  tags: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  isNew?: boolean;
  isBestseller?: boolean;
  isSale?: boolean;
  isFeatured?: boolean;
  origin: string;
  materials: string[];
  dimensions?: string;
  colors?: string[];
  reviews?: Review[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  count: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  role: string;
  comment: string;
  rating: number;
  avatar?: string;
  event?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'weddings' | 'corporate' | 'inspiration' | 'tips' | 'culture';
  author: string;
  authorRole: string;
  date: string;
  readTime: number;
  image: string;
  tags: string[];
  featured?: boolean;
}

export interface EventType {
  id: string;
  name: string;
  description: string;
  image: string;
  link: string;
  tag?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  country: 'UK' | 'Ghana' | 'Both';
}
