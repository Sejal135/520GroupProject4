import React from 'react';
import '../components/GroupChats.css'; // CSS file for styling

const ExploreGC = () => {
    const chats = [
      {
        name: "Local Jazz Bars: Four Members",
        description:
          "Paris' jazz clubs are more than just music venues; they are a testament to the city's enduring love affair with jazz. Meet people to go to these clubs with, speak to them real-time about any questions.",
        location: "Paris, France",
        roomCode: "FPB",
      },
      {
        name: "Markets: Seven Members",
        description:
          "Santorini is known for its most gorgeous sunrises and sunsets with the view of endless ocean. Perfect place to plan a proposal or go for honeymoon. Local markets are authentic and beautiful. Explore Santorini like an insider.",
        location: "Santorini, Greece",
        roomCode: "FPB",
      },
      {
        name: "Book Tours, Classes, Activities: Twelve Members",
        description:
          "Turkey's beautiful Cappadocia has much to offer, ranging from its pottery classes, historical views, early morning hot air balloon sky, wine tasting, caves viewing etc. Book slots through this group.",
        location: "Cappadocia, Turkey",
        roomCode: "FPB",
      },
    ];
  
    return (
      <div className="group-chats-container">
        {/* Header */}
        <h1 className="header">Explore Group Chats</h1>
        
        {/* List of Group Chats */}
      <div className="chat-list">
        {chats.map((chat, index) => (
          <div key={index} className="chat-card">
            <div className="chat-name">{chat.name}</div>
            <div className="chat-description">{chat.description}</div>
            <div className="chat-footer">
              <span className="chat-location">{chat.location}</span>
              <span className="chat-room-code">Room Code: {chat.roomCode}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreGC;