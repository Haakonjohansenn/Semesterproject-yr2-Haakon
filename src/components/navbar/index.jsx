import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { NAVIGATION } from '../../../lib/constants';
import { useAuth } from '../authContext';

export default function Navbar() {
  const { isLoggedIn, user, logout, credits, avatar } = useAuth();
  const [displayedCredits, setDisplayedCredits] = useState(0);

  useEffect(() => {
    if (credits !== null && credits !== undefined) {
      setDisplayedCredits(Number(credits));
      console.log("Updated credits:", credits);
    }
  }, [credits]);
  
  useEffect(() => {
    if (credits !== null && credits !== undefined) {
      setDisplayedCredits(Number(credits));
      console.log("Initial credits:", credits);
    }
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-nav-color p-6 flex flex-row">
      <div className="container mx-auto flex flex-row items-center justify-between text-neutral-200">
        <div>
          <Link to="/" className="text-white text-lg lg:text-3xl font-extrabold tracking-tight">
            Auction House
          </Link>
        </div>

        <div className="flex items-center">
          {isLoggedIn ? (
            <div className="relative group">
              <button onClick={toggleMenu} className="text-my-black bg-cta-color rounded-lg px-3 py-1">
                <div className="flex flex-row gap-1">
                  {user && user.name}
                  {avatar && <img src={avatar} className="rounded-full h-6 w-6" alt="User Avatar" />}
                </div>
              </button>
              {isOpen && (
                <div className="absolute right-0 mt-2 bg-cta-color rounded-md shadow-md flex flex-col items-center">
                  {NAVIGATION.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="text-my-black hover:underline transition duration-300"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div>
                    <p className="text-my-black">Credits:</p>
                    <p className="text-center text-my-black">{displayedCredits}</p>
                  </div>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 bg-nav-color hover:bg-my-blue-light transition delay-"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-my-black bg-cta-color rounded-lg p-2">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
