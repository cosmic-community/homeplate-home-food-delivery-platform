import Link from 'next/link'
import { Star, Clock, Users, Flame } from 'lucide-react'
import { Dish } from '@/types'

interface DishCardProps {
  dish: Dish
}

export default function DishCard({ dish }: DishCardProps) {
  const dishImage = dish.metadata?.image?.imgix_url 
    ? `${dish.metadata.image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`
    : 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop&auto=format,compress'

  const price = dish.metadata?.price || 0
  const prepTime = dish.metadata?.prep_time || 30
  const servings = dish.metadata?.servings || 2
  const spiceLevel = dish.metadata?.spice_level || 'mild'
  const rating = dish.metadata?.rating || 4.5
  const chefName = dish.metadata?.chef?.title || 'Home Chef'
  const cuisineType = dish.metadata?.cuisine_type || 'International'
  const isAvailable = dish.metadata?.availability || false

  const getSpiceIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case 'mild':
        return <Flame className="h-4 w-4 text-gray-400" />
      case 'medium':
        return <Flame className="h-4 w-4 text-orange-400" />
      case 'hot':
        return <Flame className="h-4 w-4 text-red-500" />
      default:
        return <Flame className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <Link href={`/dishes/${dish.slug}`} className="block">
      <div className="card hover:shadow-lg transition-shadow duration-200 group p-0 overflow-hidden">
        <div className="relative">
          <img 
            src={dishImage}
            alt={dish.title}
            className="w-full h-48 object-cover"
          />
          {!isAvailable && (
            <div className="absolute top-3 right-3">
              <div className="bg-gray-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                Sold Out
              </div>
            </div>
          )}
          <div className="absolute bottom-3 left-3">
            <span className="bg-black bg-opacity-50 text-white text-xs font-medium px-2 py-1 rounded-full">
              {cuisineType}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1">
              {dish.title}
            </h3>
            <div className="text-lg font-bold text-primary-600">
              ${price.toFixed(2)}
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {dish.metadata?.description || 'Delicious home-cooked meal prepared with fresh ingredients and love.'}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{prepTime} min</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{servings} servings</span>
              </div>
              <div className="flex items-center space-x-1">
                {getSpiceIcon(spiceLevel)}
                <span className="capitalize">{spiceLevel}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              by <span className="font-medium text-gray-900">{chefName}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-primary-500 fill-current" />
              <span className="text-sm font-medium text-gray-900">{rating}</span>
            </div>
          </div>
          
          {isAvailable ? (
            <button className="w-full mt-4 btn-primary text-sm py-2">
              Add to Cart
            </button>
          ) : (
            <button disabled className="w-full mt-4 btn-secondary text-sm py-2 opacity-50 cursor-not-allowed">
              Currently Unavailable
            </button>
          )}
        </div>
      </div>
    </Link>
  )
}