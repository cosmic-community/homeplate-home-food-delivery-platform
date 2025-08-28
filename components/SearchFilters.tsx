'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function SearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [filters, setFilters] = useState({
    cuisine: searchParams.get('cuisine') || '',
    price: searchParams.get('price') || '',
    dietary: searchParams.get('dietary') || '',
    spice: searchParams.get('spice') || '',
    rating: searchParams.get('rating') || ''
  })

  const updateURL = (newFilters: typeof filters) => {
    const params = new URLSearchParams(searchParams.toString())
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })
    
    router.push(`/dishes?${params.toString()}`)
  }

  const handleFilterChange = (filterType: keyof typeof filters, value: string) => {
    const newFilters = { ...filters, [filterType]: value }
    setFilters(newFilters)
    updateURL(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters = {
      cuisine: '',
      price: '',
      dietary: '',
      spice: '',
      rating: ''
    }
    setFilters(clearedFilters)
    router.push('/dishes')
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-primary-600 hover:text-primary-700"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        {/* Cuisine Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Cuisine Type
          </label>
          <div className="space-y-2">
            {[
              { value: '', label: 'All Cuisines' },
              { value: 'indian', label: 'Indian' },
              { value: 'chinese', label: 'Chinese' },
              { value: 'italian', label: 'Italian' },
              { value: 'mexican', label: 'Mexican' },
              { value: 'thai', label: 'Thai' },
              { value: 'mediterranean', label: 'Mediterranean' },
            ].map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="radio"
                  name="cuisine"
                  value={option.value}
                  checked={filters.cuisine === option.value}
                  onChange={(e) => handleFilterChange('cuisine', e.target.value)}
                  className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Price Range
          </label>
          <div className="space-y-2">
            {[
              { value: '', label: 'Any Price' },
              { value: '0-200', label: 'Under ₹200' },
              { value: '200-400', label: '₹200 - ₹400' },
              { value: '400-600', label: '₹400 - ₹600' },
              { value: '600-1000', label: '₹600 - ₹1000' },
              { value: '1000+', label: 'Above ₹1000' },
            ].map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="radio"
                  name="price"
                  value={option.value}
                  checked={filters.price === option.value}
                  onChange={(e) => handleFilterChange('price', e.target.value)}
                  className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Dietary Preferences */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Dietary Preferences
          </label>
          <div className="space-y-2">
            {[
              { value: '', label: 'All Diets' },
              { value: 'vegetarian', label: 'Vegetarian' },
              { value: 'vegan', label: 'Vegan' },
              { value: 'gluten_free', label: 'Gluten Free' },
              { value: 'keto', label: 'Keto' },
              { value: 'halal', label: 'Halal' },
              { value: 'jain', label: 'Jain' },
            ].map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="radio"
                  name="dietary"
                  value={option.value}
                  checked={filters.dietary === option.value}
                  onChange={(e) => handleFilterChange('dietary', e.target.value)}
                  className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Spice Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Spice Level
          </label>
          <div className="space-y-2">
            {[
              { value: '', label: 'Any Spice Level' },
              { value: 'mild', label: 'Mild' },
              { value: 'medium', label: 'Medium' },
              { value: 'hot', label: 'Hot' },
              { value: 'extra_hot', label: 'Extra Hot' },
            ].map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="radio"
                  name="spice"
                  value={option.value}
                  checked={filters.spice === option.value}
                  onChange={(e) => handleFilterChange('spice', e.target.value)}
                  className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Chef Rating
          </label>
          <div className="space-y-2">
            {[
              { value: '', label: 'Any Rating' },
              { value: '4', label: '4+ Stars' },
              { value: '4.5', label: '4.5+ Stars' },
              { value: '5', label: '5 Stars' },
            ].map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="radio"
                  name="rating"
                  value={option.value}
                  checked={filters.rating === option.value}
                  onChange={(e) => handleFilterChange('rating', e.target.value)}
                  className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}