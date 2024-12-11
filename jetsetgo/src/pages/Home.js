import React, { useState, useEffect } from 'react'
import { Compass, Flame, Globe, Heart, MessageCircle, Share2, MapPin, Users } from 'lucide-react'
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

export default function Home() {
  // State to track the active tab (e.g., trending, following, discover)
  const [activeTab, setActiveTab] = useState('trending');

  // State to store the user ID obtained from the user's profile
  const [userId, setUserId] = useState(null);

  // State to store the list of posts fetched from the server
  const [posts, setPosts] = useState([]);

  // Hook to handle navigation between routes
  const navigate = useNavigate();

  // Effect to fetch user profile data when the component mounts
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('jwtToken'); // Retrieve JWT token from localStorage
        if (token) {
          // Decode the JWT token to extract the user's email
          const decodedToken = jwtDecode(token);
          const email = decodedToken.email;

          // Fetch the user profile data based on the extracted email
          const profileResponse = await fetch(`http://localhost:8081/GetUserProfileByEmail?email=${email}`);
          if (!profileResponse.ok) {
            throw new Error('Failed to fetch profile data');
          }
          const profileJson = await profileResponse.json();
          console.log('Fetched profile data:', profileJson);

          // Set the user ID in state
          setUserId(profileJson.userId);
        } else {
          console.error('JWT token not found in localStorage.');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []); // Dependency array ensures this runs only once when the component mounts

  // Effect to fetch posts whenever the user ID changes
  useEffect(() => {
    const fetchPosts = async () => {
      if (!userId) return; // Do not fetch posts until the user ID is available

      console.log('Fetching posts for userId:', userId);
      const date = new Date();
      const isoDate = getCustomISODate(date); // Format the current date for API compatibility
      console.log('Formatted date:', isoDate);
      try {
        // Fetch posts for the user ID and date
        const response = await fetch(
          `http://localhost:8081/GetExplorerPageSuggestions?userId=${userId}&page=1&resultsPerPage=10&datePosted=${encodeURIComponent(isoDate)}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        console.log('Fetched posts:', data);

        // Update the posts state with the fetched data
        setPosts(data.posts || []); // Fallback to an empty array if no posts are found
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [userId]); // Dependency array ensures this runs whenever the user ID changes

  // JSX to render the component
  return (
    <div className="min-h-screen bg-[#000080] text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header with title and navigation buttons */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Explore</h1>
            <p className="text-[#FFDD00]">Discover amazing destinations and travel stories</p>
          </div>
          <div className="flex gap-2">
            {/* Navigation buttons to switch tabs */}
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

        {/* Feed Posts Section */}
        <div className="space-y-8">
          {posts.map(post => (
            <div key={post.id} className="bg-[#001530] rounded-xl overflow-hidden">
              {/* Post Header with user info and share button */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={post.user.avatar}
                    alt={post.user.name}
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

              {/* Post Content including title, description, tags, likes, and comments */}
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
  );
}

// Helper function to format date in the correct format for the API
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