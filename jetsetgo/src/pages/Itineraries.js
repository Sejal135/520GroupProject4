import React, { useState } from 'react'
import { Calendar, Clock, MapPin, Plus, ChevronDown, ChevronUp, Edit2, Trash2 } from 'lucide-react'

const ItineraryItem = ({ day, activities, isOpen, onToggle, onEdit, onDelete }) => (
  <div className="bg-[#001530] rounded-lg overflow-hidden mb-4">
    <div 
      className="flex justify-between items-center p-4 cursor-pointer"
      onClick={onToggle}
    >
      <h3 className="text-xl font-semibold">Day {day}</h3>
      {isOpen ? <ChevronUp className="w-6 h-6 text-[#FFDD00]" /> : <ChevronDown className="w-6 h-6 text-[#FFDD00]" />}
    </div>
    {isOpen && (
      <div className="p-4 border-t border-[#000080]">
        {activities.map((activity, index) => (
          <div key={index} className="mb-4 last:mb-0">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-[#FFDD00]">{activity.name}</h4>
                <p className="text-sm text-[#FFDD00]/80">{activity.description}</p>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => onEdit(day, index)} className="p-1 hover:bg-[#0000E0] rounded">
                  <Edit2 className="w-4 h-4 text-[#FFDD00]" />
                </button>
                <button onClick={() => onDelete(day, index)} className="p-1 hover:bg-[#0000E0] rounded">
                  <Trash2 className="w-4 h-4 text-[#FFDD00]" />
                </button>
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm text-[#FFDD00]/60">
              <Clock className="w-4 h-4 mr-1" />
              <span>{activity.time}</span>
              <MapPin className="w-4 h-4 ml-4 mr-1" />
              <span>{activity.location}</span>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
)

export default function Itineraries() {
  const [activeItinerary, setActiveItinerary] = useState(0)
  const [openDays, setOpenDays] = useState([1])

  const itineraries = [
    {
      id: 1,
      name: "Tokyo Adventure",
      date: "Aug 15 - Aug 22, 2024",
      days: [
        {
          day: 1,
          activities: [
            {
              name: "Arrive at Narita Airport",
              description: "Check-in at hotel and rest",
              time: "14:00",
              location: "Shinjuku, Tokyo"
            },
            {
              name: "Evening walk in Shinjuku",
              description: "Explore the vibrant neighborhood and have dinner",
              time: "18:00",
              location: "Shinjuku, Tokyo"
            }
          ]
        },
        {
          day: 2,
          activities: [
            {
              name: "Visit Senso-ji Temple",
              description: "Explore Japan's oldest Buddhist temple",
              time: "09:00",
              location: "Asakusa, Tokyo"
            },
            {
              name: "Teamlab Borderless",
              description: "Immersive digital art museum",
              time: "14:00",
              location: "Odaiba, Tokyo"
            }
          ]
        }
      ]
    },
    {
      id: 2,
      name: "Paris Getaway",
      date: "Sep 5 - Sep 12, 2024",
      days: [
        {
          day: 1,
          activities: [
            {
              name: "Arrive at Charles de Gaulle Airport",
              description: "Transfer to hotel and check-in",
              time: "11:00",
              location: "Paris"
            },
            {
              name: "Visit the Eiffel Tower",
              description: "Enjoy the view from the top",
              time: "16:00",
              location: "Champ de Mars, Paris"
            }
          ]
        }
      ]
    }
  ]

  const toggleDay = (day) => {
    setOpenDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    )
  }

  const handleEdit = (day, activityIndex) => {
    console.log(`Edit activity ${activityIndex} on day ${day}`)
    // Implement edit functionality here
  }

  const handleDelete = (day, activityIndex) => {
    console.log(`Delete activity ${activityIndex} on day ${day}`)
    // Implement delete functionality here
  }

  return (
    <div className="min-h-screen bg-[#000080] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Itineraries</h1>
          <button className="bg-[#FFB300] text-[#000080] px-4 py-2 rounded-md flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            New Itinerary
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Itinerary List */}
          <div className="md:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Upcoming Trips</h2>
            {itineraries.map((itinerary, index) => (
              <div 
                key={itinerary.id}
                className={`p-4 rounded-lg mb-4 cursor-pointer ${
                  index === activeItinerary ? 'bg-[#0000E0]' : 'bg-[#001530]'
                }`}
                onClick={() => setActiveItinerary(index)}
              >
                <h3 className="font-semibold text-[#FFDD00]">{itinerary.name}</h3>
                <div className="flex items-center text-sm mt-2 text-[#FFDD00]/60">
                  <Calendar className="w-4 h-4 mr-2" />
                  {itinerary.date}
                </div>
              </div>
            ))}
          </div>

          {/* Active Itinerary */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">{itineraries[activeItinerary].name}</h2>
            <div className="bg-[#001530] p-6 rounded-lg">
              {itineraries[activeItinerary].days.map((day) => (
                <ItineraryItem
                  key={day.day}
                  day={day.day}
                  activities={day.activities}
                  isOpen={openDays.includes(day.day)}
                  onToggle={() => toggleDay(day.day)}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}