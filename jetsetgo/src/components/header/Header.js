import React, { useState } from 'react'
import { Plane, User, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <header className="bg-navy-blue text-white py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Plane className="w-8 h-8 text-sunshine-yellow" />
          <span className="text-2xl font-bold">JetSetGo</span>
        </div>
        
        <nav className="hidden md:flex space-x-6">
            <Link to="/home" className="hover:text-amber-700">Home</Link>
            <Link to="/favorite-destinations" className="hover:text-amber-700">Saved Destinations</Link>
            <Link to="/itineraries" className="hover:text-amber-700">Itineraries</Link>
        </nav>
        
        <div className="relative">
          <button 
            className="flex items-center space-x-2 focus:outline-none"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <User className="w-6 h-6" />
            <ChevronDown className="w-4 h-4" />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-navy-blue-light rounded-md shadow-lg py-1">
              <a href="/profile" className="block px-4 py-2 text-sm hover:bg-amber-700">Profile</a>
              <a href="/group-chats" className="block px-4 py-2 text-sm hover:bg-amber-700">View Chats</a>
              <a href="/" className="block px-4 py-2 text-sm hover:bg-amber-700">Logout</a>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header;