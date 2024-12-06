import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import SignIn from "./components/signin/Signin";
import Profile from "./pages/Profile";
import FavoriteDestinations from "./pages/FavoriteDestinations";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import Itineraries from "./pages/Itineraries";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;