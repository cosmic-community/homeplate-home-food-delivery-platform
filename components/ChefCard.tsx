import Link from 'next/link'
import { Chef } from '@/types'
import { MapPin, Star, Clock, Award } from 'lucide-react'

interface ChefCardProps {
  chef: Chef
  showDistance?: boolean
}

export default function ChefCard({ chef, showDistance = false }: ChefCardProps) {
  if (!chef || !chef.metadata) {
    return null
  }

  const profileImage = chef.metadata.profile_image?.imgix_url
  const rating = chef.metadata.rating || 0
  const specialties = chef.metadata.specialties || []
  const cuisines = chef.metadata.cuisines || []
  const experienceYears = chef.metadata.experience_years || 0

  return (
    <Link href={`/chefs/${chef.slug}`}>
      <div className="card hover:shadow-lg transition-shadow duration-200 cursor-pointer h-full">
        {/* Chef Image */}
        <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-gray-100">
          {profileImage ? (
            <img
              src={`${profileImage}?w=600&h=400&fit=crop&auto=format,compress`}
              alt={chef.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          )}
          
          {/* Status Badge */}
          {chef.metadata.availability && (
            <div className="absolute top-3 right-3">
              <span className="badge-success">
                Available
              </span>
            </div>
          )}
        </div>

        {/* Chef Info */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {chef.title}
          </h3>
          
          {chef.metadata.bio && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {chef.metadata.bio}
            </p>
          )}

          {/* Rating */}
          {rating > 0 && (
            <div className="flex items-center space-x-2 mb-3">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-primary-500 fill-current" />
                <span className="text-sm font-medium text-gray-900">
                  {rating.toFixed(1)}
                </span>
              </div>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-600">
                {experienceYears > 0 && `${experienceYears}+ years experience`}
              </span>
            </div>
          )}

          {/* Specialties */}
          {specialties.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {specialties.slice(0, 3).map((specialty, index) => (
                  <span
                    key={index}
                    className="badge bg-primary-50 text-primary-700 text-xs"
                  >
                    {specialty}
                  </span>
                ))}
                {specialties.length > 3 && (
                  <span className="badge bg-gray-100 text-gray-600 text-xs">
                    +{specialties.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Cuisines */}
          {cuisines.length > 0 && (
            <div className="mb-3">
              <p className="text-sm text-gray-600 mb-1">Cuisines:</p>
              <p className="text-sm text-gray-800">
                {cuisines.slice(0, 2).join(', ')}
                {cuisines.length > 2 && ` +${cuisines.length - 2} more`}
              </p>
            </div>
          )}

          {/* Location */}
          {chef.metadata.address && (
            <div className="flex items-center text-gray-600 text-sm mb-3">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="line-clamp-1">{chef.metadata.address}</span>
            </div>
          )}

          {/* Distance (if provided) */}
          {showDistance && (
            <div className="flex items-center text-gray-600 text-sm mb-3">
              <Clock className="h-4 w-4 mr-1" />
              <span>~30 mins delivery</span>
            </div>
          )}
        </div>

        {/* Action Footer */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 text-gray-600">
              <Award className="h-4 w-4" />
              <span className="text-sm">
                {chef.metadata.status === 'approved' ? 'Verified Chef' : 'Pending'}
              </span>
            </div>
            
            <span className="text-primary-600 font-medium text-sm">
              View Menu →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}