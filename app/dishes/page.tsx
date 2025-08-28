import { getAvailableDishes } from '@/lib/cosmic'
import DishCard from '@/components/DishCard'
import SearchFilters from '@/components/SearchFilters'

export const metadata = {
  title: 'Browse Dishes - HomePlate',
  description: 'Discover delicious home-cooked dishes from talented chefs in your neighborhood.',
}

interface SearchParams {
  searchParams: Promise<{
    cuisine?: string
    price?: string
    dietary?: string
    spice?: string
    rating?: string
  }>
}

export default async function DishesPage({ searchParams }: SearchParams) {
  const params = await searchParams
  const dishes = await getAvailableDishes()

  // Filter dishes based on search parameters
  let filteredDishes = dishes

  if (params.cuisine) {
    filteredDishes = filteredDishes.filter(dish => 
      dish.metadata.cuisine_type?.toLowerCase() === params.cuisine?.toLowerCase()
    )
  }

  if (params.price) {
    const [min, max] = params.price.split('-').map(p => p === '+' ? Infinity : parseInt(p))
    filteredDishes = filteredDishes.filter(dish => {
      const price = dish.metadata.price
      return price >= min && price <= max
    })
  }

  if (params.dietary) {
    filteredDishes = filteredDishes.filter(dish =>
      dish.metadata.dietary_preferences?.includes(params.dietary as any)
    )
  }

  if (params.spice) {
    filteredDishes = filteredDishes.filter(dish =>
      dish.metadata.spice_level === params.spice
    )
  }

  if (params.rating) {
    const minRating = parseFloat(params.rating)
    filteredDishes = filteredDishes.filter(dish => {
      const chefRating = dish.metadata.chef?.metadata?.rating || 0
      return chefRating >= minRating
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="container py-12">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Discover Amazing Dishes
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore authentic, home-cooked meals from talented chefs in your neighborhood
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <SearchFilters />
          </div>

          {/* Dishes Grid */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {filteredDishes.length} Dishes Available
              </h2>
              
              <select className="input w-auto">
                <option value="relevance">Sort by: Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            {/* Dishes Grid */}
            {filteredDishes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDishes.map((dish) => (
                  <DishCard key={dish.id} dish={dish} showChef={true} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Dishes Found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria.</p>
                <button 
                  onClick={() => window.location.href = '/dishes'}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}