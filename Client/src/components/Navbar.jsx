import React from "react";
import { Link, NavLink ,useNavigate} from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();
   const token = localStorage.getItem("token");

 const handleLogout = () => {
  logout(); // 🔥 this updates global state
  alert("Logged out successfully");
  navigate("/login");
};
  const handleLogin = () => {
     navigate("/login");
  }
  const handleSignUp = () => {
     navigate("/signup");
  }

  return (
   <nav
  className="fixed top-0 left-0 w-full flex justify-between items-center px-10 py-4
  bg-linear-to-r from-yellow-400 to-yellow-600
  text-white shadow-lg z-50"
>
      {/* Logo */}
      <Link to="/">
        <div className="flex items-center gap-3">
          <img
            src="/images/logo.png"
            alt="CircleUp logo"
            className="w-10 h-10 rounded-lg shadow-md"
          />
          <h1 className="text-3xl font-bold">CircleUp</h1>
        </div>
      </Link>

      {/* Menu */}
    <ul className="flex gap-8 text-lg items-center">

  {/* HOME (only for users / guests) */}
  {!isLoggedIn || user?.role === "user" ? (
    <>
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          isActive ? "text-black font-bold" : "hover:text-fuchsia-200 transition"
        }
      >
        Home
      </NavLink>

      <li>
        <NavLink to="/events" className={({ isActive }) =>
          isActive ? "text-black font-bold" : "hover:text-fuchsia-200 transition"
        }>
          Events
        </NavLink>
      </li>

      <li>
        <NavLink to="/calendar" className={({ isActive }) =>
          isActive ? "text-black font-bold" : "hover:text-fuchsia-200 transition"
        }>
          Calendar
        </NavLink>
      </li>

      <li>
        <NavLink to="/map" className={({ isActive }) =>
          isActive ? "text-black font-bold" : "hover:text-fuchsia-200 transition"
        }>
          Map
        </NavLink>
      </li>
    </>
  ) : null}

  {/*  ADMIN ONLY */}
  {isLoggedIn && user?.role === "admin" && (
    <>
      <li>
        <NavLink to="/admin/events" className={({ isActive }) =>
          isActive ? "text-black font-bold" : "hover:text-fuchsia-200 transition"
        }>
          Events
        </NavLink>
      </li>

      <li>
        <NavLink to="/admin/users" className={({ isActive }) =>
          isActive ? "text-black font-bold" : "hover:text-fuchsia-200 transition"
        }>
          Users
        </NavLink>
      </li>
    </>
  )}

  {/*  AUTH BUTTON */}
  <li>
    {isLoggedIn ? (
      <button
        onClick={handleLogout}
        className="ms-3 px-4 py-1 rounded-lg bg-black font-semibold hover:bg-yellow-400 hover:text-black transition"
      >
        Logout
      </button>
    ) : (
      <button
        onClick={handleLogin}
        className="ms-3 px-4 py-1 rounded-lg bg-black font-semibold hover:bg-yellow-400 hover:text-black transition"
      >
        Login
      </button>
    )}
  </li>

</ul>
    </nav>
  );
};

export default Navbar;
