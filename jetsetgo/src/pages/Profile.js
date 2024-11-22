import React from 'react'
import { Plus } from 'lucide-react'

import { Button } from "../components/ui/button"
import { Card, CardHeader } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"

export default function Profile() {
  return (
    <div className="min-h-screen bg-navy-blue text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-6 items-start mb-8">
          <img
            src="/placeholder.svg" // Replace with the URL of your profile picture
            alt="Profile picture"
            className="w-[200px] h-[200px] rounded-3xl object-cover"
          />
          <div className="flex-1 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">Sejal Agarwal</h1>
                <Badge variant="secondary" className="bg-sunshine-yellow-dark text-white hover:bg-amber-800">
                  Amherst, MA
                </Badge>
              </div>
              <Button className="bg-amber-700 hover:bg-teal-700 text-white">Follow</Button>
            </div>
            
            <div className="flex gap-4 text-right">
              <div>
                <div className="text-3xl font-bold">455</div>
                <div className="text-slate-300">Followers</div>
              </div>
              <div>
                <div className="text-3xl font-bold">2</div>
                <div className="text-slate-300">Reviews</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {["Adventurous", "Night Life", "Group Traveler", "Scenic Views"].map((tag) => (
                <Badge key={tag} className="bg-sunshine-yellow-dark text-white hover:bg-amber-800 text-sm py-1.5">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="reviews" className="space-y-6">
          <TabsList className="bg-navy-blue-dark w-full justify-start h-auto p-0 gap-4">
            {["Reviews", "Destinations", "Itinerary"].map((tab) => (
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
            {/* Big Ben Review */}
            <Card className="bg-navy-blue-dark border-none text-white">
              <CardHeader className="flex-row gap-4 items-start">
                <img
                  src="/placeholder.svg"
                  alt="Big Ben"
                  className="w-[150px] h-[150px] rounded-xl object-cover"
                />
                <div className="flex-1 space-y-4">
                  <p className="text-lg">
                    Standing beneath the towering Big Ben, I was struck by the intricate details of its gothic architecture—it's
                    even more majestic in person than in photos. Hearing the iconic chimes echo across Westminster felt like
                    stepping into a moment of British history.
                  </p>
                  <div className="flex justify-end gap-2">
                    <Button className="bg-teal-600 hover:bg-teal-700">Recommend</Button>
                    <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-900">
                      <Plus className="w-4 h-4" />1
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Gardens by the Bay Review */}
            <Card className="bg-navy-blue-dark border-none text-white">
              <CardHeader className="flex-row gap-4 items-start">
                <img
                  src="/placeholder.svg"
                  alt="Gardens by the Bay"
                  className="w-[150px] h-[150px] rounded-xl object-cover"
                />
                <div className="flex-1 space-y-4">
                  <p className="text-lg">
                    The 8 PM light show at Gardens by the Bay is pure magic—I was completely captivated by the towering
                    Supertrees, glowing in sync with the music. It felt like stepping into a futuristic dreamscape, surrounded
                    by vibrant colors and soothing melodies.
                  </p>
                  <div className="flex justify-end gap-2">
                    <Button className="bg-teal-600 hover:bg-teal-700">Recommend</Button>
                    <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-900">
                      <Plus className="w-4 h-4" />1
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </TabsContent>

          <TabsContent value="destinations">
            <div className="text-center text-slate-400 py-8">No destinations added yet</div>
          </TabsContent>

          <TabsContent value="itinerary">
            <div className="text-center text-slate-400 py-8">No itinerary added yet</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}