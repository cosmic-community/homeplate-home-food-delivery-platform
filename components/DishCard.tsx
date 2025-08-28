import Link from 'next/link'
import { Dish } from '@/types'
import { Star, Clock, Leaf, Flame, User } from 'lucide-react'

interface DishCardProps {
  dish: Dish
  showChef?: boolean
}

export default function DishCard({ dish, showChef = true }: DishCardProps) {
  if (!dish || !dish.metadata) {
    return null
  }

  const dishImage = dish.metadata.dish_image?.imgix_url
  const price = dish.metadata.price || 0
  const chef = dish.metadata.chef
  const prepTime = dish.metadata.prep_time || 0
  const spiceLevel = dish.metadata.spice_level
  const dietaryPreferences = dish.metadata.dietary_preferences || []
  const cuisineType = dish.metadata.cuisine_type
  const ingredients = dish.metadata.ingredients || []

  const getSpiceLevelColor = (level: string | undefined) => {
    switch (level) {
      case 'mild': return 'text-green-600'
      case 'medium': return 'text-yellow-600'
      case 'hot': return 'text-orange-600'
      case 'extra_hot': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getSpiceLevelIcon = (level: string | undefined) => {
    switch (level) {
      case 'mild': return 1
      case 'medium': return 2
      case 'hot': return 3
      case 'extra_hot': return 4
      default: return 0
    }
  }

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200 h-full">
      {/* Dish Image */}
      <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-gray-100">
        {dishImage ? (
          <img
            src={`${dishImage}?w=600&h=400&fit=crop&auto=format,compress`}
            alt={dish.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
        )}
        
        {/* Price Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-white text-gray-900 px-2 py-1 rounded-lg text-sm font-semibold shadow">
            ₹{price}
          </span>
        </div>

        {/* Availability Badge */}
        {dish.metadata.availability && (
          <div className="absolute top-3 right-3">
            <span className="badge-success">
              Available
            </span>
          </div>
        )}
      </div>

      {/* Dish Info */}
      <div className="flex-1">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {dish.title}
          </h3>
        </div>

        {dish.metadata.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {dish.metadata.description}
          </p>
        )}

        {/* Tags Row */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {/* Cuisine Type */}
          {cuisineType && (
            <span className="badge bg-blue-50 text-blue-700 text-xs">
              {cuisineType}
            </span>
          )}

          {/* Dietary Preferences */}
          {dietaryPreferences.includes('vegetarian') && (
            <div className="flex items-center space-x-1">
              <Leaf className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">Veg</span>
            </div>
          )}

          {dietaryPreferences.includes('vegan') && (
            <span className="badge bg-green-50 text-green-700 text-xs">
              Vegan
            </span>
          )}

          {/* Spice Level */}
          {spiceLevel && (
            <div className={`flex items-center space-x-1 ${getSpiceLevelColor(spiceLevel)}`}>
              {Array.from({ length: getSpiceLevelIcon(spiceLevel) }).map((_, i) => (
                <Flame key={i} className="h-3 w-3 fill-current" />
              ))}
              <span className="text-xs capitalize">{spiceLevel}</span>
            </div>
          )}
        </div>

        {/* Details Row */}
        <div className="flex items-center space-x-4 text-gray-600 text-sm mb-3">
          {prepTime > 0 && (
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{prepTime} mins</span>
            </div>
          )}
          
          {dish.metadata.portion_size && (
            <div className="flex items-center space-x-1">
              <span>Serves: {dish.metadata.portion_size}</span>
            </div>
          )}
        </div>

        {/* Ingredients */}
        {ingredients.length > 0 && (
          <div className="mb-3">
            <p className="text-sm text-gray-600 mb-1">Main ingredients:</p>
            <p className="text-sm text-gray-800 line-clamp-1">
              {ingredients.slice(0, 3).join(', ')}
              {ingredients.length > 3 && '...'}
            </p>
          </div>
        )}

        {/* Chef Info */}
        {showChef && chef && (
          <div className="flex items-center space-x-2 mb-3 p-2 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              {chef.metadata?.profile_image?.imgix_url ? (
                <img
                  src={`${chef.metadata.profile_image.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                  alt={chef.title}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <User className="h-4 w-4 text-gray-500" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {chef.title}
              </p>
              {chef.metadata?.rating && (
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 text-primary-500 fill-current" />
                  <span className="text-xs text-gray-600">
                    {chef.metadata.rating.toFixed(1)}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">
              ₹{price}
            </span>
            {dish.metadata.portion_size && (
              <span className="text-sm text-gray-500">
                / {dish.metadata.portion_size}
              </span>
            )}
          </div>
          
          <Link href={`/dishes/${dish.slug}`}>
            <button className="btn-primary text-sm px-4 py-2">
              Order Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}