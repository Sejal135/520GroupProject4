import React, { useState, useEffect } from 'react'
import { Compass, Flame, Globe, Heart, MessageCircle, Share2, MapPin, Users } from 'lucide-react'
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

export default function Home() {
  const [activeTab, setActiveTab] = useState('trending');
  const [userId, setUserId] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        if (token) {
          // Step 1: Decode token to get email
          const decodedToken = jwtDecode(token);
          const email = decodedToken.email;

          // Step 2: Fetch user profile by email
          const profileResponse = await fetch(`http://localhost:8081/GetUserProfileByEmail?email=${email}`);
          if (!profileResponse.ok) {
            throw new Error('Failed to fetch profile data');
          }
          const profileJson = await profileResponse.json();
          console.log('Fetched profile data:', profileJson);
          // Set userId
          setUserId(profileJson.userId);
        } else {
          console.error('JWT token not found in localStorage.');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []); // Run once when the component mounts

  useEffect(() => {
    const fetchPosts = async () => {
      if (!userId) return; // Wait until userId is available

      console.log('Fetching posts for userId:', userId);
      const date = new Date();
      const isoDate = getCustomISODate(date);
      console.log('Formatted date:', isoDate);
      console.log(`http://localhost:8081/GetExplorerPageSuggestions?userId=${userId}&page=1&resultsPerPage=10&datePosted=${encodeURIComponent(isoDate)}`);
      console.log(`http://localhost:8081/GetExplorerPageSuggestions?userId=${userId}&page=1&resultsPerPage=10&datePosted=${isoDate}`);
      try {
        const response = await fetch(
          `http://localhost:8081/GetExplorerPageSuggestions?userId=${userId}&page=1&resultsPerPage=10&datePosted=${encodeURIComponent(isoDate)}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        console.log('Fetched posts:', data);
        setPosts(data.posts || []); // Adjust if the API returns a different structure
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [userId]); // Runs when userId is updated


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
                  <h3
                    className="font-semibold cursor-pointer text-[#FFDD00] hover:text-[#FFB300]"
                    onClick={() => navigate(`/profile/${post.user.name}`)}
                  >
                    {post.user.name}
                  </h3>
                    <div className="flex items-center text-sm text-[#FFDD00]">
                      <MapPin className="w-4 h-4 mr-1" />
                      {post.user.location}
                    </div>
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
  )
}

// Helper function to format date in correct format for the API
function getCustomISODate(date) {
  // Get the components of the ISO string without the timezone info
  const isoString = date.toISOString();
  
  // Extract the date part (without 'Z') and the milliseconds
  const datePart = isoString.slice(0, -1); // Remove the 'Z'
  
  // Get the timezone offset in hours and minutes
  const timezoneOffset = -date.getTimezoneOffset(); // Offset in minutes
  
  // Format the timezone as needed (e.g., "-05:00")
  const hoursOffset = String(Math.floor(Math.abs(timezoneOffset) / 60)).padStart(2, '0');
  const minutesOffset = String(Math.abs(timezoneOffset) % 60).padStart(2, '0');
  const formattedOffset = (timezoneOffset < 0 ? '-' : '+') + hoursOffset + ':' + minutesOffset;
  
  // Combine everything to form the final format
  return datePart + formattedOffset;
}