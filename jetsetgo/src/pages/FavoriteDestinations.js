import React, { useState } from "react";
import {
  Wine,
  Binoculars,
  GalleryVerticalEnd,
  Earth,
  Plus,
  Share2,
  Bookmark,
  Edit2,
  Tags,
  MapPin,
} from "lucide-react";

export default function FavoriteDestinations() {
  const [destinations, setDestinations] = useState([
    {
      id: 1,
      name: "Big Ben",
      location: "London, UK",
      image: "/placeholder.svg",
      privacy: "experiences",
      tags: ["Historical", "Architecture"],
      notes: "Visit during sunset for best photos. Book Elizabeth Tower tour in advance.",
      saved: "2024-01-15",
    },
    {
      id: 2,
      name: "Gardens by the Bay",
      location: "Singapore",
      image: "/placeholder.svg",
      privacy: "sightseeing",
      tags: ["Nature", "Night Life"],
      notes: "Don't miss the 8 PM light show! Visit Cloud Forest in morning to avoid crowds.",
      saved: "2024-02-01",
    },
  ]);

  const [activeFilter, setActiveFilter] = useState("all");

  // Filter destinations based on activeFilter
  const filteredDestinations =
    activeFilter === "all"
      ? destinations
      : destinations.filter((destination) => destination.privacy === activeFilter);

  return (
    <div className="min-h-screen bg-navy-blue text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Saved Destinations</h1>
            <p className="text-slate-400">
              Keep track of places you want to visit and share them with others
            </p>
          </div>
          <button className="flex items-center gap-2 bg-amber-700 text-white px-4 py-2 rounded-md hover:bg-teal-700">
            <Plus className="w-4 h-4" />
            Add Destination
          </button>
        </div>

        <div className="grid gap-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 rounded-md ${
                activeFilter === "all" ? "bg-sunshine-yellow-dark" : "bg-navy-blue-dark"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter("experiences")}
              className={`px-4 py-2 rounded-md ${
                activeFilter === "experiences"
                  ? "bg-sunshine-yellow-dark"
                  : "bg-navy-blue-dark"
              }`}
            >
              Experiences
            </button>
            <button
              onClick={() => setActiveFilter("dining")}
              className={`px-4 py-2 rounded-md ${
                activeFilter === "dining" ? "bg-sunshine-yellow-dark" : "bg-navy-blue-dark"
              }`}
            >
              Dining
            </button>
            <button
              onClick={() => setActiveFilter("sightseeing")}
              className={`px-4 py-2 rounded-md ${
                activeFilter === "sightseeing"
                  ? "bg-sunshine-yellow-dark"
                  : "bg-navy-blue-dark"
              }`}
            >
              Sightseeing
            </button>
            <button
              onClick={() => setActiveFilter("miscellaneous")}
              className={`px-4 py-2 rounded-md ${
                activeFilter === "miscellaneous"
                  ? "bg-sunshine-yellow-dark"
                  : "bg-navy-blue-dark"
              }`}
            >
              Miscellaneous
            </button>
          </div>

          {/* Destinations Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredDestinations.length > 0 ? (
              filteredDestinations.map((destination) => (
                <div key={destination.id} className="bg-navy-blue-dark rounded-xl overflow-hidden">
                  <div className="relative h-48">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      {destination.privacy === "experiences" && <Earth className="w-5 h-5" />}
                      {destination.privacy === "dining" && <Wine className="w-5 h-5" />}
                      {destination.privacy === "sightseeing" && <Binoculars className="w-5 h-5" />}
                      {destination.privacy === "miscellaneous" && <GalleryVerticalEnd className="w-5 h-5" />}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{destination.name}</h3>
                        <div className="flex items-center text-slate-400">
                          <MapPin className="w-4 h-4 mr-1" />
                          {destination.location}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-slate-700 rounded-md">
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-slate-700 rounded-md">
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {destination.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-amber-700/20 text-amber-500 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="text-slate-300 text-sm mb-4">{destination.notes}</p>

                    <div className="flex items-center justify-between text-sm text-slate-400">
                      <div className="flex items-center">
                        <Bookmark className="w-4 h-4 mr-1" />
                        Saved {destination.saved}
                      </div>
                      <button className="flex items-center gap-1 hover:text-white">
                        <Tags className="w-4 h-4" />
                        Add Tags
                      </button>
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
