'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin, Filter } from 'lucide-react'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    
    const searchParams = new URLSearchParams()
    if (query.trim()) {
      searchParams.set('q', query.trim())
    }
    if (location.trim()) {
      searchParams.set('location', location.trim())
    }
    
    const searchUrl = `/search${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
    router.push(searchUrl)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for dishes, cuisines, or chefs..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="input pl-10 w-full"
            />
          </div>

          {/* Location Input */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Enter your location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input pl-10 w-full"
            />
          </div>

          {/* Filter Button */}
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="btn-outline flex items-center justify-center px-4 py-2 md:px-6"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </button>

          {/* Search Button */}
          <button
            type="submit"
            className="btn-primary px-6 py-2 md:px-8"
          >
            Search
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200 animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Cuisine Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cuisine Type
                </label>
                <select className="input w-full">
                  <option value="">All Cuisines</option>
                  <option value="indian">Indian</option>
                  <option value="chinese">Chinese</option>
                  <option value="italian">Italian</option>
                  <option value="mexican">Mexican</option>
                  <option value="thai">Thai</option>
                  <option value="mediterranean">Mediterranean</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <select className="input w-full">
                  <option value="">Any Price</option>
                  <option value="0-200">Under ₹200</option>
                  <option value="200-400">₹200 - ₹400</option>
                  <option value="400-600">₹400 - ₹600</option>
                  <option value="600+">Above ₹600</option>
                </select>
              </div>

              {/* Dietary Preferences */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dietary Preferences
                </label>
                <select className="input w-full">
                  <option value="">All Diets</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="gluten_free">Gluten Free</option>
                  <option value="keto">Keto</option>
                  <option value="halal">Halal</option>
                  <option value="jain">Jain</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Rating
                </label>
                <select className="input w-full">
                  <option value="">Any Rating</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="5">5 Stars</option>
                </select>
              </div>

              {/* Spice Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Spice Level
                </label>
                <select className="input w-full">
                  <option value="">Any Spice Level</option>
                  <option value="mild">Mild</option>
                  <option value="medium">Medium</option>
                  <option value="hot">Hot</option>
                  <option value="extra_hot">Extra Hot</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </form>

      {/* Quick Search Tags */}
      <div className="mt-6">
        <p className="text-sm text-gray-600 mb-3">Popular searches:</p>
        <div className="flex flex-wrap gap-2">
          {[
            'Biryani', 'Pizza', 'Pasta', 'Dal Rice', 'Thali', 
            'Chinese', 'South Indian', 'Desserts', 'Snacks'
          ].map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setQuery(tag)
                const searchParams = new URLSearchParams()
                searchParams.set('q', tag)
                router.push(`/search?${searchParams.toString()}`)
              }}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}