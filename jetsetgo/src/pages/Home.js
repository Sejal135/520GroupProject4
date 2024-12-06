import React, { useState } from 'react'
import { Compass, Flame, Globe, Heart, MessageCircle, Share2, MapPin, Users } from 'lucide-react'

export default function Home() {
  const [activeTab, setActiveTab] = useState('trending')

  const posts = [
    {
      id: 1,
      user: {
        name: "Alex Chen",
        location: "Tokyo, Japan",
        avatar: "/placeholder.svg"
      },
      image: "/placeholder.svg",
      title: "Shibuya Crossing at Night",
      description: "The world's busiest pedestrian crossing comes alive at night with a symphony of lights and urban energy. A must-see spectacle that captures Tokyo's vibrant spirit.",
      likes: 234,
      comments: 45,
      tags: ["Night Life", "City Views", "Photography"]
    },
    {
      id: 2,
      user: {
        name: "Maria Santos",
        location: "Santorini, Greece",
        avatar: "/placeholder.svg"
      },
      image: "/placeholder.svg",
      title: "Sunset in Oia",
      description: "Watching the sun dip into the Aegean Sea from Oia's white-washed terraces is pure magic. The sky transforms into a canvas of orange and pink hues.",
      likes: 567,
      comments: 89,
      tags: ["Sunset", "Island Life", "Scenic Views"]
    }
  ]

  return (
    <div className="min-h-screen bg-[#000080] text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Explore</h1>
            <p className="text-[#FFDD00]">Discover amazing destinations and travel stories</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setActiveTab('trending')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                activeTab === 'trending' ? 'bg-[#FFB300]' : 'bg-[#001530]'
              }`}
            >
              <Flame className="w-4 h-4" />
              Trending
            </button>
            <button 
              onClick={() => setActiveTab('following')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                activeTab === 'following' ? 'bg-[#FFB300]' : 'bg-[#001530]'
              }`}
            >
              <Users className="w-4 h-4" />
              Following
            </button>
            <button 
              onClick={() => setActiveTab('discover')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                activeTab === 'discover' ? 'bg-[#FFB300]' : 'bg-[#001530]'
              }`}
            >
              <Compass className="w-4 h-4" />
              Discover
            </button>
          </div>
        </div>

        {/* Popular Destinations Carousel */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Popular Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Paris', 'Bali', 'New York'].map((city) => (
              <div key={city} className="relative h-48 rounded-xl overflow-hidden group">
                <img
                  src="/placeholder.svg"
                  alt={city}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000080]/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold">{city}</h3>
                  <div className="flex items-center text-sm">
                    <Globe className="w-4 h-4 mr-1" />
                    <span>1.2k travelers this month</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feed Posts */}
        <div className="space-y-8">
          {posts.map(post => (
            <div key={post.id} className="bg-[#001530] rounded-xl overflow-hidden">
              {/* Post Header */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={post.user.avatar}
                    alt={post.user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{post.user.name}</h3>
                    <div className="flex items-center text-sm text-[#FFDD00]">
                      <MapPin className="w-4 h-4 mr-1" />
                      {post.user.location}
                    </div>
                  </div>
                </div>
                <button className="text-[#FFDD00] hover:text-[#FFB300]">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Post Image */}
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-96 object-cover"
              />

              {/* Post Content */}
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                <p className="text-[#FFDD00] mb-4">{post.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[#FFB300]/20 text-[#FFDD00] rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-[#FFDD00]">
                  <button className="flex items-center gap-1 hover:text-[#FFB300]">
                    <Heart className="w-5 h-5" />
                    {post.likes}
                  </button>
                  <button className="flex items-center gap-1 hover:text-[#FFB300]">
                    <MessageCircle className="w-5 h-5" />
                    {post.comments}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}