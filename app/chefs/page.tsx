import { getApprovedChefs } from '@/lib/cosmic'
import ChefCard from '@/components/ChefCard'

export const metadata = {
  title: 'Home Chefs - HomePlate',
  description: 'Meet our talented community of home chefs creating delicious, authentic meals.',
}

export default async function ChefsPage() {
  const chefs = await getApprovedChefs()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="container py-12">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Home Chefs
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover talented home chefs in your neighborhood who create authentic, delicious meals with love and care.
            </p>
          </div>
        </div>
      </section>

      {/* Chefs Grid */}
      <section className="py-12">
        <div className="container">
          {chefs.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-semibold text-gray-900">
                  {chefs.length} Chef{chefs.length !== 1 ? 's' : ''} Available
                </h2>
                
                <select className="input w-auto">
                  <option value="rating">Sort by: Rating</option>
                  <option value="experience">Experience</option>
                  <option value="newest">Newest</option>
                  <option value="alphabetical">A-Z</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {chefs.map((chef) => (
                  <ChefCard key={chef.id} chef={chef} showDistance={true} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-6">
                <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.196-2.196M17 20v-2a3 3 0 00-3-3H7a3 3 0 00-3 3v2m10-8a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">No Chefs Available Yet</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                We're building our community of talented home chefs. Check back soon for amazing cooks in your area!
              </p>
              <div className="space-y-4">
                <div className="text-center">
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Want to become a chef?</h4>
                  <a 
                    href="/chefs/register" 
                    className="btn-primary inline-flex items-center"
                  >
                    Join as a Chef
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}