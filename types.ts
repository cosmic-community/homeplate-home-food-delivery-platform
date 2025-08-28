// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Home Chef object type
export interface Chef extends CosmicObject {
  type: 'chefs';
  metadata: {
    bio?: string;
    specialties?: string[];
    phone?: string;
    email?: string;
    rating?: number;
    profile_image?: {
      url: string;
      imgix_url: string;
    };
    license_image?: {
      url: string;
      imgix_url: string;
    };
    address?: string;
    availability?: boolean;
    cuisines?: string[];
    experience_years?: number;
    status: ChefStatus;
    commission_rate?: number;
  };
}

// Dish object type
export interface Dish extends CosmicObject {
  type: 'dishes';
  metadata: {
    chef: Chef;
    description?: string;
    price: number;
    ingredients?: string[];
    allergens?: string[];
    portion_size?: string;
    prep_time?: number;
    cuisine_type?: string;
    dietary_preferences?: DietaryPreference[];
    spice_level?: SpiceLevel;
    availability?: boolean;
    category?: string;
    dish_image?: {
      url: string;
      imgix_url: string;
    };
    nutrition_info?: {
      calories?: number;
      protein?: number;
      carbs?: number;
      fat?: number;
    };
  };
}

// Customer object type
export interface Customer extends CosmicObject {
  type: 'customers';
  metadata: {
    email?: string;
    phone?: string;
    addresses?: Address[];
    preferences?: {
      cuisines?: string[];
      dietary_restrictions?: string[];
      spice_level?: SpiceLevel;
    };
    loyalty_points?: number;
    profile_image?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Order object type
export interface Order extends CosmicObject {
  type: 'orders';
  metadata: {
    customer: Customer;
    chef: Chef;
    dishes: OrderDish[];
    status: OrderStatus;
    total_amount: number;
    delivery_address: Address;
    payment_method?: PaymentMethod;
    delivery_time?: string;
    special_instructions?: string;
    order_date: string;
    estimated_delivery?: string;
    delivery_fee?: number;
    tax_amount?: number;
    discount_amount?: number;
    tracking_info?: {
      order_placed?: string;
      chef_accepted?: string;
      preparation_started?: string;
      ready_for_pickup?: string;
      out_for_delivery?: string;
      delivered?: string;
    };
  };
}

// Review object type
export interface Review extends CosmicObject {
  type: 'reviews';
  metadata: {
    customer: Customer;
    chef: Chef;
    order: Order;
    rating: number;
    food_quality_rating?: number;
    packaging_rating?: number;
    delivery_rating?: number;
    comment?: string;
    review_date: string;
    helpful_count?: number;
  };
}

// Subscription object type
export interface Subscription extends CosmicObject {
  type: 'subscriptions';
  metadata: {
    customer: Customer;
    chef: Chef;
    plan_type: SubscriptionPlan;
    status: SubscriptionStatus;
    start_date: string;
    end_date?: string;
    delivery_days?: string[];
    meal_count?: number;
    total_amount: number;
    auto_renewal?: boolean;
    preferences?: {
      dishes?: Dish[];
      dietary_restrictions?: string[];
    };
  };
}

// Supporting types
export interface Address {
  label?: string;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  is_default?: boolean;
}

export interface OrderDish {
  dish: Dish;
  quantity: number;
  customizations?: {
    spice_level?: SpiceLevel;
    special_requests?: string;
  };
  price: number;
}

// Type literals for select-dropdown values
export type ChefStatus = 'pending' | 'approved' | 'suspended' | 'rejected';
export type OrderStatus = 'pending' | 'accepted' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered' | 'cancelled';
export type PaymentMethod = 'card' | 'upi' | 'wallet' | 'cash_on_delivery' | 'net_banking';
export type DietaryPreference = 'vegetarian' | 'vegan' | 'gluten_free' | 'dairy_free' | 'keto' | 'halal' | 'jain';
export type SpiceLevel = 'mild' | 'medium' | 'hot' | 'extra_hot';
export type SubscriptionPlan = 'weekly' | 'monthly' | 'quarterly';
export type SubscriptionStatus = 'active' | 'paused' | 'cancelled' | 'expired';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Search and filter types
export interface SearchFilters {
  cuisine?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  dietary?: DietaryPreference[];
  spiceLevel?: SpiceLevel;
  distance?: number;
  availability?: boolean;
}

// Dashboard statistics types
export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  activeChefs: number;
  totalCustomers: number;
  averageRating: number;
  ordersToday: number;
}

// Type guards for runtime validation
export function isChef(obj: CosmicObject): obj is Chef {
  return obj.type === 'chefs';
}

export function isDish(obj: CosmicObject): obj is Dish {
  return obj.type === 'dishes';
}

export function isOrder(obj: CosmicObject): obj is Order {
  return obj.type === 'orders';
}

export function isCustomer(obj: CosmicObject): obj is Customer {
  return obj.type === 'customers';
}

export function isReview(obj: CosmicObject): obj is Review {
  return obj.type === 'reviews';
}

// Utility types
export type CreateChefData = Omit<Chef, 'id' | 'created_at' | 'modified_at'>;
export type CreateDishData = Omit<Dish, 'id' | 'created_at' | 'modified_at'>;
export type CreateOrderData = Omit<Order, 'id' | 'created_at' | 'modified_at'>;
export type UpdateOrderData = Partial<Pick<Order['metadata'], 'status' | 'tracking_info'>>;

// Error helper for Cosmic SDK
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}