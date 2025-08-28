import { createBucketClient } from '@cosmicjs/sdk'
import { Chef, Dish, Order, Customer, Review, Subscription, SearchFilters, hasStatus } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Chef operations
export async function getChefs(): Promise<Chef[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'chefs' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Chef[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch chefs');
  }
}

export async function getApprovedChefs(): Promise<Chef[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'chefs',
        'metadata.status': 'approved',
        'metadata.availability': true
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Chef[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch approved chefs');
  }
}

export async function getChefBySlug(slug: string): Promise<Chef | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'chefs',
        slug
      })
      .depth(1);
    
    const chef = response.object as Chef;
    
    if (!chef || !chef.metadata) {
      return null;
    }
    
    return chef;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch chef');
  }
}

// Dish operations
export async function getDishes(): Promise<Dish[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'dishes' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Dish[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch dishes');
  }
}

export async function getAvailableDishes(): Promise<Dish[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'dishes',
        'metadata.availability': true
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Dish[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch available dishes');
  }
}

export async function getDishesByChef(chefId: string): Promise<Dish[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'dishes',
        'metadata.chef': chefId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Dish[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch chef dishes');
  }
}

export async function searchDishes(filters: SearchFilters): Promise<Dish[]> {
  try {
    let query: Record<string, any> = { 
      type: 'dishes',
      'metadata.availability': true
    };
    
    if (filters.cuisine) {
      query['metadata.cuisine_type'] = filters.cuisine;
    }
    
    if (filters.dietary && filters.dietary.length > 0) {
      query['metadata.dietary_preferences'] = { $in: filters.dietary };
    }
    
    if (filters.spiceLevel) {
      query['metadata.spice_level'] = filters.spiceLevel;
    }
    
    const response = await cosmic.objects
      .find(query)
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    let dishes = response.objects as Dish[];
    
    // Filter by price range if specified
    if (filters.priceRange) {
      dishes = dishes.filter(dish => {
        const price = dish.metadata.price;
        return price >= (filters.priceRange?.min || 0) && price <= (filters.priceRange?.max || Infinity);
      });
    }
    
    // Filter by chef rating if specified
    if (filters.rating) {
      dishes = dishes.filter(dish => {
        const chefRating = dish.metadata.chef?.metadata?.rating || 0;
        return chefRating >= (filters.rating || 0);
      });
    }
    
    return dishes;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to search dishes');
  }
}

// Order operations
export async function createOrder(orderData: {
  customer: string;
  chef: string;
  dishes: Array<{
    dish: string;
    quantity: number;
    customizations?: any;
    price: number;
  }>;
  totalAmount: number;
  deliveryAddress: any;
  paymentMethod?: string;
  specialInstructions?: string;
}): Promise<Order> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'orders',
      title: `Order ${Date.now()}`,
      metadata: {
        customer: orderData.customer,
        chef: orderData.chef,
        dishes: orderData.dishes,
        status: 'pending',
        total_amount: orderData.totalAmount,
        delivery_address: orderData.deliveryAddress,
        payment_method: orderData.paymentMethod || 'card',
        special_instructions: orderData.specialInstructions || '',
        order_date: new Date().toISOString(),
        tracking_info: {
          order_placed: new Date().toISOString()
        }
      }
    });
    
    return response.object as Order;
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Failed to create order');
  }
}

export async function updateOrderStatus(orderId: string, status: string, trackingUpdate?: Record<string, string>): Promise<Order> {
  try {
    const updateData: any = { status };
    
    if (trackingUpdate) {
      updateData.tracking_info = trackingUpdate;
    }
    
    const response = await cosmic.objects.updateOne(orderId, {
      metadata: updateData
    });
    
    return response.object as Order;
  } catch (error) {
    console.error('Error updating order:', error);
    throw new Error('Failed to update order');
  }
}

export async function getOrdersByCustomer(customerId: string): Promise<Order[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'orders',
        'metadata.customer': customerId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const orders = (response.objects as Order[]).sort((a, b) => {
      const dateA = new Date(a.metadata?.order_date || '').getTime();
      const dateB = new Date(b.metadata?.order_date || '').getTime();
      return dateB - dateA; // Newest first
    });
    
    return orders;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch customer orders');
  }
}

export async function getOrdersByChef(chefId: string): Promise<Order[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'orders',
        'metadata.chef': chefId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const orders = (response.objects as Order[]).sort((a, b) => {
      const dateA = new Date(a.metadata?.order_date || '').getTime();
      const dateB = new Date(b.metadata?.order_date || '').getTime();
      return dateB - dateA; // Newest first
    });
    
    return orders;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch chef orders');
  }
}

// Review operations
export async function createReview(reviewData: {
  customer: string;
  chef: string;
  order: string;
  rating: number;
  foodQualityRating?: number;
  packagingRating?: number;
  deliveryRating?: number;
  comment?: string;
}): Promise<Review> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'reviews',
      title: `Review for Order ${reviewData.order}`,
      metadata: {
        customer: reviewData.customer,
        chef: reviewData.chef,
        order: reviewData.order,
        rating: reviewData.rating,
        food_quality_rating: reviewData.foodQualityRating || reviewData.rating,
        packaging_rating: reviewData.packagingRating || reviewData.rating,
        delivery_rating: reviewData.deliveryRating || reviewData.rating,
        comment: reviewData.comment || '',
        review_date: new Date().toISOString(),
        helpful_count: 0
      }
    });
    
    return response.object as Review;
  } catch (error) {
    console.error('Error creating review:', error);
    throw new Error('Failed to create review');
  }
}

export async function getReviewsByChef(chefId: string): Promise<Review[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'reviews',
        'metadata.chef': chefId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const reviews = (response.objects as Review[]).sort((a, b) => {
      const dateA = new Date(a.metadata?.review_date || '').getTime();
      const dateB = new Date(b.metadata?.review_date || '').getTime();
      return dateB - dateA; // Newest first
    });
    
    return reviews;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch chef reviews');
  }
}

// Dashboard statistics
export async function getDashboardStats(): Promise<any> {
  try {
    // Get all data concurrently
    const [ordersResponse, chefsResponse, customersResponse, reviewsResponse] = await Promise.all([
      cosmic.objects.find({ type: 'orders' }).props(['id', 'metadata']),
      cosmic.objects.find({ type: 'chefs' }).props(['id', 'metadata']),
      cosmic.objects.find({ type: 'customers' }).props(['id']),
      cosmic.objects.find({ type: 'reviews' }).props(['id', 'metadata'])
    ]);
    
    const orders = ordersResponse.objects as Order[];
    const chefs = chefsResponse.objects as Chef[];
    const customers = customersResponse.objects;
    const reviews = reviewsResponse.objects as Review[];
    
    // Calculate statistics
    const totalRevenue = orders.reduce((sum, order) => sum + (order.metadata?.total_amount || 0), 0);
    const activeChefs = chefs.filter(chef => chef.metadata?.status === 'approved' && chef.metadata?.availability).length;
    const averageRating = reviews.length > 0 
      ? reviews.reduce((sum, review) => sum + (review.metadata?.rating || 0), 0) / reviews.length 
      : 0;
    
    const today = new Date().toISOString().split('T')[0];
    const ordersToday = orders.filter(order => 
      order.metadata?.order_date?.startsWith(today)
    ).length;
    
    return {
      totalOrders: orders.length,
      totalRevenue,
      activeChefs,
      totalCustomers: customers.length,
      averageRating: Math.round(averageRating * 10) / 10,
      ordersToday
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      totalOrders: 0,
      totalRevenue: 0,
      activeChefs: 0,
      totalCustomers: 0,
      averageRating: 0,
      ordersToday: 0
    };
  }
}