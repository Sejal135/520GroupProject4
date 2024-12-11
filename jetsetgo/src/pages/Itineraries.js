<<<<<<< Updated upstream
import React, { useState } from 'react'
import { Calendar, Clock, MapPin, Plus, ChevronDown, ChevronUp, Edit2, Trash2 } from 'lucide-react'

// ItineraryItem component that displays a single day of an itinerary with activities
const ItineraryItem = ({ day, activities, isOpen, onToggle, onEdit, onDelete }) => (
  <div className="bg-[#001530] rounded-lg overflow-hidden mb-4">
    {/* Header section with day number and toggle button for showing/hiding activities */}
    <div 
=======
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Correct import for jwtDecode
import { Calendar, Clock, MapPin, Plus, ChevronDown, ChevronUp, Edit2, Trash2 } from "lucide-react";
const ItineraryItem = ({ day, activities, isOpen, onToggle, onEdit, onDelete }) => (
  <div className="bg-[#001530] rounded-lg overflow-hidden mb-4">
    <div
>>>>>>> Stashed changes
      className="flex justify-between items-center p-4 cursor-pointer"
      onClick={onToggle} // Toggles visibility of the day's activities
    >
      <h3 className="text-xl font-semibold">Day {day}</h3>
      {/* Display the correct chevron based on whether activities are shown */}
      {isOpen ? <ChevronUp className="w-6 h-6 text-[#FFDD00]" /> : <ChevronDown className="w-6 h-6 text-[#FFDD00]" />}
    </div>
    {/* Activities section (visible when isOpen is true) */}
    {isOpen && (
      <div className="p-4 border-t border-[#000080]">
        {/* Mapping over activities to display each one */}
        {activities.map((activity, index) => (
          <div key={index} className="mb-4 last:mb-0">
            <div className="flex justify-between items-start">
              <div>
                {/* Activity name and description */}
                <h4 className="font-semibold text-[#FFDD00]">{activity.name}</h4>
                <p className="text-sm text-[#FFDD00]/80">{activity.description}</p>
              </div>
              <div className="flex space-x-2">
                {/* Edit button triggers onEdit callback */}
                <button onClick={() => onEdit(day, index)} className="p-1 hover:bg-[#0000E0] rounded">
                  <Edit2 className="w-4 h-4 text-[#FFDD00]" />
                </button>
                {/* Delete button triggers onDelete callback */}
                <button onClick={() => onDelete(day, index)} className="p-1 hover:bg-[#0000E0] rounded">
                  <Trash2 className="w-4 h-4 text-[#FFDD00]" />
                </button>
              </div>
            </div>
            {/* Time and location of the activity */}
            <div className="flex items-center mt-2 text-sm text-[#FFDD00]/60">
              <Clock className="w-4 h-4 mr-1" />
              <span>{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
export default function Itineraries() {
<<<<<<< Updated upstream
  // State to track the active itinerary and the open days for each itinerary
  const [activeItinerary, setActiveItinerary] = useState(0)
  const [openDays, setOpenDays] = useState([1])

  // Sample itineraries data
  const itineraries = [
    {
      id: 1,
      name: "Tokyo Adventure",
      date: "Aug 15 - Aug 22, 2024",
      days: [
        {
          day: 1,
          activities: [
            { name: "Arrive at Narita Airport", description: "Check-in at hotel and rest", time: "14:00", location: "Shinjuku, Tokyo" },
            { name: "Evening walk in Shinjuku", description: "Explore the vibrant neighborhood and have dinner", time: "18:00", location: "Shinjuku, Tokyo" }
          ]
        },
        {
          day: 2,
          activities: [
            { name: "Visit Senso-ji Temple", description: "Explore Japan's oldest Buddhist temple", time: "09:00", location: "Asakusa, Tokyo" },
            { name: "Teamlab Borderless", description: "Immersive digital art museum", time: "14:00", location: "Odaiba, Tokyo" }
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
            { name: "Arrive at Charles de Gaulle Airport", description: "Transfer to hotel and check-in", time: "11:00", location: "Paris" },
            { name: "Visit the Eiffel Tower", description: "Enjoy the view from the top", time: "16:00", location: "Champ de Mars, Paris" }
          ]
        }
      ]
    }
  ]

  // Function to toggle visibility of activities for a specific day
  const toggleDay = (day) => {
    setOpenDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    )
  }

  // Placeholder functions for editing and deleting activities
=======
  const [activeItinerary, setActiveItinerary] = useState(0);
  const [openDays, setOpenDays] = useState([1]);
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) throw new Error("User not authenticated");
        const decodedToken = jwtDecode(token);
        const email = decodedToken.email;
        const profileResponse = await fetch(`http://localhost:8081/GetUserProfileByEmail?email=${email}`);
        if (!profileResponse.ok) throw new Error("Failed to fetch profile data");
        const profileJson = await profileResponse.json();
        const userId = profileJson.userId;
        const itineraryResponse = await fetch(`http://localhost:8081/GetItinerariesForUser?userId=${userId}`);
        const itinerariesData = await itineraryResponse.json();
        const itinerariesWithDetails = await Promise.all(
          itinerariesData.map(async (itinerary) => {
            const itemsData = itinerary.map((item) => ({
              name: item.itineraryItemHeader,
              description: item.itineraryItemDescription,
              time: new Date(item.timeItemAt).toLocaleTimeString(),
              location: item.itineraryItemLocation || "",
              parentItinerary: {
                itineraryId: item.itineraryReferenceId,
                itineraryName: item.parentItineraryName || "Unnamed Itinerary", // Adjusted to include parent itinerary name
              },
              timeItemAt: item.timeItemAt,
            }));
            const days = itemsData.reduce((acc, item) => {
              const dayNumber = Math.ceil(
                (new Date(item.timeItemAt) - new Date(itinerary.itineraryTimestamp)) / (1000 * 60 * 60 * 24)
              );
              acc[dayNumber] = acc[dayNumber] || [];
              acc[dayNumber].push(item);
              return acc;
            }, {});
            return {
              ...itinerary,
              days: Object.keys(days).map((day) => ({
                day: parseInt(day),
                activities: days[day],
              })),
            };
          })
        );
        setItineraries(itinerariesWithDetails);
      } catch (error) {
        console.error("Error fetching itineraries:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItineraries();
  }, []);
  const toggleDay = (day) => {
    setOpenDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]));
  };
>>>>>>> Stashed changes
  const handleEdit = (day, activityIndex) => {
    console.log(`Edit activity ${activityIndex} on day ${day}`);
  };
  const handleDelete = (day, activityIndex) => {
    console.log(`Delete activity ${activityIndex} on day ${day}`);
  };
  if (loading) return <div>Loading itineraries...</div>;

  
  return (
<<<<<<< Updated upstream
    <div className="min-h-screen bg-[#000080] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Itineraries</h1>
          {/* Button to add a new itinerary */}
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
                onClick={() => setActiveItinerary(index)} // Set the active itinerary when clicked
              >
                <h3 className="font-semibold text-[#FFDD00]">{itinerary.name}</h3>
                <div className="flex items-center text-sm mt-2 text-[#FFDD00]/60">
                  <Calendar className="w-4 h-4 mr-2" />
                  {itinerary.date} {/* Display itinerary's date range */}
                </div>
              </div>
            ))}
          </div>

          {/* Active Itinerary */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">{itineraries[activeItinerary].name}</h2>
            <div className="bg-[#001530] p-6 rounded-lg">
              {/* Display the activities for each day in the active itinerary */}
              {itineraries[activeItinerary].days.map((day) => (
                <ItineraryItem
                  key={day.day}
                  day={day.day}
                  activities={day.activities}
                  isOpen={openDays.includes(day.day)} // Toggle activity visibility based on openDays
                  onToggle={() => toggleDay(day.day)} // Toggle function for day visibility
                  onEdit={handleEdit} // Edit handler function
                  onDelete={handleDelete} // Delete handler function
=======
    <div className="min-h-screen bg-[#000080] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#FFDD00] mb-6">Your Itineraries</h1>
        {itineraries.length === 0 ? (
          <p className="text-center text-gray-400">No itineraries found. Start planning your journey!</p>
        ) : (
          itineraries.map((itinerary, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-2xl font-semibold text-[#FFDD00] mb-4">
                {itinerary.itineraryName || "Unnamed Itinerary"}
              </h2>
              <p className="text-sm text-gray-400 mb-4">
                Created on:{" "}
                {new Date(itinerary.itineraryTimestamp).toLocaleDateString()}
              </p>
              {itinerary.days.map(({ day, activities }) => (
                <ItineraryItem
                  key={day}
                  day={day}
                  activities={activities.map((activity) => ({
                    name: activity.name,
                    description: activity.description,
                    time: activity.time,
                    location: activity.location,
                  }))}
                  isOpen={openDays.includes(day)}
                  onToggle={() => toggleDay(day)}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
>>>>>>> Stashed changes
                />
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
  
}