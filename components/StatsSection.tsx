import { Users, Utensils, Star, Clock } from 'lucide-react'

export default function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: '500+',
      label: 'Home Chefs',
      description: 'Talented cooks in your area'
    },
    {
      icon: Utensils,
      value: '2,000+',
      label: 'Dishes Available',
      description: 'Fresh meals every day'
    },
    {
      icon: Star,
      value: '4.8',
      label: 'Average Rating',
      description: 'From happy customers'
    },
    {
      icon: Clock,
      value: '30 min',
      label: 'Average Delivery',
      description: 'Fast and reliable'
    }
  ]

  return (
    <section className="py-12 bg-primary-50">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose HomePlate?
          </h2>
          <p className="text-lg text-gray-600">
            Join thousands of food lovers who trust us for their daily meals
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-2">
                  {stat.label}
                </div>
                <p className="text-gray-600">
                  {stat.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}