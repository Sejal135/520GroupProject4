import React, { useState, useEffect } from 'react';
import { Compass, Users, Share2, MapPin } from 'lucide-react';


export default function Home() {
  const [activeTab, setActiveTab] = useState('following');
  const [query, setQuery] = useState('');
  const [locations, setLocations] = useState([]);
  const [reviews, setReviews] = useState([]); // State to hold fetched reviews
  const [selectedPlaceId, setSelectedPlaceId] = useState(null); // To store selected placeId

  // Fetch locations from backend API whenever the query changes
  useEffect(() => {
    console.log("Current Sejal:", query); //
    if (query.trim() === '') {
      setLocations([]);
      return;
    }
    
    

    const fetchLocations = async () => {
      try {
        const response = await fetch(`http://localhost:8081/GetPlacesByPlacename?placename=${query}&resultsPerPage=5&page=1`);
        if (response.ok) {
          const data = await response.json();
          console.log("Divyam",response); //
          setLocations(data);
        } else {
          console.error('Failed to fetch locations');
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
      } 
    };
    
    fetchLocations();
    console.log("Post Sejal:", query); //
fetchLocations();

  }, [query]);

  // Fetch reviews for the selected place whenever the selectedPlaceId changes
  useEffect(() => {
    console.log("Selected Place ID:", selectedPlaceId); //
    if (!selectedPlaceId) return;

    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:8081/GetAllReviewsForAPlace?placeId=${selectedPlaceId}&resultsPerPage=5&page=1&datePosted=2024-12-10T18:22:57.000-00:00`);
        console.log("Sanjana",response);
        if (response.ok) {
          const data = await response.json();
          console.log("Data",data);
          setReviews(data);
        } else {
          console.error('Failed to fetch reviews');
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } 
    };
    console.log("Reviews:", reviews);
    fetchReviews();
  }, [selectedPlaceId]);

  
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
  
        {/* Search Bar */}
        <div className="mb-8 relative">
          <input
            type="text"
            placeholder="Search locations..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="p-2 w-full bg-[#001530] rounded-md text-[#FFDD00] focus:outline-none focus:ring-2 focus:ring-[#FFB300]"
          />
          {locations.length > 0 && (
            <ul className="absolute bg-[#001530] mt-2 w-full rounded-md text-[#FFDD00]">
              {locations.map((location) => (
                <li
                  key={location.placeId}
                  className="p-2 hover:bg-[#FFB300]/20 cursor-pointer"
                  onClick={() => {
                    setQuery(location.placeName);
                    setSelectedPlaceId(location.placeId);
                  }}
                >
                  {location.placeName}
                </li>
              ))}
            </ul>
          )}
        </div>
  
        {/* Reviews */}
        <div className="space-y-8">
          {reviews.map((review) => (
            <div key={review.reviewId} className="bg-[#001530] rounded-xl overflow-hidden">
              {/* Review Header */}
              <div className="p-4 flex items-center justify-between">
                {/* User Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={review.reviewerId.profilePic || '/default-avatar.png'} // Use profilePic or a default
                    alt={review.reviewerId.username}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{review.reviewerId.username}</h3>
                  </div>
                </div>
                {/* Share Button */}
                <button className="text-[#FFDD00] hover:text-[#FFB300]">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
  
              {/* Review Content */}
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{review.title}</h2>
                <p className="text-[#FFDD00] mb-4">{review.review}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
}
