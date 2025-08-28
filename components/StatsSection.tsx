import { getDashboardStats } from '@/lib/cosmic'
import { Users, ChefHat, Star, ShoppingBag } from 'lucide-react'

export default async function StatsSection() {
  const stats = await getDashboardStats()

  const statItems = [
    {
      icon: Users,
      value: stats.totalCustomers.toLocaleString(),
      label: 'Happy Customers',
      color: 'text-blue-600'
    },
    {
      icon: ChefHat,
      value: stats.activeChefs.toLocaleString(),
      label: 'Home Chefs',
      color: 'text-green-600'
    },
    {
      icon: ShoppingBag,
      value: stats.totalOrders.toLocaleString(),
      label: 'Orders Delivered',
      color: 'text-purple-600'
    },
    {
      icon: Star,
      value: stats.averageRating > 0 ? stats.averageRating.toString() : '4.8',
      label: 'Average Rating',
      color: 'text-yellow-600'
    }
  ]

  return (
    <section className="py-12 bg-white border-b border-gray-200">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {statItems.map((item, index) => {
            const Icon = item.icon
            return (
              <div key={index} className="text-center">
                <div className={`w-12 h-12 mx-auto mb-3 ${item.color} bg-opacity-10 rounded-full flex items-center justify-center`}>
                  <Icon className={`h-6 w-6 ${item.color}`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {item.value}
                </div>
                <div className="text-sm text-gray-600">
                  {item.label}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}