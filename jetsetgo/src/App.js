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

import React, { useState } from "react";
import ViewGC from "./pages/ViewGC";

const App = () => {
  const [currentPage, setCurrentPage] = useState("viewChats");

  const renderPage = () => {
    if (currentPage === "joinGroup") {
      return <div className="placeholder">Join Group Chat Page</div>;
    }
    if (currentPage === "groupChat") {
      return <div className="placeholder">Group Chat Page</div>;
    }
    return <ViewGC setCurrentPage={setCurrentPage} />;
  };

  return <div>{renderPage()}</div>;
};

export default App;