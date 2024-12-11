// import React, { useState, useRef, useEffect } from 'react'
// import { ArrowLeft } from 'lucide-react'

// const Message = ({ sender, content, timestamp, isMine }) => (
//   <div className={`flex ${isMine ? 'justify-end' : 'justify-start'} mb-4`}>
//     <div className={`max-w-[70%] ${isMine ? 'bg-[#FFB300] text-[#000080]' : 'bg-[#0000E0] text-[#FFDD00]'} rounded-lg p-3`}>
//       {!isMine && <p className="font-semibold mb-1">{sender}</p>}
//       <p>{content}</p>
//       <p className={`text-xs ${isMine ? 'text-[#000080]/70' : 'text-[#FFDD00]/70'} text-right mt-1`}>{timestamp}</p>
//     </div>
//   </div>
// )

// export default function GroupChat() {
//   const [messages, setMessages] = useState([
//     { id: 1, sender: 'Alex', content: 'Hey everyone! Excited for our trip to Tokyo next month!', timestamp: '10:30 AM', isMine: false },
//     { id: 2, sender: 'You', content: 'Me too! Has anyone been to the TeamLab Borderless museum?', timestamp: '10:32 AM', isMine: true },
//     { id: 3, sender: 'Sarah', content: 'Yes, it\'s amazing! Definitely a must-visit.', timestamp: '10:35 AM', isMine: false },
//     { id: 4, sender: 'Mike', content: 'I heard it\'s closing soon. We should book tickets ASAP!', timestamp: '10:37 AM', isMine: false },
//   ])
//   const [newMessage, setNewMessage] = useState('')
//   const messagesEndRef = useRef(null)

//   const members = [
//     { id: 1, name: 'You', status: 'online' },
//     { id: 2, name: 'Alex', status: 'online' },
//     { id: 3, name: 'Sarah', status: 'offline' },
//     { id: 4, name: 'Mike', status: 'online' },
//     { id: 5, name: 'Emma', status: 'offline' },
//   ]

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
//   }, [messages])

//   const handleSendMessage = (e) => {
//     e.preventDefault()
//     if (newMessage.trim()) {
//       const newMsg = {
//         id: messages.length + 1,
//         sender: 'You',
//         content: newMessage,
//         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         isMine: true
//       }
//       setMessages([...messages, newMsg])
//       setNewMessage('')
//     }
//   }

//   return (
//     <div className="min-h-screen bg-[#000080] text-white flex">
//       {/* Main Chat Area */}
//       <div className="flex-grow flex flex-col h-screen">
//         {/* Chat Header */}
//         <div className="bg-[#001530] p-4 flex items-center justify-between">
//           <div className="flex items-center">
//             <ArrowLeft className="w-6 h-6 text-[#FFDD00] mr-4 cursor-pointer" />
//             <h1 className="text-xl font-bold text-[#FFDD00]">Tokyo Travelers 2024</h1>
//           </div>
//         </div>

//         {/* Messages Area */}
//         <div className="flex-grow overflow-y-auto p-4 space-y-4">
//           {messages.map((message) => (
//             <Message key={message.id} {...message} />
//           ))}
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Message Input */}
//         <form onSubmit={handleSendMessage} className="bg-[#001530] p-4 flex items-center">
//           <input
//             type="text"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             placeholder="Type a message..."
//             className="flex-grow bg-[#000080] text-white rounded-l-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFB300]"
//           />
//           <button type="submit" className="bg-[#FFB300] text-[#000080] rounded-r-full px-4 py-2 hover:bg-[#FFDD00]">
//             Send
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import Stomp from '@stomp/stompjs'; // Or your preferred STOMP library
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

const Message = ({ sender, content, timestamp, isMine }) => (
  <div className={`flex ${isMine ? 'justify-end' : 'justify-start'} mb-4`}>
    <div className={`max-w-[70%] ${isMine ? 'bg-[#FFB300] text-[#000080]' : 'bg-[#0000E0] text-[#FFDD00]'} rounded-lg p-3`}>
      {!isMine && <p className="font-semibold mb-1">{sender}</p>}
      <p>{content}</p>
      <p className={`text-xs ${isMine ? 'text-[#000080]/70' : 'text-[#FFDD00]/70'} text-right mt-1`}>{timestamp}</p>
    </div>
  </div>
);

export default function GroupChat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState('');
  const messagesEndRef = useRef(null);
  const stompClientRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { joinedChat } = location.state || {};
  const { createdChat } = location.state || {};

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        if (token) {
          const decodedToken = jwtDecode(token);
          const email = decodedToken.email;

          const profileResponse = await fetch(`http://localhost:8081/GetUserProfileByEmail?email=${email}`);
          if (!profileResponse.ok) {
            throw new Error('Failed to fetch profile data');
          }
          const profileJson = await profileResponse.json();
          setUsername(profileJson.username);
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

  console.log("username!", username);

  useEffect(() => {
    if (joinedChat) {
      setRoomCode(joinedChat.groupName); // Set roomCode to joinedChat.name
    } 
    if (createdChat) {
      setRoomCode(createdChat.name); // Set roomCode to createdChat.name
    }
  }, [joinedChat, createdChat]); 

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const connectToWebSocket = useCallback(() => {
    if (isConnected && username && roomCode) {
      const socket = new SockJS('http://localhost:8081/ws');
      const client = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        onConnect: () => {
          console.log('Connected to WebSocket');
          client.subscribe(`/topic/${roomCode}`, onMessageReceived);
          sendJoinMessage(client);
          setConnectionError('');
        },
        onStompError: (frame) => {
          console.error('STOMP error', frame);
          setConnectionError('Failed to connect to the chat server. Retrying...');
        },
        onWebSocketClose: () => {
          console.log('WebSocket connection closed');
          setConnectionError('Connection lost. Attempting to reconnect...');
        },
      });
      stompClientRef.current = client;
      client.activate();
      return () => {
        if (client.active) {
          sendLeaveMessage(client);
          client.deactivate();
        }
      };
    }
  }, [isConnected, username, roomCode]);

  useEffect(() => {
    const cleanup = connectToWebSocket();
    return () => {
      if (cleanup) cleanup();
    };
  }, [connectToWebSocket]);

  const onMessageReceived = (message) => {
    const receivedMessage = JSON.parse(message.body);
    setMessages((prevMessages) => [...prevMessages, receivedMessage]);
  };

  const sendJoinMessage = (client) => {
    if (client && client.active) {
      const joinMessage = {
        roomId: 'public',
        sender: username,
        content: `${username} joined!`,
        type: 'JOIN',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      client.publish({
        destination: `/app/chat.addUser/${roomCode}`,
        body: JSON.stringify(joinMessage),
      });
    }
  };

  const sendLeaveMessage = (client) => {
    if (client && client.active) {
      const leaveMessage = {
        roomId: 'public',
        sender: username,
        content: `${username} left!`,
        type: 'LEAVE',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      client.publish({
        destination: `/app/chat.addUser/${roomCode}`,
        body: JSON.stringify(leaveMessage),
      });
    }
  };

  const handleConnect = (e) => {
    e?.preventDefault();
    if (username && roomCode) {
      setConnectionError('');
      setIsConnected(true);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && stompClientRef.current && stompClientRef.current.active) {
      const chatMessage = {
        roomId: 'public',
        sender: username,
        content: newMessage,
        type: 'CHAT',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      stompClientRef.current.publish({
        destination: `/app/chat.sendMessage/${roomCode}`,
        body: JSON.stringify(chatMessage),
      });
      setNewMessage('');
    } else if (!stompClientRef.current || !stompClientRef.current.active) {
      setConnectionError('Connection lost. Please wait while we reconnect...');
      connectToWebSocket();
    }
  };

  const handleDisconnect = () => {
    if (stompClientRef.current && stompClientRef.current.active) {
      sendLeaveMessage(stompClientRef.current);
      stompClientRef.current.deactivate();
    }
    setIsConnected(false);
    setMessages([]);
    setConnectionError('');
    navigate('../group-chats');
  };

  useEffect(() => {
    if (username) {
      handleConnect(); // Call handleConnect after setting the username
    }
  }, [username]); 

  if (isLoading) {
    return <div className="min-h-screen bg-navy-blue text-white text-center py-20">Loading...</div>;
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-[#000080] text-white flex items-center justify-center">
        <form onSubmit={handleConnect} className="bg-[#001530] p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-[#FFDD00]">Join Chat</h2>
          {connectionError && <p className="text-red-500 mb-4">{connectionError}</p>}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full mb-4 p-2 bg-[#000080] text-white rounded"
          />
          <input
            type="text"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            placeholder="Enter room code"
            className="w-full mb-4 p-2 bg-[#000080] text-white rounded"
          />
          <button type="submit" className="w-full bg-[#FFB300] text-[#000080] p-2 rounded hover:bg-[#FFDD00]">
            Join
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000080] text-white flex">
      <div className="flex-grow flex flex-col h-screen">
        <div className="bg-[#001530] p-4 flex items-center justify-between">
          <div className="flex items-center">
            <ArrowLeft className="w-6 h-6 text-[#FFDD00] mr-4 cursor-pointer" onClick={handleDisconnect} />
            <h1 className="text-xl font-bold text-[#FFDD00]">Room: {roomCode}</h1>
          </div>
        </div>
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {connectionError && <p className="text-red-500 mb-4">{connectionError}</p>}
          {messages.map((msg, index) => (
            <Message
              key={index}
              sender={msg.sender}
              content={msg.content}
              timestamp={msg.timestamp}
              isMine={msg.sender === username}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSendMessage} className="bg-[#001530] p-4">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message"
            rows="3"
            className="w-full p-2 mb-4 bg-[#000080] text-white rounded"
          />
          <button type="submit" className="w-full bg-[#FFB300] text-[#000080] p-2 rounded hover:bg-[#FFDD00]">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}