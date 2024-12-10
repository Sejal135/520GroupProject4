import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from "react-router-dom";
import SignIn from "./components/signin/Signin";
import Profile from "./pages/Profile";
import FavoriteDestinations from "./pages/FavoriteDestinations";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import Itineraries from "./pages/Itineraries";
import CreateProfile from "./pages/CreateProfile";
import GroupChatsPage from "./pages/ViewChats";
import GroupChat from "./pages/GroupChat";
import Location from "./pages/Location";
import EditProfile from "./pages/EditProfile";

const Layout = () => {
  const location = useLocation();

  // List of routes where the header should NOT be shown
  const noHeaderRoutes = ["/create-profile"];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Render Header only if the current path is NOT in noHeaderRoutes */}
      {!noHeaderRoutes.includes(location.pathname) && <Header />}
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/favorite-destinations" element={<FavoriteDestinations />} />
          <Route path="/itineraries" element={<Itineraries />} />
          <Route path="/create-profile" element={<CreateProfile />} />
          <Route path="/group-chats" element={<GroupChatsPage />} />
          <Route path="/chat" element={<GroupChat />} />
          <Route path="/location" element={<Location />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
