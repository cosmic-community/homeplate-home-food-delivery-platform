'use client'

import { useState } from 'react'
import { Search, Filter, MapPin } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const searchParams = new URLSearchParams()
    
    if (query) searchParams.set('q', query)
    if (location) searchParams.set('location', location)
    
    router.push(`/search?${searchParams.toString()}`)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="flex flex-col md:flex-row gap-2 bg-white rounded-lg shadow-lg p-2">
          {/* Search Input */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes, cuisines, or chefs..."
              className="w-full pl-10 pr-4 py-3 text-gray-900 placeholder-gray-500 border-0 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
            />
          </div>

          {/* Location Input */}
          <div className="md:w-64 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location..."
              className="w-full pl-10 pr-4 py-3 text-gray-900 placeholder-gray-500 border-0 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Filter className="h-5 w-5" />
              <span className="ml-2 hidden sm:inline">Filters</span>
            </button>
            
            <button
              type="submit"
              className="flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              <Search className="h-5 w-5 md:hidden" />
              <span className="hidden md:inline">Search</span>
            </button>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {[
            'Italian',
            'Mexican', 
            'Asian',
            'Vegetarian',
            'Vegan',
            'Gluten-Free',
            'Under $15',
            'Quick & Easy'
          ].map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setQuery(filter)}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors"
            >
              {filter}
            </button>
          ))}
        </div>
      </form>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div className="mt-4 bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cuisine Type
              </label>
              <select className="input">
                <option value="">Any Cuisine</option>
                <option value="italian">Italian</option>
                <option value="mexican">Mexican</option>
                <option value="asian">Asian</option>
                <option value="indian">Indian</option>
                <option value="american">American</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <select className="input">
                <option value="">Any Price</option>
                <option value="0-10">$0 - $10</option>
                <option value="10-20">$10 - $20</option>
                <option value="20-30">$20 - $30</option>
                <option value="30+">$30+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dietary Preferences
              </label>
              <select className="input">
                <option value="">No Preference</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="gluten-free">Gluten-Free</option>
                <option value="keto">Keto</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prep Time
              </label>
              <select className="input">
                <option value="">Any Time</option>
                <option value="0-30">Under 30 min</option>
                <option value="30-60">30-60 min</option>
                <option value="60+">60+ min</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowFilters(false)}
              className="btn-outline"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                setShowFilters(false)
                // Apply filters logic here
              }}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  )
}