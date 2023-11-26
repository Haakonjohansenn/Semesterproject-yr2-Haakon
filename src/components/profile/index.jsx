import { useState, useEffect } from 'react';
import { API_URL } from '../../../lib/constants';

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('user')); // Parse the stored user data
  const userId = user ? user.name : null; // Retrieve the user ID from the parsed user data
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(`${API_URL}/auction/profiles/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const userProfileData = await response.json();
          setUserProfile(userProfileData);
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
      {userProfile ? (
        <div>
          <h1>Profile Information</h1>
          <div className="avatar-container flex rounded-full w-28 bg-blue-500 justify-center">
            {userProfile.avatar && (
              <img src={userProfile.avatar} alt="Avatar" className="justify-center" />
            )}
          </div>
          <p>Name: {userProfile.name}</p>
          <p>Email: {userProfile.email}</p>
          <p>Credits: {userProfile.credits}</p>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
}