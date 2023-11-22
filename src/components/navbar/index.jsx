// Navbar.js
import { Link } from "@tanstack/react-router";
import { NAVIGATION } from "../../../lib/constants";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("accessToken"));

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    // Additionally, you might want to redirect the user to the login page
    // or perform any other necessary actions after logout.
  };

  // Check for the login status on component mount
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("accessToken"));
  }, []);

  return (
    <nav className="bg-nav-color p-4">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between text-neutral-200">
        {/* Logo on the left */}
        <div>
          <Link
            to="/"
            className="text-white text-lg lg:text-3xl font-extrabold tracking-tight"
          >
            Auction House
          </Link>
        </div>

        {/* Hamburger icon for small screens on the right */}
        <div className="lg:hidden ml-auto">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none text-transparent"
          >
            <div className="space-y-1.5">
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
            </div>
          </button>
        </div>

        {/* Navbar links for larger screens and centered for small screens */}
        <div
          className={`lg:flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 ${
            isOpen ? "flex flex-col items-center" : "hidden"
          } justify-center mt-4 lg:mt-0`}
        >
          {NAVIGATION.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-white hover:text-blue-300 transition duration-300"
            >
              {item.label}
            </Link>
          ))}
          <div className="ml-auto mr-6">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="text-my-black ml-auto bg-cta-color p-2 rounded-lg">
                Logout
              </button>
            ) : (
              <Link to="/login" className="text-my-black bg-cta-color p-2 rounded-lg">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
