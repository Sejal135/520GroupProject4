import React, { useState, useEffect} from 'react'
import { Users, Plus, Search, MessageSquare, UserPlus } from 'lucide-react'
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';


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
    const [publicChats, setPublicChats] = useState([]); // State to hold fetched public chats
    const [userId, setUserId] = useState('')
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(''); // State for the search input




    const myChats = [
        { id: 1, name: "Tokyo Travelers 2024", lastMessage: "Can't wait for the cherry blossoms!", unreadCount: 3 },
        { id: 2, name: "Europe Backpackers", lastMessage: "Has anyone been to Krakow?", unreadCount: 0 },
        { id: 3, name: "Foodie Adventurers", lastMessage: "Best paella in Barcelona?", unreadCount: 5 },
    ]

    // const publicChats = [
    //     { id: 4, name: "Southeast Asia Explorers", members: 1280 },
    //     { id: 5, name: "Digital Nomads Worldwide", members: 3500 },
    //     { id: 6, name: "Sustainable Travel Tips", members: 950 },
    // ]

     // Fetch public chats on component mount
     useEffect(() => {
        const fetchPublicChats = async () => {
            try {
                // Adjust the endpoint according to your backend API
                const response = await fetch(`http://localhost:8081/GetAllGroupChatsInfo?resultsPerPage=10&page=1`);
                if (response.ok) {
                    const data = await response.json();
                    setPublicChats(data); // Set the fetched data to state
                } else {
                    console.error('Failed to fetch public chats');
                }
            } catch (error) {
                console.error('Error fetching public chats:', error);
            }
        };

        fetchPublicChats();
    }, []);

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
    
              // Update the state with fetched data
              setUserId(userId);
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

      console.log("UserId,", userId)
      const fetchPublicChats = async (search, maxResults = 10) => {
        try {
            setIsLoading(true); // Set loading state to true before fetching
            const response = await fetch(`http://localhost:8081/SearchGroupChatsBySubstring?groupName=${search}&maxResults=${maxResults}`);
            if (response.ok) {
                const chats = await response.json();
                console.log("fetched chats from search", chats)
                setPublicChats(chats); // Update the state with the fetched chats
            } else {
                console.error('Failed to fetch public chats');
            }
        } catch (error) {
            console.error('Error fetching public chats:', error);
        } finally {
            setIsLoading(false); // Set loading state to false after fetching
        }
    };

    const handleBlur = async () => {
        if (searchTerm.trim()) {
            fetchPublicChats(searchTerm); // Fetch public chats if there's a search term
        } else {
            try {
                // Adjust the endpoint according to your backend API
                const response = await fetch(`http://localhost:8081/GetAllGroupChatsInfo?resultsPerPage=10&page=1`);
                if (response.ok) {
                    const data = await response.json();
                    setPublicChats(data); // Set the fetched data to state
                } else {
                    console.error('Failed to fetch public chats');
                }
            } catch (error) {
                console.error('Error fetching public chats:', error);
            }
        }
    }; 
    

    const handleCreateGroup = async (e) => {
        e.preventDefault()
        console.log('Creating new group:', newGroupName)
     //   const createdChat = { id: 7, name: newGroupName, members: 1280 }
        // Here you would typically handle the group creation logic
        if (newGroupName.trim()){
            setNewGroupName('')
            var res;
            try {
                // Send a POST request to create a new group chat
                const response = await fetch(`http://localhost:8081/CreateGroupChat?userId=${userId}&chatName=${newGroupName}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // Set the content type to JSON
                    },
                });
                    console.log(response)
                if (response.ok) {
                    const result = await response.text();
                    res = result;
                    console.log('Group chat created:', result);
                    
                    // You can handle the response, such as navigating to the new chat
                } else {
                    throw new Error('Failed to create group chat');
                }
            } catch (error) {
                console.log(error)
            }
            if(res.includes("Success")){
                const createdChat = { name: newGroupName }
                navigate('/chat', { state: { createdChat } }); // Pass the full chat object in the state
            }
           
           
        }
    } 

    const handleJoinChat = (joinedChat) => {
        console.log(`Joining the joinedChat: ${joinedChat.groupName}`);
        // Navigate to the /joinedChat page with the full joinedChat object as state
        console.log("test", joinedChat)
        navigate('/chat', { state: { joinedChat } });  // Pass the full chat object in the state
    };

    if (isLoading) {
        return <div className="min-h-screen bg-navy-blue text-white text-center py-20">Loading...</div>;
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
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} // Update search term on change
                            onBlur={handleBlur}
                            className="w-full p-3 pl-10 rounded-lg bg-[#000080] text-white border border-[#FFDD00] focus:outline-none focus:border-[#FFB300]"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FFDD00]" />
                    </div>
                    <div className="space-y-2"> {/* Reduced space-y for closer items */}
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