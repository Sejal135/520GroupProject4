// import React, { useState } from "react";
// import {
//   Wine,
//   Binoculars,
//   GalleryVerticalEnd,
//   Earth,
//   Plus,
//   Share2,
//   Bookmark,
//   Edit2,
//   Tags,
//   MapPin,
// } from "lucide-react";

// export default function FavoriteDestinations() {
//   const [destinations, setDestinations] = useState([
//     {
//       id: 1,
//       name: "Big Ben",
//       location: "London, UK",
//       image: "/placeholder.svg",
//       privacy: "experiences",
//       tags: ["Historical", "Architecture"],
//       notes: "Visit during sunset for best photos. Book Elizabeth Tower tour in advance.",
//       saved: "2024-01-15",
//     },
//     {
//       id: 2,
//       name: "Gardens by the Bay",
//       location: "Singapore",
//       image: "/placeholder.svg",
//       privacy: "sightseeing",
//       tags: ["Nature", "Night Life"],
//       notes: "Don't miss the 8 PM light show! Visit Cloud Forest in morning to avoid crowds.",
//       saved: "2024-02-01",
//     },
//   ]);

//   const [activeFilter, setActiveFilter] = useState("all");

//   // Filter destinations based on activeFilter
//   const filteredDestinations =
//     activeFilter === "all"
//       ? destinations
//       : destinations.filter((destination) => destination.privacy === activeFilter);

//   return (
//     <div className="min-h-screen bg-navy-blue text-white">
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
//           <div>
//             <h1 className="text-3xl font-bold mb-2">Saved Destinations</h1>
//             <p className="text-slate-400">
//               Keep track of places you want to visit and share them with others
//             </p>
//           </div>
//           <button className="flex items-center gap-2 bg-amber-700 text-white px-4 py-2 rounded-md hover:bg-teal-700">
//             <Plus className="w-4 h-4" />
//             Add Destination
//           </button>
//         </div>

//         <div className="grid gap-6">
//           {/* Filters */}
//           <div className="flex flex-wrap gap-2">
//             <button
//               onClick={() => setActiveFilter("all")}
//               className={`px-4 py-2 rounded-md ${
//                 activeFilter === "all" ? "bg-sunshine-yellow-dark" : "bg-navy-blue-dark"
//               }`}
//             >
//               All
//             </button>
//             <button
//               onClick={() => setActiveFilter("experiences")}
//               className={`px-4 py-2 rounded-md ${
//                 activeFilter === "experiences"
//                   ? "bg-sunshine-yellow-dark"
//                   : "bg-navy-blue-dark"
//               }`}
//             >
//               Experiences
//             </button>
//             <button
//               onClick={() => setActiveFilter("dining")}
//               className={`px-4 py-2 rounded-md ${
//                 activeFilter === "dining" ? "bg-sunshine-yellow-dark" : "bg-navy-blue-dark"
//               }`}
//             >
//               Dining
//             </button>
//             <button
//               onClick={() => setActiveFilter("sightseeing")}
//               className={`px-4 py-2 rounded-md ${
//                 activeFilter === "sightseeing"
//                   ? "bg-sunshine-yellow-dark"
//                   : "bg-navy-blue-dark"
//               }`}
//             >
//               Sightseeing
//             </button>
//             <button
//               onClick={() => setActiveFilter("miscellaneous")}
//               className={`px-4 py-2 rounded-md ${
//                 activeFilter === "miscellaneous"
//                   ? "bg-sunshine-yellow-dark"
//                   : "bg-navy-blue-dark"
//               }`}
//             >
//               Miscellaneous
//             </button>
//           </div>

//           {/* Destinations Grid */}
//           <div className="grid md:grid-cols-2 gap-6">
//             {filteredDestinations.length > 0 ? (
//               filteredDestinations.map((destination) => (
//                 <div key={destination.id} className="bg-navy-blue-dark rounded-xl overflow-hidden">
//                   <div className="relative h-48">
//                     <img
//                       src={destination.image}
//                       alt={destination.name}
//                       className="w-full h-full object-cover"
//                     />
//                     <div className="absolute top-4 right-4 flex gap-2">
//                       {destination.privacy === "experiences" && <Earth className="w-5 h-5" />}
//                       {destination.privacy === "dining" && <Wine className="w-5 h-5" />}
//                       {destination.privacy === "sightseeing" && <Binoculars className="w-5 h-5" />}
//                       {destination.privacy === "miscellaneous" && <GalleryVerticalEnd className="w-5 h-5" />}
//                     </div>
//                   </div>
//                   <div className="p-6">
//                     <div className="flex justify-between items-start mb-4">
//                       <div>
//                         <h3 className="text-xl font-semibold mb-1">{destination.name}</h3>
//                         <div className="flex items-center text-slate-400">
//                           <MapPin className="w-4 h-4 mr-1" />
//                           {destination.location}
//                         </div>
//                       </div>
//                       <div className="flex gap-2">
//                         <button className="p-2 hover:bg-slate-700 rounded-md">
//                           <Share2 className="w-4 h-4" />
//                         </button>
//                         <button className="p-2 hover:bg-slate-700 rounded-md">
//                           <Edit2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </div>

//                     <div className="flex flex-wrap gap-2 mb-4">
//                       {destination.tags.map((tag) => (
//                         <span
//                           key={tag}
//                           className="px-3 py-1 bg-amber-700/20 text-amber-500 rounded-full text-sm"
//                         >
//                           {tag}
//                         </span>
//                       ))}
//                     </div>

//                     <p className="text-slate-300 text-sm mb-4">{destination.notes}</p>

//                     <div className="flex items-center justify-between text-sm text-slate-400">
//                       <div className="flex items-center">
//                         <Bookmark className="w-4 h-4 mr-1" />
//                         Saved {destination.saved}
//                       </div>
//                       <button className="flex items-center gap-1 hover:text-white">
//                         <Tags className="w-4 h-4" />
//                         Add Tags
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-slate-400">No destinations found for this category.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  Wine,
  Binoculars,
  GalleryVerticalEnd,
  Earth,
  Plus,
  Bookmark,
  Tags,
  MapPin,
} from "lucide-react";
import { jwtDecode } from "jwt-decode";

export default function FavoriteDestinations() {
  const [destinations, setDestinations] = useState([
    {
      placeId: 1,
      placeName: "Big Ben",
      placeType: "experiences"
    },
    {
      placeId: 2,
      placeName: "Gardens by the Bay",
      placeType: "sightseeing"
    },
  ]);
  const [destinations2, setDestinations2] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const userEmail = decodedToken?.email;
          setEmail(userEmail);

          const profileResponse = await fetch(
            `http://localhost:8081/GetUserProfileByEmail?email=${userEmail}`
          );

          if (!profileResponse.ok) {
            throw new Error("Failed to fetch profile data");
          }

          const profileJson = await profileResponse.json();
          const userId = profileJson.userId;
          setUserName(profileJson.userName);

          console.log("User ID:", userId);

          // Fetch favorite destinations using userId
          const destinationsResponse = await fetch(
            `http://localhost:8081/GetFavoriteDestinations?userId=${userId}`
          );

          if (!destinationsResponse.ok) {
            throw new Error("Failed to fetch favorite destinations");
          }

          const destinationsJson = await destinationsResponse.json();
          console.log("Favorite Destinations:", destinationsJson);
          
          // Extract all placeIds (if destinationsJson is an array)
          const placeIds = destinationsJson.map((destination) => destination.placeId);
          console.log("Place IDs:", placeIds);
          
          // Example: Access the placeId of the first destination
          if (destinationsJson.length > 0) {
            console.log("First Place ID:", destinationsJson[0].placeId);
          }

          
          
          // Set the destinations state
          setDestinations(placeIds);
          
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, []);

  const filteredDestinations =
    activeFilter === "All"
      ? destinations
      : destinations.filter((destination) => destination.placeType === activeFilter);

  return (
    <div className="min-h-screen bg-navy-blue text-white">
      <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Saved Destinations</h1>
            <p className="text-slate-400">
               Keep track of places you want to visit and share them with others.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="grid gap-6">
          <div className="flex flex-wrap gap-2">
            {["All", "Experiences", "Dining", "Sightseeing", "Miscellaneous"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-md ${
                  activeFilter === filter ? "bg-sunshine-yellow-dark" : "bg-navy-blue-dark"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>

            
          {/* Destinations Grid */}
          <div className="flex flex-col gap-4">
            {filteredDestinations.length > 0 ? (
              filteredDestinations.map((destination) => (
                <div key={destination.placeId} className="bg-navy-blue-dark rounded-xl overflow-hidden">
                  <div className="relative h-19">
                    <div className="absolute top-10 right-5 flex gap-2">
                      {destination.placeType === "Experiences" && <Earth className="w-10 h-10" />}
                      {destination.placeType === "Dining" && <Wine className="w-10 h-10" />}
                      {destination.placeType === "Sightseeing" && <Binoculars className="w-10 h-10" />}
                      {destination.placeType === "Miscellaneous" && <GalleryVerticalEnd className="w-10 h-10" />}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{destination.placeName}</h3>
                        <h3 className="text-sm font mb-1">{destination.placeType}</h3>
                      </div>
                    </div>

                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-400">No destinations found for this category.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

