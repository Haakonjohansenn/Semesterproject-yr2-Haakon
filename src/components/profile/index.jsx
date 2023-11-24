import { useState, useEffect } from 'react';
import { API_URL } from '../../../lib/constants';
import createListing from '../../../lib/api';

export default function Profile() {
  const userId = localStorage.getItem('user_name');
  const [user, setUser] = useState(null);

  const [listingCreated, setListingCreated] = useState(false);
  const [error, setError] = useState("");

  const handleCreateListing = async () => {
    try {
      localStorage.getItem("accessToken");
      const result = await createListing(); // Call the function
      console.log(result);
      setListingCreated(true);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${API_URL}/auction/profiles/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          console.log('userData:', userData);
          setUser(userData);
        } else {
          // Handle error (e.g., token expired, unauthorized)
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    // Check if the user is logged in and has a stored user ID before fetching the profile
    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  return (
    <div className="parent-container flex justify-center">
        {user ? (
          <div>
            <h1>Profile Information</h1>
            <div className="avatar-container flex rounded-full w-28 bg-blue-500 justify-center">
            {user.avatar && <img src={user.avatar} alt="Avatar" className="justify-center"/>}
            </div>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Credits: {user.credits}</p>
            {/* Add more fields as needed */}
          </div>
        ) : (
          <p>Loading user profile...</p>
        )}
            <div className="bg-cta-color h-screen w-screen">
      <button className=" bg-cta-color text-my-black" onClick={handleCreateListing}>
        Create Listing
      </button>
      {listingCreated && <p>Listing Created Successfully!</p>}
      {error && <p>Error: {error}</p>}
    </div>
    </div>
  );
}
