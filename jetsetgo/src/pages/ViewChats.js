import React, { useState, useEffect } from 'react'; // Import necessary hooks from React
import { Users, Plus, Search, MessageSquare, UserPlus } from 'lucide-react'; // Import icons from lucide-react
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation
import { jwtDecode } from 'jwt-decode'; // Import JWT decoding function

// ChatItem component to render individual chat information
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

// Main component for the GroupChatsPage
export default function GroupChatsPage() {
    const [activeTab, setActiveTab] = useState('my-chats'); // State to track active tab
    const [newGroupName, setNewGroupName] = useState(''); // State to handle new group name input
    const [publicChats, setPublicChats] = useState([]); // State to store fetched public chats
    const [userId, setUserId] = useState(''); // State to store user ID
    const navigate = useNavigate(); // useNavigate hook for navigation
    const [isLoading, setIsLoading] = useState(true); // State to track loading state
    const [searchTerm, setSearchTerm] = useState(''); // State for the search term input

    // Static list of chats (for testing before data is fetched)
    const myChats = [
        { id: 1, name: "Tokyo Travelers 2024", lastMessage: "Can't wait for the cherry blossoms!", unreadCount: 3 },
        { id: 2, name: "Europe Backpackers", lastMessage: "Has anyone been to Krakow?", unreadCount: 0 },
        { id: 3, name: "Foodie Adventurers", lastMessage: "Best paella in Barcelona?", unreadCount: 5 },
    ];

    // Effect to fetch public chats on component mount
    useEffect(() => {
        const fetchPublicChats = async () => {
            try {
                // Make a request to the backend to fetch public chats
                const response = await fetch(`http://localhost:8081/GetAllGroupChatsInfo?resultsPerPage=10&page=1`);
                if (response.ok) {
                    const data = await response.json();
                    setPublicChats(data); // Update state with fetched data
                } else {
                    console.error('Failed to fetch public chats');
                }
            } catch (error) {
                console.error('Error fetching public chats:', error);
            }
        };

        fetchPublicChats(); // Call the function to fetch chats
    }, []); // Empty dependency array ensures this runs once on mount

    // Effect to fetch user profile data based on JWT token
    useEffect(() => {
        const fetchProfileData = async () => {
          try {
            const token = localStorage.getItem('jwtToken'); // Get JWT token from localStorage
            if (token) {
    
              const decodedToken = jwtDecode(token); // Decode the token to get user details
              const email = decodedToken.email; // Extract email from decoded token
    
              // Fetch user profile data based on email
              const profileResponse = await fetch(`http://localhost:8081/GetUserProfileByEmail?email=${email}`);
              if (!profileResponse.ok) {
                throw new Error('Failed to fetch profile data');
              }
              const profileJson = await profileResponse.json();
    
              const userId = profileJson.userId; // Extract user ID from profile response
              setUserId(userId); // Set user ID state
            } else {
              console.error('JWT token not found in localStorage.');
            }
          } catch (error) {
            console.error('Error fetching profile data:', error);
          } finally {
            setIsLoading(false); // Stop loading once data is fetched
          }
        };
    
        fetchProfileData(); // Fetch profile data
    }, []); // Empty dependency array to fetch profile once on mount

    // Function to handle searching public chats
    const fetchPublicChats = async (search, maxResults = 10) => {
        try {
            setIsLoading(true); // Set loading state to true before fetching
            const response = await fetch(`http://localhost:8081/SearchGroupChatsBySubstring?groupName=${search}&maxResults=${maxResults}`);
            if (response.ok) {
                const chats = await response.json(); // Get chats from response
                setPublicChats(chats); // Update state with the fetched chats
            } else {
                console.error('Failed to fetch public chats');
            }
        } catch (error) {
            console.error('Error fetching public chats:', error);
        } finally {
            setIsLoading(false); // Stop loading once data is fetched
        }
    };

    // Function to handle search input blur event
    const handleBlur = async () => {
        if (searchTerm.trim()) {
            fetchPublicChats(searchTerm); // Fetch chats based on search term
        } else {
            // Fetch all public chats if no search term
            try {
                const response = await fetch(`http://localhost:8081/GetAllGroupChatsInfo?resultsPerPage=10&page=1`);
                if (response.ok) {
                    const data = await response.json();
                    setPublicChats(data); // Update state with fetched data
                } else {
                    console.error('Failed to fetch public chats');
                }
            } catch (error) {
                console.error('Error fetching public chats:', error);
            }
        }
    };

    // Function to handle creating a new group
    const handleCreateGroup = async (e) => {
        e.preventDefault(); // Prevent default form submission
        if (newGroupName.trim()) {
            setNewGroupName(''); // Reset new group name input
            let res;
            try {
                const response = await fetch(`http://localhost:8081/CreateGroupChat?userId=${userId}&chatName=${newGroupName}`, {
                    method: 'POST', // Sending POST request to create group
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const result = await response.text(); // Get result from server
                    res = result;
                    console.log('Group chat created:', result);
                } else {
                    throw new Error('Failed to create group chat');
                }
            } catch (error) {
                console.log(error); // Handle errors
            }
            if(res.includes("Success")){
                const createdChat = { name: newGroupName };
                navigate('/chat', { state: { createdChat } }); // Navigate to the new chat page
            }
        }
    };

    // Function to handle joining a chat
    const handleJoinChat = (joinedChat) => {
        console.log(`Joining the chat: ${joinedChat.groupName}`);
        navigate('/chat', { state: { joinedChat } }); // Navigate to the chat page
    };

    if (isLoading) {
        return <div className="min-h-screen bg-navy-blue text-white text-center py-20">Loading...</div>; // Show loading screen if data is loading
    }

    return (
        <div className="min-h-screen bg-[#000080] text-white p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-[#FFDD00] mb-4">Join or Create a Chat Room</h1>

                {/* Join a Public Room section */}
                <div className="bg-[#001530] rounded-lg p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold text-[#FFDD00] mb-4">Join a Public Room</h2>
                            <div className="relative mb-4">
                                <input
                                    type="text"
                                    placeholder="Search for public rooms"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)} // Update search term on change
                                    onBlur={handleBlur}
                                    className="w-full p-3 pl-10 rounded-lg bg-[#000080] text-white border border-[#FFDD00] focus:outline-none focus:border-[#FFB300]"
                                />
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FFDD00]" />
                            </div>
                            <div className="space-y-2">
                                {publicChats.map((chat) => (
                                    <div key={chat.id} className="flex items-center justify-between p-4 bg-[#0000E0] rounded-lg mb-2">
                                        <h3 className="font-semibold text-[#FFDD00]">{chat.groupName}</h3>
                                        <button className="bg-[#FFB300] text-[#000080] px-4 py-2 rounded-lg flex items-center"
                                            onClick={() => handleJoinChat(chat)}>
                                            <UserPlus className="w-4 h-4 mr-2" />
                                            Join
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Create a New Room section */}
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
    );
}
