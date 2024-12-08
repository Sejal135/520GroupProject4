import React, { useState, useRef, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'

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
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Alex', content: 'Hey everyone! Excited for our trip to Tokyo next month!', timestamp: '10:30 AM', isMine: false },
    { id: 2, sender: 'You', content: 'Me too! Has anyone been to the TeamLab Borderless museum?', timestamp: '10:32 AM', isMine: true },
    { id: 3, sender: 'Sarah', content: 'Yes, it\'s amazing! Definitely a must-visit.', timestamp: '10:35 AM', isMine: false },
    { id: 4, sender: 'Mike', content: 'I heard it\'s closing soon. We should book tickets ASAP!', timestamp: '10:37 AM', isMine: false },
  ])
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef(null)

  const members = [
    { id: 1, name: 'You', status: 'online' },
    { id: 2, name: 'Alex', status: 'online' },
    { id: 3, name: 'Sarah', status: 'offline' },
    { id: 4, name: 'Mike', status: 'online' },
    { id: 5, name: 'Emma', status: 'offline' },
  ]

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        sender: 'You',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMine: true
      }
      setMessages([...messages, newMsg])
      setNewMessage('')
    }
  }

  return (
    <div className="min-h-screen bg-[#000080] text-white flex">
      {/* Main Chat Area */}
      <div className="flex-grow flex flex-col h-screen">
        {/* Chat Header */}
        <div className="bg-[#001530] p-4 flex items-center justify-between">
          <div className="flex items-center">
            <ArrowLeft className="w-6 h-6 text-[#FFDD00] mr-4 cursor-pointer" />
            <h1 className="text-xl font-bold text-[#FFDD00]">Tokyo Travelers 2024</h1>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <Message key={message.id} {...message} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
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