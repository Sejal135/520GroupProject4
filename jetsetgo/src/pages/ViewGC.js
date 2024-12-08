// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "../components/ViewGC.css"; // CSS file for styling

// const groupChats = [
//   { name: "Local Jazz Bars: Four Members", location: "Paris, France", date: "Dec 6, 2024" },
//   { name: "Markets: Seven Members", location: "Santorini, Greece", date: "Nov 26, 2024" },
//   { name: "Book Tours, Classes, Activities: Twelve Members", location: "Cappadocia, Turkey", date: "Nov 6, 2024" },
//   { name: "Luxury Shopping Guide: Fifteen Members", location: "Singapore, Singapore", date: "Oct 26, 2024" },
// ];

// const ViewGC = () => {
//   const navigate = useNavigate();

//   const handleBack = () => {
//     // Navigate to the previous page
//     navigate(-1);
//   };

//   const handleJoin = () => {
//     // Navigate to the join group chat page
//     navigate("/join");
//   };

//   const handleGroupClick = () => {
//     // Navigate to a group chat page
//     navigate("/group-chat");
//   };

//   return (
//     <div className="view-gc-container">
//       <button className="back-button" onClick={handleBack}>
//         ← Back
//       </button>
//       <h1>View Your Chats</h1>
//       <button className="join-button" onClick={handleJoin}>
//         Join New Group Chat
//       </button>
//       <div className="group-list">
//         {groupChats.map((chat, index) => (
//           <div key={index} className="group-item" onClick={handleGroupClick}>
//             <div className="group-info">
//               <h2>{chat.name}</h2>
//               <p>{chat.location}</p>
//             </div>
//             <div className="group-date">Joined on {chat.date}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ViewGC;

import React, { useState } from "react";
import "../components/ViewGC.css"; // CSS file for styling

const groupChats = [
  { name: "Local Jazz Bars: Four Members", location: "Paris, France", date: "Dec 6, 2024" },
  { name: "Markets: Seven Members", location: "Santorini, Greece", date: "Nov 26, 2024" },
  { name: "Book Tours, Classes, Activities: Twelve Members", location: "Cappadocia, Turkey", date: "Nov 6, 2024" },
  { name: "Luxury Shopping Guide: Fifteen Members", location: "Singapore, Singapore", date: "Oct 26, 2024" },
];

const ViewGC = () => {
  const [currentPage, setCurrentPage] = useState("viewChats");

  const renderPage = () => {
    if (currentPage === "joinGroup") {
      return <div className="placeholder">Join Group Chat Page</div>;
    }
    if (currentPage === "groupChat") {
      return <div className="placeholder">Group Chat Page</div>;
    }
    return (
      <div>
        <button className="back-button" onClick={() => alert("Back button clicked!")}>
          ← Back
        </button>
        <h1>View Your Chats</h1>
        <button className="join-button" onClick={() => setCurrentPage("joinGroup")}>
          Join New Group Chat
        </button>
        <div className="group-list">
          {groupChats.map((chat, index) => (
            <div key={index} className="group-item" onClick={() => setCurrentPage("groupChat")}>
              <div className="group-info">
                <h2>{chat.name}</h2>
                <p>{chat.location}</p>
              </div>
              <div className="group-date">Joined on {chat.date}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return <div className="view-gc-container">{renderPage()}</div>;
};

export default ViewGC;