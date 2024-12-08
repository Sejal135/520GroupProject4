//  code below works for Creating a New Review

// import React from 'react';
// import CreateReview from './pages/CreateReview';

// const App = () => {
//   return (
//     <div>
//       <CreateReview />
//     </div>
//   );
// };

// export default App;


// // code below for Explore GC Page

// import React from 'react';
// import ExploreGC from './pages/ExploreGC';

// const App = () => {
//   return (
//     <div>
//       <ExploreGC />
//     </div>
//   );
// };

// export default App;

// // code below is for ViewGC page

// import React, { useState } from "react";
// import ViewGC from "./pages/ViewGC";

// const App = () => {
//   const [currentPage, setCurrentPage] = useState("viewChats");

//   const renderPage = () => {
//     if (currentPage === "joinGroup") {
//       return <div className="placeholder">Join Group Chat Page</div>;
//     }
//     if (currentPage === "groupChat") {
//       return <div className="placeholder">Group Chat Page</div>;
//     }
//     return <ViewGC setCurrentPage={setCurrentPage} />;
//   };

//   return <div>{renderPage()}</div>;
// };

// export default App;

// code below is for the CreateProfile Page

// react - router - dom ---> i am getting a lot of issues with this so just skipped that but i saw that ruth has implemented her navigation through pages using this.
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import CreateProfile from './pages/CreateProfile';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<div />} />
//         <Route path="/create-profile" element={<CreateProfile />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React, { useState } from "react";
import CreateProfile from "./pages/CreateProfile";

function App() {
  const [page, setPage] = useState("login");

  // Handle Google Sign-In Success (Dummy example for switching pages)
  const handleGoogleSignIn = (user) => {
    const isNewUser = true; // Replace with actual check
    if (isNewUser) {
      setPage("createProfile");
    } else {
      setPage("home");
    }
  };

  // Simple navigation rendering
  const renderPage = () => {
    switch (page) {
      case "home":
        return (
          <div style={{ textAlign: "center", padding: "50px", color: "white" }}>
            <h1>Welcome Home!</h1>
            <button onClick={() => setPage("login")}>Logout</button>
          </div>
        );
      case "createProfile":
        return <CreateProfile onSubmit={() => setPage("submit")} />;
      case "submit":
        return (
          <div style={{ textAlign: "center", padding: "50px", color: "white" }}>
            <h1>Profile Submitted Successfully!</h1>
            <button onClick={() => setPage("home")}>Go Home</button>
          </div>
        );
      default:
        return (
          <div style={{ textAlign: "center", padding: "50px", color: "white" }}>
            <h1>Login Page</h1>
            <button onClick={() => handleGoogleSignIn()}>Google Sign-In</button>
          </div>
        );
    }
  };

  return <div style={{ backgroundColor: "#243B55", minHeight: "100vh" }}>{renderPage()}</div>;
}

export default App;