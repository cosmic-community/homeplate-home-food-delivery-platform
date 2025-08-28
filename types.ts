export interface CosmicObject {
  id: string
  title: string
  slug: string
  status?: string
  created_at: string
  modified_at: string
  metadata?: Record<string, any>
}

export interface Chef extends CosmicObject {
  metadata?: {
    profile_image?: {
      imgix_url?: string
    }
    bio?: string
    email?: string
    phone?: string
    location?: string
    status?: 'pending' | 'approved' | 'suspended'
    availability?: boolean
    specialties?: string[]
    experience_years?: number
    rating?: number
    total_orders?: number
    joined_date?: string
    certifications?: string[]
    social_media?: {
      instagram?: string
      facebook?: string
      twitter?: string
    }
  }
}

export interface Dish extends CosmicObject {
  metadata?: {
    image?: {
      imgix_url?: string
    }
    chef?: Chef
    description?: string
    ingredients?: string[]
    price?: number
    prep_time?: number
    cook_time?: number
    servings?: number
    cuisine_type?: string
    spice_level?: 'mild' | 'medium' | 'hot'
    dietary_preferences?: string[]
    nutritional_info?: {
      calories?: number
      protein?: number
      carbs?: number
      fat?: number
    }
    availability?: boolean
    max_orders_per_day?: number
    rating?: number
    allergens?: string[]
    tags?: string[]
  }
}

export interface Order extends CosmicObject {
  metadata?: {
    customer?: Customer
    chef?: Chef
    dishes?: Array<{
      dish: Dish
      quantity: number
      customizations?: any
      price: number
    }>
    status?: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled'
    total_amount?: number
    delivery_address?: {
      street?: string
      city?: string
      state?: string
      zip?: string
      country?: string
      delivery_instructions?: string
    }
    payment_method?: string
    payment_status?: 'pending' | 'paid' | 'failed' | 'refunded'
    order_date?: string
    delivery_date?: string
    special_instructions?: string
    tracking_info?: {
      order_placed?: string
      confirmed?: string
      preparing?: string
      ready?: string
      out_for_delivery?: string
      delivered?: string
    }
  }
}

export interface Customer extends CosmicObject {
  metadata?: {
    email?: string
    first_name?: string
    last_name?: string
    phone?: string
    profile_image?: {
      imgix_url?: string
    }
    addresses?: Array<{
      label?: string
      street?: string
      city?: string
      state?: string
      zip?: string
      country?: string
      is_default?: boolean
    }>
    preferences?: {
      dietary_restrictions?: string[]
      favorite_cuisines?: string[]
      spice_tolerance?: 'mild' | 'medium' | 'hot'
    }
    loyalty_points?: number
    total_orders?: number
    favorite_chefs?: string[]
    joined_date?: string
  }
}

export interface Review extends CosmicObject {
  metadata?: {
    customer?: Customer
    chef?: Chef
    order?: Order
    rating?: number
    food_quality_rating?: number
    packaging_rating?: number
    delivery_rating?: number
    comment?: string
    review_date?: string
    helpful_count?: number
    response?: {
      message?: string
      date?: string
    }
  }
}

export interface Subscription extends CosmicObject {
  metadata?: {
    customer?: Customer
    plan_type?: 'weekly' | 'bi-weekly' | 'monthly'
    meals_per_week?: number
    price_per_meal?: number
    total_price?: number
    preferences?: {
      dietary_restrictions?: string[]
      preferred_cuisines?: string[]
      excluded_ingredients?: string[]
      spice_level?: 'mild' | 'medium' | 'hot'
    }
    delivery_schedule?: {
      day_of_week?: string
      time_slot?: string
    }
    status?: 'active' | 'paused' | 'cancelled'
    start_date?: string
    next_delivery?: string
    billing_cycle?: string
  }
}

export interface SearchFilters {
  cuisine?: string
  dietary?: string[]
  priceRange?: {
    min: number
    max: number
  }
  spiceLevel?: string
  rating?: number
  location?: string
  availability?: boolean
}

// Utility type guards
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

export function isChef(obj: any): obj is Chef {
  return obj && typeof obj === 'object' && obj.type === 'chefs'
}

export function isDish(obj: any): obj is Dish {
  return obj && typeof obj === 'object' && obj.type === 'dishes'
}

export function isOrder(obj: any): obj is Order {
  return obj && typeof obj === 'object' && obj.type === 'orders'
}

export function isCustomer(obj: any): obj is Customer {
  return obj && typeof obj === 'object' && obj.type === 'customers'
}

export function isReview(obj: any): obj is Review {
  return obj && typeof obj === 'object' && obj.type === 'reviews'
}