import Link from 'next/link'
import { Star, MapPin, Clock, Award } from 'lucide-react'
import { Chef } from '@/types'

interface ChefCardProps {
  chef: Chef
}

export default function ChefCard({ chef }: ChefCardProps) {
  const profileImage = chef.metadata?.profile_image?.imgix_url 
    ? `${chef.metadata.profile_image.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`
    : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&auto=format,compress'

  const rating = chef.metadata?.rating || 4.5
  const location = chef.metadata?.location || 'Location not specified'
  const experience = chef.metadata?.experience_years || 5
  const specialties = chef.metadata?.specialties || ['Home Cooking']
  const isAvailable = chef.metadata?.availability || false

  return (
    <Link href={`/chefs/${chef.slug}`} className="block">
      <div className="card hover:shadow-lg transition-shadow duration-200 group">
        <div className="relative">
          <img 
            src={profileImage}
            alt={`${chef.title} - Home Chef`}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          {isAvailable && (
            <div className="absolute top-3 right-3">
              <div className="bg-secondary-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                Available
              </div>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
              {chef.title}
            </h3>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-primary-500 fill-current" />
              <span className="text-sm font-medium text-gray-900">{rating}</span>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-gray-600 mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{location}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <Clock className="h-4 w-4 mr-1" />
            <span>{experience} years experience</span>
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-gray-600 line-clamp-2">
              {chef.metadata?.bio || 'Passionate home chef creating delicious, authentic meals with love and care.'}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {specialties.slice(0, 3).map((specialty: string, index: number) => (
              <span 
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
              >
                {specialty}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-secondary-600">
              <Award className="h-4 w-4 mr-1" />
              <span>Verified Chef</span>
            </div>
            <span className="text-sm font-medium text-primary-600 group-hover:text-primary-700">
              View Profile →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}