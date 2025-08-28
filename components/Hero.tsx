import Link from 'next/link'
import { Search, Clock, Award, Users } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-primary-600 to-primary-700 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}></div>
      
      <div className="relative container">
        <div className="py-20 md:py-28 text-center">
          {/* Hero Content */}
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Discover Amazing
              <span className="text-primary-200 block">Home-Cooked Meals</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Connect with talented home chefs in your neighborhood and enjoy authentic, delicious meals delivered fresh to your doorstep.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link 
                href="/dishes"
                className="btn bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-3"
              >
                <Search className="h-5 w-5 mr-2" />
                Browse Dishes
              </Link>
              <Link 
                href="/chefs/register"
                className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-3"
              >
                Become a Chef
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">30 min</div>
                  <div className="text-primary-200">Average Delivery</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-3">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                  <Award className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">4.8★</div>
                  <div className="text-primary-200">Average Rating</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-3">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">1000+</div>
                  <div className="text-primary-200">Happy Customers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hero Image */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
        <img 
          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&auto=format,compress"
          alt="Delicious home-cooked food"
          className="w-full h-full object-cover opacity-30"
        />
      </div>
    </section>
  )
}