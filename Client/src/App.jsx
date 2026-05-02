import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Calendar from "./pages/Calendar";
import Map from "./pages/Map";

import ManageEvents from "./pages/admin/ManageEvents";
import AdminUsers from "./pages/admin/AdminUsers";
import AddEvent from "./pages/admin/AddEvent";

import MyBookmarks from "./pages/MyBookmarks";
import FloatingChatbot from "./pages/FloatingChatbot";
import Chatbot from "./pages/Chatboat";

import AuthProvider from "./hooks/AuthProvider";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/calendar" element={<Calendar />} />

          <Route path="/map" element={<Map />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/bookmarks" element={<MyBookmarks />} />
          <Route path="/chat" element={<Chatbot />} />

          {/* Admin */}
          <Route path="/admin/events" element={<ManageEvents />} />
          <Route path="/admin/addEvent" element={<AddEvent />} />
          <Route path="/admin/users" element={<AdminUsers />} />
        </Routes>

        <FloatingChatbot /> {/* Works globally */}
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;