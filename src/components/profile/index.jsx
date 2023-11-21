import { useState, useEffect } from 'react';
import { API_URL } from '../../../lib/constants';

export default function Profile() {
  const userId = localStorage.getItem('user_name');
  const [user, setUser] = useState(null);

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
    </div>
  );
}
