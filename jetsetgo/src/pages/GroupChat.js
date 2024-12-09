import React, { useState, useRef, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'

const Message = ({ sender, content, timestamp, isMine }) => (
  <div className={`flex ${isMine ? 'justify-end' : 'justify-start'} mb-4`}>
    <div className={`max-w-[70%] ${isMine ? 'bg-[#FFB300] text-[#000080]' : 'bg-[#0000E0] text-[#FFDD00]'} rounded-lg p-3`}>
      {!isMine && <p className="font-semibold mb-1">{sender}</p>}
      <p>{content}</p>
      <p className={`text-xs ${isMine ? 'text-[#000080]/70' : 'text-[#FFDD00]/70'} text-right mt-1`}>{timestamp}</p>
    </div>
  </div>
)

export default function GroupChat() {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [username, setUsername] = useState('')
  const [roomCode, setRoomCode] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const messagesEndRef = useRef(null)
  const stompClientRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isConnected) {
      const client = new Client({
        brokerURL: "ws://localhost:8081/ws",
        onConnect: () => {
          console.log('Connected to WebSocket')
          client.subscribe(`/topic/${roomCode}`, onMessageReceived)
          sendJoinMessage()
        },
      })
      stompClientRef.current = client
      client.activate()

      return () => {
        if (client.connected) {
          sendLeaveMessage()
          client.deactivate()
        }
      }
    }
  }, [isConnected, roomCode])

  const onMessageReceived = (message) => {
    const receivedMessage = JSON.parse(message.body)
    setMessages((prevMessages) => [...prevMessages, receivedMessage])
  }

  const sendJoinMessage = () => {
    const joinMessage = {
      roomId: 'public',
      sender: username,
      content: `${username} joined!`,
      type: 'JOIN',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    stompClientRef.current.publish({
      destination: `/app/chat.addUser/${roomCode}`,
      body: JSON.stringify(joinMessage),
    })
  }

  const sendLeaveMessage = () => {
    const leaveMessage = {
      roomId: 'public',
      sender: username,
      content: `${username} left!`,
      type: 'LEAVE',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    stompClientRef.current.publish({
      destination: `/app/chat.addUser/${roomCode}`,
      body: JSON.stringify(leaveMessage),
    })
  }

  const handleConnect = (e) => {
    e.preventDefault()
    if (username && roomCode) {
      setIsConnected(true)
    }
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim() && stompClientRef.current) {
      const chatMessage = {
        roomId: 'public',
        sender: username,
        content: newMessage,
        type: 'CHAT',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      stompClientRef.current.publish({
        destination: `/app/chat.sendMessage/${roomCode}`,
        body: JSON.stringify(chatMessage),
      })
      setNewMessage('')
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-[#000080] text-white flex items-center justify-center">
        <form onSubmit={handleConnect} className="bg-[#001530] p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-[#FFDD00]">Join Chat</h2>
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
    )
  }

  return (
    <div className="min-h-screen bg-[#000080] text-white flex">
      <div className="flex-grow flex flex-col h-screen">
        <div className="bg-[#001530] p-4 flex items-center justify-between">
          <div className="flex items-center">
            <ArrowLeft className="w-6 h-6 text-[#FFDD00] mr-4 cursor-pointer" onClick={() => setIsConnected(false)} />
            <h1 className="text-xl font-bold text-[#FFDD00]">Room: {roomCode}</h1>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <Message
              key={index}
              sender={message.sender}
              content={message.content}
              timestamp={message.timestamp}
              isMine={message.sender === username}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="bg-[#001530] p-4 flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow bg-[#000080] text-white rounded-l-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFB300]"
          />
          <button type="submit" className="bg-[#FFB300] text-[#000080] rounded-r-full px-4 py-2 hover:bg-[#FFDD00]">
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

