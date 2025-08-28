import Link from 'next/link'
import { getApprovedChefs, getAvailableDishes } from '@/lib/cosmic'
import Hero from '@/components/Hero'
import ChefCard from '@/components/ChefCard'
import DishCard from '@/components/DishCard'
import SearchBar from '@/components/SearchBar'
import StatsSection from '@/components/StatsSection'

export default async function HomePage() {
  const [chefs, dishes] = await Promise.all([
    getApprovedChefs(),
    getAvailableDishes()
  ])

  const featuredChefs = chefs.slice(0, 6)
  const popularDishes = dishes.slice(0, 8)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Search Section */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Find Your Perfect Meal
            </h2>
            <p className="text-lg text-gray-600">
              Search for dishes, cuisines, or chefs in your area
            </p>
          </div>
          <SearchBar />
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Featured Chefs */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Featured Home Chefs
              </h2>
              <p className="text-lg text-gray-600">
                Meet our talented community of home chefs
              </p>
            </div>
            <Link 
              href="/chefs"
              className="btn-outline"
            >
              View All Chefs
            </Link>
          </div>
          
          {featuredChefs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredChefs.map((chef) => (
                <ChefCard key={chef.id} chef={chef} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.196-2.196M17 20v-2a3 3 0 00-3-3H7a3 3 0 00-3 3v2m10-8a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Chefs Available</h3>
              <p className="text-gray-600">Check back soon for new home chefs in your area!</p>
            </div>
          )}
        </div>
      </section>

      {/* Popular Dishes */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Popular Dishes
              </h2>
              <p className="text-lg text-gray-600">
                Discover the most loved home-cooked meals
              </p>
            </div>
            <Link 
              href="/dishes"
              className="btn-outline"
            >
              View All Dishes
            </Link>
          </div>
          
          {popularDishes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularDishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Dishes Available</h3>
              <p className="text-gray-600">Check back soon for delicious home-cooked meals!</p>
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How HomePlate Works
            </h2>
            <p className="text-lg text-gray-600">
              Simple steps to enjoy delicious home-cooked meals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Browse & Search</h3>
              <p className="text-gray-600">
                Discover home chefs and their delicious dishes in your neighborhood. Filter by cuisine, dietary preferences, and more.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5-5M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Order & Pay</h3>
              <p className="text-gray-600">
                Add your favorite dishes to cart, customize your order, and pay securely with multiple payment options.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Enjoy Fresh Food</h3>
              <p className="text-gray-600">
                Track your order in real-time and enjoy fresh, home-cooked meals delivered straight to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="container">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your Food Journey?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Join thousands of food lovers discovering amazing home-cooked meals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/dishes"
                className="btn bg-white text-primary-600 hover:bg-gray-100"
              >
                Order Now
              </Link>
              <Link 
                href="/chefs/register"
                className="btn border border-white text-white hover:bg-white hover:text-primary-600"
              >
                Become a Chef
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}