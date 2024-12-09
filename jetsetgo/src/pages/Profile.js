// import React from 'react'
// import { Plus } from 'lucide-react'

// import { Button } from "../components/ui/button"
// import { Card, CardHeader } from "../components/ui/card"
// import { Badge } from "../components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"

// //FETCH functionality with backend
// // async function getUser() {
// //   const url = "https://example.org/products.json";
// //   try {
// //     const response = await fetch(url);
// //     if (!response.ok) {
// //       throw new Error(`Response status: ${response.status}`);
// //     }

// //     const json = await response.json();
// //     console.log(json);
// //   } catch (error) {
// //     console.error(error.message);
// //   }
// // }


// export default function Profile() {
//   return (
//     <div className="min-h-screen bg-navy-blue text-white">
//       <div className="container mx-auto px-4 py-8">
//         {/* Profile Header */}
//         <div className="flex flex-col md:flex-row gap-6 items-start mb-8">
//           <img
//             src="/placeholder.svg" // Replace with the URL of your profile picture
//             alt="Profile picture"
//             className="w-[200px] h-[200px] rounded-3xl object-cover"
//           />
//           <div className="flex-1 space-y-4">
//             <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
//               <div>
//                 <h1 className="text-4xl font-bold mb-2">Sejal Agarwal</h1>
//                 <Badge variant="secondary" className="bg-sunshine-yellow-dark text-white hover:bg-amber-800">
//                   Amherst, MA
//                 </Badge>
//               </div>
//               <Button className="bg-amber-700 hover:bg-teal-700 text-white">Follow</Button>
//             </div>
            
//             <div className="flex gap-4 text-right">
//               <div>
//                 <div className="text-3xl font-bold">455</div>
//                 <div className="text-slate-300">Followers</div>
//               </div>
//               <div>
//                 <div className="text-3xl font-bold">2</div>
//                 <div className="text-slate-300">Reviews</div>
//               </div>
//             </div>

//             <div className="flex flex-wrap gap-2">
//               {["Adventurous", "Night Life", "Group Traveler", "Scenic Views"].map((tag) => (
//                 <Badge key={tag} className="bg-sunshine-yellow-dark text-white hover:bg-amber-800 text-sm py-1.5">
//                   {tag}
//                 </Badge>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Tabs Navigation */}
//         <Tabs defaultValue="reviews" className="space-y-6">
//           <TabsList className="bg-navy-blue-dark w-full justify-start h-auto p-0 gap-4">
//             {["Reviews", "Destinations", "Itinerary"].map((tab) => (
//               <TabsTrigger
//                 key={tab}
//                 value={tab.toLowerCase()}
//                 className="bg-transparent data-[state=active]:bg-amber-700 px-8 py-4 rounded-lg"
//               >
//                 {tab}
//               </TabsTrigger>
//             ))}
//           </TabsList>

//           <TabsContent value="reviews" className="space-y-6">
//             {/* Big Ben Review */}
//             <Card className="bg-navy-blue-dark border-none text-white">
//               <CardHeader className="flex-row gap-4 items-start">
//                 <img
//                   src="/placeholder.svg"
//                   alt="Big Ben"
//                   className="w-[150px] h-[150px] rounded-xl object-cover"
//                 />
//                 <div className="flex-1 space-y-4">
//                   <p className="text-lg">
//                     Standing beneath the towering Big Ben, I was struck by the intricate details of its gothic architecture—it's
//                     even more majestic in person than in photos. Hearing the iconic chimes echo across Westminster felt like
//                     stepping into a moment of British history.
//                   </p>
//                   <div className="flex justify-end gap-2">
//                     <Button className="bg-teal-600 hover:bg-teal-700">Recommend</Button>
//                     <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-900">
//                       <Plus className="w-4 h-4" />1
//                     </Button>
//                   </div>
//                 </div>
//               </CardHeader>
//             </Card>

//             {/* Gardens by the Bay Review */}
//             <Card className="bg-navy-blue-dark border-none text-white">
//               <CardHeader className="flex-row gap-4 items-start">
//                 <img
//                   src="/placeholder.svg"
//                   alt="Gardens by the Bay"
//                   className="w-[150px] h-[150px] rounded-xl object-cover"
//                 />
//                 <div className="flex-1 space-y-4">
//                   <p className="text-lg">
//                     The 8 PM light show at Gardens by the Bay is pure magic—I was completely captivated by the towering
//                     Supertrees, glowing in sync with the music. It felt like stepping into a futuristic dreamscape, surrounded
//                     by vibrant colors and soothing melodies.
//                   </p>
//                   <div className="flex justify-end gap-2">
//                     <Button className="bg-teal-600 hover:bg-teal-700">Recommend</Button>
//                     <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-900">
//                       <Plus className="w-4 h-4" />1
//                     </Button>
//                   </div>
//                 </div>
//               </CardHeader>
//             </Card>
//           </TabsContent>

//           <TabsContent value="destinations">
//             <div className="text-center text-slate-400 py-8">No destinations added yet</div>
//           </TabsContent>

//           <TabsContent value="itinerary">
//             <div className="text-center text-slate-400 py-8">No itinerary added yet</div>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   )
// }

import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardHeader } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { jwtDecode } from 'jwt-decode';

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

  if (isLoading) {
    return <div className="min-h-screen bg-navy-blue text-white text-center py-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-navy-blue text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-6 items-start mb-8">
          <img
            src="/placeholder.svg" // Replace with the user's profile picture URL if available
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
              <Button className="bg-amber-700 hover:bg-teal-700 text-white">Follow</Button>
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
