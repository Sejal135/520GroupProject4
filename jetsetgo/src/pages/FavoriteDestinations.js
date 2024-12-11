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

