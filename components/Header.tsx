'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, User, ShoppingCart, Search } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2L3 7v11c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-4h4v4c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V7l-7-5z"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">HomePlate</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/dishes" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Browse Dishes
            </Link>
            <Link 
              href="/chefs" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Home Chefs
            </Link>
            <Link 
              href="/about" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/search"
              className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Link>
            
            <Link 
              href="/cart"
              className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors relative"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Link>

            <div className="h-6 w-px bg-gray-300"></div>

            <Link 
              href="/auth/login"
              className="btn-outline"
            >
              Sign In
            </Link>
            
            <Link 
              href="/chefs/register"
              className="btn-primary"
            >
              Become a Chef
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 animate-slide-up">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/dishes" 
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Dishes
              </Link>
              <Link 
                href="/chefs" 
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Home Chefs
              </Link>
              <Link 
                href="/about" 
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex flex-col space-y-3">
                  <Link 
                    href="/search"
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Search className="h-5 w-5" />
                    <span>Search</span>
                  </Link>
                  
                  <Link 
                    href="/cart"
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Cart (0)</span>
                  </Link>
                  
                  <Link 
                    href="/auth/login"
                    className="btn-outline w-full mt-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  
                  <Link 
                    href="/chefs/register"
                    className="btn-primary w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Become a Chef
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}