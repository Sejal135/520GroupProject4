import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Clock, Plus, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';

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
                <button onClick={() => onDelete(day, index)} className="p-1 hover:bg-[#0000E0] rounded">
                  <Trash2 className="w-4 h-4 text-[#FFDD00]" />
                </button>
              </div>
            </div>
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
                itineraryName: item.parentItineraryName || "Unnamed Itinerary",
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

  const handleEdit = (day, activityIndex) => {
    console.log(`Edit activity ${activityIndex} on day ${day}`);
  };

  const handleDelete = (day, activityIndex) => {
    console.log(`Delete activity ${activityIndex} on day ${day}`);
  };

  const handleCreateNewItinerary = () => {
    console.log("Create New Itinerary button clicked");
  };

  if (loading) return <div>Loading itineraries...</div>;

  return (
    <div className="min-h-screen bg-[#000080] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#FFDD00] mb-6">Your Itineraries</h1>
        <button 
          onClick={handleCreateNewItinerary} 
          className="mb-6 px-4 py-2 bg-[#FFDD00] text-[#000080] rounded font-semibold hover:bg-[#FFC107]">
          Create New Itinerary
        </button>
        {itineraries.length === 0 ? (
          <p className="text-center text-gray-400">No itineraries found. Start planning your journey!</p>
        ) : (
          itineraries.map((itinerary, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-2xl font-semibold text-[#FFDD00] mb-4">
                {itinerary.itineraryName || "Unnamed Itinerary"}
              </h2>
              <p className="text-sm text-gray-400 mb-4">
                Created on: {new Date(itinerary.itineraryTimestamp).toLocaleDateString()}
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
                />
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
