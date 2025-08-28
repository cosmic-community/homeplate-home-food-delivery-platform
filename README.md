# HomePlate - Home Food Delivery Platform

![App Preview](https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&h=300&fit=crop&auto=format)

A comprehensive home food delivery platform connecting food lovers with talented home chefs. HomePlate enables customers to discover authentic, home-cooked meals while providing home chefs with a marketplace to showcase their culinary skills.

## ✨ Features

- **Multi-User System** - Separate dashboards for customers, home chefs, delivery partners, and admins
- **Smart Discovery** - Advanced search and filtering by cuisine, price, ratings, and distance
- **Chef Profiles** - Detailed portfolios with specialties, photos, ratings, and reviews
- **Real-Time Orders** - Live order tracking and status updates
- **Menu Management** - Dynamic availability and customization options
- **Payment Integration** - Multiple payment methods including digital wallets and COD
- **Review System** - Comprehensive rating and feedback system
- **Subscription Plans** - Weekly and monthly meal plan options
- **Analytics Dashboard** - Business insights and performance metrics
- **Mobile Responsive** - Optimized for all devices

<!-- CLONE_PROJECT_BUTTON -->

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Features of Home Food Delivery Website
👨‍🍳 For Customers (Ordering Food)

User Registration & Profile

Create account with email/phone.

Save delivery addresses.

Browse Home-Cooked Meals

List of available home chefs/meal providers.

Filter by cuisine, price, rating, distance.

Menu & Dish Details

See dish details (ingredients, portion size, allergens).

Photos of meals for trust & attraction.

Order Placement

Add to cart.

Select quantity, customization (spice level, veg/non-veg).

Payments

Online payments (UPI, wallets, debit/credit card, net banking).

Cash on delivery (optional).

Delivery Tracking

Estimated delivery time.

Live tracking of delivery partner.

Subscription / Meal Plans

Weekly or monthly tiffin subscription.

Auto-renewal option.

Ratings & Reviews

Rate food quality, packaging, taste.

Share feedback for home chefs.

Offers & Discounts

Coupons for first order.

Referral bonuses.

Loyalty points.

Help & Support

Contact customer support.

FAQs.

🍴 For Home Chefs / Food Providers

Chef Profile

Register as home chef.

Upload ID & food license (if required).

Menu Management

Add meals with name, photo, price, ingredients.

Mark dishes as available/unavailable daily.

Order Management

Accept or reject incoming orders.

Update preparation status.

Earnings Dashboard

Track daily/weekly/monthly sales.

Withdraw payments.

Customer Communication

Respond to customer queries.

Handle special requests.

🚴 Delivery Features

Delivery integration (own staff or partner with Swiggy Genie, Dunzo, etc.).

Real-time delivery status.

Delivery agent app (optional) with route guidance.

🛠️ Admin / Website Owner Features

Dashboard

Overview of orders, customers, chefs, and revenue.

User Management

Approve/reject chef registrations.

Manage customer accounts.

Order Management

Monitor all orders.

Handle escalations.

Payments & Commissions

Track payments to chefs.

Deduct platform commission.

Reports & Analytics

Best-selling dishes.

Top-performing chefs.

Peak order timings.

Marketing Tools

Send offers to users.

Run promotions for chefs."

### Code Generation Prompt

> Features of Home Food Delivery Website
👨‍🍳 For Customers (Ordering Food)

User Registration & Profile

Create account with email/phone.

Save delivery addresses.

Browse Home-Cooked Meals

List of available home chefs/meal providers.

Filter by cuisine, price, rating, distance.

Menu & Dish Details

See dish details (ingredients, portion size, allergens).

Photos of meals for trust & attraction.

Order Placement

Add to cart.

Select quantity, customization (spice level, veg/non-veg).

Payments

Online payments (UPI, wallets, debit/credit card, net banking).

Cash on delivery (optional).

Delivery Tracking

Estimated delivery time.

Live tracking of delivery partner.

Subscription / Meal Plans

Weekly or monthly tiffin subscription.

Auto-renewal option.

Ratings & Reviews

Rate food quality, packaging, taste.

Share feedback for home chefs.

Offers & Discounts

Coupons for first order.

Referral bonuses.

Loyalty points.

Help & Support

Contact customer support.

FAQs.

🍴 For Home Chefs / Food Providers

Chef Profile

Register as home chef.

Upload ID & food license (if required).

Menu Management

Add meals with name, photo, price, ingredients.

Mark dishes as available/unavailable daily.

Order Management

Accept or reject incoming orders.

Update preparation status.

Earnings Dashboard

Track daily/weekly/monthly sales.

Withdraw payments.

Customer Communication

Respond to customer queries.

Handle special requests.

🚴 Delivery Features

Delivery integration (own staff or partner with Swiggy Genie, Dunzo, etc.).

Real-time delivery status.

Delivery agent app (optional) with route guidance.

🛠️ Admin / Website Owner Features

Dashboard

Overview of orders, customers, chefs, and revenue.

User Management

Approve/reject chef registrations.

Manage customer accounts.

Order Management

Monitor all orders.

Handle escalations.

Payments & Commissions

Track payments to chefs.

Deduct platform commission.

Reports & Analytics

Best-selling dishes.

Top-performing chefs.

Peak order timings.

Marketing Tools

Send offers to users.

Run promotions for chefs.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🚀 Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic CMS** - Headless content management
- **Bun** - Fast JavaScript runtime and package manager

## 🎯 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up your environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Add your Cosmic credentials to `.env.local`:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

5. Run the development server:
   ```bash
   bun dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Cosmic SDK Examples

### Fetching Home Chefs
```typescript
import { cosmic } from '@/lib/cosmic'

const chefs = await cosmic.objects
  .find({ type: 'chefs' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Creating an Order
```typescript
const order = await cosmic.objects.insertOne({
  type: 'orders',
  title: `Order ${orderId}`,
  metadata: {
    customer: customerId,
    chef: chefId,
    dishes: dishIds,
    status: 'pending',
    total_amount: totalAmount
  }
})
```

## 🛠️ Cosmic CMS Integration

This application integrates with Cosmic CMS to manage:

- **Home Chefs** - Chef profiles, specialties, and availability
- **Dishes** - Menu items with ingredients, pricing, and photos
- **Orders** - Order tracking and status management
- **Customers** - User profiles and delivery addresses
- **Reviews** - Rating and feedback system
- **Subscriptions** - Meal plan management

The content model supports complex relationships between objects, enabling features like chef recommendations, order history, and personalized meal suggestions.

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set build command to `bun run build`
4. Set publish directory to `.next`
5. Add environment variables
6. Deploy!

### Environment Variables

Make sure to set these environment variables in your deployment platform:

- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`