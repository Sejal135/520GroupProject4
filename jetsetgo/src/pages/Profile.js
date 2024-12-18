import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardHeader } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import supabase from './supabaseClient';


const preferenceLabels = {
  ADVENTURE_TRAVELER: "Adventurous",
  CULTURAL_ENTHUSIAST: "Cultural Enthusiast",
  SOLO_TRAVELER: "Solo Traveler",
  LUXURY_TRAVELER: "Luxury Traveler",
  BUDGET_BACKPACKER: "Budget Backpacker",
  ECO_TRAVELER: "Eco-Conscious Traveler",
  FOODIE_TRAVELER: "Food Lover",
  BEACH_BUM: "Beach Enthusiast",
  DIGITAL_NOMAD: "Digital Nomad",
  PILGRIM_TRAVELER: "Pilgrimage Enthusiast",
  WILDLIFE_ENTHUSIAST: "Wildlife Enthusiast",
  PHOTOGRAPHER_TRAVELER: "Photography Lover",
  HISTORY_BUFF: "History Buff",
  FAMILY_VACATIONER: "Family Vacationer",
  FESTIVAL_HOPPER: "Festival Lover",
  WELLNESS_TRAVELER: "Wellness Seeker",
  SPORTS_FANATIC: "Sports Fan",
  ROAD_TRIPPER: "Road Tripper",
  CRUISE_TRAVELER: "Cruise Enthusiast",
  URBAN_EXPLORER: "Urban Explorer",
  MISC_TRAVELER: "Miscellaneous Traveler",
};




export default function Profile() {
  const [profileData, setProfileData] = useState({
    name: '',
    location: '',
    bio: '',
    followers: 0,
    reviews: 0,
    preferences: [],
    itineraries: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState('');
  const [profileUrl, setProfileUrl] = useState(null); // State to store the profile picture URL
  

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        if (token) {

          // Step 1 
          const decodedToken = jwtDecode(token);
          const email = decodedToken.email;

          // Step 2 
          // Fetch user profile by email
          const profileResponse = await fetch(`http://localhost:8081/GetUserProfileByEmail?email=${email}`);
          if (!profileResponse.ok) {
            throw new Error('Failed to fetch profile data');
          }
          const profileJson = await profileResponse.json();

          const userId = profileJson.userId;
          setUserId(userId)

          // Fetch follower count
          const followerResponse = await fetch(`http://localhost:8081/GetFollowerCount?userId=${userId}`);
          if (!followerResponse.ok) {
            throw new Error('Failed to fetch follower count');
          }
          const followerCount = await followerResponse.json();

          // Fetch preferences
          const preferencesResponse = await fetch(`http://localhost:8081/GetPreferencesForUser?userId=${userId}`);
          if (!preferencesResponse.ok) {
            throw new Error('Failed to fetch preferences');
          }
          const preferences = await preferencesResponse.json();
          console.log(preferences)

          // Fetch itineraries
          const itinerariesResponse = await fetch(`http://localhost:8081/GetItinerariesForUser?userId=${userId}`);
          if (!itinerariesResponse.ok) {
            throw new Error('Failed to fetch itineraries');
          }
          const itineraries = await itinerariesResponse.json();

          // Update the state with fetched data
          setProfileData({
            name: profileJson.username || 'Unknown User',
            location: profileJson.location || 'Unknown Location',
            bio: profileJson.bio || 'This user has not provided a bio yet.',
            followers: followerCount || 0,
            reviews: profileJson.reviews || 0,
            preferences: preferences || [],
            itineraries: itineraries || [],
          });
        } else {
          console.error('JWT token not found in localStorage.');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const getUserProfile = async (userId) => {
    try {
      console.log("user Id!!!", userId)
      // Query the users table to get the profile pic for a specific user
      const { data, error } = await supabase
        .from('users')
        .select('profile_pic') // Retrieve only the profile_pic field
        .eq('user_id', userId);  // Ensure you replace `userId` with the actual ID of the user you want to retrieve

      if (error) {
        throw error;
      }
  
      if (data && data.length > 0) {
        const profilePicUrl = data[0].profile_pic; // Get the profile_pic URL from the result
        console.log("Profile pic URL:", profilePicUrl);
        return profilePicUrl;
      } else {
        console.log('No user found or profile pic is missing');
        return null;
      }
    } catch (error) {
      console.error("Error retrieving user profile:", error.message);
      return null;
    }
  };

   // Fetch user profile when the component mounts or when userId changes
   useEffect(() => {
    const fetchProfile = async () => {
      if (userId) {
        const profilePicUrl = await getUserProfile(userId);
        setProfileUrl(profilePicUrl); // Update state with the profile picture URL
        setIsLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchProfile(); // Call the function to fetch profile data
  }, [userId]); // Run this effect whenever userId changes 

  if (isLoading) {
    return <div className="min-h-screen bg-navy-blue text-white text-center py-20">Loading...</div>;
  }
  console.log(profileUrl)
  return (
    <div className="min-h-screen bg-navy-blue text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-6 items-start mb-8">
          <img
             src={profileUrl || "/placeholder.svg"}  // Use profileUrl if available, else fallback to the placeholder
            alt="Profile picture"
            className="w-[200px] h-[200px] rounded-3xl object-cover"
          />
          <div className="flex-1 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">{profileData.name}</h1>
                <Badge variant="secondary" className="bg-sunshine-yellow-dark text-white hover:bg-amber-800">
                  {profileData.location}
                </Badge>
              </div>
              <Button className="bg-amber-700 hover:bg-teal-700 text-white">
              <Link to="/edit-profile" className="text-white no-underline">
                  Edit Profile
                </Link>
              </Button>
            </div>

            <p className="text-slate-300">{profileData.bio}</p>

            <div className="flex gap-4 text-right">
              <div>
                <div className="text-3xl font-bold">{profileData.followers}</div>
                <div className="text-slate-300">Followers</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{profileData.reviews}</div>
                <div className="text-slate-300">Reviews</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {profileData.preferences.length > 0 ? (
                profileData.preferences.map((pref) => (
                  <Badge
                    key={pref}
                    className="bg-sunshine-yellow-dark text-white hover:bg-amber-800 text-sm py-1.5"
                  >
                    {preferenceLabels[pref.preference] || "Unknown Preference"}
                  </Badge>
                ))
              ) : (
                <div className="text-slate-400">No preferences available</div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="reviews" className="space-y-6">
          <TabsList className="bg-navy-blue-dark w-full justify-start h-auto p-0 gap-4">
            {['Reviews', 'Destinations'].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab.toLowerCase()}
                className="bg-transparent data-[state=active]:bg-amber-700 px-8 py-4 rounded-lg"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="reviews" className="space-y-6">
            <div className="text-center text-slate-400 py-8">No reviews added yet</div>
          </TabsContent>

          <TabsContent value="destinations">
            <div className="text-center text-slate-400 py-8">No destinations added yet</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
