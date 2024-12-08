import React, { useState } from 'react'
import { Users, Plus, Search, MessageSquare, UserPlus } from 'lucide-react'

const ChatItem = ({ name, lastMessage, unreadCount }) => (
    <div className="flex items-center justify-between p-4 hover:bg-[#0000E0] rounded-lg cursor-pointer transition-colors">
        <div className="flex items-center">
            <div className="w-12 h-12 bg-[#FFB300] rounded-full flex items-center justify-center mr-4">
                <Users className="text-[#000080]" />
            </div>
            <div>
                <h3 className="font-semibold text-[#FFDD00]">{name}</h3>
                <p className="text-sm text-[#FFDD00]/70">{lastMessage}</p>
            </div>
        </div>
        {unreadCount > 0 && (
            <span className="bg-[#FFB300] text-[#000080] px-2 py-1 rounded-full text-xs font-bold">
                {unreadCount}
            </span>
        )}
    </div>
)

export default function GroupChatsPage() {
    const [activeTab, setActiveTab] = useState('my-chats')
    const [newGroupName, setNewGroupName] = useState('')

    const myChats = [
        { id: 1, name: "Tokyo Travelers 2024", lastMessage: "Can't wait for the cherry blossoms!", unreadCount: 3 },
        { id: 2, name: "Europe Backpackers", lastMessage: "Has anyone been to Krakow?", unreadCount: 0 },
        { id: 3, name: "Foodie Adventurers", lastMessage: "Best paella in Barcelona?", unreadCount: 5 },
    ]

    const publicChats = [
        { id: 4, name: "Southeast Asia Explorers", members: 1280 },
        { id: 5, name: "Digital Nomads Worldwide", members: 3500 },
        { id: 6, name: "Sustainable Travel Tips", members: 950 },
    ]

    const handleCreateGroup = (e) => {
        e.preventDefault()
        console.log('Creating new group:', newGroupName)
        // Here you would typically handle the group creation logic
        setNewGroupName('')
    }

    return (
        <div className="min-h-screen bg-[#000080] text-white p-6">
    <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#FFDD00] mb-4">Join or Create a Chat Room</h1>

        <div className="bg-[#001530] rounded-lg p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4"> {/* Reduced gap here */}
                <div className="flex-1">
                    <h2 className="text-xl font-semibold text-[#FFDD00] mb-4">Join a Public Room</h2>
                    <div className="relative mb-4"> {/* Reduced margin bottom here */}
                        <input
                            type="text"
                            placeholder="Search for public rooms"
                            className="w-full p-3 pl-10 rounded-lg bg-[#000080] text-white border border-[#FFDD00] focus:outline-none focus:border-[#FFB300]"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FFDD00]" />
                    </div>
                    <div className="space-y-2"> {/* Reduced space-y for closer items */}
                        {publicChats.map((chat) => (
                            <div key={chat.id} className="flex items-center justify-between p-4 bg-[#0000E0] rounded-lg mb-2">
                                <h3 className="font-semibold text-[#FFDD00]">{chat.name}</h3>
                                <button className="bg-[#FFB300] text-[#000080] px-4 py-2 rounded-lg flex items-center">
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    Join
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-[#001530] rounded-lg p-4">
            <h2 className="text-xl font-semibold text-[#FFDD00] mb-4">Create a New Room</h2>
            <form onSubmit={handleCreateGroup} className="flex gap-4">
                <input
                    type="text"
                    placeholder="Enter room name"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    className="flex-grow p-3 rounded-lg bg-[#000080] text-white border border-[#FFDD00] focus:outline-none focus:border-[#FFB300]"
                />
                <button
                    type="submit"
                    className="bg-[#FFB300] text-[#000080] px-6 py-3 rounded-lg flex items-center"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Create Room
                </button>
            </form>
        </div>
    </div>
</div>

    )
}